/**
 * TypeScript Client Generator
 * Generates type-safe API clients from OpenAPI/Swagger specifications
 */

import * as fs from 'fs-extra';
import * as path from 'path';

// OpenAPI types
export interface OpenAPISpec {
  openapi?: string;
  swagger?: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, Schema>;
    responses?: Record<string, unknown>;
    parameters?: Record<string, unknown>;
    requestBodies?: Record<string, unknown>;
  };
  definitions?: Record<string, Schema>; // Swagger 2.0
}

export interface PathItem {
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
}

export interface Operation {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Record<string, Response>;
  security?: unknown[];
}

export interface Parameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
  schema?: Schema;
  type?: string;
  enum?: (string | number)[];
}

export interface RequestBody {
  description?: string;
  required?: boolean;
  content?: Record<string, MediaType>;
  schema?: Schema;
}

export interface MediaType {
  schema?: Schema;
}

export interface Response {
  description?: string;
  content?: Record<string, MediaType>;
  schema?: Schema; // Swagger 2.0
}

export interface Schema {
  $ref?: string;
  type?: string;
  format?: string;
  enum?: (string | number)[];
  properties?: Record<string, Schema>;
  required?: string[];
  items?: Schema;
  additionalProperties?: boolean | Schema;
  allOf?: Schema[];
  oneOf?: Schema[];
  anyOf?: Schema[];
  description?: string;
  title?: string;
  default?: unknown;
  example?: unknown;
}

// Client generation options
export interface ClientOptions {
  spec: OpenAPISpec;
  clientName?: string;
  baseUrl?: string;
  useAxios?: boolean;
  includeCredentials?: boolean;
  includeRetry?: boolean;
  includeCache?: boolean;
  exportType?: 'default' | 'named' | 'module';
  emitDeprecatedMethods?: boolean;
  useEnumTypes?: boolean;
}

// Generate TypeScript type from OpenAPI schema
export function generateType(schema: Schema, name = 'Anonymous', refs = new Set<string>()): string {
  if (schema.$ref) {
    const refName = getRefName(schema.$ref);
    if (refs.has(refName)) {
      return refName;
    }
    refs.add(refName);
    return refName;
  }

  if (schema.enum) {
    const enumValues = schema.enum.map(v => typeof v === 'string' ? `'${v}'` : String(v));
    return enumValues.join(' | ');
  }

  if (schema.allOf) {
    const types = schema.allOf.map(s => generateType(s, name, refs));
    return `(${types.join(' & ')})`;
  }

  if (schema.oneOf) {
    const types = schema.oneOf.map(s => generateType(s, name, refs));
    return `(${types.join(' | ')})`;
  }

  if (schema.anyOf) {
    const types = schema.anyOf.map(s => generateType(s, name, refs));
    return `(${types.join(' | ')})`;
  }

  const baseType = getBaseType(schema);
  if (!baseType) {
    return 'unknown';
  }

  if (baseType === 'array' && schema.items) {
    const itemType = generateType(schema.items, `${name}Item`, refs);
    return `${itemType}[]`;
  }

  if (baseType === 'object') {
    if (!schema.properties || Object.keys(schema.properties).length === 0) {
      return 'Record<string, unknown>';
    }

    const props = Object.entries(schema.properties).map(([propName, propSchema]) => {
      const isRequired = schema.required?.includes(propName);
      const propType = generateType(propSchema, `${name}${capitalize(propName)}`, new Set(refs));
      const optional = isRequired ? '' : '?';
      return `  ${propName}${optional}: ${propType};`;
    });

    if (schema.additionalProperties) {
      const additionalType = typeof schema.additionalProperties === 'object'
        ? generateType(schema.additionalProperties, `${name}Additional`, refs)
        : 'unknown';
      props.push(`  [key: string]: ${additionalType};`);
    }

    return `{\n${props.join('\n')}\n}`;
  }

  return baseType;
}

// Get base TypeScript type from OpenAPI type
function getBaseType(schema: Schema): string | null {
  if (!schema.type) {
    return null;
  }

  const typeMap: Record<string, string> = {
    string: 'string',
    number: 'number',
    integer: 'number',
    boolean: 'boolean',
    array: 'array',
    object: 'object',
  };

  const baseType = typeMap[schema.type];

  if (baseType === 'string' && schema.format) {
    const formatMap: Record<string, string> = {
      date: 'string',
      'date-time': 'string',
      email: 'string',
      uri: 'string',
      url: 'string',
      uuid: 'string',
      binary: 'string',
      byte: 'string',
      password: 'string',
    };
    return formatMap[schema.format] || 'string';
  }

  return baseType;
}

// Extract reference name from $ref
function getRefName(ref: string): string {
  const parts = ref.split('/');
  return parts[parts.length - 1] || 'Unknown';
}

// Capitalize first letter
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Convert operation ID to method name
function toMethodName(operationId: string): string {
  return operationId
    .replace(/[^a-zA-Z0-9]/g, '_')
    .split('_')
    .map((word, i) => i === 0 ? word : capitalize(word))
    .join('');
}

// Generate TypeScript interfaces from OpenAPI spec
export function generateInterfaces(spec: OpenAPISpec): string {
  const lines: string[] = [];
  lines.push('// Auto-generated TypeScript types from OpenAPI specification');
  lines.push(`// ${spec.info.title} v${spec.info.version}`);
  lines.push('');
  lines.push('export interface RequestConfig {');
  lines.push('  signal?: AbortSignal;');
  lines.push('  headers?: Record<string, string>;');
  lines.push('  timeout?: number;');
  lines.push('}');
  lines.push('');

  // Generate interfaces from components/schemas or definitions
  const schemas = spec.components?.schemas || spec.definitions || {};
  Object.entries(schemas).forEach(([name, schema]) => {
    lines.push(`export interface ${name} {`);
    if (schema.description) {
      lines.push(`  /** ${schema.description} */`);
    }

    const props: string[] = [];
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([propName, propSchema]) => {
        const isRequired = schema.required?.includes(propName);
        const propType = generateType(propSchema, `${name}${capitalize(propName)}`, new Set());
        const optional = isRequired ? '' : '?';
        const comment = propSchema.description ? ` /** ${propSchema.description} */` : '';
        props.push(`  ${propName}${optional}: ${propType};${comment}`);
      });
    }

    if (schema.additionalProperties) {
      const additionalType = typeof schema.additionalProperties === 'object'
        ? generateType(schema.additionalProperties, `${name}Additional`, new Set())
        : 'unknown';
      props.push(`  [key: string]: ${additionalType};`);
    }

    if (props.length === 0) {
      props.push('  [key: string]: unknown;');
    }

    lines.push(props.join('\n'));
    lines.push('}');
    lines.push('');
  });

  // Generate enum types
  Object.entries(schemas).forEach(([name, schema]) => {
    if (schema.enum) {
      lines.push(`export type ${name} = ${generateType(schema, name, new Set())};`);
      lines.push('');
    }
  });

  return lines.join('\n');
}

// Generate API client methods
export function generateClientMethods(spec: OpenAPISpec, options: ClientOptions): string {
  const lines: string[] = [];

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (!operation || typeof operation !== 'object') return;

      const opId = operation.operationId || toMethodName(`${method}_${path}`);
      const methodName = toMethodName(opId);
      const description = operation.description || operation.summary || '';
      const httpMethod = method.toUpperCase();

      // Parse parameters
      const pathParams = (operation.parameters || []).filter((p: Parameter) => p.in === 'path');
      const queryParams = (operation.parameters || []).filter((p: Parameter) => p.in === 'query');
      const headerParams = (operation.parameters || []).filter((p: Parameter) => p.in === 'header');

      // Build method signature
      lines.push(`/**`);
      if (description) lines.push(` * ${description}`);
      lines.push(` * @ HTTP ${httpMethod} ${path}`);
      lines.push(` */`);

      const hasBody = operation.requestBody;
      const hasConfig = true; // Always have config option
      const hasPathParams = pathParams.length > 0;
      const hasQueryParams = queryParams.length > 0;
      const hasHeaderParams = headerParams.length > 0;

      // Build parameter interface
      const params: string[] = [];

      if (hasPathParams) {
        pathParams.forEach((p: Parameter) => {
          const paramType = p.schema ? generateType(p.schema, `${capitalize(p.name)}Param`, new Set()) : 'string';
          params.push(`  ${p.name}: ${paramType};${p.required ? '' : '?'}`);
        });
      }

      if (hasQueryParams) {
        params.push(`  query?: {`);
        queryParams.forEach((p: Parameter) => {
          const paramType = p.schema ? generateType(p.schema, `${capitalize(p.name)}Query`, new Set()) : 'string';
          params.push(`    ${p.name}?: ${paramType};`);
        });
        params.push(`  };`);
      }

      if (hasHeaderParams) {
        params.push(`  headers?: {`);
        headerParams.forEach((p: Parameter) => {
          const paramType = p.schema ? generateType(p.schema, `${capitalize(p.name)}Header`, new Set()) : 'string';
          params.push(`    ${p.name}?: ${paramType};`);
        });
        params.push(`  };`);
      }

      if (hasBody) {
        const content = operation.requestBody.content || {};
        const jsonSchema = content['application/json']?.schema || content['*/*']?.schema || operation.requestBody.schema;
        if (jsonSchema) {
          const bodyType = generateType(jsonSchema, 'RequestBody', new Set());
          params.push(`  body: ${bodyType};`);
        } else {
          params.push(`  body: unknown;`);
        }
      }

      // Build method
      let methodSig = `async ${methodName}(`;

      if (params.length > 0) {
        methodSig += `params: {\n${params.join('\n')}\n  }, `;
      }

      methodSig += `config?: RequestConfig`;

      // Determine response type
      const successResponse = operation.responses['200'] || operation.responses['201'] || operation.responses['204'];
      let responseType = 'void';

      if (successResponse) {
        const content = (successResponse as Response).content;
        if (content?.['application/json']?.schema) {
          responseType = generateType(content['application/json'].schema, 'Response', new Set());
        } else if ((successResponse as Response).schema) {
          responseType = generateType((successResponse as Response).schema, 'Response', new Set());
        } else {
          responseType = 'unknown';
        }
      }

      methodSig += `): Promise<${responseType}>`;

      lines.push(methodSig + ' {');
      lines.push(`  const url = this.buildUrl('${path}'`);

      if (hasPathParams) {
        pathParams.forEach((p: Parameter) => {
          lines.push(`    .replace('{${p.name}}', encodeURIComponent(String(params.${p.name})))`);
        });
      }

      lines.push(`  );`);

      // Build query string
      if (hasQueryParams) {
        lines.push(`  const queryString = new URLSearchParams();`);
        lines.push(`  if (params.query) {`);
        queryParams.forEach((p: Parameter) => {
          lines.push(`    if (params.query.${p.name} !== undefined) {`);
          lines.push(`      queryString.append('${p.name}', String(params.query.${p.name}));`);
          lines.push(`    }`);
        });
        lines.push(`  }`);
        lines.push(`  const fullUrl = queryString.toString() ? \`\${url}?\${queryString}\` : url;`);
      } else {
        lines.push(`  const fullUrl = url;`);
      }

      // Build headers
      lines.push(`  const headers = {`);
      lines.push(`    'Content-Type': 'application/json',`);
      lines.push(`    ...this.defaultHeaders,`);
      lines.push(`    ...config?.headers,`);

      if (hasHeaderParams) {
        lines.push(`    ...(params.headers || {}),`);
      }

      lines.push(`  };`);

      // Build request
      if (options.useAxios) {
        lines.push(`  const response = await this.axios.${httpMethod.toLowerCase()}(fullUrl, {`);
        if (hasBody) {
          lines.push(`    data: params.body,`);
        }
        lines.push(`    headers,`);
        lines.push(`    signal: config?.signal,`);
        lines.push(`  });`);
        lines.push(`  return response.data as ${responseType};`);
      } else {
        lines.push(`  const response = await fetch(fullUrl, {`);
        lines.push(`    method: '${httpMethod}',`);
        if (hasBody) {
          lines.push(`    body: JSON.stringify(params.body),`);
        }
        lines.push(`    headers,`);
        lines.push(`    signal: config?.signal,`);
        lines.push(`  });`);

        lines.push(`  if (!response.ok) {`);
        lines.push(`    throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);`);
        lines.push(`  }`);

        if (responseType === 'void') {
          lines.push(`  return;`);
        } else if (responseType === 'unknown') {
          lines.push(`  return await response.json();`);
        } else {
          lines.push(`  return await response.json() as ${responseType};`);
        }
      }

      lines.push(`}`);
      lines.push(``);
    });
  });

  return lines.join('\n');
}

// Generate the complete client class
export function generateClient(spec: OpenAPISpec, options: ClientOptions): string {
  const clientName = options.clientName || `${toCamelCase(spec.info.title)}Client`;
  const baseUrl = options.baseUrl || spec.servers?.[0]?.url || '';

  const lines: string[] = [];

  // Add imports
  if (options.useAxios) {
    lines.push(`import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';`);
  } else {
    lines.push(`// Using native fetch API`);
  }
  lines.push('');

  // Add interfaces
  lines.push(generateInterfaces(spec));
  lines.push('');

  // Add client class
  lines.push(`export class ${clientName} {`);
  lines.push(`  private baseUrl: string;`);
  lines.push(`  private defaultHeaders: Record<string, string>;`);

  if (options.useAxios) {
    lines.push(`  private axios: AxiosInstance;`);
  }

  lines.push('');
  lines.push(`  constructor(config?: {`);
  lines.push(`    baseUrl?: string;`);
  lines.push(`    headers?: Record<string, string>;`);
  if (options.includeCredentials) {
    lines.push(`    credentials?: RequestCredentials;`);
  }
  lines.push(`  }) {`);
  lines.push(`    this.baseUrl = config?.baseUrl || '${baseUrl}';`);
  lines.push(`    this.defaultHeaders = config?.headers || {};`);

  if (options.useAxios) {
    lines.push(`    this.axios = axios.create({`);
    lines.push(`      baseURL: this.baseUrl,`);
    if (options.includeCredentials) {
      lines.push(`      withCredentials: true,`);
    }
    lines.push(`    });`);
  }

  lines.push(`  }`);
  lines.push('');

  // Helper methods
  lines.push(`  private buildUrl(path: string): string {`);
  lines.push(`    return \`\${this.baseUrl.replace(/\\/$/, '')}\${path}\`;`);
  lines.push(`  }`);
  lines.push('');

  // API methods
  lines.push(generateClientMethods(spec, options));

  lines.push(`}`);

  return lines.join('\n');
}

// Convert to camelCase
function toCamelCase(str: string): string {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l, i) => i === 0 ? l.toLowerCase() : l.toUpperCase())
    .replace(/\s/g, '');
}

// Generate enum types for schemas with enums
export function generateEnums(spec: OpenAPISpec): string {
  const lines: string[] = [];
  const schemas = spec.components?.schemas || spec.definitions || {};

  Object.entries(schemas).forEach(([name, schema]) => {
    if (schema.enum) {
      lines.push(`export enum ${name} {`);
      schema.enum.forEach(value => {
        const key = typeof value === 'string' ? value.toUpperCase().replace(/[^A-Z0-9]/g, '_') : `VALUE_${value}`;
        lines.push(`  ${key} = ${typeof value === 'string' ? `'${value}'` : value},`);
      });
      lines.push(`}`);
      lines.push(``);
    }
  });

  return lines.join('\n');
}

// Generate API client from OpenAPI spec file
export async function generateClientFromSpecFile(
  specPath: string,
  outputPath: string,
  options: Partial<ClientOptions> = {}
): Promise<void> {
  const specContent = await fs.readFile(specPath, 'utf-8');
  const spec: OpenAPISpec = JSON.parse(specContent);

  const fullOptions: ClientOptions = {
    spec,
    clientName: options.clientName,
    baseUrl: options.baseUrl,
    useAxios: options.useAxios ?? true,
    includeCredentials: options.includeCredentials ?? false,
    includeRetry: options.includeRetry ?? false,
    includeCache: options.includeCache ?? false,
    exportType: options.exportType || 'default',
    emitDeprecatedMethods: options.emitDeprecatedMethods ?? false,
    useEnumTypes: options.useEnumTypes ?? false,
  };

  const clientCode = generateClient(spec, fullOptions);

  await fs.ensureDir(path.dirname(outputPath));
  await fs.writeFile(outputPath, clientCode, 'utf-8');
}

// Generate React Query hooks for the API client
export function generateReactQueryHooks(spec: OpenAPISpec, clientName: string): string {
  const lines: string[] = [];

  lines.push(`import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';`);
  lines.push(`import { ${clientName} } from './client';`);
  lines.push('');

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (!operation || typeof operation !== 'object') return;
      if (method.toLowerCase() === 'get' || method.toLowerCase() === 'head') {
        // Generate query hooks
        const opId = operation.operationId || toMethodName(`${method}_${path}`);
        const hookName = `use${toMethodName(opId)}`;
        lines.push(`export function ${hookName}(`);
        lines.push(`  client: ${clientName},`);
        lines.push(`  params: any,`);
        lines.push(`  options?: Omit<UseQueryOptions<unknown>, 'queryKey' | 'queryFn'>`);
        lines.push(`) {`);
        lines.push(`  return useQuery({`);
        lines.push(`    queryKey: ['${opId}', params],`);
        lines.push(`    queryFn: () => client.${toMethodName(opId)}(params),`);
        lines.push(`    ...options,`);
        lines.push(`  });`);
        lines.push(`}`);
        lines.push(``);
      } else {
        // Generate mutation hooks
        const opId = operation.operationId || toMethodName(`${method}_${path}`);
        const hookName = `use${toMethodName(opId)}Mutation`;
        lines.push(`export function ${hookName}(`);
        lines.push(`  client: ${clientName},`);
        lines.push(`  options?: Omit<UseMutationOptions<unknown, unknown, any>, 'mutationFn'>`);
        lines.push(`) {`);
        lines.push(`  return useMutation({`);
        lines.push(`    mutationFn: (params) => client.${toMethodName(opId)}(params),`);
        lines.push(`    ...options,`);
        lines.push(`  });`);
        lines.push(`}`);
        lines.push(``);
      }
    });
  });

  return lines.join('\n');
}

// List available operations from spec
export function listOperations(spec: OpenAPISpec): Array<{
  operationId: string;
  method: string;
  path: string;
  description: string;
}> {
  const operations: Array<{ operationId: string; method: string; path: string; description: string }> = [];

  Object.entries(spec.paths).forEach(([path, pathItem]) => {
    Object.entries(pathItem).forEach(([method, operation]) => {
      if (!operation || typeof operation !== 'object') return;

      operations.push({
        operationId: operation.operationId || toMethodName(`${method}_${path}`),
        method: method.toUpperCase(),
        path,
        description: operation.description || operation.summary || '',
      });
    });
  });

  return operations;
}

// Validate OpenAPI spec
export function validateSpec(spec: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!spec || typeof spec !== 'object') {
    errors.push('Spec must be an object');
    return { valid: false, errors };
  }

  const s = spec as OpenAPISpec;

  if (!s.openapi && !s.swagger) {
    errors.push('Spec must have either "openapi" or "swagger" field');
  }

  if (!s.info || typeof s.info !== 'object') {
    errors.push('Spec must have an "info" object');
  } else {
    if (!s.info.title) {
      errors.push('Spec must have "info.title"');
    }
    if (!s.info.version) {
      errors.push('Spec must have "info.version"');
    }
  }

  if (!s.paths || typeof s.paths !== 'object') {
    errors.push('Spec must have "paths" object');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
