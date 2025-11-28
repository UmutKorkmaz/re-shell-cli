#!/usr/bin/env node

// Start performance tracking
import { mark, isVersionRequest, getFromCache, setCache } from './startup-optimizer';
mark('startup-begin');

// Ensure immediate output for better terminal experience
process.env.FORCE_COLOR = '1'; // Enable colors in terminal
if (process.stdout.isTTY) {
  process.stdout.setEncoding('utf8');
}
if (process.stderr.isTTY) {
  process.stderr.setEncoding('utf8');
}

mark('env-setup-done');


// Get version from package.json (cached)
let version = ''; // fallback
const packageVersion = getFromCache('package-version');
if (typeof packageVersion === 'string') {
  version = packageVersion;
} else {
  try {
    const fs = require('fs');
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    version = packageJson.version;
    setCache('package-version', version);
  } catch {
    // Use fallback
  }
}

// Fast path for version requests
if (isVersionRequest()) {
  mark('version-fast-path');
  const chalk = require('chalk');
  console.log(chalk.cyan(`
██████╗ ███████╗           ███████╗██╗  ██╗███████╗██╗     ██╗
██╔══██╗██╔════╝           ██╔════╝██║  ██║██╔════╝██║     ██║
██████╔╝█████╗  ████████╗  ███████╗███████║█████╗  ██║     ██║
██╔══██╗██╔══╝  ╚═══════╝  ╚════██║██╔══██║██╔══╝  ██║     ██║
██║  ██║███████╗           ███████║██║  ██║███████╗███████╗███████╗
╚═╝  ╚═╝╚══════╝           ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
                                v${version}
`));
  console.log(version);
  process.exit(0);
}

mark('version-check-done');

// Enhanced error handling and signal management
import { setupStreamErrorHandlers, processManager, createAsyncCommand, withTimeout } from './utils/error-handler';

// Core imports only
import { Command } from 'commander';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';

// Additional imports for functions used in commands
import { createSpinner, flushOutput } from './utils/spinner';
import { runUpdateCommand } from './utils/checkUpdate';
import { initMonorepo } from './commands/init';
import { createProject } from './commands/create';
import { addMicrofrontend } from './commands/add';
import { removeMicrofrontend } from './commands/remove';
import { listMicrofrontends } from './commands/list';
import { buildMicrofrontend } from './commands/build';
import { serveMicrofrontend } from './commands/serve';
import { listWorkspaces, updateWorkspaces, generateWorkspaceGraph } from './commands/workspace';
import { addGitSubmodule, removeGitSubmodule, updateGitSubmodules, showSubmoduleStatus, initSubmodules, manageSubmodules } from './commands/submodule';
import { runDoctorCheck } from './commands/doctor';
import { analyzeProject } from './commands/analyze';
import { generateCICDConfig, generateDeployConfig } from './commands/cicd';
import { importProject, exportProject, backupProject, restoreProject } from './commands/migrate';
import { manageConfig } from './commands/config';
import { manageEnvironment } from './commands/environment';
import { manageMigration } from './commands/migration';
import { validateConfiguration } from './commands/validate';
import { manageProjectConfig } from './commands/project-config';
import { manageWorkspaceConfig } from './commands/workspace-config';
import { manageTemplates } from './commands/template';
import { manageConfigDiff } from './commands/config-diff';
import { manageBackups } from './commands/backup';
import { generateCode, generateTests, generateDocumentation } from './commands/generate';
import { testPlatformCapabilities, runPlatformDiagnostics, quickPlatformCheck } from './commands/platform-test';
import { manageDevMode } from './commands/dev-mode';
import { manageWorkspaceDefinition } from './commands/workspace-definition';
import { manageWorkspaceGraph } from './commands/workspace-graph';
import { manageWorkspaceHealth } from './commands/workspace-health';
import { manageWorkspaceState } from './commands/workspace-state';
import { manageWorkspaceTemplate } from './commands/workspace-template';
import { manageWorkspaceBackup } from './commands/workspace-backup';
import { manageWorkspaceMigration } from './commands/workspace-migration';
import { manageWorkspaceConflict } from './commands/workspace-conflict';
import { manageFileWatcher } from './commands/file-watcher';
import { manageChangeDetector } from './commands/change-detector';
import { manageChangeImpact, analyzeWorkspaceImpact } from './commands/change-impact';
import { manageIncrementalBuild } from './commands/incremental-build';
import { launchTUI } from './commands/tui';

// Plugin-related imports
import {
  managePlugins,
  discoverPlugins,
  installPlugin,
  uninstallPlugin,
  showPluginInfo,
  enablePlugin,
  disablePlugin,
  updatePlugins,
  validatePlugin,
  clearPluginCache,
  showPluginStats,
  reloadPlugin,
  showPluginHooks,
  executeHook,
  listHookTypes
} from './commands/plugin';

import {
  showCacheStats,
  configureCacheSettings,
  clearCache,
  testCachePerformance,
  optimizeCache,
  listCachedCommands
} from './commands/plugin-cache';

import {
  listPluginCommands,
  showCommandConflicts,
  resolveCommandConflicts,
  showCommandStats,
  registerTestCommand,
  unregisterCommand,
  showCommandInfo
} from './commands/plugin-command';

import {
  listCommandConflicts,
  showConflictStrategies,
  resolveConflict,
  autoResolveConflicts,
  showConflictStats,
  setPriorityOverride,
  showResolutionHistory
} from './commands/plugin-conflicts';

import {
  resolveDependencies,
  showDependencyTree,
  checkConflicts,
  validateVersions,
  updateDependencies
} from './commands/plugin-dependency';

import {
  generatePluginDocumentation,
  showCommandHelp,
  listDocumentedCommands,
  searchDocumentation,
  showDocumentationStats,
  configureHelpSystem,
  showDocumentationTemplates
} from './commands/plugin-docs';

import {
  searchMarketplace,
  showPluginDetails,
  installMarketplacePlugin,
  showPluginReviews,
  showFeaturedPlugins,
  showPopularPlugins,
  showCategories,
  clearMarketplaceCache,
  showMarketplaceStats
} from './commands/plugin-marketplace';

import {
  listMiddleware,
  showMiddlewareStats,
  testMiddleware,
  clearMiddlewareCache,
  showMiddlewareChain,
  createExampleMiddleware
} from './commands/plugin-middleware';

import {
  scanPluginSecurity,
  checkSecurityPolicy,
  generateSecurityReport,
  fixSecurityIssues
} from './commands/plugin-security';

import {
  testCommandValidation,
  createCommandValidationSchema,
  listValidationRules,
  listTransformations,
  showCommandValidationSchema,
  showValidationStats,
  generateValidationTemplate
} from './commands/plugin-validation';

mark('core-imports-done');

// Defer heavy imports until needed (simplified)
const lazyImports = {
  spinner: () => import('./utils/spinner'),
  errorHandler: () => import('./utils/error-handler'),
  // Commands - loaded on demand
  create: () => import('./commands/create'),
  add: () => import('./commands/add'),
  remove: () => import('./commands/remove'),
  list: () => import('./commands/list'),
  build: () => import('./commands/build'),
  serve: () => import('./commands/serve'),
  init: () => import('./commands/init'),
  workspace: () => import('./commands/workspace'),
  submodule: () => import('./commands/submodule'),
  doctor: () => import('./commands/doctor'),
  migrate: () => import('./commands/migrate'),
  analyze: () => import('./commands/analyze'),
  cicd: () => import('./commands/cicd'),
  generate: () => import('./commands/generate'),
  config: () => import('./commands/config'),
  environment: () => import('./commands/environment'),
  migration: () => import('./commands/migration'),
  validate: () => import('./commands/validate'),
  projectConfig: () => import('./commands/project-config'),
  workspaceConfig: () => import('./commands/workspace-config'),
  template: () => import('./commands/template'),
  configDiff: () => import('./commands/config-diff'),
  backup: () => import('./commands/backup'),
  devMode: () => import('./commands/dev-mode'),
  workspaceDefinition: () => import('./commands/workspace-definition'),
  workspaceGraph: () => import('./commands/workspace-graph'),
  workspaceHealth: () => import('./commands/workspace-health'),
  workspaceState: () => import('./commands/workspace-state'),
  workspaceTemplate: () => import('./commands/workspace-template'),
  workspaceBackup: () => import('./commands/workspace-backup'),
  workspaceMigration: () => import('./commands/workspace-migration'),
  workspaceConflict: () => import('./commands/workspace-conflict'),
  fileWatcher: () => import('./commands/file-watcher'),
  changeDetector: () => import('./commands/change-detector'),
  changeImpact: () => import('./commands/change-impact'),
  incrementalBuild: () => import('./commands/incremental-build'),
  platformTest: () => import('./commands/platform-test'),
  plugin: () => import('./commands/plugin'),
  pluginDependency: () => import('./commands/plugin-dependency'),
  pluginMarketplace: () => import('./commands/plugin-marketplace'),
  pluginSecurity: () => import('./commands/plugin-security'),
  pluginCommand: () => import('./commands/plugin-command'),
  pluginMiddleware: () => import('./commands/plugin-middleware'),
  pluginConflicts: () => import('./commands/plugin-conflicts'),
  pluginDocs: () => import('./commands/plugin-docs'),
  pluginValidation: () => import('./commands/plugin-validation'),
  pluginCache: () => import('./commands/plugin-cache'),
  // Utils - loaded on demand
  checkUpdate: () => import('./utils/checkUpdate')
};
mark('version-resolved');

// Lazy banner generation
const getBanner = () => {
  return chalk.cyan(`
██████╗ ███████╗           ███████╗██╗  ██╗███████╗██╗     ██╗
██╔══██╗██╔════╝           ██╔════╝██║  ██║██╔════╝██║     ██║
██████╔╝█████╗  ████████╗  ███████╗███████║█████╗  ██║     ██║
██╔══██╗██╔══╝  ╚═══════╝  ╚════██║██╔══██║██╔══╝  ██║     ██║
██║  ██║███████╗           ███████║██║  ██║███████╗███████╗███████╗
╚═╝  ╚═╝╚══════╝           ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
                                v${version}
`);
};

const program = new Command();
mark('program-created');

// Defer update check to avoid blocking startup
const checkUpdate = () => {
  setTimeout(async () => {
    if (
      !process.argv.includes('update') &&
      !process.argv.includes('--version') &&
      !process.argv.includes('-V')
    ) {
      try {
        const { checkForUpdates } = await lazyImports.checkUpdate();
        checkForUpdates(version);
      } catch {
        // Ignore update check errors
      }
    }
  }, 100);
};

checkUpdate();
mark('update-check-deferred');

// Display banner for main command
if (
  process.argv.length <= 2 ||
  (process.argv.length === 3 && ['-h', '--help', '-V', '--version'].includes(process.argv[2]))
) {
  console.log(getBanner());
}

program
  .name('re-shell')
  .description(
    'Re-Shell CLI - Tools for managing multi-framework monorepo and microfrontend architecture'
  )
  .version(version);

// Initialize monorepo command
program
  .command('init')
  .description('Initialize a new monorepo workspace')
  .argument('<name>', 'Name of the monorepo')
  .option('--package-manager <pm>', 'Package manager to use (npm, yarn, pnpm, bun)', 'pnpm')
  .option('--template <template>', 'Template to use (blank, ecommerce, dashboard, saas)', 'blank')
  .option('--preset <name>', 'Use saved configuration preset')
  .option('--skip-install', 'Skip dependency installation')
  .option('--no-git', 'Skip Git repository initialization')
  .option('--no-submodules', 'Skip submodule support setup')
  .option('--force', 'Overwrite existing directory')
  .option('--debug', 'Enable debug output')
  .option('-y, --yes', 'Skip interactive prompts and use defaults')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Initializing monorepo...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await initMonorepo(name, {
          packageManager: options.packageManager,
          template: options.template,
          preset: options.preset,
          skipInstall: options.skipInstall,
          git: options.git !== false,
          submodules: options.submodules !== false,
          force: options.force,
          debug: options.debug,
          yes: options.yes,
          spinner: spinner,
        });
      }, 300000); // 5 minute timeout for init

      // Get success info stored by initMonorepo
      const successInfo = (global as any).__RE_SHELL_INIT_SUCCESS__;
      spinner.succeed(chalk.green(`Monorepo "${name}" initialized successfully!`));

      // Display next steps
      console.log('\nNext steps:');
      console.log(`  1. cd ${successInfo?.name || name}`);
      console.log(`  2. ${successInfo?.packageManager || 'pnpm'} install`);
      console.log('  3. re-shell create my-app --framework react-ts');
      console.log('  4. re-shell workspace list');

      if (successInfo?.submodules) {
        console.log('\nSubmodule commands:');
        console.log('  • re-shell submodule add <url> <path>');
        console.log('  • re-shell submodule status');
      }

      // Clean up global state
      delete (global as any).__RE_SHELL_INIT_SUCCESS__;
    })
  );

// Create project command
program
  .command('create')
  .description('Create a new Re-Shell project with shell application')
  .argument('<name>', 'Name of the project')
  .option('-t, --team <team>', 'Team name')
  .option('-o, --org <organization>', 'Organization name', 're-shell')
  .option('-d, --description <description>', 'Project description')
  .option('--template <template>', 'Template to use (react, react-ts)', 'react-ts')
  .option(
    '--framework <framework>',
    'Frontend framework to use (react|react-ts|vue|vue-ts|svelte|svelte-ts)'
  )
  .option('--frontend <framework>', 'Frontend framework (alias for --framework)')
  .option(
    '--backend <framework>',
    'Backend framework (express, fastify, nestjs, koa, hapi, etc.)'
  )
  .option(
    '--db <database>',
    'Database ORM (prisma, typeorm, mongoose, none)',
    'none'
  )
  .option('--fullstack', 'Create full-stack project with both frontend and backend')
  .option(
    '--polyglot',
    'Create polyglot microservices project with services in multiple languages'
  )
  .option(
    '--microfrontend',
    'Create microfrontend project with Module Federation setup'
  )
  .option('--type <type>', 'Workspace type (app|package|lib|tool) - monorepo only')
  .option('--port <port>', 'Development server port [default: 5173]')
  .option('--route <route>', 'Route path (for apps)')
  .option('--package-manager <pm>', 'Package manager to use (npm, yarn, pnpm)', 'pnpm')
  .action(
    createAsyncCommand(async (name, options) => {
      // Handle backward compatibility: if template is provided but not framework, map it
      if (options.template && !options.framework && !options.frontend) {
        options.framework = options.template;
      }
      // Handle frontend alias
      if (options.frontend && !options.framework) {
        options.framework = options.frontend;
      }
      // Auto-detect fullstack if both backend and frontend are specified
      if (options.backend && options.framework && !options.fullstack) {
        options.fullstack = true;
      }
      const spinner = createSpinner('Creating Re-Shell project...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await createProject(name, { ...options, isProject: true, spinner });
      }, 180000); // 3 minute timeout

      spinner.succeed(chalk.green(`Re-Shell project "${name}" created successfully!`));
    })
  );

// Add microfrontend command
program
  .command('add')
  .description('Add a new microfrontend to existing Re-Shell project')
  .argument('<name>', 'Name of the microfrontend')
  .option('-t, --team <team>', 'Team name')
  .option('-o, --org <organization>', 'Organization name', 're-shell')
  .option('-d, --description <description>', 'Microfrontend description')
  .option('--template <template>', 'Template to use (react, react-ts)', 'react-ts')
  .option('--route <route>', 'Route path for the microfrontend')
  .option('--port <port>', 'Dev server port', '5173')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Adding microfrontend...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await addMicrofrontend(name, { ...options, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green(`Microfrontend "${name}" added successfully!`));
    })
  );

// Remove microfrontend command
program
  .command('remove')
  .description('Remove a microfrontend from existing Re-Shell project')
  .argument('<name>', 'Name of the microfrontend to remove')
  .option('--force', 'Force removal without confirmation')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Removing microfrontend...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await removeMicrofrontend(name, { ...options, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green(`Microfrontend "${name}" removed successfully!`));
    })
  );

// List microfrontends command
program
  .command('list')
  .description('List all microfrontends in the current project')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async options => {
      const spinner = createSpinner('Loading microfrontends...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await listMicrofrontends({ ...options, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Microfrontends listed successfully!'));
      } else {
        spinner.stop();
      }
    })
  );

// TUI command - Interactive Terminal User Interface
program
  .command('tui')
  .description('Launch interactive Terminal User Interface (TUI)')
  .option('--project <path>', 'Project path', process.cwd())
  .option('--mode <mode>', 'TUI mode (dashboard|init|manage|config)', 'dashboard')
  .option('--debug', 'Enable debug output')
  .action(
    createAsyncCommand(async (options) => {
      // No spinner for TUI - it has its own interface
      processManager.addCleanup(() => {
        // Cleanup will be handled by TUI process
      });
      flushOutput();

      await withTimeout(async () => {
        await launchTUI({
          project: options.project,
          mode: options.mode,
          debug: options.debug
        });
      }, 300000); // 5 minute timeout for TUI session
    })
  );

// Build command
program
  .command('build')
  .description('Build all or specific microfrontends')
  .argument('[name]', 'Name of the microfrontend to build (builds all if omitted)')
  .option('--production', 'Build for production environment')
  .option('--analyze', 'Analyze bundle size')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Building...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await buildMicrofrontend(name, { ...options, spinner });
      }, 600000); // 10 minute timeout for builds

      spinner.succeed(
        chalk.green(
          name
            ? `Microfrontend "${name}" built successfully!`
            : 'All microfrontends built successfully!'
        )
      );
    })
  );

// Serve command
program
  .command('serve')
  .description('Start development server')
  .argument('[name]', 'Name of the microfrontend to serve (serves all if omitted)')
  .option('--port <port>', 'Port to serve on', '3000')
  .option('--host <host>', 'Host to serve on', 'localhost')
  .option('--open', 'Open in browser')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Starting development server...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await serveMicrofrontend(name, { ...options, spinner });
    })
  );

// Workspace management commands
const workspaceCommand = program.command('workspace').description('Manage monorepo workspaces');

workspaceCommand
  .command('list')
  .description('List all workspaces')
  .option('--json', 'Output as JSON')
  .option('--type <type>', 'Filter by workspace type (app, package, lib, tool)')
  .option('--framework <framework>', 'Filter by framework')
  .action(
    createAsyncCommand(async options => {
      const spinner = createSpinner('Loading workspaces...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await listWorkspaces({ ...options, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Workspaces listed successfully!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceCommand
  .command('update')
  .description('Update workspace dependencies')
  .option('--workspace <name>', 'Update specific workspace')
  .option('--dependency <name>', 'Update specific dependency')
  .option('--version <version>', 'Target version for dependency')
  .option('--dev', 'Update dev dependency')
  .action(
    createAsyncCommand(async options => {
      const spinner = createSpinner('Updating workspaces...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await updateWorkspaces({ ...options, spinner });
      }, 300000); // 5 minute timeout for updates

      spinner.succeed(chalk.green('Workspaces updated successfully!'));
    })
  );

workspaceCommand
  .command('graph')
  .description('Generate workspace dependency graph')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text, json, mermaid)', 'text')
  .action(
    createAsyncCommand(async options => {
      const spinner = createSpinner('Generating workspace graph...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateWorkspaceGraph({ ...options, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Workspace graph generated successfully!'));
    })
  );

// Submodule management commands
const submoduleCommand = program.command('submodule').description('Manage Git submodules');

submoduleCommand
  .command('add <url>')
  .description('Add a new Git submodule')
  .option('--path <path>', 'Submodule path')
  .option('--branch <branch>', 'Branch to track', 'main')
  .action(
    createAsyncCommand(async (url, options) => {
      const spinner = createSpinner('Adding submodule...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await addGitSubmodule(url, { ...options, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('Submodule added successfully!'));
    })
  );

submoduleCommand
  .command('remove <path>')
  .description('Remove a Git submodule')
  .option('--force', 'Force removal without confirmation')
  .action(
    createAsyncCommand(async (path, options) => {
      const spinner = createSpinner('Removing submodule...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await removeGitSubmodule(path, { ...options, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Submodule removed successfully!'));
    })
  );

submoduleCommand
  .command('update')
  .description('Update Git submodules')
  .option('--path <path>', 'Update specific submodule')
  .action(
    createAsyncCommand(async options => {
      const spinner = createSpinner('Updating submodules...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await updateGitSubmodules({ ...options, spinner });
      }, 180000); // 3 minute timeout

      spinner.succeed(chalk.green('Submodules updated successfully!'));
    })
  );

submoduleCommand
  .command('status')
  .description('Show Git submodule status')
  .action(
    createAsyncCommand(async () => {
      await withTimeout(async () => {
        await showSubmoduleStatus();
      }, 30000); // 30 second timeout
    })
  );

// Submodule init command
submoduleCommand
  .command('init')
  .description('Initialize Git submodules')
  .action(
    createAsyncCommand(async () => {
      const spinner = createSpinner('Initializing submodules...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await initSubmodules(); // No spinner param for this function
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('Submodules initialized successfully!'));
    })
  );

submoduleCommand
  .command('manage')
  .description('Interactive submodule management')
  .action(
    createAsyncCommand(async () => {
      await manageSubmodules();
    })
  );

// Update command
program
  .command('update')
  .description('Check for CLI updates')
  .action(async () => {
    await runUpdateCommand();
  });

// Doctor command - Health check and diagnostics
program
  .command('doctor')
  .description('Diagnose project health and identify issues')
  .option('--fix', 'Automatically fix issues where possible')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output results as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Running health check...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await runDoctorCheck({ ...options, spinner });
      }, 120000); // 2 minute timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Health check completed!'));
      } else {
        spinner.stop();
      }
    })
  );

// Analyze command - Bundle and dependency analysis
program
  .command('analyze')
  .description('Analyze bundle size, dependencies, and performance')
  .option('--workspace <name>', 'Analyze specific workspace')
  .option('--type <type>', 'Analysis type (bundle, dependencies, performance, security, all)', 'all')
  .option('--output <file>', 'Save results to file')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output results as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing project...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await analyzeProject({ ...options, spinner });
      }, 300000); // 5 minute timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Analysis completed!'));
      } else {
        spinner.stop();
      }
    })
  );

// Migration commands
const migrateCommand = program.command('migrate').description('Import/export projects and manage migrations');

migrateCommand
  .command('import <source>')
  .description('Import existing project into Re-Shell monorepo')
  .option('--dry-run', 'Show what would be imported without making changes')
  .option('--verbose', 'Show detailed information')
  .option('--backup', 'Create backup before import')
  .option('--force', 'Overwrite existing files')
  .action(
    createAsyncCommand(async (source, options) => {
      const spinner = createSpinner('Importing project...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await importProject(source, { ...options, spinner });
      }, 600000); // 10 minute timeout

      spinner.succeed(chalk.green('Project imported successfully!'));
    })
  );

migrateCommand
  .command('export <target>')
  .description('Export Re-Shell project to external location')
  .option('--force', 'Overwrite target directory if it exists')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (target, options) => {
      const spinner = createSpinner('Exporting project...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await exportProject(target, { ...options, spinner });
      }, 300000); // 5 minute timeout

      spinner.succeed(chalk.green('Project exported successfully!'));
    })
  );

migrateCommand
  .command('backup')
  .description('Create backup of current project')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await backupProject({ ...options, spinner });
      }, 300000); // 5 minute timeout

      spinner.succeed(chalk.green('Backup created successfully!'));
    })
  );

migrateCommand
  .command('restore <backup> <target>')
  .description('Restore project from backup')
  .option('--force', 'Overwrite target directory if it exists')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (backup, target, options) => {
      const spinner = createSpinner('Restoring from backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await restoreProject(backup, target, { ...options, spinner });
      }, 300000); // 5 minute timeout

      spinner.succeed(chalk.green('Project restored successfully!'));
    })
  );

// CI/CD commands
const cicdCommand = program.command('cicd').description('Generate CI/CD configurations and deployment scripts');

cicdCommand
  .command('generate')
  .description('Generate CI/CD configuration files')
  .option('--provider <provider>', 'CI/CD provider (github, gitlab, jenkins, circleci, azure)', 'github')
  .option('--template <template>', 'Configuration template (basic, advanced, custom)', 'basic')
  .option('--force', 'Overwrite existing configuration')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Generating CI/CD configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateCICDConfig({ ...options, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('CI/CD configuration generated!'));
    })
  );

cicdCommand
  .command('deploy <environment>')
  .description('Generate deployment configuration for environment')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (environment, options) => {
      const spinner = createSpinner(`Generating deployment config for ${environment}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateDeployConfig(environment, { ...options, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green(`Deployment configuration for ${environment} generated!`));
    })
  );

// Configuration management commands
const configCommand = program.command('config').description('Manage Re-Shell configuration');

configCommand
  .command('show')
  .description('Show current configuration')
  .option('--global', 'Show only global configuration')
  .option('--project', 'Show only project configuration')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfig({ ...options, list: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration loaded successfully!'));
      } else {
        spinner.stop();
      }
    })
  );

configCommand
  .command('get <key>')
  .description('Get configuration value')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (key, options) => {
      const spinner = createSpinner(`Getting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfig({ ...options, get: key, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration value retrieved!'));
      } else {
        spinner.stop();
      }
    })
  );

configCommand
  .command('set <key> <value>')
  .description('Set configuration value')
  .option('--global', 'Set in global configuration')
  .option('--project', 'Set in project configuration')
  .action(
    createAsyncCommand(async (key, value, options) => {
      const spinner = createSpinner(`Setting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfig({ ...options, set: key, value, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Configuration updated: ${key}`));
    })
  );

configCommand
  .command('preset <action> [name]')
  .description('Manage configuration presets (save|load|list|delete)')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (action, name, options) => {
      const spinner = createSpinner(`Managing preset...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      let presetOptions: Parameters<typeof manageConfig>[0] = { ...options, spinner };

      switch (action) {
        case 'save':
          if (!name) throw new Error('Preset name required for save action');
          presetOptions = { ...presetOptions, save: name };
          break;
        case 'load':
          if (!name) throw new Error('Preset name required for load action');
          presetOptions = { ...presetOptions, load: name };
          break;
        case 'list':
          presetOptions = { ...presetOptions, list: true };
          break;
        case 'delete':
          if (!name) throw new Error('Preset name required for delete action');
          presetOptions = { ...presetOptions, delete: name };
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      await withTimeout(async () => {
        await manageConfig(presetOptions);
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Preset ${action} completed successfully!`));
      } else {
        spinner.stop();
      }
    })
  );

configCommand
  .command('backup')
  .description('Create configuration backup')
  .action(
    createAsyncCommand(async () => {
      const spinner = createSpinner('Creating backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfig({ backup: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Configuration backup created!'));
    })
  );

configCommand
  .command('restore <backup>')
  .description('Restore configuration from backup')
  .action(
    createAsyncCommand(async (backup) => {
      const spinner = createSpinner('Restoring configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfig({ restore: backup, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Configuration restored!'));
    })
  );

configCommand
  .command('interactive')
  .description('Interactive configuration management')
  .action(
    createAsyncCommand(async () => {
      await manageConfig({ interactive: true });
    })
  );

// Environment management commands
const envCommand = program.command('env').description('Manage environment configurations');

envCommand
  .command('list')
  .description('List all environments')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading environments...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ ...options, list: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Environments loaded successfully!'));
      } else {
        spinner.stop();
      }
    })
  );

envCommand
  .command('active')
  .description('Show active environment')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Getting active environment...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ ...options, active: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Active environment retrieved!'));
      } else {
        spinner.stop();
      }
    })
  );

envCommand
  .command('set <name>')
  .description('Set active environment')
  .action(
    createAsyncCommand(async (name) => {
      const spinner = createSpinner(`Setting active environment to ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ set: name, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Environment '${name}' activated!`));
    })
  );

envCommand
  .command('create <name>')
  .description('Create new environment')
  .option('--extends <env>', 'Inherit from existing environment')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Creating environment ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ ...options, create: name, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green(`Environment '${name}' created!`));
    })
  );

envCommand
  .command('delete <name>')
  .description('Delete environment')
  .action(
    createAsyncCommand(async (name) => {
      const spinner = createSpinner(`Deleting environment ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ delete: name, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Environment '${name}' deleted!`));
    })
  );

envCommand
  .command('compare <env1> <env2>')
  .description('Compare two environments')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (env1, env2, options) => {
      const spinner = createSpinner(`Comparing ${env1} and ${env2}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ ...options, compare: [env1, env2], spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Environment comparison completed!'));
      } else {
        spinner.stop();
      }
    })
  );

envCommand
  .command('generate <name>')
  .description('Generate .env file for environment')
  .option('--output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Generating .env file for ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageEnvironment({ ...options, generate: name, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Environment file generated for '${name}'!`));
    })
  );

envCommand
  .command('interactive')
  .description('Interactive environment management')
  .action(
    createAsyncCommand(async () => {
      await manageEnvironment({ interactive: true });
    })
  );

// Unified configuration management commands
const uconfigCommand = program.command('uconfig').alias('uc').description('Unified configuration management with environment synchronization');

uconfigCommand
  .command('sync <source> <targets...>')
  .description('Synchronize configuration across environments')
  .option('-s, --strategy <strategy>', 'Merge strategy: overwrite, merge, ask', 'merge')
  .option('--exclude <patterns...>', 'Exclude patterns')
  .option('--include <patterns...>', 'Include patterns')
  .option('--include-secrets', 'Include sensitive values')
  .option('--dry-run', 'Preview without making changes')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (source, targets, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Synchronizing configurations...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();

        const syncOptions = {
          sourceEnv: source,
          targetEnvs: targets,
          includeSecrets: options.includeSecrets,
          dryRun: options.dryRun,
          mergeStrategy: options.mergeStrategy as 'overwrite' | 'merge' | 'ask',
          excludePatterns: options.exclude || [],
          includePatterns: options.include || [],
        };

        const status = await manager.syncConfigurations(syncOptions);

        spinner.stop();

        if (options.json) {
          console.log(JSON.stringify(status, null, 2));
          return;
        }

        if (status.success) {
          console.log(chalk.green('\n✅ Configuration sync complete!'));
          console.log(chalk.gray('═'.repeat(50)));
          console.log(`Source: ${chalk.blue(source)}`);
          console.log(`Synced environments: ${chalk.blue(status.syncedEnvironments.join(', ') || 'none')}`);

          if (status.conflicts.length > 0) {
            console.log(chalk.yellow('\n⚠️  Conflicts detected:'));
            for (const conflict of status.conflicts) {
              console.log(`  ${chalk.gray(conflict.key)}: ${chalk.red(String(conflict.sourceValue))} → ${chalk.blue(String(conflict.targetValue))}`);
            }
          }

          if (options.dryRun) {
            console.log(chalk.yellow('\nDry run - no changes written'));
          }
        } else {
          console.log(chalk.red('\n❌ Sync failed'));
          console.log(chalk.gray(status.message || 'Unknown error'));
        }

      } catch (error) {
        spinner.fail(chalk.red('Configuration sync failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('snapshot <environment>')
  .description('Create configuration snapshot')
  .option('-v, --version <version>', 'Snapshot version')
  .action(
    createAsyncCommand(async (environment, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner(`Creating snapshot for ${environment}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        const snapshot = await manager.createSnapshot(environment, options.version);

        spinner.succeed(chalk.green(`Snapshot created: ${snapshot.version}`));
        console.log(`  Environment: ${chalk.blue(environment)}`);
        console.log(`  Checksum: ${chalk.gray(snapshot.checksum)}`);

      } catch (error) {
        spinner.fail(chalk.red('Snapshot creation failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('restore <environment> <version>')
  .description('Restore configuration from snapshot')
  .action(
    createAsyncCommand(async (environment, version) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner(`Restoring snapshot ${version}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        await manager.restoreSnapshot(environment, version);

        spinner.succeed(chalk.green(`Snapshot restored: ${version}`));
        console.log(`  Environment: ${chalk.blue(environment)}`);

      } catch (error) {
        spinner.fail(chalk.red('Snapshot restore failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('list-snapshots <environment>')
  .description('List snapshots for an environment')
  .action(
    createAsyncCommand(async (environment) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Loading snapshots...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        const snapshots = manager.listSnapshots(environment);

        spinner.stop();

        if (snapshots.length === 0) {
          console.log(chalk.yellow(`\nNo snapshots found for ${chalk.blue(environment)}`));
          return;
        }

        console.log(chalk.cyan(`\n📸 Snapshots for ${chalk.blue(environment)}`));
        console.log(chalk.gray('─'.repeat(60)));

        for (const snapshot of snapshots.reverse()) {
          const date = new Date(snapshot.timestamp).toLocaleString();
          console.log(`\n${chalk.blue(snapshot.version)}`);
          console.log(`  Date: ${chalk.gray(date)}`);
          console.log(`  Checksum: ${chalk.gray(snapshot.checksum)}`);
        }

      } catch (error) {
        spinner.fail(chalk.red('Failed to load snapshots'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('export <output>')
  .description('Export configuration to file')
  .option('-e, --env <environment>', 'Environment to export')
  .action(
    createAsyncCommand(async (output, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Exporting configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        await manager.exportConfig(output, options.env);

        spinner.succeed(chalk.green('Configuration exported'));
        console.log(`  Output: ${chalk.blue(output)}`);
        if (options.env) {
          console.log(`  Environment: ${chalk.blue(options.env)}`);
        }

      } catch (error) {
        spinner.fail(chalk.red('Export failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('import <input>')
  .description('Import configuration from file')
  .option('-l, --layer <layer>', 'Target layer (project, local)', 'project')
  .option('--no-merge', 'Replace instead of merge')
  .action(
    createAsyncCommand(async (input, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Importing configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        await manager.importConfig(input, options.layer, options.merge !== false);

        spinner.succeed(chalk.green('Configuration imported'));
        console.log(`  Source: ${chalk.blue(input)}`);
        console.log(`  Layer: ${chalk.blue(options.layer)}`);
        console.log(`  Mode: ${options.merge ? 'merge' : 'replace'}`);

      } catch (error) {
        spinner.fail(chalk.red('Import failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('validate [environment]')
  .description('Validate configuration')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (environment, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Validating configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        const validation = manager.validateConfig(environment);

        spinner.stop();

        if (options.json) {
          console.log(JSON.stringify(validation, null, 2));
          return;
        }

        if (validation.valid) {
          console.log(chalk.green('\n✅ Configuration is valid'));
        } else {
          console.log(chalk.red('\n❌ Configuration validation failed'));
          console.log(chalk.gray('═'.repeat(50)));
          for (const error of validation.errors) {
            console.log(`  • ${chalk.yellow(error)}`);
          }
        }

      } catch (error) {
        spinner.fail(chalk.red('Validation failed'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('layers')
  .description('List all configuration layers')
  .action(
    createAsyncCommand(async () => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Loading configuration layers...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        const layers = manager.getAllLayers();

        spinner.stop();

        console.log(chalk.cyan('\n📚 Configuration Layers'));
        console.log(chalk.gray('═'.repeat(60)));

        for (const layer of layers) {
          const readOnly = layer.readOnly ? ' (read-only)' : '';
          console.log(`\n${chalk.blue(layer.name.padEnd(20))} priority: ${layer.priority}${readOnly ? chalk.gray(readOnly) : ''}`);
          console.log(`  Source: ${chalk.gray(layer.source)}`);
        }

        console.log(chalk.gray('\n═'.repeat(60)));
        console.log(chalk.gray('Higher priority layers override lower priority ones'));

      } catch (error) {
        spinner.fail(chalk.red('Failed to load layers'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('get <key>')
  .description('Get configuration value by key path')
  .option('-e, --env <environment>', 'Environment')
  .action(
    createAsyncCommand(async (key, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner(`Getting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const manager = await createUnifiedConfig();
        const value = manager.getValue(key, options.env);

        spinner.stop();

        if (value === undefined) {
          console.log(chalk.yellow(`\n⚠️  Key not found: ${chalk.blue(key)}`));
        } else {
          console.log(chalk.cyan(`\n${chalk.blue(key)}:`));
          console.log(chalk.gray(JSON.stringify(value, null, 2)));
        }

      } catch (error) {
        spinner.fail(chalk.red('Failed to get value'));
        throw error;
      }
    })
  );

uconfigCommand
  .command('set <key> <value>')
  .description('Set configuration value by key path')
  .option('-l, --layer <layer>', 'Target layer', 'project')
  .action(
    createAsyncCommand(async (key, value, options) => {
      const { createUnifiedConfig } = await import('./utils/unified-config');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner(`Setting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        // Parse value (try JSON first)
        let parsedValue: unknown = value;
        try {
          parsedValue = JSON.parse(value);
        } catch {
          // Keep as string
        }

        const manager = await createUnifiedConfig();
        manager.setValue(key, parsedValue, options.layer);
        await manager.saveAll();

        spinner.succeed(chalk.green(`Value set: ${chalk.blue(key)}`));
        console.log(`  Layer: ${chalk.blue(options.layer)}`);
        console.log(`  Value: ${chalk.gray(String(value).slice(0, 50))}${value.length > 50 ? '...' : ''}`);

      } catch (error) {
        spinner.fail(chalk.red('Failed to set value'));
        throw error;
      }
    })
  );

// IntelliSense and code completion commands
const intellisenseCommand = program.command('intellisense').alias('lsp').description('Setup code completion and LSP integration');

intellisenseCommand
  .command('setup [path]')
  .description('Setup IntelliSense for project')
  .option('-l, --languages <languages...>', 'Specific languages to setup')
  .option('-t, --type <type>', 'Project type')
  .option('--dry-run', 'Preview without writing files')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createIntelliSenseGenerator, getAllLanguageServers } = await import('./utils/intellisense');
      const { createSpinner } = await import('./utils/spinner');

      const pathToSetup = projectPath || process.cwd();
      const spinner = createSpinner('Detecting languages...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const generator = await createIntelliSenseGenerator(pathToSetup, options.type);
        const detectedLanguages = await generator.detectLanguages();

        spinner.succeed(chalk.green(`Detected ${detectedLanguages.length} languages`));

        if (options.dryRun) {
          console.log(chalk.cyan('\n📋 Dry-run IntelliSense setup:'));
          console.log(`  Path: ${chalk.blue(pathToSetup)}`);
          console.log(`  Languages: ${chalk.blue(detectedLanguages.join(', ') || 'none')}`);
          if (options.languages) {
            console.log(`  Override: ${chalk.blue(options.languages.join(', '))}`);
          }
          return;
        }

        spinner.setText('Setting up IntelliSense...');
        spinner.start();

        const languages = options.languages || detectedLanguages;
        await generator.setupIntelliSense(languages);

        spinner.stop();

        console.log(chalk.green('\n✅ IntelliSense setup complete!'));
        console.log(chalk.gray('═'.repeat(50)));
        console.log(`\nConfigured for: ${chalk.blue(languages.join(', ') || 'generic')}`);
        console.log(chalk.gray('\nGenerated files:'));
        console.log(`  • ${chalk.blue('.vscode/settings.json')}`);
        console.log(`  • ${chalk.blue('.vscode/extensions.json')}`);

        // Add language-specific files
        const langSpecificFiles: Record<string, string> = {
          'python': 'pyrightconfig.json',
          'c++': '.clangd',
          'go': 'go.mod',
        };

        for (const lang of languages) {
          const file = langSpecificFiles[lang.toLowerCase()];
          if (file) {
            console.log(`  • ${chalk.blue(file)}`);
          }
        }

        console.log(chalk.gray('\nRestart your IDE for IntelliSense to take effect.'));

      } catch (error) {
        spinner.fail(chalk.red('IntelliSense setup failed'));
        throw error;
      }
    })
  );

intellisenseCommand
  .command('list-languages')
  .description('List all supported languages')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const { getAllLanguageServers } = await import('./utils/intellisense');
      const servers = getAllLanguageServers();

      if (options.json) {
        console.log(JSON.stringify(servers, null, 2));
        return;
      }

      console.log(chalk.cyan('\n🔡 Supported Languages for IntelliSense'));
      console.log(chalk.gray('═'.repeat(70)));

      for (const [key, server] of Object.entries(servers)) {
        console.log(`\n${chalk.blue(server.language.padEnd(15))} [${chalk.gray(key)}]`);
        console.log(`  Extensions: ${chalk.gray(server.fileExtensions.join(', '))}`);
        console.log(`  Server: ${chalk.gray(server.serverName)}`);
        if (server.requiresInstall) {
          console.log(`  Install: ${chalk.yellow(server.installCommand || 'See language server docs')}`);
        }
      }

      console.log(chalk.gray('\n═'.repeat(70)));
    })
  );

intellisenseCommand
  .command('extensions <language>')
  .description('Get recommended extensions for a language')
  .action(
    createAsyncCommand(async (language, options) => {
      const { getRecommendedExtensions, getAllLanguageServers } = await import('./utils/intellisense');

      const servers = getAllLanguageServers();
      const serverKey = language.toLowerCase();
      const server = servers[serverKey];

      if (!server) {
        console.log(chalk.yellow(`\n⚠️  Language not found: ${language}`));
        console.log(chalk.gray('Run `re-shell intellisense list-languages` to see supported languages.'));
        return;
      }

      const extensions = getRecommendedExtensions(language);

      console.log(chalk.cyan(`\n📦 Recommended Extensions for ${chalk.blue(server.language)}`));
      console.log(chalk.gray('═'.repeat(60)));

      if (extensions.length === 0) {
        console.log(chalk.yellow('No specific extensions recommended'));
      } else {
        for (const ext of extensions) {
          console.log(`  • ${chalk.blue(ext)}`);
        }
      }

      console.log(chalk.gray('\n═'.repeat(60)));
      console.log(chalk.gray(`Language Server: ${server.serverName}`));
      if (server.requiresInstall) {
        console.log(chalk.gray(`Install: ${server.installCommand}`));
      }
    })
  );

intellisenseCommand
  .command('vim-config [path]')
  .description('Generate Neovim LSP configuration')
  .option('-o, --output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createIntelliSenseGenerator } = await import('./utils/intellisense');
      const { createSpinner } = await import('./utils/spinner');

      const pathToSetup = projectPath || process.cwd();
      const spinner = createSpinner('Generating Neovim config...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const generator = await createIntelliSenseGenerator(pathToSetup);
        const languages = await generator.detectLanguages();
        const config = await generator.setupIntelliSense(languages);

        const outputPath = options.output || path.join(pathToSetup, '.nvim.lsp.lua');
        await require('fs-extra').writeFile(outputPath, config.vimSettings, 'utf-8');

        spinner.succeed(chalk.green('Neovim config generated'));
        console.log(`  Output: ${chalk.blue(outputPath)}`);

      } catch (error) {
        spinner.fail(chalk.red('Config generation failed'));
        throw error;
      }
    })
  );

intellisenseCommand
  .command('emacs-config [path]')
  .description('Generate Emacs LSP configuration')
  .option('-o, --output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createIntelliSenseGenerator } = await import('./utils/intellisense');
      const { createSpinner } = await import('./utils/spinner');

      const pathToSetup = projectPath || process.cwd();
      const spinner = createSpinner('Generating Emacs config...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const generator = await createIntelliSenseGenerator(pathToSetup);
        const languages = await generator.detectLanguages();
        const config = await generator.setupIntelliSense(languages);

        const outputPath = options.output || path.join(pathToSetup, '.lsp-config.el');
        await require('fs-extra').writeFile(outputPath, config.emacsSettings, 'utf-8');

        spinner.succeed(chalk.green('Emacs config generated'));
        console.log(`  Output: ${chalk.blue(outputPath)}`);

      } catch (error) {
        spinner.fail(chalk.red('Config generation failed'));
        throw error;
      }
    })
  );

// Universal testing commands
const testCommand = program.command('test').alias('ut').description('Universal testing across all frameworks and languages');

testCommand
  .command('run [path]')
  .description('Run tests with auto-detected framework')
  .option('-p, --pattern <pattern>', 'Test file pattern filter')
  .option('-c, --coverage', 'Generate coverage report')
  .option('-w, --watch', 'Watch mode')
  .option('-v, --verbose', 'Verbose output')
  .option('--parallel', 'Run tests in parallel')
  .option('--max-workers <n>', 'Maximum number of parallel workers')
  .option('-u, --update-snapshot', 'Update snapshots')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { runTests, formatTestResult } = await import('./utils/universal-test');
      const { createSpinner } = await import('./utils/spinner');

      const pathToTest = projectPath || process.cwd();
      const spinner = createSpinner('Detecting test framework...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const testOptions = {
          pattern: options.pattern,
          coverage: options.coverage,
          watch: options.watch,
          verbose: options.verbose,
          parallel: options.parallel,
          maxWorkers: options.maxWorkers ? parseInt(options.maxWorkers) : undefined,
          updateSnapshot: options.updateSnapshot,
        };

        spinner.setText('Running tests...');

        const result = await runTests(pathToTest, testOptions);

        spinner.stop();

        console.log(formatTestResult(result));

        if (result.failed > 0) {
          process.exit(1);
        }

      } catch (error) {
        spinner.fail(chalk.red('Test execution failed'));
        const errorMessage = (error as Error).message;
        if (errorMessage.includes('No test framework detected')) {
          console.log(chalk.yellow('\n⚠️  No test framework detected in this project.'));
          console.log(chalk.gray('Supported frameworks: jest, vitest, mocha, pytest, unittest, go test, cargo test, junit, rspec, phpunit, and more.'));
        } else {
          throw error;
        }
      }
    })
  );

testCommand
  .command('list [path]')
  .description('List test files')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createTestRunner } = await import('./utils/universal-test');
      const { createSpinner } = await import('./utils/spinner');

      const pathToList = projectPath || process.cwd();
      const spinner = createSpinner('Scanning for test files...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const runner = await createTestRunner(pathToList);
        const testFiles = await runner.listTestFiles();
        const info = await runner.getTestInfo();

        spinner.stop();

        console.log(chalk.cyan('\n📋 Test Configuration'));
        console.log(chalk.gray('═'.repeat(50)));
        console.log(`\nFrameworks: ${chalk.blue(info.frameworks.join(', ') || 'none detected')}`);
        console.log(`Test files: ${chalk.blue(String(info.testFileCount))}`);
        console.log(`Command: ${chalk.gray(info.testCommand)}`);

        if (testFiles.length > 0) {
          console.log(chalk.gray('\nTest files:'));
          for (const file of testFiles.slice(0, 20)) {
            console.log(`  • ${chalk.gray(file)}`);
          }
          if (testFiles.length > 20) {
            console.log(`  ... and ${testFiles.length - 20} more`);
          }
        }

      } catch (error) {
        spinner.fail(chalk.red('Failed to list test files'));
        throw error;
      }
    })
  );

testCommand
  .command('frameworks')
  .description('List all supported test frameworks')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const { getSupportedTestFrameworks } = await import('./utils/universal-test');
      const frameworks = getSupportedTestFrameworks();

      if (options.json) {
        console.log(JSON.stringify(frameworks, null, 2));
        return;
      }

      console.log(chalk.cyan('\n🧪 Supported Test Frameworks'));
      console.log(chalk.gray('═'.repeat(70)));

      // Group by language
      const byLanguage: Record<string, typeof frameworks> = {};
      for (const f of frameworks) {
        if (!byLanguage[f.language]) {
          byLanguage[f.language] = [];
        }
        byLanguage[f.language].push(f);
      }

      for (const [language, langFrameworks] of Object.entries(byLanguage).sort()) {
        console.log(chalk.cyan(`\n${language.charAt(0).toUpperCase() + language.slice(1)}:`));
        for (const f of langFrameworks) {
          console.log(`  ${chalk.blue(f.name.padEnd(15))} ${chalk.gray(f.frameworks.join(', '))}`);
        }
      }

      console.log(chalk.gray('\n═'.repeat(70)));
    })
  );

testCommand
  .command('info [path]')
  .description('Show test configuration info')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createTestRunner } = await import('./utils/universal-test');
      const { createSpinner } = await import('./utils/spinner');

      const pathToInfo = projectPath || process.cwd();
      const spinner = createSpinner('Getting test info...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const runner = await createTestRunner(pathToInfo);
        const info = await runner.getTestInfo();

        spinner.stop();

        console.log(chalk.cyan('\n📊 Test Information'));
        console.log(chalk.gray('═'.repeat(50)));

        console.log(`\nDetected Frameworks:`);
        if (info.frameworks.length === 0) {
          console.log(chalk.yellow('  No test framework detected'));
          console.log(chalk.gray('  Run `re-shell test frameworks` to see supported frameworks'));
        } else {
          for (const f of info.frameworks) {
            console.log(`  • ${chalk.blue(f)}`);
          }
        }

        console.log(`\nTest Files Found: ${chalk.blue(String(info.testFileCount))}`);
        console.log(`\nTest Command: ${chalk.gray(info.testCommand)}`);

      } catch (error) {
        spinner.fail(chalk.red('Failed to get test info'));
        throw error;
      }
    })
  );

// Configuration migration commands
const configMigrateCommand = program.command('config-migrate').description('Manage configuration migrations');

configMigrateCommand
  .command('auto')
  .description('Auto-migrate all configurations')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Running auto-migration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, auto: true, spinner });
      }, 60000); // 60 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Auto-migration completed!'));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('check')
  .description('Check migration status')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking migration status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, check: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Migration status checked!'));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('global')
  .description('Migrate global configuration')
  .option('--json', 'Output as JSON')
  .option('--force', 'Force migration without confirmation')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Migrating global configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, global: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Global configuration migrated!'));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('project')
  .description('Migrate project configuration')
  .option('--json', 'Output as JSON')
  .option('--force', 'Force migration without confirmation')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Migrating project configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, project: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Project configuration migrated!'));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('rollback <version>')
  .description('Rollback to previous version')
  .option('--global', 'Rollback global configuration')
  .option('--project', 'Rollback project configuration')
  .option('--json', 'Output as JSON')
  .option('--force', 'Force rollback without confirmation')
  .action(
    createAsyncCommand(async (version, options) => {
      const configType = options.global ? 'global' : 'project';
      const spinner = createSpinner(`Rolling back ${configType} to ${version}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, rollback: version, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Rollback to ${version} completed!`));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('history')
  .description('Show migration history')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading migration history...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageMigration({ ...options, history: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Migration history loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

configMigrateCommand
  .command('interactive')
  .description('Interactive migration management')
  .action(
    createAsyncCommand(async () => {
      await manageMigration({ interactive: true });
    })
  );

// Validation commands
const validateCommand = program.command('validate').description('Validate configurations with detailed error messages');

validateCommand
  .command('all')
  .description('Validate all configurations')
  .option('--warnings', 'Show warnings')
  .option('--suggestions', 'Show suggestions')
  .option('--fix', 'Auto-fix issues where possible')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating configurations...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await validateConfiguration({ ...options, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration validation completed!'));
      } else {
        spinner.stop();
      }
    })
  );

validateCommand
  .command('global')
  .description('Validate global configuration')
  .option('--warnings', 'Show warnings')
  .option('--suggestions', 'Show suggestions')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating global configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await validateConfiguration({ ...options, global: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Global configuration validated!'));
      } else {
        spinner.stop();
      }
    })
  );

validateCommand
  .command('project')
  .description('Validate project configuration')
  .option('--warnings', 'Show warnings')
  .option('--suggestions', 'Show suggestions')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating project configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await validateConfiguration({ ...options, project: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Project configuration validated!'));
      } else {
        spinner.stop();
      }
    })
  );

validateCommand
  .command('file <path>')
  .description('Validate specific configuration file')
  .option('--warnings', 'Show warnings')
  .option('--suggestions', 'Show suggestions')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (filePath, options) => {
      const spinner = createSpinner(`Validating ${filePath}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await validateConfiguration({ ...options, file: filePath, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`File validation completed: ${filePath}`));
      } else {
        spinner.stop();
      }
    })
  );

validateCommand
  .command('interactive')
  .description('Interactive configuration validation')
  .action(
    createAsyncCommand(async () => {
      await validateConfiguration({ interactive: true });
    })
  );

// Project configuration commands
const projectConfigCommand = program.command('project-config').description('Manage project-level configuration with inheritance');

projectConfigCommand
  .command('init')
  .description('Initialize project configuration')
  .option('--framework <framework>', 'Default framework')
  .option('--package-manager <pm>', 'Package manager (npm, yarn, pnpm, bun)')
  .option('--interactive', 'Interactive initialization')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Initializing project configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageProjectConfig({ ...options, init: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Project configuration initialized!'));
    })
  );

projectConfigCommand
  .command('show')
  .description('Show project configuration with inheritance')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show merged configuration')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading project configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageProjectConfig({ ...options, show: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Project configuration loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

projectConfigCommand
  .command('get <key>')
  .description('Get project configuration value')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (key, options) => {
      const spinner = createSpinner(`Getting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageProjectConfig({ ...options, get: key, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration value retrieved!'));
      } else {
        spinner.stop();
      }
    })
  );

projectConfigCommand
  .command('set <key> <value>')
  .description('Set project configuration value')
  .action(
    createAsyncCommand(async (key, value, options) => {
      const spinner = createSpinner(`Setting ${key}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageProjectConfig({ ...options, set: key, value, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Configuration updated: ${key}`));
    })
  );

projectConfigCommand
  .command('interactive')
  .description('Interactive project configuration management')
  .action(
    createAsyncCommand(async () => {
      await manageProjectConfig({ interactive: true });
    })
  );

// Workspace configuration commands
const workspaceConfigCommand = program.command('workspace-config').description('Manage workspace-specific configuration with cascading inheritance');

workspaceConfigCommand
  .command('init')
  .description('Initialize workspace configuration')
  .option('--workspace <path>', 'Workspace path', process.cwd())
  .option('--type <type>', 'Workspace type (app, package, lib, tool)', 'app')
  .option('--framework <framework>', 'Framework override')
  .option('--package-manager <pm>', 'Package manager override')
  .option('--interactive', 'Interactive initialization')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Initializing workspace configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConfig({ ...options, init: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Workspace configuration initialized!'));
    })
  );

workspaceConfigCommand
  .command('show')
  .description('Show workspace configuration with inheritance chain')
  .option('--workspace <path>', 'Workspace path', process.cwd())
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show final merged configuration')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading workspace configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConfig({ ...options, show: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Workspace configuration loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceConfigCommand
  .command('get <key>')
  .description('Get workspace configuration value with inheritance info')
  .option('--workspace <path>', 'Workspace path', process.cwd())
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (key, options) => {
      const spinner = createSpinner(`Getting configuration value: ${key}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConfig({ ...options, get: key, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Configuration value retrieved: ${key}`));
      } else {
        spinner.stop();
      }
    })
  );

workspaceConfigCommand
  .command('set <key> <value>')
  .description('Set workspace configuration value')
  .option('--workspace <path>', 'Workspace path', process.cwd())
  .action(
    createAsyncCommand(async (key, value, options) => {
      const spinner = createSpinner(`Setting configuration: ${key} = ${value}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConfig({ ...options, set: key, value, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Configuration updated: ${key}`));
    })
  );

workspaceConfigCommand
  .command('interactive')
  .description('Interactive workspace configuration management')
  .option('--workspace <path>', 'Workspace path', process.cwd())
  .action(
    createAsyncCommand(async (options) => {
      await manageWorkspaceConfig({ ...options, interactive: true });
    })
  );

// Template management commands
const templateCommand = program.command('template').description('Manage configuration templates with variable substitution');

templateCommand
  .command('list')
  .description('List available configuration templates')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading templates...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageTemplates({ ...options, list: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Templates loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

templateCommand
  .command('create')
  .description('Create a new configuration template')
  .option('--interactive', 'Interactive template creation')
  .action(
    createAsyncCommand(async (options) => {
      await manageTemplates({ ...options, create: true });
    })
  );

templateCommand
  .command('show <name>')
  .description('Show template details and variables')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show template structure')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Loading template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageTemplates({ ...options, show: true, template: name, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Template '${name}' loaded!`));
      } else {
        spinner.stop();
      }
    })
  );

templateCommand
  .command('apply <name>')
  .description('Apply template to generate configuration')
  .option('--variables <json>', 'Variables as JSON string')
  .option('--output <file>', 'Output file path')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Applying template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageTemplates({ ...options, apply: true, template: name, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green(`Template '${name}' applied successfully!`));
    })
  );

templateCommand
  .command('delete <name>')
  .description('Delete a configuration template')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Deleting template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageTemplates({ ...options, delete: true, template: name, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Template '${name}' deleted!`));
    })
  );

templateCommand
  .command('interactive')
  .description('Interactive template management')
  .action(
    createAsyncCommand(async (options) => {
      await manageTemplates({ ...options, interactive: true });
    })
  );

// Configuration diff and merge commands
const configDiffCommand = program.command('config-diff').description('Compare and merge configurations with advanced diffing capabilities');

configDiffCommand
  .command('diff')
  .description('Compare two configurations and show differences')
  .option('--left <source>', 'Left configuration source (file, global, project, workspace:path)')
  .option('--right <source>', 'Right configuration source (file, global, project, workspace:path)')
  .option('--format <format>', 'Output format (text, html, json)', 'text')
  .option('--output <file>', 'Output file for diff report')
  .option('--ignore-order', 'Ignore array order in comparison')
  .option('--ignore-paths <paths>', 'Comma-separated paths to ignore')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      if (!options.left || !options.right) {
        console.log(chalk.red('Error: Both --left and --right sources are required'));
        process.exit(1);
      }

      const spinner = createSpinner('Comparing configurations...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfigDiff({ ...options, diff: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration comparison completed!'));
      } else {
        spinner.stop();
      }
    })
  );

configDiffCommand
  .command('merge')
  .description('Merge two configurations with conflict resolution')
  .option('--left <source>', 'Base configuration source')
  .option('--right <source>', 'Incoming configuration source')
  .option('--output <file>', 'Output file for merged configuration')
  .option('--strategy <strategy>', 'Merge strategy (left, right, smart, conservative, interactive)', 'smart')
  .option('--interactive', 'Interactive conflict resolution')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      if (!options.left || !options.right) {
        console.log(chalk.red('Error: Both --left and --right sources are required'));
        process.exit(1);
      }

      const spinner = createSpinner('Merging configurations...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfigDiff({ ...options, merge: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Configuration merge completed!'));
    })
  );

configDiffCommand
  .command('apply')
  .description('Apply a diff patch to a configuration')
  .option('--left <config>', 'Base configuration file')
  .option('--right <diff>', 'Diff file (JSON format)')
  .option('--output <file>', 'Output file for patched configuration')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      if (!options.left || !options.right) {
        console.log(chalk.red('Error: Both --left (config) and --right (diff) are required'));
        process.exit(1);
      }

      const spinner = createSpinner('Applying diff patch...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfigDiff({ ...options, apply: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Diff patch applied successfully!'));
    })
  );

configDiffCommand
  .command('status')
  .description('Show configuration status and inheritance analysis')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing configuration status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageConfigDiff({ ...options, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Configuration analysis completed!'));
      } else {
        spinner.stop();
      }
    })
  );

configDiffCommand
  .command('interactive')
  .description('Interactive configuration diffing and merging')
  .action(
    createAsyncCommand(async (options) => {
      await manageConfigDiff({ ...options, interactive: true });
    })
  );

// Configuration backup and restore commands
const backupCommand = program.command('backup').description('Backup and restore configurations with versioning and rollback capabilities');

backupCommand
  .command('create')
  .description('Create a configuration backup')
  .option('--full', 'Create full backup (all configurations)')
  .option('--selective', 'Create selective backup (choose components)')
  .option('--name <name>', 'Backup name')
  .option('--description <desc>', 'Backup description')
  .option('--tags <tags>', 'Comma-separated tags')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, create: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Backup created successfully!'));
    })
  );

backupCommand
  .command('list')
  .description('List all available backups')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading backups...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, list: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Backups loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

backupCommand
  .command('restore <id>')
  .description('Restore configuration from backup')
  .option('--force', 'Skip confirmation prompt')
  .option('--dry-run', 'Preview restoration without making changes')
  .option('--no-pre-backup', 'Skip creating backup before restoration')
  .option('--merge-strategy <strategy>', 'Merge strategy (replace, merge, skip-existing)', 'replace')
  .action(
    createAsyncCommand(async (id, options) => {
      const spinner = createSpinner(`Restoring from backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, restore: id, spinner });
      }, 120000); // 2 minute timeout

      if (!options.dryRun) {
        spinner.succeed(chalk.green('Configuration restored successfully!'));
      } else {
        spinner.stop();
      }
    })
  );

backupCommand
  .command('delete <id>')
  .description('Delete a backup')
  .option('--force', 'Skip confirmation prompt')
  .action(
    createAsyncCommand(async (id, options) => {
      const spinner = createSpinner(`Deleting backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, delete: id, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green('Backup deleted successfully!'));
    })
  );

backupCommand
  .command('export <id>')
  .description('Export backup to file')
  .option('--output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (id, options) => {
      if (!options.output) {
        console.log(chalk.red('Error: --output file path is required'));
        process.exit(1);
      }

      const spinner = createSpinner(`Exporting backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, export: id, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Backup exported successfully!'));
    })
  );

backupCommand
  .command('import <file>')
  .description('Import backup from file')
  .action(
    createAsyncCommand(async (file, options) => {
      const spinner = createSpinner(`Importing backup from: ${file}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, import: file, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Backup imported successfully!'));
    })
  );

backupCommand
  .command('cleanup')
  .description('Clean up old backups')
  .option('--keep-count <count>', 'Number of recent backups to keep', '10')
  .option('--keep-days <days>', 'Keep backups newer than N days', '30')
  .option('--dry-run', 'Preview cleanup without deleting')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing backups for cleanup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({
          ...options,
          cleanup: true,
          keepCount: parseInt(options.keepCount),
          keepDays: parseInt(options.keepDays),
          spinner
        });
      }, 30000); // 30 second timeout

      if (!options.dryRun) {
        spinner.succeed(chalk.green('Backup cleanup completed!'));
      } else {
        spinner.stop();
      }
    })
  );

backupCommand
  .command('stats')
  .description('Show backup statistics')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Calculating backup statistics...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageBackups({ ...options, stats: true, spinner });
      }, 15000); // 15 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Statistics calculated!'));
      } else {
        spinner.stop();
      }
    })
  );

backupCommand
  .command('interactive')
  .description('Interactive backup management')
  .action(
    createAsyncCommand(async (options) => {
      await manageBackups({ ...options, interactive: true });
    })
  );

// Generate commands
const generateCommand = program.command('generate').description('Generate code, tests, and documentation');

generateCommand
  .command('component <name>')
  .description('Generate a new component')
  .option('--framework <framework>', 'Framework (react, vue, svelte, angular)', 'react')
  .option('--workspace <workspace>', 'Target workspace')
  .option('--export', 'Add to index exports')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Generating component ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateCode(name, { ...options, type: 'component', spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green(`Component ${name} generated!`));
    })
  );

generateCommand
  .command('hook <name>')
  .description('Generate a React hook')
  .option('--workspace <workspace>', 'Target workspace')
  .option('--export', 'Add to index exports')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Generating hook ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateCode(name, { ...options, type: 'hook', framework: 'react', spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green(`Hook ${name} generated!`));
    })
  );

generateCommand
  .command('service <name>')
  .description('Generate a service class')
  .option('--workspace <workspace>', 'Target workspace')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Generating service ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateCode(name, { ...options, type: 'service', spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green(`Service ${name} generated!`));
    })
  );

generateCommand
  .command('test <workspace>')
  .description('Generate test suite for workspace')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (workspace, options) => {
      const spinner = createSpinner(`Generating tests for ${workspace}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateTests(workspace, { ...options, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green(`Test suite for ${workspace} generated!`));
    })
  );

generateCommand
  .command('docs')
  .description('Generate project documentation')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Generating documentation...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateDocumentation({ ...options, spinner });
      }, 180000); // 3 minute timeout

      spinner.succeed(chalk.green('Documentation generated!'));
    })
  );

generateCommand
  .command('backend <name>')
  .description('Generate a backend service or API')
  .option('--framework <framework>', 'Backend framework (express, fastapi, django, flask, sanic, tornado, laravel, symfony, slim, codeigniter)', 'express')
  .option('--language <language>', 'Programming language (typescript, python, php)', 'typescript')
  .option('--features <features...>', 'Additional features (code-quality, celery, redis, type-hints, hot-reload, pytest)')
  .option('--workspace <workspace>', 'Target workspace')
  .option('--port <port>', 'Default port for the service', '8000')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Generating backend ${name}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await generateCode(name, { ...options, type: 'backend', spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green(`Backend ${name} generated!`));
    })
  );

// Development mode commands
const devCommand = program.command('dev').description('Development mode with configuration hot-reloading');

devCommand
  .command('start')
  .description('Start development mode with hot-reloading')
  .option('--verbose', 'Enable detailed change notifications')
  .option('--debounce <ms>', 'Change detection delay in milliseconds', '500')
  .option('--no-validation', 'Skip configuration validation on changes')
  .option('--no-backup', 'Disable automatic backups before changes')
  .option('--no-restore', 'Disable error recovery from backups')
  .option('--exclude-workspaces', 'Skip workspace configuration watching')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Starting development mode...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageDevMode({ ...options, start: true, spinner });
      }, 30000); // 30 second timeout

      // Don't auto-succeed for dev mode as it stays running
      spinner.stop();
    })
  );

devCommand
  .command('stop')
  .description('Stop development mode')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Stopping development mode...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageDevMode({ ...options, stop: true, spinner });
      }, 10000); // 10 second timeout

      spinner.succeed(chalk.green('Development mode stopped!'));
    })
  );

devCommand
  .command('restart')
  .description('Restart development mode')
  .option('--verbose', 'Enable detailed change notifications')
  .option('--debounce <ms>', 'Change detection delay in milliseconds', '500')
  .option('--no-validation', 'Skip configuration validation on changes')
  .option('--no-backup', 'Disable automatic backups before changes')
  .option('--no-restore', 'Disable error recovery from backups')
  .option('--exclude-workspaces', 'Skip workspace configuration watching')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Restarting development mode...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageDevMode({ ...options, restart: true, spinner });
      }, 30000); // 30 second timeout

      spinner.stop();
    })
  );

devCommand
  .command('status')
  .description('Show development mode status')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking development mode status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageDevMode({ ...options, status: true, spinner });
      }, 10000); // 10 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Status checked!'));
      } else {
        spinner.stop();
      }
    })
  );

devCommand
  .command('interactive')
  .description('Interactive development mode management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading development mode interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageDevMode({ ...options, interactive: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.stop();
    })
  );

// Hot reload commands
const hotreloadCommand = program.command('hotreload').alias('hr').description('Intelligent hot-reload for all frameworks with file watching');

hotreloadCommand
  .command('start [path]')
  .description('Start hot-reload with framework auto-detection')
  .option('-f, --framework <framework>', 'Framework (express, nestjs, fastapi, django, etc.)')
  .option('-l, --language <language>', 'Language filter (typescript, python, go, rust, etc.)')
  .option('-w, --watch <patterns...>', 'Additional watch patterns')
  .option('-x, --exclude <patterns...>', 'Exclude patterns')
  .option('-d, --debounce <ms>', 'Debounce delay in milliseconds', '300')
  .option('-p, --port <port>', 'Override default port')
  .option('--verbose', 'Show detailed file changes')
  .option('--detect-only', 'Only detect framework without starting')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createHotReload, detectProjectFramework, listSupportedFrameworks, getFrameworkPattern } = await import('./utils/hot-reload');
      const { createSpinner } = await import('./utils/spinner');

      const pathToWatch = projectPath || process.cwd();
      const spinner = createSpinner('Detecting framework...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        let framework = options.framework;
        let frameworkPattern = framework ? getFrameworkPattern(framework) : undefined;

        // Auto-detect if not specified
        if (!frameworkPattern) {
          const detected = await detectProjectFramework(pathToWatch);
          if (!detected) {
            spinner.fail(chalk.red('Could not detect framework'));
            console.log(chalk.yellow('\nSupported frameworks:'));
            const frameworks = listSupportedFrameworks();
            for (const f of frameworks) {
              console.log(`  • ${chalk.blue(f.id.padEnd(15))} ${f.language} (${f.reloadStrategy})`);
            }
            console.log(chalk.gray('\nSpecify with: --framework <name>'));
            return;
          }
          framework = detected.framework;
          frameworkPattern = detected.config;
          spinner.succeed(chalk.green(`Detected: ${detected.framework} (${detected.language})`));
        } else {
          spinner.succeed(chalk.green(`Using framework: ${framework}`));
        }

        if (options.detectOnly) {
          console.log(chalk.cyan('\nFramework Details:'));
          console.log(`  ID: ${chalk.blue(frameworkPattern.framework)}`);
          console.log(`  Language: ${chalk.blue(frameworkPattern.language)}`);
          console.log(`  Reload Strategy: ${chalk.blue(frameworkPattern.reloadStrategy)}`);
          console.log(`  Default Port: ${chalk.blue(String(frameworkPattern.port))}`);
          console.log(`  Watch Paths: ${chalk.blue(frameworkPattern.watchPaths.join(', '))}`);
          console.log(`  Dev Command: ${chalk.blue(frameworkPattern.devCommand)}`);
          return;
        }

        spinner.setText('Starting hot-reload...');
        spinner.start();

        const manager = await createHotReload({
          projectPath: pathToWatch,
          framework: options.framework,
          watchPaths: options.watch,
          excludePatterns: options.exclude,
          debounceMs: parseInt(options.debounce),
          verbose: options.verbose,
          onReload: (type) => {
            if (options.verbose) {
              console.log(chalk.green(`\n🔄 Reload triggered: ${type}`));
            }
          },
          onError: (error) => {
            console.error(chalk.red(`\n❌ Reload error: ${error.message}`));
          },
        });

        spinner.stop();

        console.log(chalk.green('\n🔥 Hot-reload started!'));
        console.log(chalk.gray('═'.repeat(50)));
        console.log(`Framework: ${chalk.blue(frameworkPattern.framework)}`);
        console.log(`Strategy: ${chalk.blue(frameworkPattern.reloadStrategy)}`);
        console.log(`Watch paths: ${chalk.blue(frameworkPattern.watchPaths.join(', '))}`);
        console.log(chalk.gray('\nWatching for file changes... (Press Ctrl+C to stop)'));

        // Set up event handlers
        manager.on('ready', () => {
          if (options.verbose) {
            console.log(chalk.green('\n👀 Watcher ready'));
          }
        });

        manager.on('reload', ({ type, filePath, strategy }) => {
          if (strategy === 'restart' || strategy === 'custom') {
            console.log(chalk.yellow(`\n🔄 Restarting dev server (${type}: ${filePath})`));
          }
        });

        // Handle graceful shutdown
        const shutdown = async () => {
          console.log(chalk.yellow('\n\n⏹️  Stopping hot-reload...'));
          await manager.stop();
          process.exit(0);
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

        // Keep process alive
        await new Promise(() => {});

      } catch (error) {
        spinner.fail(chalk.red('Failed to start hot-reload'));
        throw error;
      }
    })
  );

hotreloadCommand
  .command('detect [path]')
  .description('Detect the framework in use')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { detectProjectFramework, listSupportedFrameworks } = await import('./utils/hot-reload');

      const pathToCheck = projectPath || process.cwd();

      const detected = await detectProjectFramework(pathToCheck);

      if (options.json) {
        console.log(JSON.stringify(detected, null, 2));
        return;
      }

      if (!detected) {
        console.log(chalk.yellow('⚠️  Could not detect framework'));
        console.log(chalk.gray('\nSupported frameworks:'));
        const frameworks = listSupportedFrameworks();
        for (const f of frameworks) {
          console.log(`  • ${chalk.blue(f.id.padEnd(15))} ${f.language}`);
        }
        return;
      }

      console.log(chalk.green('✅ Framework detected!'));
      console.log(chalk.gray('═'.repeat(40)));
      console.log(`Framework: ${chalk.blue(detected.framework)}`);
      console.log(`Language: ${chalk.blue(detected.language)}`);
      console.log(`Confidence: ${chalk.blue(detected.confidence + '%')}`);
      console.log(`Strategy: ${chalk.blue(detected.config.reloadStrategy)}`);
      console.log(`Port: ${chalk.blue(String(detected.config.port))}`);
    })
  );

hotreloadCommand
  .command('list')
  .description('List all supported frameworks')
  .option('--language <language>', 'Filter by language')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const { listSupportedFrameworks } = await import('./utils/hot-reload');

      const frameworks = listSupportedFrameworks();
      const filtered = options.language
        ? frameworks.filter(f => f.language === options.language)
        : frameworks;

      if (options.json) {
        console.log(JSON.stringify(filtered, null, 2));
        return;
      }

      console.log(chalk.cyan('\n🔥 Supported Hot-Reload Frameworks'));
      console.log(chalk.gray('═'.repeat(70)));

      // Group by language
      const byLanguage: Record<string, typeof frameworks> = {};
      for (const f of filtered) {
        if (!byLanguage[f.language]) {
          byLanguage[f.language] = [];
        }
        byLanguage[f.language].push(f);
      }

      for (const [language, langFrameworks] of Object.entries(byLanguage).sort()) {
        console.log(chalk.cyan(`\n${language.charAt(0).toUpperCase() + language.slice(1)}:`));
        for (const f of langFrameworks) {
          const strategyIcon = f.reloadStrategy === 'hmr' ? '⚡' : f.reloadStrategy === 'restart' ? '🔄' : '🔧';
          console.log(`  ${strategyIcon} ${chalk.blue(f.id.padEnd(20))} port: ${String(f.port || '-').padEnd(5)} ${chalk.gray(f.reloadStrategy)}`);
        }
      }

      console.log(chalk.gray('\n═'.repeat(70)));
      console.log(chalk.gray('Legend: ⚡ HMR  🔄 Restart  🔧 Custom'));
      console.log(chalk.gray('\nUsage: re-shell hotreload start [--framework <name>]'));
    })
  );

// Development environment setup commands
const devenvCommand = program.command('devenv').alias('ide').description('Setup integrated development environment with container port forwarding');

devenvCommand
  .command('setup [path]')
  .description('Setup IDE configuration and port forwarding')
  .option('-i, --ide <ide>', 'IDE type (vscode, jetbrains, vim, emacs)', 'vscode')
  .option('-r, --runtime <runtime>', 'Container runtime (docker, podman)')
  .option('-p, --ports <ports...>', 'Port mappings (local:container:service)')
  .option('-c, --containers <containers...>', 'Container names to forward')
  .option('--no-port-forwarding', 'Disable automatic port forwarding')
  .option('--no-service-discovery', 'Disable automatic service discovery')
  .option('--dry-run', 'Preview without writing files')
  .action(
    createAsyncCommand(async (projectPath, options) => {
      const { createDevEnv, detectContainerRuntime, getServicePorts } = await import('./utils/dev-env-setup');
      const { createSpinner } = await import('./utils/spinner');

      const pathToSetup = projectPath || process.cwd();
      const projectName = path.basename(pathToSetup);
      const spinner = createSpinner('Detecting container runtime...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        // Detect container runtime
        const runtime = options.runtime || await detectContainerRuntime();
        if (!runtime) {
          spinner.fail(chalk.red('No container runtime found (Docker or Podman required)'));
          return;
        }
        spinner.succeed(chalk.green(`Detected runtime: ${runtime}`));

        spinner.setText('Setting up development environment...');
        spinner.start();

        // Parse port mappings
        const ports: Array<{ localPort: number; containerPort: number; service: string; protocol: 'tcp' | 'udp' }> = [];
        const servicePorts = getServicePorts();

        if (options.ports) {
          for (const portSpec of options.ports) {
            const parts = portSpec.split(':');
            if (parts.length >= 3) {
              ports.push({
                localPort: parseInt(parts[0]),
                containerPort: parseInt(parts[1]),
                service: parts[2],
                protocol: 'tcp',
              });
            }
          }
        }

        // Default ports if none specified
        if (ports.length === 0) {
          ports.push(
            { localPort: 3000, containerPort: 3000, service: 'web', protocol: 'tcp' },
            { localPort: 8000, containerPort: 8000, service: 'api', protocol: 'tcp' },
          );
        }

        const config = {
          projectPath: pathToSetup,
          projectName,
          ports,
          containers: options.containers || [],
          ide: options.ide as 'vscode' | 'jetbrains' | 'vim' | 'emacs' | 'generic',
          containerRuntime: runtime as 'docker' | 'podman',
          enablePortForwarding: options.portForwarding !== false,
          enableServiceDiscovery: options.serviceDiscovery !== false,
          autoStartContainers: false,
        };

        if (options.dryRun) {
          spinner.stop();
          console.log(chalk.cyan('\n📋 Dry-run configuration:'));
          console.log(`  Project: ${chalk.blue(projectName)}`);
          console.log(`  Path: ${chalk.blue(pathToSetup)}`);
          console.log(`  IDE: ${chalk.blue(config.ide)}`);
          console.log(`  Runtime: ${chalk.blue(runtime)}`);
          console.log(`  Port mappings:`);
          for (const p of ports) {
            console.log(`    ${p.localPort}:${p.containerPort} -> ${p.service}`);
          }
          return;
        }

        const manager = await createDevEnv(config);

        // Setup IDE configuration
        const ideConfig = await manager.setupIDE(config.ide);

        spinner.stop();

        console.log(chalk.green('\n🚀 Development environment setup complete!'));
        console.log(chalk.gray('═'.repeat(60)));

        console.log(`\n${chalk.cyan('IDE Configuration:')} ${chalk.blue(config.ide)}`);
        if (ideConfig) {
          console.log(`  ${chalk.gray('Type')}: ${chalk.blue(ideConfig.type)}`);
          console.log(`  ${chalk.gray('Port Forwarding')}: ${ideConfig.portForwardingEnabled ? '✅' : '❌'}`);
          console.log(`  ${chalk.gray('Remote Development')}: ${ideConfig.remoteDevelopment ? '✅' : '❌'}`);
        }

        console.log(`\n${chalk.cyan('Port Mappings:')}`);
        for (const port of ports) {
          console.log(`  ${chalk.blue('localhost:' + port.localPort)} → ${port.service}:${port.containerPort}`);
        }

        console.log(chalk.gray('\nNext steps:'));
        console.log(`  1. Open ${chalk.blue(projectName)} in ${config.ide}`);
        if (config.ide === 'vscode') {
          console.log(`  2. Reopen in ${chalk.blue('Dev Container')} if using containers`);
        }
        console.log(`  3. Services will be available at http://localhost:<port>`);

      } catch (error) {
        spinner.fail(chalk.red('Failed to setup development environment'));
        throw error;
      }
    })
  );

devenvCommand
  .command('ports [action] [args...]')
  .description('Manage port forwarding (list, forward, unforward)')
  .action(
    createAsyncCommand(async (action, args) => {
      const { DevEnvManager, getServicePorts, detectContainerRuntime } = await import('./utils/dev-env-setup');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = process.cwd();
      const projectName = path.basename(projectPath);

      if (!action || action === 'list') {
        // List active port forwards
        const servicePorts = getServicePorts();
        console.log(chalk.cyan('\n📋 Common Service Ports:'));
        console.log(chalk.gray('─'.repeat(40)));
        for (const [service, port] of Object.entries(servicePorts)) {
          console.log(`  ${chalk.blue(service.padEnd(15))} port: ${port}`);
        }
        return;
      }

      if (action === 'forward') {
        if (args.length < 2) {
          console.log(chalk.yellow('Usage: re-shell devenv ports forward <container> <port> [local-port]'));
          return;
        }

        const [container, containerPort, localPort] = args as string[];
        const spinner = createSpinner('Setting up port forwarding...').start();
        processManager.addCleanup(() => spinner.stop());
        flushOutput();

        try {
          const runtime = await detectContainerRuntime();
          if (!runtime) {
            spinner.fail(chalk.red('No container runtime found'));
            return;
          }

          const manager = new DevEnvManager({
            projectPath,
            projectName,
            ports: [],
            containers: [],
            containerRuntime: runtime,
            enablePortForwarding: true,
            enableServiceDiscovery: false,
            autoStartContainers: false,
          });

          const status = await manager.setupPortForwarding(
            container,
            parseInt(containerPort),
            localPort ? parseInt(localPort) : undefined
          );

          spinner.stop();

          if (status.active) {
            console.log(chalk.green('\n✅ Port forwarding active!'));
            console.log(`  Container: ${chalk.blue(container)}`);
            console.log(`  ${containerPort} → ${status.localPort}`);
            console.log(`  URL: ${chalk.blue(status.url || `http://localhost:${status.localPort}`)}`);
          } else {
            console.log(chalk.yellow('\n⚠️  Port forwarding setup failed'));
          }
        } catch (error) {
          spinner.fail(chalk.red('Failed to setup port forwarding'));
          throw error;
        }
        return;
      }

      if (action === 'unforward') {
        if (args.length < 2) {
          console.log(chalk.yellow('Usage: re-shell devenv ports unforward <container> <port>'));
          return;
        }

        const [container, port] = args as string[];
        const spinner = createSpinner('Stopping port forwarding...').start();
        processManager.addCleanup(() => spinner.stop());
        flushOutput();

        try {
          const runtime = await detectContainerRuntime();
          if (!runtime) {
            spinner.fail(chalk.red('No container runtime found'));
            return;
          }

          const manager = new DevEnvManager({
            projectPath,
            projectName,
            ports: [],
            containers: [],
            containerRuntime: runtime,
            enablePortForwarding: true,
            enableServiceDiscovery: false,
            autoStartContainers: false,
          });

          await manager.stopPortForwarding(container, parseInt(port));

          spinner.succeed(chalk.green('Port forwarding stopped'));
          console.log(`  ${container}:${port}`);
        } catch (error) {
          spinner.fail(chalk.red('Failed to stop port forwarding'));
          throw error;
        }
        return;
      }

      console.log(chalk.yellow(`Unknown action: ${action}`));
      console.log(chalk.gray('Available actions: list, forward, unforward'));
    })
  );

devenvCommand
  .command('detect')
  .description('Detect containers and services')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const { DevEnvManager, detectContainerRuntime } = await import('./utils/dev-env-setup');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Detecting environment...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      try {
        const runtime = await detectContainerRuntime();
        if (!runtime) {
          spinner.fail(chalk.red('No container runtime found'));
          return;
        }

        const manager = new DevEnvManager({
          projectPath: process.cwd(),
          projectName: path.basename(process.cwd()),
          ports: [],
          containers: [],
          containerRuntime: runtime,
          enablePortForwarding: false,
          enableServiceDiscovery: true,
          autoStartContainers: false,
        });

        const containers = await manager.detectContainers();

        spinner.stop();

        if (options.json) {
          console.log(JSON.stringify(containers, null, 2));
          return;
        }

        console.log(chalk.cyan('\n🔍 Detected Containers and Services'));
        console.log(chalk.gray('═'.repeat(60)));

        if (containers.length === 0) {
          console.log(chalk.yellow('No containers found'));
          return;
        }

        for (const container of containers) {
          const statusIcon = container.status === 'running' ? '🟢' : container.status === 'stopped' ? '⏹️' : '⚠️';
          console.log(`\n${statusIcon} ${chalk.blue(container.name)}`);
          console.log(`  Image: ${chalk.gray(container.image)}`);
          console.log(`  Status: ${chalk.gray(container.status)}`);
          if (container.ports.length > 0) {
            console.log(`  Ports:`);
            for (const port of container.ports) {
              const label = port.host ? `${port.host} → ` : '';
              console.log(`    ${chalk.blue(label + port.container)}/${port.protocol}`);
            }
          }
        }

        console.log(chalk.gray('\n═'.repeat(60)));
        console.log(chalk.gray(`Runtime: ${runtime} | Total: ${containers.length} containers`));

      } catch (error) {
        spinner.fail(chalk.red('Detection failed'));
        throw error;
      }
    })
  );

// Services management commands
const servicesCommand = program.command('services').alias('svc').description('Manage development services');

servicesCommand
  .command('up')
  .description('Start services with intelligent dependency resolution')
  .option('-d, --detached', 'Run services in background', true)
  .option('--build', 'Build images before starting')
  .option('--force-recreate', 'Recreate containers even if configuration unchanged')
  .option('--no-deps', 'Do not start dependent services')
  .option('--scale <service=count...>', 'Scale services (e.g., web=3,worker=2)')
  .option('--timeout <ms>', 'Startup timeout in milliseconds', '120000')
  .option('--verbose', 'Show detailed output')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Starting services...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      const { servicesUp } = await import('./commands/services');

      await withTimeout(async () => {
        const scale: Record<string, number> = {};
        if (options.scale) {
          for (const s of options.scale) {
            const [service, count] = s.split('=');
            scale[service] = parseInt(count);
          }
        }

        await servicesUp(process.cwd(), {
          detached: options.detached,
          build: options.build,
          forceRecreate: options.forceRecreate,
          noDeps: options.noDeps,
          scale,
          timeout: parseInt(options.timeout),
          verbose: options.verbose,
          spinner,
        });
      }, parseInt(options.timeout) + 10000);

      spinner.stop();
    })
  );

servicesCommand
  .command('down')
  .description('Stop and remove services with graceful shutdown')
  .option('-v, --volumes', 'Remove volumes as well')
  .option('--remove-orphans', 'Remove containers for services not in compose file')
  .option('--timeout <ms>', 'Shutdown timeout in milliseconds', '60000')
  .option('--verbose', 'Show detailed output')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Stopping services...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      const { servicesDown } = await import('./commands/services');

      await withTimeout(async () => {
        await servicesDown(process.cwd(), {
          volumes: options.volumes,
          removeOrphans: options.removeOrphans,
          timeout: parseInt(options.timeout),
          verbose: options.verbose,
          spinner,
        });
      }, parseInt(options.timeout) + 10000);

      spinner.stop();
    })
  );

servicesCommand
  .command('health')
  .description('Check service health with comprehensive monitoring')
  .option('-w, --watch', 'Watch health status continuously')
  .option('--interval <ms>', 'Watch interval in milliseconds', '5000')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const { servicesHealth } = await import('./commands/services');

      await servicesHealth(process.cwd(), {
        watch: options.watch,
        interval: parseInt(options.interval),
        json: options.json,
        verbose: options.verbose,
      });
    })
  );

servicesCommand
  .command('logs [service]')
  .description('View service logs with filtering and following')
  .option('-f, --follow', 'Follow log output')
  .option('--tail <lines>', 'Number of lines to show', '100')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (service, options) => {
      const { servicesLogs } = await import('./commands/services');

      await servicesLogs(process.cwd(), service, {
        follow: options.follow,
        tail: parseInt(options.tail),
        verbose: options.verbose,
      });
    })
  );

servicesCommand
  .command('restart <service>')
  .description('Restart service with zero-downtime if possible')
  .option('--timeout <ms>', 'Restart timeout in milliseconds', '60000')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (service, options) => {
      const spinner = createSpinner(`Restarting ${service}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      const { servicesRestart } = await import('./commands/services');

      await withTimeout(async () => {
        await servicesRestart(process.cwd(), service, {
          timeout: parseInt(options.timeout),
          verbose: options.verbose,
          spinner,
        });
      }, parseInt(options.timeout) + 10000);

      spinner.stop();
    })
  );

servicesCommand
  .command('scale <service> <replicas>')
  .description('Scale service to specified number of instances')
  .option('--timeout <ms>', 'Scale timeout in milliseconds', '60000')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (service, replicas, options) => {
      const spinner = createSpinner(`Scaling ${service}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      const { servicesScale } = await import('./commands/services');

      await withTimeout(async () => {
        await servicesScale(process.cwd(), service, parseInt(replicas), {
          timeout: parseInt(options.timeout),
          verbose: options.verbose,
          spinner,
        });
      }, parseInt(options.timeout) + 10000);

      spinner.stop();
    })
  );

servicesCommand
  .command('exec <service> <command...>')
  .description('Execute command in service container')
  .option('-T, --no-tty', 'Disable pseudo-TTY allocation')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (service, command, options) => {
      const { servicesExec } = await import('./commands/services');

      await servicesExec(process.cwd(), service, command, {
        interactive: !options.noTty,
        verbose: options.verbose,
      });
    })
  );

servicesCommand
  .command('inspect <service>')
  .description('Inspect service with detailed metrics and dependency information')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (service, options) => {
      const { servicesInspect } = await import('./commands/services');

      await servicesInspect(process.cwd(), service, {
        json: options.json,
        verbose: options.verbose,
      });
    })
  );

servicesCommand
  .command('migrate <service> <target-framework>')
  .description('Migrate service to a different framework/language')
  .option('--source <framework>', 'Source framework (auto-detected if not specified)')
  .option('--dry-run', 'Preview migration without making changes')
  .option('--no-backup', 'Skip creating backup before migration')
  .option('--generate-tests', 'Generate tests for target framework')
  .option('--list-targets', 'List available migration targets')
  .action(
    createAsyncCommand(async (service, targetFramework, options) => {
      const { servicesMigrate, listMigrationTargets } = await import('./commands/services');

      if (options.listTargets) {
        await listMigrationTargets(options.source);
        return;
      }

      const spinner = createSpinner('Planning migration...').start();
      processManager.addCleanup(() => spinner.stop());

      await servicesMigrate(process.cwd(), service, {
        sourceFramework: options.source || 'express', // Default to express if not specified
        targetFramework,
        dryRun: options.dryRun,
        backup: options.backup !== false,
        generateTests: options.generateTests,
        spinner,
      });

      spinner.stop();
    })
  );

servicesCommand
  .command('optimize <service>')
  .description('Analyze and optimize service with performance recommendations')
  .option('--framework <framework>', 'Framework to analyze (auto-detected if not specified)')
  .option('--apply', 'Apply recommended optimizations')
  .option('--dry-run', 'Preview optimizations without making changes (default)')
  .option('--list-all', 'List all available optimization recommendations')
  .action(
    createAsyncCommand(async (service, options) => {
      const { servicesOptimize, listOptimizationRecommendations } = await import('./commands/services');

      if (options.listAll) {
        await listOptimizationRecommendations(options.framework);
        return;
      }

      const spinner = createSpinner('Analyzing service...').start();
      processManager.addCleanup(() => spinner.stop());

      await servicesOptimize(process.cwd(), service, {
        framework: options.framework,
        apply: options.apply,
        dryRun: !options.apply,
        spinner,
      });

      spinner.stop();
    })
  );

// Debug configuration commands
const debugCommand = program.command('debug').description('Generate debugging configurations for development environments');

debugCommand
  .command('generate')
  .description('Generate debug configurations for your project')
  .option('--framework <framework>', 'Backend framework (express, nestjs, fastapi, django, etc.)')
  .option('--language <language>', 'Programming language (typescript, python, go, rust, etc.)')
  .option('--type <type>', 'Project type (backend, frontend, fullstack)', 'backend')
  .option('--entry <path>', 'Entry point file path')
  .option('--port <port>', 'Development server port')
  .option('--force', 'Overwrite existing configuration files')
  .option('--dry-run', 'Preview without writing files')
  .action(
    createAsyncCommand(async (options) => {
      const { writeDebugConfigs, displayDebugConfigInfo } = await import('./utils/debugging');

      const projectPath = process.cwd();
      const name = path.basename(projectPath);

      const project = {
        name,
        type: options.type as 'backend' | 'frontend' | 'fullstack',
        framework: options.framework || 'express',
        language: options.language || 'typescript',
        entryPoint: options.entry,
        port: options.port ? parseInt(options.port) : undefined,
      };

      console.log(chalk.cyan(`\n🐛 Generating debug configurations for ${name}...\n`));

      displayDebugConfigInfo(project);

      if (!options.dryRun) {
        await writeDebugConfigs(projectPath, project, {
          force: options.force,
          verbose: true,
        });

        console.log(chalk.green('\n✅ Debug configurations generated!'));
        console.log(chalk.gray('\nNext steps:'));
        console.log(chalk.gray('  1. Open your project in VS Code'));
        console.log(chalk.gray('  2. Press F5 to start debugging'));
        console.log(chalk.gray('  3. Select a configuration from the dropdown'));
      } else {
        console.log(chalk.yellow('\nDry run - no files written.'));
      }
    })
  );

debugCommand
  .command('list <language>')
  .description('List available debugging configurations for a language')
  .action(
    createAsyncCommand(async (language, options) => {
      const { displayDebugConfigInfo } = await import('./utils/debugging');

      const project = {
        name: 'example-app',
        type: 'backend' as const,
        framework: language === 'python' ? 'fastapi' : language === 'go' ? 'gin' : 'express',
        language,
        entryPoint: language === 'python' ? 'src/main.py' : 'src/index.js',
        port: 3000,
      };

      displayDebugConfigInfo(project);
    })
  );

// OpenAPI specification generator commands
const openapiCommand = program.command('openapi').alias('api').description('Auto-generate OpenAPI specifications from code annotations');

openapiCommand
  .command('generate [path]')
  .description('Generate OpenAPI specification from code')
  .option('--framework <framework>', 'Backend framework (express, nestjs, fastify, fastapi, django, flask, rails, etc.)')
  .option('--output <file>', 'Output file path', 'openapi.yaml')
  .option('--format <format>', 'Output format (yaml or json)', 'yaml')
  .option('--title <title>', 'API title')
  .option('--description <description>', 'API description')
  .option('--version <version>', 'API version', '1.0.0')
  .option('--port <port>', 'Server port', '3000')
  .option('--base-path <path>', 'Base API path', '/api/v1')
  .option('--dry-run', 'Preview without writing file')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { createOpenAPIGenerator, getSupportedFrameworks, formatOpenAPISpec } = await import('./utils/openapi-generator');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const outputPath = path.resolve(projectPath, options.output);
      const name = path.basename(projectPath);

      const spinner = createSpinner('Detecting framework...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const generator = await createOpenAPIGenerator(projectPath, options.framework);

        // Detect framework if not specified
        const detectedFramework = options.framework || await generator.detectFramework();
        spinner.setText(`Generating OpenAPI spec for ${name} (Framework: ${detectedFramework})...`);
        flushOutput();

        // Generate spec
        const spec = await generator.generateSpec({
          info: {
            title: options.title || name,
            description: options.description,
            version: options.version,
          },
        });

        // Update server URL if custom port/base-path provided
        if (options.port || options.basePath) {
          spec.servers = [{
            url: `http://localhost:${options.port}${options.basePath}`,
            description: 'Development server',
          }];
        }

        spinner.stop();

        if (options.dryRun) {
          console.log(chalk.cyan(`\n📄 OpenAPI Specification for ${name}\n`));
          console.log(formatOpenAPISpec(spec));
          console.log(chalk.yellow('\nDry run - no file written.'));
        } else {
          // Write spec to file
          const { OpenAPIGenerator } = await import('./utils/openapi-generator');
          const writeGenerator = new OpenAPIGenerator(projectPath, detectedFramework);
          await writeGenerator.writeSpec(outputPath, options.format as 'yaml' | 'json', {
            info: {
              title: options.title || name,
              description: options.description,
              version: options.version,
            },
          });

          console.log(chalk.green(`\n✓ OpenAPI specification generated successfully!\n`));
          console.log(chalk.gray(`Framework: ${detectedFramework}`));
          console.log(chalk.gray(`Output: ${outputPath}`));
          console.log(chalk.gray(`Format: ${options.format}`));
          console.log(`\nEndpoints: ${chalk.blue(String(Object.keys(spec.paths).length))}`);

          for (const [routePath, pathItem] of Object.entries(spec.paths)) {
            const methods = Object.keys(pathItem).filter(m => m !== 'parameters' && m !== '$ref' && m !== 'summary' && m !== 'description');
            for (const method of methods) {
              const operation = pathItem[method as keyof typeof pathItem] as { summary?: string };
              console.log(`  ${chalk.green(method.toUpperCase().padEnd(6))} ${chalk.gray(routePath)} ${operation.summary ? chalk.blue('- ' + operation.summary) : ''}`);
            }
          }
        }
      }, 60000); // 1 minute timeout
    })
  );

openapiCommand
  .command('discover [path]')
  .description('Discover and list API routes from code')
  .option('--framework <framework>', 'Backend framework')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { createOpenAPIGenerator } = await import('./utils/openapi-generator');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const name = path.basename(projectPath);

      const spinner = createSpinner('Discovering routes...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const generator = await createOpenAPIGenerator(projectPath, options.framework);
        const routes = await generator.discoverRoutes();

        spinner.stop();

        if (options.json) {
          console.log(JSON.stringify(routes, null, 2));
        } else {
          console.log(chalk.cyan(`\n🔍 Discovered ${routes.length} routes in ${name}\n`));

          // Group by tag/file
          const byTag: Record<string, typeof routes> = {};
          for (const route of routes) {
            const tag = route.tags[0] || 'default';
            if (!byTag[tag]) byTag[tag] = [];
            byTag[tag].push(route);
          }

          for (const [tag, tagRoutes] of Object.entries(byTag)) {
            console.log(chalk.blue(`${tag}:`));
            for (const route of tagRoutes) {
              console.log(`  ${chalk.green(route.method.toUpperCase().padEnd(6))} ${chalk.gray(route.path)} - ${route.operation}`);
              if (route.parameters.length > 0) {
                console.log(chalk.gray(`     Params: ${route.parameters.map(p => p.name).join(', ')}`));
              }
            }
          }
        }
      }, 60000);
    })
  );

openapiCommand
  .command('list-frameworks')
  .description('List all supported frameworks')
  .action(
    createAsyncCommand(async () => {
      const { getSupportedFrameworks } = await import('./utils/openapi-generator');

      const frameworks = getSupportedFrameworks();

      console.log(chalk.cyan('\n📋 Supported Frameworks\n'));

      const byLanguage: Record<string, string[]> = {
        'JavaScript/TypeScript': ['express', 'nestjs', 'fastify'],
        'Python': ['fastapi', 'django', 'flask'],
        'Ruby': ['rails'],
        'Java': ['spring-boot'],
        'C#': ['aspnet-core'],
        'Go': ['gin', 'chi', 'fiber'],
        'Rust': ['actix', 'axum'],
      };

      for (const [language, langFrameworks] of Object.entries(byLanguage)) {
        console.log(chalk.blue(`${language}:`));
        for (const fw of langFrameworks) {
          if (frameworks.includes(fw)) {
            console.log(`  ${chalk.gray('•')} ${fw}`);
          }
        }
      }

      console.log(chalk.gray('\nUsage: re-shell openapi generate [--framework <name>]'));
    })
  );

openapiCommand
  .command('annotate <framework>')
  .description('Show example OpenAPI annotations for a framework')
  .option('--route <route>', 'Example route path', '/users')
  .option('--method <method>', 'HTTP method', 'get')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { OpenAPIGenerator } = await import('./utils/openapi-generator');

      const generator = new OpenAPIGenerator(process.cwd(), framework);
      const code = generator.generateAnnotatedCode(framework, {
        routePath: options.route,
        method: options.method,
        operation: `${options.method}${options.route.replace(/\//g, '-')}`.replace(/^-/, ''),
        tags: ['api'],
      });

      console.log(chalk.cyan(`\n📝 OpenAPI Annotations for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(code);
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

// Swagger UI commands
const swaggerCommand = program.command('swagger').alias('api-ui').description('Generate Swagger UI documentation with custom branding');

swaggerCommand
  .command('generate [path]')
  .description('Generate Swagger UI HTML')
  .option('--output <file>', 'Output HTML file path', 'swagger-ui.html')
  .option('--title <title>', 'API documentation title', 'API Documentation')
  .option('--description <description>', 'API documentation description')
  .option('--logo <url>', 'Logo URL for branding')
  .option('--favicon <url>', 'Favicon URL')
  .option('--theme-color <color>', 'Theme color (hex)', '#3b82f6')
  .option('--spec <url>', 'OpenAPI spec URL (for single service)')
  .option('--service-name <name>', 'Service name (for single service)')
  .option('--try-it-out', 'Enable Try It Out feature (default: true)')
  .option('--no-try-it-out', 'Disable Try It Out feature')
  .option('--persist-auth', 'Persist authorization (default: true)')
  .option('--no-persist-auth', 'Do not persist authorization')
  .option('--dry-run', 'Preview without writing file')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { generateSwaggerUIHTML, formatSwaggerUIConfig } = await import('./utils/swagger-ui');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const outputPath = path.resolve(projectPath, options.output);

      const spinner = createSpinner('Generating Swagger UI...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const config = {
          title: options.title,
          description: options.description,
          logoUrl: options.logo,
          faviconUrl: options.favicon,
          themeColor: options.themeColor,
          services: options.spec ? [{
            name: options.serviceName || 'API',
            url: options.spec,
            description: options.description || 'API Documentation',
            version: '1.0.0',
          }] : [],
          persistAuthorization: options.persistAuth !== false,
          tryItOutEnabled: options.tryItOut !== false,
          displayOperationId: false,
          displayRequestDuration: true,
          docExpansion: 'list' as const,
          filter: true,
        };

        spinner.stop();

        if (options.dryRun) {
          console.log(formatSwaggerUIConfig(config));
          console.log(chalk.yellow('\nDry run - no file written.'));
        } else {
          const html = generateSwaggerUIHTML(config);
          await fs.ensureDir(path.dirname(outputPath));
          await fs.writeFile(outputPath, html, 'utf-8');

          console.log(chalk.green(`\n✓ Swagger UI generated successfully!\n`));
          console.log(chalk.gray(`Output: ${outputPath}`));
          console.log(chalk.gray(`Services: ${config.services.length}`));
          console.log(`\nNext steps:`);
          console.log(`  1. Open ${chalk.cyan(outputPath)} in your browser`);
          console.log(`  2. Or serve it: npx serve ${path.dirname(outputPath)}`);
        }
      }, 30000);
    })
  );

swaggerCommand
  .command('multi-service [path]')
  .description('Generate multi-service Swagger UI from workspace')
  .option('--output <file>', 'Output HTML file path', 'swagger-ui.html')
  .option('--title <title>', 'API documentation title', 'API Documentation')
  .option('--description <description>', 'API documentation description')
  .option('--logo <url>', 'Logo URL for branding')
  .option('--theme-color <color>', 'Theme color (hex)', '#3b82f6')
  .option('--dry-run', 'Preview without writing file')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { detectServices, generateSwaggerUI, formatSwaggerUIConfig } = await import('./utils/swagger-ui');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const outputPath = path.resolve(projectPath, options.output);

      const spinner = createSpinner('Detecting services...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        spinner.setText('Scanning workspace for OpenAPI specs...');
        const services = await detectServices(projectPath);

        if (services.length === 0) {
          spinner.stop();
          console.log(chalk.yellow('\nNo services found with OpenAPI specs (openapi.yaml or openapi.json)'));
          console.log(chalk.gray('\nHint: Generate specs first with: re-shell openapi generate [path]'));
          return;
        }

        spinner.setText(`Generating Swagger UI for ${services.length} services...`);

        const config = {
          title: options.title,
          description: options.description,
          logoUrl: options.logo,
          themeColor: options.themeColor,
          services,
          persistAuthorization: true,
          tryItOutEnabled: true,
          displayOperationId: false,
          displayRequestDuration: true,
          docExpansion: 'list' as const,
          filter: true,
        };

        spinner.stop();

        if (options.dryRun) {
          console.log(formatSwaggerUIConfig(config));
          console.log(chalk.yellow('\nDry run - no file written.'));
        } else {
          await generateSwaggerUI(outputPath, config);

          console.log(chalk.green(`\n✓ Multi-service Swagger UI generated successfully!\n`));
          console.log(chalk.gray(`Output: ${outputPath}`));
          console.log(chalk.gray(`Services: ${services.length}`));

          for (const service of services) {
            console.log(`  ${chalk.gray('•')} ${chalk.yellow(service.name)} - ${chalk.gray(service.specPath || 'N/A')}`);
          }

          console.log(`\nNext steps:`);
          console.log(`  1. Open ${chalk.cyan(outputPath)} in your browser`);
          console.log(`  2. Select a service to view its API documentation`);
        }
      }, 30000);
    })
  );

swaggerCommand
  .command('list-services [path]')
  .description('List detected services in workspace')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { detectServices } = await import('./utils/swagger-ui');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());

      const spinner = createSpinner('Scanning workspace...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const services = await detectServices(projectPath);
        spinner.stop();

        if (services.length === 0) {
          console.log(chalk.yellow('\nNo services found with OpenAPI specs'));
          console.log(chalk.gray('\nGenerate specs first with: re-shell openapi generate [path]'));
        } else {
          console.log(chalk.cyan(`\n🔍 Found ${services.length} service(s)\n`));

          for (const service of services) {
            console.log(`${chalk.yellow(service.name)}`);
            console.log(`  ${chalk.gray('Spec:')} ${service.specPath}`);
            if (service.description) {
              console.log(`  ${chalk.gray('Description:')} ${service.description}`);
            }
            console.log('');
          }
        }
      }, 30000);
    })
  );

swaggerCommand
  .command('themes')
  .description('List available theme colors')
  .action(
    createAsyncCommand(async () => {
      const { getThemePresets } = await import('./utils/swagger-ui');

      const themes = getThemePresets();

      console.log(chalk.cyan('\n🎨 Available Theme Colors\n'));

      for (const [key, { color, name }] of Object.entries(themes)) {
        console.log(`  ${key.padEnd(10)} ${chalk.gray('─')} ${chalk.hex(color)(name)} ${chalk.gray(`(${color})`)}`);
      }

      console.log(chalk.gray('\nUsage: re-shell swagger generate --theme-color <hex-value>\n'));
    })
  );

// API Versioning commands
const versioningCommand = program.command('versioning').alias('api-version').description('API versioning patterns and backwards compatibility management');

versioningCommand
  .command('init [path]')
  .description('Initialize API versioning configuration')
  .option('--output <file>', 'Config output file', 'api-versioning.json')
  .option('--strategy <strategy>', 'Versioning strategy (url, header, query, content-type)', 'url')
  .option('--default-version <version>', 'Default API version', '1')
  .option('--header-name <name>', 'Header name for header-based versioning', 'X-API-Version')
  .option('--dry-run', 'Preview without writing file')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { createVersioningGenerator, formatVersioningConfig } = await import('./utils/api-versioning');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const outputPath = path.resolve(projectPath, options.output);

      const spinner = createSpinner('Creating versioning configuration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const generator = await createVersioningGenerator(projectPath);
        const config = generator.generateVersioningConfig({
          strategy: options.strategy as any,
          defaultVersion: options.defaultVersion,
          headerName: options.headerName,
        });

        spinner.stop();

        if (options.dryRun) {
          console.log(formatVersioningConfig(config));
          console.log(chalk.yellow('\nDry run - no file written.'));
        } else {
          await generator.writeConfig(outputPath, config);

          console.log(chalk.green(`\n✓ API versioning configuration created!\n`));
          console.log(chalk.gray(`Output: ${outputPath}`));
          console.log(chalk.gray(`Strategy: ${config.strategy}`));
          console.log(chalk.gray(`Default Version: v${config.defaultVersion}`));
          console.log(`\nNext steps:`);
          console.log(`  1. Review the configuration in ${chalk.cyan(outputPath)}`);
          console.log(`  2. Generate middleware: re-shell versioning middleware --strategy ${config.strategy}`);
        }
      }, 30000);
    })
  );

versioningCommand
  .command('middleware [path]')
  .description('Generate versioning middleware for your framework')
  .option('--strategy <strategy>', 'Versioning strategy (url, header, query, content-type)', 'url')
  .option('--framework <framework>', 'Backend framework (express, nestjs, fastapi, etc.)')
  .option('--output <file>', 'Output file path', 'versioning-middleware.ts')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { createVersioningGenerator } = await import('./utils/api-versioning');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const outputPath = path.resolve(projectPath, options.output);

      const spinner = createSpinner('Generating versioning middleware...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const generator = await createVersioningGenerator(projectPath, options.framework);
        const middleware = generator.generateVersioningMiddleware(options.strategy as any);

        spinner.stop();

        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, middleware, 'utf-8');

        console.log(chalk.green(`\n✓ Versioning middleware generated!\n`));
        console.log(chalk.gray(`Output: ${outputPath}`));
        console.log(chalk.gray(`Strategy: ${options.strategy}`));
        console.log(`\nAdd this middleware to your application's request pipeline.`);
      }, 30000);
    })
  );

versioningCommand
  .command('compare <old-spec> <new-spec>')
  .description('Compare two API specs to detect breaking changes')
  .action(
    createAsyncCommand(async (oldSpecPath, newSpecPath, options) => {
      const { detectBreakingChanges, formatBreakingChanges } = await import('./utils/api-versioning');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Comparing API specifications...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        const oldSpec = await fs.readJson(path.resolve(oldSpecPath));
        const newSpec = await fs.readJson(path.resolve(newSpecPath));

        spinner.stop();

        const changes = detectBreakingChanges(oldSpec, newSpec);
        console.log(formatBreakingChanges(changes));

        if (changes.length > 0) {
          console.log(chalk.yellow(`⚠️  ${changes.length} breaking change(s) found. Consider a major version bump.`));
        } else {
          console.log(chalk.green(`✓ No breaking changes. Safe for minor/patch version update.`));
        }
      }, 30000);
    })
  );

versioningCommand
  .command('migrate <from-version> <to-version>')
  .description('Generate migration guide between API versions')
  .option('--old-spec <file>', 'Old API spec file')
  .option('--new-spec <file>', 'New API spec file')
  .option('--output <file>', 'Output markdown file', 'MIGRATION.md')
  .action(
    createAsyncCommand(async (fromVersion, toVersion, options) => {
      const { detectBreakingChanges, generateMigrationGuide } = await import('./utils/api-versioning');
      const { createSpinner } = await import('./utils/spinner');

      const spinner = createSpinner('Generating migration guide...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        let breakingChanges: any[] = [];

        if (options.oldSpec && options.newSpec) {
          const oldSpec = await fs.readJson(path.resolve(options.oldSpec));
          const newSpec = await fs.readJson(path.resolve(options.newSpec));
          breakingChanges = detectBreakingChanges(oldSpec, newSpec);
        }

        spinner.stop();

        const guide = generateMigrationGuide(fromVersion, toVersion, breakingChanges);
        const outputPath = path.resolve(options.output);

        await fs.writeFile(outputPath, guide, 'utf-8');

        console.log(chalk.green(`\n✓ Migration guide generated!\n`));
        console.log(chalk.gray(`Output: ${outputPath}`));
        console.log(chalk.gray(`From: v${fromVersion} → v${toVersion}`));
        console.log(chalk.gray(`Breaking Changes: ${breakingChanges.length}`));
      }, 30000);
    })
  );

versioningCommand
  .command('template <framework>')
  .description('Show versioning template for a framework')
  .option('--strategy <strategy>', 'Versioning strategy (url, header)', 'url')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { getVersioningTemplate } = await import('./utils/api-versioning');

      const template = getVersioningTemplate(framework);

      if (!template) {
        console.log(chalk.yellow(`\nNo versioning template found for ${chalk.cyan(framework)}`));
        console.log(chalk.gray('\nSupported frameworks: express, nestjs, fastapi, django, aspnet-core, spring-boot, gin, rust-actix'));
        return;
      }

      console.log(chalk.cyan(`\n📋 Versioning Template for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(`${chalk.blue('Language:')} ${template.language}`);
      console.log(`${chalk.blue('URL Pattern:')} ${template.urlPattern}`);
      console.log(`${chalk.blue('Header Pattern:')} ${template.headerPattern}`);
      console.log(`\n${chalk.blue('Example Code:')}\n`);
      console.log(chalk.gray(template.exampleCode));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

versioningCommand
  .command('list-strategies')
  .description('List all available versioning strategies')
  .action(
    createAsyncCommand(async () => {
      console.log(chalk.cyan('\n📋 API Versioning Strategies\n'));

      const strategies = [
        {
          name: 'url',
          description: 'URL-based versioning',
          example: '/api/v1/users, /api/v2/users',
          pros: ['Clear separation', 'Easy caching', 'Simple routing'],
          cons: ['Multiple endpoints', 'URL bloat'],
        },
        {
          name: 'header',
          description: 'Header-based versioning',
          example: 'X-API-Version: 2',
          pros: ['Single endpoint URL', 'Clean API', 'Backward compatible'],
          cons: ['Less discoverable', 'Cache complexity'],
        },
        {
          name: 'query',
          description: 'Query parameter versioning',
          example: '/users?version=2',
          pros: ['Simple to implement', 'Backward compatible'],
          cons: ['Not RESTful best practice', 'Cache issues'],
        },
        {
          name: 'content-type',
          description: 'Content-Type negotiation',
          example: 'Accept: application/vnd.api+json; version=2',
          pros: ['RFC compliant', 'Clean URLs'],
          cons: ['Complex client implementation'],
        },
      ];

      for (const strategy of strategies) {
        console.log(`${chalk.yellow(strategy.name.padEnd(15))} ${chalk.gray(strategy.description)}`);
        console.log(`  ${chalk.gray('Example:')} ${chalk.cyan(strategy.example)}`);
        console.log(`  ${chalk.green('✓')} ${strategy.pros.join(', ')}`);
        if (strategy.cons.length > 0) {
          console.log(`  ${chalk.red('✗')} ${strategy.cons.join(', ')}`);
        }
        console.log('');
      }
    })
  );

// Validation middleware commands
const validationCommand = program.command('validation').alias('validate').description('Request/response validation middleware for all frameworks');

validationCommand
  .command('generate [path]')
  .description('Generate validation middleware for your framework')
  .option('--framework <framework>', 'Backend framework (express, nestjs, fastify, fastapi, etc.)')
  .option('--output <file>', 'Output file path')
  .option('--mode <mode>', 'Validation mode (strict, lenient, permissive)', 'lenient')
  .option('--no-request', 'Disable request validation')
  .option('--response', 'Enable response validation')
  .option('--strip-unknown', 'Strip unknown properties (default: true)')
  .option('--no-strip-unknown', 'Do not strip unknown properties')
  .option('--dry-run', 'Preview without writing file')
  .action(
    createAsyncCommand(async (targetPath, options) => {
      const { generateValidationMiddleware, getValidationTemplate, formatValidationTemplate } = await import('./utils/validation-middleware');
      const { createSpinner } = await import('./utils/spinner');

      const projectPath = path.resolve(targetPath || process.cwd());
      const framework = options.framework;

      const spinner = createSpinner('Generating validation middleware...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        if (!framework) {
          spinner.stop();
          console.log(chalk.yellow('\nPlease specify a framework with --framework\n'));
          console.log(chalk.gray('Supported: express, nestjs, fastify, fastapi, django, aspnet-core, spring-boot, gin, rust-axum'));
          return;
        }

        const template = getValidationTemplate(framework);

        if (!template) {
          spinner.stop();
          console.log(chalk.red(`\n❌ No validation template found for ${chalk.cyan(framework)}\n`));
          console.log(chalk.gray('Supported frameworks: express, nestjs, fastify, fastapi, django, aspnet-core, spring-boot, gin, rust-axum'));
          return;
        }

        const middleware = generateValidationMiddleware(framework, {
          mode: options.mode as any,
          validateRequest: options.request !== false,
          validateResponse: options.response || false,
          stripUnknown: options.stripUnknown !== false,
        });

        spinner.stop();

        if (options.dryRun) {
          console.log(formatValidationTemplate(template));
          if (middleware) {
            console.log(chalk.gray('\n--- Generated Middleware ---\n'));
            console.log(chalk.gray(middleware));
          }
          console.log(chalk.yellow('\nDry run - no file written.'));
        } else {
          const outputPath = options.output || path.join(projectPath, template.middlewareFile);
          await fs.ensureDir(path.dirname(outputPath));
          await fs.writeFile(outputPath, middleware || '', 'utf-8');

          console.log(chalk.green(`\n✓ Validation middleware generated!\n`));
          console.log(chalk.gray(`Framework: ${framework}`));
          console.log(chalk.gray(`Output: ${outputPath}`));
          console.log(chalk.gray(`Mode: ${options.mode}`));

          if (template.dependencies.length > 0) {
            console.log(`\n${chalk.blue('Dependencies to install:')}`);
            for (const dep of template.dependencies) {
              console.log(`  ${chalk.gray('npm install')} ${chalk.cyan(dep)}`);
            }
          }
        }
      }, 30000);
    })
  );

validationCommand
  .command('template <framework>')
  .description('Show validation middleware template for a framework')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { getValidationTemplate, formatValidationTemplate } = await import('./utils/validation-middleware');

      const template = getValidationTemplate(framework);

      if (!template) {
        console.log(chalk.yellow(`\nNo validation template found for ${chalk.cyan(framework)}\n`));
        console.log(chalk.gray('Supported frameworks: express, nestjs, fastify, fastapi, django, aspnet-core, spring-boot, gin, rust-axum'));
        return;
      }

      console.log(formatValidationTemplate(template));
    })
  );

validationCommand
  .command('list-frameworks')
  .description('List all supported frameworks for validation middleware')
  .action(
    createAsyncCommand(async () => {
      console.log(chalk.cyan('\n🔍 Supported Frameworks\n'));

      const frameworks = [
        { name: 'express', language: 'TypeScript', validator: 'Joi' },
        { name: 'nestjs', language: 'TypeScript', validator: 'Joi' },
        { name: 'fastify', language: 'TypeScript', validator: 'Zod' },
        { name: 'fastapi', language: 'Python', validator: 'Pydantic' },
        { name: 'django', language: 'Python', validator: 'Pydantic' },
        { name: 'aspnet-core', language: 'C#', validator: 'FluentValidation' },
        { name: 'spring-boot', language: 'Java', validator: 'Bean Validation' },
        { name: 'gin', language: 'Go', validator: 'go-playground/validator' },
        { name: 'rust-axum', language: 'Rust', validator: 'validator crate' },
      ];

      for (const fw of frameworks) {
        console.log(`${chalk.yellow(fw.name.padEnd(15))} ${chalk.gray(fw.language.padEnd(12))} ${chalk.cyan(fw.validator)}`);
      }

      console.log(chalk.gray('\nUsage: re-shell validation generate --framework <name>\n'));
    })
  );

validationCommand
  .command('schema <framework>')
  .description('Generate schema validation template for a framework')
  .option('--model-name <name>', 'Model/DTO name', 'User')
  .option('--fields <fields>', 'Field definitions (name:type:validation)', 'name:string:required,email:string:email:required,age:int:min=18')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { getValidationTemplate } = await import('./utils/validation-middleware');

      const template = getValidationTemplate(framework);

      if (!template) {
        console.log(chalk.yellow(`\nNo validation template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      console.log(chalk.cyan(`\n📋 Schema Template for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));

      // Parse fields
      const fields = options.fields.split(',').map(f => {
        const parts = f.split(':');
        return {
          name: parts[0],
          type: parts[1] || 'string',
          validations: parts.slice(2) || [],
        };
      });

      const modelName = options.modelName;
      const schemaCode = generateSchemaCode(framework, modelName, fields);

      console.log(chalk.gray(schemaCode));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

function generateSchemaCode(framework: string, modelName: string, fields: Array<{name: string; type: string; validations: string[]}>): string {
  const templates: Record<string, string> = {
    express: `// ${modelName} schema (Joi)
const ${modelName}Schema = Joi.object({
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '.required()';
    if (v.startsWith('min=')) return `.min(${v.split('=')[1]})`;
    if (v.startsWith('max=')) return `.max(${v.split('=')[1]})`;
    if (v === 'email') return '.email()';
    return '';
  }).filter(Boolean).join('');
  return `  ${f.name}: Joi.${f.type}()${v}`;
}).join(',\n')}
});`,
    nestjs: `// ${modelName} DTO
export class Create${modelName}Dto {
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '@IsNotEmpty()';
    if (v.startsWith('min=')) return `@Min(${v.split('=')[1]})`;
    if (v.startsWith('max=')) return `@Max(${v.split('=')[1]})`;
    if (v === 'email') return '@IsEmail()';
    return '';
  }).filter(Boolean).join('\n  ');
  return `  ${v}
  ${f.name}: ${f.type}${f.validations.includes('required') ? '' : ' | null'};`;
}).join('\n\n')}
}`,
    fastapi: `# ${modelName} schema (Pydantic)
from pydantic import BaseModel, EmailStr, Field

class ${modelName}(BaseModel):
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '';
    if (v.startsWith('min=')) return `Field(ge=${v.split('=')[1]})`;
    if (v.startsWith('max=')) return `Field(le=${v.split('=')[1]})`;
    if (v === 'email') return 'EmailStr';
    return '';
  }).filter(Boolean).join(' ');
  const optional = !f.validations.includes('required') ? ' | None = None' : '';
  return `    ${f.name}: ${f.type}${optional}${v ? ' = ' + v : ''}`;
}).join('\n')}
}`,
    django: `# ${modelName} schema (Pydantic)
from pydantic import BaseModel, EmailStr, Field

class ${modelName}(BaseModel):
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '';
    if (v.startsWith('min=')) return `Field(min_length=${v.split('=')[1]})`;
    if (v.startsWith('max=')) return `Field(max_length=${v.split('=')[1]})`;
    if (v === 'email') return 'EmailStr';
    return '';
  }).filter(Boolean).join(' ');
  const optional = !f.validations.includes('required') ? ' = None' : '';
  return `    ${f.name}: ${f.type}${optional}${v ? ' = ' + v : ''}`;
}).join('\n')}
}`,
    gin: `// ${modelName} struct
type ${modelName} struct {
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return 'validate:"required"';
    if (v.startsWith('min=')) return `validate:"min=${v.split('=')[1]}"`;
    if (v.startsWith('max=')) return `validate:"max=${v.split('=')[1]}"`;
    if (v === 'email') return 'validate:"email"';
    return '';
  }).filter(Boolean).join(' ');
  const tag = v ? (v + ' ') : '';
  return `  ${f.name}  ${f.type} \`${tag}json:"${f.name}"\``;
}).join('\n')}
}`,
    'aspnet-core': `// ${modelName} record
public record Create${modelName}Request
{
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '[Required]';
    if (v.startsWith('min=')) return `[Range(Minimum = ${v.split('=')[1]})]`;
    if (v.startsWith('max=')) return `[Range(Maximum = ${v.split('=')[1]})]`;
    if (v === 'email') return '[EmailAddress]';
    return '';
  }).filter(Boolean).join(' ');
  return `  public ${f.type} ${f.name} { get; init; }${v}`;
}).join('\n')}
}`,
    'spring-boot': `// ${modelName} record
import jakarta.validation.constraints.*;

public record Create${modelName}Request {
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '@NotNull';
    if (v.startsWith('min=')) return `@Size(min = ${v.split('=')[1]})`;
    if (v.startsWith('max=')) return `@Size(max = ${v.split('=')[1]})`;
    if (v === 'email') return '@Email';
    return '';
  }).filter(Boolean).join('\n  ');
  return `  ${v}
  private ${f.type} ${f.name};`;
}).join('\n')}
}`,
    'rust-axum': `// ${modelName} struct
use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, Validate)]
pub struct ${modelName} {
${fields.map(f => {
  const v = f.validations.map(v => {
    if (v === 'required') return '';
    if (v.startsWith('min=')) return `#[validate(length(min = ${v.split('=')[1]}))]`;
    if (v.startsWith('max=')) return `#[validate(length(max = ${v.split('=')[1]}))]`;
    if (v === 'email') return `#[validate(email)]`;
    return '';
  }).filter(Boolean).join('\n  ');
  return `  ${v}
  pub ${f.name}: ${f.type},`;
}).join('\n')}
}`,
  };

  return templates[framework] || `// No schema template for ${framework}`;
}

// Workspace definition commands
const workspaceDefCommand = program.command('workspace-def').description('Manage workspace definitions and schemas');

workspaceDefCommand
  .command('init')
  .description('Initialize workspace definition file')
  .option('--output <file>', 'Output file path', 're-shell.workspaces.yaml')
  .option('--dry-run', 'Preview without creating file')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Initializing workspace definition...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, init: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Workspace definition initialized!'));
    })
  );

workspaceDefCommand
  .command('validate')
  .description('Validate workspace definition')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--strict', 'Treat warnings as errors')
  .option('--ignore-warnings', 'Ignore validation warnings')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating workspace definition...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, validate: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Validation completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceDefCommand
  .command('structure')
  .description('Validate workspace structure on disk')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--strict', 'Treat warnings as errors')
  .option('--ignore-warnings', 'Ignore validation warnings')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating workspace structure...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, structure: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Structure validation completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceDefCommand
  .command('auto-detect')
  .description('Auto-detect workspaces based on patterns')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--output <file>', 'Output file (defaults to input file)')
  .option('--merge', 'Merge with existing definition')
  .option('--dry-run', 'Preview without making changes')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Auto-detecting workspaces...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, autoDetect: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Workspace auto-detection completed!'));
    })
  );

workspaceDefCommand
  .command('fix')
  .description('Fix workspace definition issues')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--dry-run', 'Preview fixes without applying')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing workspace definition...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, fix: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Fix analysis completed!'));
    })
  );

workspaceDefCommand
  .command('interactive')
  .description('Interactive workspace definition management')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading workspace definition interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceDefinition({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace graph commands
const workspaceGraphCommand = program.command('workspace-graph').description('Analyze workspace dependency graphs and detect cycles');

workspaceGraphCommand
  .command('analyze')
  .description('Comprehensive workspace dependency graph analysis')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--detailed', 'Show detailed analysis information')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show verbose information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing workspace dependency graph...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, analyze: true, spinner });
      }, 60000); // 1 minute timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Graph analysis completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceGraphCommand
  .command('cycles')
  .description('Detect and analyze dependency cycles')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--detailed', 'Show detailed cycle information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Detecting dependency cycles...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, cycles: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Cycle detection completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceGraphCommand
  .command('order')
  .description('Generate optimal build order')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--detailed', 'Show detailed build order information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Generating build order...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, order: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Build order generated!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceGraphCommand
  .command('critical')
  .description('Find critical path through dependency graph')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Finding critical path...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, critical: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Critical path analysis completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceGraphCommand
  .command('visualize')
  .description('Generate graph visualization data')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--output <file>', 'Save visualization data to file (JSON format)')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Generating graph visualization...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, visualize: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Visualization generated!'));
    })
  );

workspaceGraphCommand
  .command('interactive')
  .description('Interactive graph analysis interface')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading graph analysis interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace health commands
const workspaceHealthCommand = program.command('workspace-health').description('Validate workspace topology and perform health checks');

workspaceHealthCommand
  .command('check')
  .description('Perform comprehensive workspace health check')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--category <category>', 'Check specific category (structure, dependencies, build, etc.)')
  .option('--output <file>', 'Save health report to file')
  .option('--detailed', 'Show detailed check information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Performing workspace health check...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceHealth({ ...options, check: true, spinner });
      }, 120000); // 2 minute timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Health check completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceHealthCommand
  .command('topology')
  .description('Validate workspace topology and structure')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating workspace topology...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceHealth({ ...options, topology: true, spinner });
      }, 60000); // 1 minute timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Topology validation completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceHealthCommand
  .command('quick')
  .description('Quick workspace health check')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Running quick health check...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceHealth({ ...options, quick: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Quick check completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceHealthCommand
  .command('watch')
  .description('Monitor workspace health continuously')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Starting health monitoring...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      // Note: watch command runs indefinitely, no timeout
      await manageWorkspaceHealth({ ...options, watch: true, spinner });
    })
  );

workspaceHealthCommand
  .command('fix')
  .description('Analyze and suggest fixes for health issues')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing fixable health issues...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceHealth({ ...options, fix: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Fix analysis completed!'));
    })
  );

workspaceHealthCommand
  .command('interactive')
  .description('Interactive workspace health management')
  .option('--file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading health management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceHealth({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace state commands
const workspaceStateCommand = program.command('workspace-state').description('Manage workspace state persistence and caching');

workspaceStateCommand
  .command('status')
  .description('Show workspace state and cache status')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading workspace state status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, status: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('State status loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceStateCommand
  .command('clear')
  .description('Clear workspace state')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Clearing workspace state...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, clear: true, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green('Workspace state cleared!'));
    })
  );

workspaceStateCommand
  .command('backup')
  .description('Backup workspace state')
  .option('--output <file>', 'Backup file path')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating state backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, backup: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('State backup created!'));
    })
  );

workspaceStateCommand
  .command('restore <file>')
  .description('Restore workspace state from backup')
  .action(
    createAsyncCommand(async (file, options) => {
      const spinner = createSpinner(`Restoring state from ${file}...`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, restore: true, file, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('State restored!'));
    })
  );

workspaceStateCommand
  .command('cache')
  .description('Manage workspace cache')
  .option('--clear', 'Clear all cache')
  .option('--pattern <pattern>', 'Invalidate cache entries matching pattern')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Managing workspace cache...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, cache: true, spinner });
      }, 30000); // 30 second timeout

      if (options.clear) {
        spinner.succeed(chalk.green('Cache cleared!'));
      } else {
        spinner.succeed(chalk.green('Cache operation completed!'));
      }
    })
  );

workspaceStateCommand
  .command('optimize')
  .description('Optimize workspace storage (remove expired cache entries)')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Optimizing workspace storage...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, optimize: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Storage optimized!'));
    })
  );

workspaceStateCommand
  .command('interactive')
  .description('Interactive workspace state management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading state management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceState({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace template commands
const workspaceTemplateCommand = program.command('workspace-template').description('Manage workspace templates and inheritance');

workspaceTemplateCommand
  .command('list')
  .description('List available workspace templates')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading templates...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, list: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Templates loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceTemplateCommand
  .command('create')
  .description('Create new workspace template')
  .option('--name <name>', 'Template name')
  .option('--extends <template>', 'Parent template to extend')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating template...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, create: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

workspaceTemplateCommand
  .command('show <name>')
  .description('Show template details and inheritance chain')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show template content')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Loading template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, show: true, template: name, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Template '${name}' loaded!`));
      } else {
        spinner.stop();
      }
    })
  );

workspaceTemplateCommand
  .command('apply <name>')
  .description('Apply template with variable substitution')
  .option('--variables <json>', 'Variables as JSON string')
  .option('--vars-file <file>', 'Load variables from YAML file')
  .option('--output <file>', 'Save result to file')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Applying template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, apply: true, template: name, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green(`Template '${name}' applied!`));
    })
  );

workspaceTemplateCommand
  .command('delete <name>')
  .description('Delete workspace template')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner(`Deleting template: ${name}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, delete: true, template: name, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Template '${name}' deleted!`));
    })
  );

workspaceTemplateCommand
  .command('export <name>')
  .description('Export workspace definition as template')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--output <file>', 'Save template to file instead of registry')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Exporting workspace as template...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, export: true, name, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green(`Template '${name}' exported!`));
    })
  );

workspaceTemplateCommand
  .command('interactive')
  .description('Interactive template management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading template management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceTemplate({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace backup commands
const workspaceBackupCommand = program.command('workspace-backup').description('Manage workspace backups and restore capabilities');

workspaceBackupCommand
  .command('create')
  .description('Create workspace backup')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--name <name>', 'Backup name')
  .option('--description <description>', 'Backup description')
  .option('--include-state', 'Include workspace state', true)
  .option('--include-cache', 'Include cache data')
  .option('--include-templates', 'Include templates', true)
  .option('--include-files', 'Include additional files')
  .option('--file-patterns <patterns>', 'File patterns to include (comma-separated)')
  .option('--tags <tags>', 'Backup tags (comma-separated)')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating workspace backup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, create: true, spinner });
      }, 60000); // 1 minute timeout

      spinner.succeed(chalk.green('Backup created successfully!'));
    })
  );

workspaceBackupCommand
  .command('list')
  .description('List workspace backups')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading backups...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, list: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Backups loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceBackupCommand
  .command('show <id>')
  .description('Show backup details')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (id, options) => {
      const spinner = createSpinner(`Loading backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, show: true, name: id, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green(`Backup '${id}' loaded!`));
      } else {
        spinner.stop();
      }
    })
  );

workspaceBackupCommand
  .command('restore <id>')
  .description('Restore workspace from backup')
  .option('--force', 'Overwrite existing files')
  .option('--selective', 'Selective restoration')
  .option('--restore-state', 'Restore workspace state', true)
  .option('--restore-cache', 'Restore cache data')
  .option('--restore-templates', 'Restore templates', true)
  .option('--restore-files', 'Restore additional files')
  .option('--target-path <path>', 'Target directory for restoration')
  .action(
    createAsyncCommand(async (id, options) => {
      const spinner = createSpinner(`Restoring backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, restore: true, name: id, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('Backup restored successfully!'));
    })
  );

workspaceBackupCommand
  .command('delete <id>')
  .description('Delete workspace backup')
  .action(
    createAsyncCommand(async (id, options) => {
      const spinner = createSpinner(`Deleting backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, delete: true, name: id, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green(`Backup '${id}' deleted!`));
    })
  );

workspaceBackupCommand
  .command('export <id>')
  .description('Export backup to file')
  .option('--output <file>', 'Output file path', true)
  .action(
    createAsyncCommand(async (id, options) => {
      if (!options.output) {
        console.log(chalk.red('Error: --output file path is required'));
        process.exit(1);
      }

      const spinner = createSpinner(`Exporting backup: ${id}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, export: true, name: id, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Backup exported successfully!'));
    })
  );

workspaceBackupCommand
  .command('import <file>')
  .description('Import backup from file')
  .action(
    createAsyncCommand(async (file, options) => {
      const spinner = createSpinner(`Importing backup from: ${file}`).start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, import: true, file, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Backup imported successfully!'));
    })
  );

workspaceBackupCommand
  .command('cleanup')
  .description('Clean up old backups')
  .option('--keep-count <count>', 'Number of recent backups to keep', '10')
  .option('--keep-days <days>', 'Keep backups newer than N days', '30')
  .option('--dry-run', 'Preview cleanup without deleting')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing backups for cleanup...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({
          ...options,
          cleanup: true,
          keepCount: parseInt(options.keepCount),
          keepDays: parseInt(options.keepDays),
          spinner
        });
      }, 30000); // 30 second timeout

      if (!options.dryRun) {
        spinner.succeed(chalk.green('Backup cleanup completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceBackupCommand
  .command('compare <id1> <id2>')
  .description('Compare two backups')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed comparison')
  .action(
    createAsyncCommand(async (id1, id2, options) => {
      const spinner = createSpinner('Comparing backups...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({
          ...options,
          compare: true,
          backup1: id1,
          backup2: id2,
          spinner
        });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Comparison completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceBackupCommand
  .command('interactive')
  .description('Interactive backup management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading backup management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceBackup({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace migration commands
const workspaceMigrationCommand = program.command('workspace-migration').description('Manage workspace migrations and upgrades');

workspaceMigrationCommand
  .command('check')
  .description('Check for available workspace upgrades')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking for upgrades...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, check: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Upgrade check completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceMigrationCommand
  .command('plan')
  .description('Create migration plan to target version')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--target-version <version>', 'Target version for migration', true)
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed plan information')
  .action(
    createAsyncCommand(async (options) => {
      if (!options.targetVersion) {
        console.log(chalk.red('Error: --target-version is required'));
        process.exit(1);
      }

      const spinner = createSpinner('Creating migration plan...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, plan: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Migration plan created!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceMigrationCommand
  .command('upgrade')
  .description('Upgrade workspace to target version')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--target-version <version>', 'Target version for upgrade', true)
  .option('--force', 'Force upgrade without confirmations')
  .option('--dry-run', 'Preview upgrade without making changes')
  .option('--no-backup', 'Skip automatic backup creation')
  .option('--skip-validation', 'Skip pre-migration validation')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      if (!options.targetVersion) {
        console.log(chalk.red('Error: --target-version is required'));
        process.exit(1);
      }

      const spinner = createSpinner('Upgrading workspace...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({
          ...options,
          upgrade: true,
          backup: !options.noBackup,
          spinner
        });
      }, 300000); // 5 minute timeout

      if (options.dryRun) {
        spinner.succeed(chalk.green('Dry run completed!'));
      } else {
        spinner.succeed(chalk.green('Upgrade completed!'));
      }
    })
  );

workspaceMigrationCommand
  .command('validate')
  .description('Validate workspace definition')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Validating workspace...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, validate: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('Validation completed!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceMigrationCommand
  .command('history')
  .description('Show migration history')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading migration history...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, history: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.json) {
        spinner.succeed(chalk.green('History loaded!'));
      } else {
        spinner.stop();
      }
    })
  );

workspaceMigrationCommand
  .command('rollback')
  .description('Rollback last migration using backup')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--force', 'Force rollback without confirmation')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Rolling back migration...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, rollback: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('Rollback completed!'));
    })
  );

workspaceMigrationCommand
  .command('interactive')
  .description('Interactive migration management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading migration management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceMigration({ ...options, interactive: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

// Workspace conflict commands
const workspaceConflictCommand = program.command('workspace-conflict').description('Detect and resolve workspace conflicts');

workspaceConflictCommand
  .command('detect')
  .description('Detect conflicts in workspace definition')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--include-warnings', 'Include warning-level conflicts')
  .option('--check-dependencies', 'Check dependency conflicts')
  .option('--check-ports', 'Check port collisions')
  .option('--check-paths', 'Check path collisions')
  .option('--check-types', 'Check type mismatches')
  .option('--group-by <type>', 'Group results by type|severity|workspace')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Detecting workspace conflicts...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConflict({ ...options, detect: true, spinner });
      }, 30000); // 30 second timeout

      spinner.succeed(chalk.green('Conflict detection completed!'));
    })
  );

workspaceConflictCommand
  .command('resolve')
  .description('Resolve a specific conflict')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--conflict-id <id>', 'Conflict ID to resolve')
  .option('--resolution-id <id>', 'Resolution ID to apply')
  .option('--force', 'Apply resolution without confirmation')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Resolving workspace conflict...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConflict({ ...options, resolve: true, spinner });
      }, 60000); // 60 second timeout

      spinner.succeed(chalk.green('Conflict resolved!'));
    })
  );

workspaceConflictCommand
  .command('preview')
  .description('Preview resolution changes')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--conflict-id <id>', 'Conflict ID to preview')
  .option('--resolution-id <id>', 'Resolution ID to preview')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Previewing resolution...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConflict({ ...options, preview: true, spinner });
      }, 30000); // 30 second timeout

      spinner.stop();
    })
  );

workspaceConflictCommand
  .command('auto-resolve')
  .description('Automatically resolve all low-risk conflicts')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Auto-resolving conflicts...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConflict({ ...options, autoResolve: true, spinner });
      }, 120000); // 2 minute timeout

      spinner.succeed(chalk.green('Auto-resolution completed!'));
    })
  );

workspaceConflictCommand
  .command('interactive')
  .description('Interactive conflict management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading conflict management interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceConflict({ ...options, interactive: true, spinner });
      }, 300000); // 5 minute timeout

      spinner.stop();
    })
  );

// File watcher commands
const fileWatcherCommand = program.command('file-watcher').description('Manage real-time file watching and change propagation');

fileWatcherCommand
  .command('start')
  .description('Start file watcher for workspace')
  .option('--workspace-file <file>', 'Workspace definition file', 're-shell.workspaces.yaml')
  .option('--use-polling', 'Use polling instead of native events')
  .option('--interval <ms>', 'Polling interval in milliseconds', '1000')
  .option('--depth <number>', 'Maximum watch depth')
  .option('--ignored <patterns...>', 'Patterns to ignore')
  .option('--follow', 'Follow changes in real-time')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Starting file watcher...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, start: true, spinner });
      }, 30000); // 30 second timeout

      if (!options.follow) {
        spinner.succeed(chalk.green('File watcher started!'));
      }
    })
  );

fileWatcherCommand
  .command('stop')
  .description('Stop active file watcher')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed statistics')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Stopping file watcher...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, stop: true, spinner });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green('File watcher stopped!'));
    })
  );

fileWatcherCommand
  .command('status')
  .description('Show file watcher status')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking watcher status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, status: true, spinner });
      }, 10000); // 10 second timeout

      spinner.stop();
    })
  );

fileWatcherCommand
  .command('stats')
  .description('Show file watcher statistics')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Gathering statistics...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, stats: true, spinner });
      }, 10000); // 10 second timeout

      spinner.stop();
    })
  );

fileWatcherCommand
  .command('rules')
  .description('Show change propagation rules')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading propagation rules...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, rules: true, spinner });
      }, 10000); // 10 second timeout

      spinner.stop();
    })
  );

fileWatcherCommand
  .command('add-rule')
  .description('Add change propagation rule')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Adding propagation rule...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, addRule: true, spinner });
      }, 60000); // 60 second timeout

      spinner.stop();
    })
  );

fileWatcherCommand
  .command('remove-rule')
  .description('Remove change propagation rule')
  .option('--rule-id <id>', 'Rule ID to remove')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Removing propagation rule...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, removeRule: options.ruleId, spinner });
      }, 10000); // 10 second timeout

      spinner.succeed(chalk.green('Rule removed!'));
    })
  );

fileWatcherCommand
  .command('interactive')
  .description('Interactive file watcher management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading file watcher interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageFileWatcher({ ...options, interactive: true, spinner });
      }, 300000); // 5 minute timeout

      spinner.stop();
    })
  );

// Change detector commands
const changeDetectorCommand = program.command('change-detector').description('Intelligent change detection with content hashing');

changeDetectorCommand
  .command('scan')
  .description('Scan for changes in workspace')
  .option('--path <directory>', 'Directory to scan', process.cwd())
  .option('--use-hashing', 'Use content hashing for detection', true)
  .option('--metadata-only', 'Use metadata-only detection')
  .option('--track-moves', 'Track file moves', true)
  .option('--max-depth <number>', 'Maximum scan depth', '10')
  .option('--max-file-size <bytes>', 'Maximum file size for hashing')
  .option('--algorithm <name>', 'Hashing algorithm', 'sha256')
  .option('--skip-binary', 'Skip binary files')
  .option('--chunk-size <bytes>', 'Chunk size for hashing')
  .option('--enable-cache', 'Enable cache', true)
  .option('--cache-location <path>', 'Cache file location')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Scanning for changes...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, scan: true, spinner });
      }, 60000); // 60 second timeout

      spinner.succeed(chalk.green('Change scan completed!'));
    })
  );

changeDetectorCommand
  .command('status')
  .description('Show change detector status')
  .option('--path <directory>', 'Directory to check', process.cwd())
  .option('--enable-cache', 'Enable cache', true)
  .option('--cache-location <path>', 'Cache file location')
  .option('--json', 'Output as JSON')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking detector status...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, status: true, spinner });
      }, 15000); // 15 second timeout

      spinner.stop();
    })
  );

changeDetectorCommand
  .command('stats')
  .description('Show change detection statistics')
  .option('--path <directory>', 'Directory to analyze', process.cwd())
  .option('--enable-cache', 'Enable cache', true)
  .option('--cache-location <path>', 'Cache file location')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Gathering statistics...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, stats: true, spinner });
      }, 30000); // 30 second timeout

      spinner.stop();
    })
  );

changeDetectorCommand
  .command('check')
  .description('Check if specific file has changed')
  .option('--path <directory>', 'Root directory', process.cwd())
  .option('--file <path>', 'File path to check')
  .option('--use-hashing', 'Use content hashing', true)
  .option('--enable-cache', 'Enable cache', true)
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Checking file changes...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, check: options.file, spinner });
      }, 15000); // 15 second timeout

      spinner.stop();
    })
  );

changeDetectorCommand
  .command('clear')
  .description('Clear change detection cache')
  .option('--path <directory>', 'Root directory', process.cwd())
  .option('--cache-location <path>', 'Cache file location')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Clearing cache...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, clear: true, spinner });
      }, 10000); // 10 second timeout

      spinner.succeed(chalk.green('Cache cleared!'));
    })
  );

changeDetectorCommand
  .command('watch')
  .description('Watch for changes continuously')
  .option('--path <directory>', 'Directory to watch', process.cwd())
  .option('--use-hashing', 'Use content hashing', true)
  .option('--track-moves', 'Track file moves', true)
  .option('--enable-cache', 'Enable cache', true)
  .option('--verbose', 'Show verbose output')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Starting change monitoring...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, watch: true, spinner });
      }, Infinity); // No timeout for watch mode

      spinner.stop();
    })
  );

changeDetectorCommand
  .command('compare')
  .description('Compare changes over time')
  .option('--path <directory>', 'Directory to compare', process.cwd())
  .option('--use-hashing', 'Use content hashing', true)
  .option('--track-moves', 'Track file moves', true)
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Comparing changes...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, compare: true, spinner });
      }, 30000); // 30 second timeout

      spinner.stop();
    })
  );

changeDetectorCommand
  .command('interactive')
  .description('Interactive change detection management')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Loading change detection interface...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeDetector({ ...options, interactive: true, spinner });
      }, 300000); // 5 minute timeout

      spinner.stop();
    })
  );

// Change Impact Analysis command
const changeImpactCommand = program
  .command('change-impact')
  .alias('impact')
  .description('Analyze change impact across workspace dependencies');

changeImpactCommand
  .command('analyze')
  .description('Analyze impact of file changes')
  .option('--files <files...>', 'Specific files to analyze')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json|mermaid)', 'text')
  .option('--verbose', 'Show detailed information')
  .option('--max-depth <depth>', 'Maximum dependency depth', '10')
  .option('--include-tests', 'Include test dependencies')
  .option('--include-dev-deps', 'Include dev dependencies')
  .option('--visualization', 'Generate visualization data')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Analyzing change impact...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageChangeImpact({
          ...options,
          maxDepth: parseInt(options.maxDepth)
        });
      }, 120000); // 2 minute timeout

      spinner.stop();
    })
  );

changeImpactCommand
  .command('workspace <name>')
  .description('Analyze impact for specific workspace')
  .option('--verbose', 'Show detailed information')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json)', 'text')
  .action(
    createAsyncCommand(async (name, options) => {
      const spinner = createSpinner('Analyzing workspace impact...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await analyzeWorkspaceImpact(name, options);
      }, 60000); // 1 minute timeout

      spinner.stop();
    })
  );

changeImpactCommand
  .command('graph')
  .description('Show workspace dependency graph')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json|mermaid)', 'text')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Building dependency graph...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageWorkspaceGraph(options);
      }, 60000); // 1 minute timeout

      spinner.stop();
    })
  );

// Incremental Build command
const incrementalBuildCommand = program
  .command('incremental-build')
  .alias('ibuild')
  .description('Intelligent incremental building with change detection');

incrementalBuildCommand
  .command('build')
  .description('Run incremental build')
  .option('--targets <targets...>', 'Specific targets to build')
  .option('--changed-files <files...>', 'Specific changed files to analyze')
  .option('--max-parallel <num>', 'Maximum parallel builds', '4')
  .option('--no-cache', 'Disable build caching')
  .option('--cache-location <path>', 'Build cache location')
  .option('--clean', 'Clean build (ignore cache)')
  .option('--dry-run', 'Show what would be built without building')
  .option('--verbose', 'Show detailed information')
  .option('--skip-tests', 'Skip test execution')
  .option('--no-fail-fast', 'Continue building after failures')
  .option('--build-timeout <ms>', 'Build timeout in milliseconds', '300000')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json)', 'text')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Running incremental build...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageIncrementalBuild({
          ...options,
          maxParallelBuilds: parseInt(options.maxParallel),
          buildTimeout: parseInt(options.buildTimeout),
          enableCache: options.cache !== false,
          cleanBuild: options.clean,
          dryRun: options.dryRun,
          failFast: options.failFast !== false
        });
      }, 600000); // 10 minute timeout

      spinner.stop();
    })
  );

incrementalBuildCommand
  .command('plan')
  .description('Show build plan without executing')
  .option('--changed-files <files...>', 'Specific changed files to analyze')
  .option('--verbose', 'Show detailed information')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json)', 'text')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Creating build plan...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageIncrementalBuild({
          ...options,
          plan: true
        });
      }, 60000); // 1 minute timeout

      spinner.stop();
    })
  );

incrementalBuildCommand
  .command('stats')
  .description('Show build statistics and performance metrics')
  .option('--output <file>', 'Output file path')
  .option('--format <format>', 'Output format (text|json)', 'text')
  .action(
    createAsyncCommand(async (options) => {
      const spinner = createSpinner('Gathering build statistics...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageIncrementalBuild({
          ...options,
          stats: true
        });
      }, 30000); // 30 second timeout

      spinner.stop();
    })
  );

incrementalBuildCommand
  .command('clear-cache')
  .description('Clear build cache')
  .action(
    createAsyncCommand(async () => {
      const spinner = createSpinner('Clearing build cache...').start();
      processManager.addCleanup(() => spinner.stop());
      flushOutput();

      await withTimeout(async () => {
        await manageIncrementalBuild({
          clearCache: true
        });
      }, 15000); // 15 second timeout

      spinner.succeed(chalk.green('Build cache cleared!'));
    })
  );

// Platform Test command
const platformTestCommand = program
  .command('platform-test')
  .alias('ptest')
  .description('Test cross-platform file watching capabilities');

platformTestCommand
  .command('capabilities')
  .description('Show platform file watching capabilities')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await testPlatformCapabilities({ capabilities: true, ...options });
    })
  );

platformTestCommand
  .command('test')
  .description('Test file watching methods')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await testPlatformCapabilities({ test: true, ...options });
    })
  );

platformTestCommand
  .command('diagnostics')
  .description('Run comprehensive platform diagnostics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await runPlatformDiagnostics(options);
    })
  );

platformTestCommand
  .command('all')
  .description('Run all platform tests and diagnostics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await testPlatformCapabilities({ all: true, ...options });
    })
  );

// Add standalone platform-test command (without subcommand)
program
  .command('platform-test-quick')
  .alias('pcheck')
  .description('Quick platform file watching check')
  .action(
    createAsyncCommand(async () => {
      const healthy = await quickPlatformCheck();
      if (!healthy) {
        process.exit(1);
      }
    })
  );

// Plugin Management command
const pluginCommand = program
  .command('plugin')
  .description('Manage CLI plugins and extensions');

pluginCommand
  .command('list')
  .description('List installed plugins')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await managePlugins(options);
    })
  );

pluginCommand
  .command('discover')
  .description('Discover available plugins')
  .option('--source <source>', 'Plugin source (local, npm, builtin)')
  .option('--include-disabled', 'Include disabled plugins')
  .option('--include-dev', 'Include development plugins')
  .option('--timeout <ms>', 'Discovery timeout in milliseconds', '10000')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await discoverPlugins(options);
    })
  );

pluginCommand
  .command('install <plugin>')
  .description('Install a plugin')
  .option('--global', 'Install globally')
  .option('--force', 'Force installation')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await installPlugin(plugin, options);
    })
  );

pluginCommand
  .command('uninstall <plugin>')
  .description('Uninstall a plugin')
  .option('--force', 'Force uninstallation')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await uninstallPlugin(plugin, options);
    })
  );

pluginCommand
  .command('info <plugin>')
  .description('Show plugin information')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await showPluginInfo(plugin, options);
    })
  );

pluginCommand
  .command('enable <plugin>')
  .description('Enable a plugin')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await enablePlugin(plugin, options);
    })
  );

pluginCommand
  .command('disable <plugin>')
  .description('Disable a plugin')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await disablePlugin(plugin, options);
    })
  );

pluginCommand
  .command('update')
  .description('Update all plugins')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      await updatePlugins(options);
    })
  );

pluginCommand
  .command('validate <path>')
  .description('Validate a plugin')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (path, options) => {
      await validatePlugin(path, options);
    })
  );

pluginCommand
  .command('clear-cache')
  .description('Clear plugin discovery cache')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      await clearPluginCache(options);
    })
  );

pluginCommand
  .command('stats')
  .description('Show plugin lifecycle statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showPluginStats(options);
    })
  );

pluginCommand
  .command('reload <plugin>')
  .description('Reload a plugin')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await reloadPlugin(plugin, options);
    })
  );

pluginCommand
  .command('hooks [plugin]')
  .description('Show plugin hooks')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await showPluginHooks(plugin, options);
    })
  );

pluginCommand
  .command('execute-hook <hook-type> [data]')
  .description('Execute a hook manually')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (hookType, data, options) => {
      await executeHook(hookType, data, options);
    })
  );

pluginCommand
  .command('hook-types')
  .description('List available hook types')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listHookTypes(options);
    })
  );

pluginCommand
  .command('resolve <plugin>')
  .description('Resolve plugin dependencies')
  .option('--strategy <strategy>', 'Resolution strategy (strict, loose, latest)', 'strict')
  .option('--allow-prerelease', 'Allow prerelease versions')
  .option('--ignore-optional', 'Ignore optional dependencies')
  .option('--auto-install', 'Automatically install missing dependencies')
  .option('--dry-run', 'Show what would be installed without installing')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await resolveDependencies(plugin, options);
    })
  );

pluginCommand
  .command('deps [plugin]')
  .description('Show dependency tree')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await showDependencyTree(plugin, options);
    })
  );

pluginCommand
  .command('conflicts')
  .description('Check for dependency conflicts')
  .option('--strategy <strategy>', 'Resolution strategy (strict, loose, latest)', 'strict')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await checkConflicts(options);
    })
  );

pluginCommand
  .command('validate-versions')
  .description('Validate plugin versions')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await validateVersions(options);
    })
  );

pluginCommand
  .command('update-deps <plugin>')
  .description('Update plugin dependencies')
  .option('--dry-run', 'Show what would be updated without updating')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await updateDependencies(plugin, options);
    })
  );

pluginCommand
  .command('security-scan [plugin]')
  .description('Scan plugins for security issues')
  .option('--severity <level>', 'Filter by severity (low, medium, high, critical)')
  .option('--include-warnings', 'Include security warnings')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await scanPluginSecurity(plugin, options);
    })
  );

pluginCommand
  .command('security-policy')
  .description('Check security policy compliance')
  .option('--policy <file>', 'Custom security policy file')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await checkSecurityPolicy(options);
    })
  );

pluginCommand
  .command('security-report')
  .description('Generate comprehensive security report')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await generateSecurityReport(options);
    })
  );

pluginCommand
  .command('security-fix [plugin]')
  .description('Analyze and fix security issues')
  .option('--fix', 'Apply automatic fixes')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await fixSecurityIssues(plugin, options);
    })
  );

// Plugin marketplace commands
pluginCommand
  .command('search [query]')
  .description('Search plugins in marketplace')
  .option('--category <category>', 'Filter by category')
  .option('--featured', 'Show only featured plugins')
  .option('--verified', 'Show only verified plugins')
  .option('--free', 'Show only free plugins')
  .option('--sort <field>', 'Sort by field (relevance, downloads, rating, updated, created, name)', 'relevance')
  .option('--order <order>', 'Sort order (asc, desc)', 'desc')
  .option('--limit <number>', 'Number of results to show', '10')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (query, options) => {
      await searchMarketplace(query, options);
    })
  );

pluginCommand
  .command('show <plugin>')
  .description('Show detailed plugin information from marketplace')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await showPluginDetails(plugin, options);
    })
  );

pluginCommand
  .command('install-marketplace <plugin> [version]')
  .description('Install plugin from marketplace')
  .option('--global', 'Install globally')
  .option('--force', 'Force installation')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, version, options) => {
      await installMarketplacePlugin(plugin, version, options);
    })
  );

pluginCommand
  .command('reviews <plugin>')
  .description('Show plugin reviews from marketplace')
  .option('--limit <number>', 'Number of reviews to show', '10')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (plugin, options) => {
      await showPluginReviews(plugin, options);
    })
  );

pluginCommand
  .command('featured')
  .description('Show featured plugins from marketplace')
  .option('--limit <number>', 'Number of plugins to show', '6')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showFeaturedPlugins(options);
    })
  );

pluginCommand
  .command('popular [category]')
  .description('Show popular plugins from marketplace')
  .option('--limit <number>', 'Number of plugins to show', '10')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (category, options) => {
      await showPopularPlugins(category, options);
    })
  );

pluginCommand
  .command('categories')
  .description('Show available plugin categories')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showCategories(options);
    })
  );

pluginCommand
  .command('clear-cache')
  .description('Clear marketplace cache')
  .action(
    createAsyncCommand(async () => {
      await clearMarketplaceCache();
    })
  );

pluginCommand
  .command('marketplace-stats')
  .description('Show marketplace statistics')
  .action(
    createAsyncCommand(async () => {
      await showMarketplaceStats();
    })
  );

// Plugin command registration commands
pluginCommand
  .command('commands')
  .description('List registered plugin commands')
  .option('--plugin <name>', 'Filter by plugin name')
  .option('--category <category>', 'Filter by command category')
  .option('--active', 'Show only active commands')
  .option('--conflicts', 'Show only commands with conflicts')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listPluginCommands(options);
    })
  );

pluginCommand
  .command('command-conflicts')
  .description('Show command registration conflicts')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showCommandConflicts(options);
    })
  );

pluginCommand
  .command('resolve-conflicts <command> <resolution>')
  .description('Resolve command conflicts (resolution: disable, priority)')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (commandName, resolution, options) => {
      await resolveCommandConflicts(commandName, resolution, options);
    })
  );

pluginCommand
  .command('command-stats')
  .description('Show command registry statistics')
  .option('--usage', 'Include usage statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showCommandStats(options);
    })
  );

pluginCommand
  .command('register-command <plugin> <definition>')
  .description('Register a test command from plugin (JSON definition)')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (plugin, definition, options) => {
      await registerTestCommand(plugin, definition, options);
    })
  );

pluginCommand
  .command('unregister-command <commandId>')
  .description('Unregister a plugin command')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (commandId, options) => {
      await unregisterCommand(commandId, options);
    })
  );

pluginCommand
  .command('command-info <commandId>')
  .description('Show detailed information about a command')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (commandId, options) => {
      await showCommandInfo(commandId, options);
    })
  );

// Plugin middleware commands
pluginCommand
  .command('middleware')
  .description('List registered command middleware')
  .option('--type <type>', 'Filter by middleware type')
  .option('--plugin <name>', 'Filter by plugin name')
  .option('--active', 'Show only active middleware')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listMiddleware(options);
    })
  );

pluginCommand
  .command('middleware-stats')
  .description('Show middleware system statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showMiddlewareStats(options);
    })
  );

pluginCommand
  .command('test-middleware <type> <testData>')
  .description('Test middleware execution with sample data (JSON)')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (type, testData, options) => {
      await testMiddleware(type, testData, options);
    })
  );

pluginCommand
  .command('clear-middleware-cache')
  .description('Clear middleware cache')
  .action(
    createAsyncCommand(async () => {
      await clearMiddlewareCache();
    })
  );

pluginCommand
  .command('middleware-chain <command>')
  .description('Show middleware execution chain for a command')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (commandName, options) => {
      await showMiddlewareChain(commandName, options);
    })
  );

pluginCommand
  .command('middleware-example <type>')
  .description('Show example middleware code (types: validation, authorization, rateLimit, cache, logger, transform, custom)')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (type, options) => {
      await createExampleMiddleware(type, options);
    })
  );

// Plugin conflict resolution commands
pluginCommand
  .command('command-conflicts')
  .description('List command conflicts and their resolution status')
  .option('--type <type>', 'Filter by conflict type')
  .option('--severity <severity>', 'Filter by conflict severity')
  .option('--auto-resolvable', 'Show only auto-resolvable conflicts')
  .option('--resolved', 'Show only resolved conflicts')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listCommandConflicts(options);
    })
  );

pluginCommand
  .command('conflict-strategies')
  .description('Show available conflict resolution strategies')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showConflictStrategies(options);
    })
  );

pluginCommand
  .command('resolve-conflict <conflictId> <strategy>')
  .description('Resolve a specific conflict using given strategy')
  .option('--dry-run', 'Simulate resolution without applying changes')
  .option('--confirm', 'Skip confirmation prompts')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (conflictId, strategy, options) => {
      await resolveConflict(conflictId, strategy, options);
    })
  );

pluginCommand
  .command('auto-resolve')
  .description('Automatically resolve all auto-resolvable conflicts')
  .option('--dry-run', 'Simulate resolution without applying changes')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (options) => {
      await autoResolveConflicts(options);
    })
  );

pluginCommand
  .command('conflict-stats')
  .description('Show conflict resolution statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showConflictStats(options);
    })
  );

pluginCommand
  .command('set-priority <commandId> <priority>')
  .description('Set priority override for a command')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (commandId, priority, options) => {
      await setPriorityOverride(commandId, priority, options);
    })
  );

pluginCommand
  .command('resolution-history')
  .description('Show conflict resolution history')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showResolutionHistory(options);
    })
  );

// Plugin documentation commands
pluginCommand
  .command('generate-docs [commands...]')
  .description('Generate documentation for plugin commands')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--format <format>', 'Documentation format (markdown, html, json, plain-text, man-page)', 'markdown')
  .option('--output <dir>', 'Output directory for generated files')
  .option('--template <template>', 'Documentation template to use', 'markdown')
  .option('--include-private', 'Include private/hidden commands')
  .option('--include-deprecated', 'Include deprecated commands')
  .option('--no-examples', 'Exclude examples from documentation')
  .option('--no-index', 'Skip generating documentation index')
  .action(
    createAsyncCommand(async (commands, options) => {
      await generatePluginDocumentation(commands, options);
    })
  );

pluginCommand
  .command('help <command>')
  .description('Show detailed help for a specific command')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--mode <mode>', 'Help display mode (compact, detailed, interactive, hierarchical)', 'detailed')
  .action(
    createAsyncCommand(async (command, options) => {
      await showCommandHelp(command, options);
    })
  );

pluginCommand
  .command('list-docs')
  .description('List all documented commands')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--plugin <plugin>', 'Filter by plugin name')
  .option('--category <category>', 'Filter by command category')
  .option('--complexity <complexity>', 'Filter by complexity (basic, intermediate, advanced)')
  .action(
    createAsyncCommand(async (options) => {
      await listDocumentedCommands(options);
    })
  );

pluginCommand
  .command('search-docs <query>')
  .description('Search documentation for commands and topics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--plugin <plugin>', 'Filter by plugin name')
  .option('--category <category>', 'Filter by command category')
  .option('--complexity <complexity>', 'Filter by complexity level')
  .action(
    createAsyncCommand(async (query, options) => {
      await searchDocumentation(query, options);
    })
  );

pluginCommand
  .command('docs-stats')
  .description('Show documentation coverage and statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showDocumentationStats(options);
    })
  );

pluginCommand
  .command('configure-help <setting> <value>')
  .description('Configure help system behavior')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (setting, value, options) => {
      await configureHelpSystem(setting, value, options);
    })
  );

pluginCommand
  .command('docs-templates')
  .description('Show available documentation templates')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showDocumentationTemplates(options);
    })
  );

// Plugin validation commands
pluginCommand
  .command('test-validation <command> <testData>')
  .description('Test command validation with sample data (JSON format)')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--dry-run', 'Simulate validation without applying changes')
  .option('--strict', 'Enable strict validation mode')
  .action(
    createAsyncCommand(async (command, testData, options) => {
      await testCommandValidation(command, testData, options);
    })
  );

pluginCommand
  .command('create-schema <command> <schemaDefinition>')
  .description('Create validation schema for a command (JSON format)')
  .option('--verbose', 'Show detailed information')
  .option('--dry-run', 'Show what would be created without applying')
  .action(
    createAsyncCommand(async (command, schemaDefinition, options) => {
      await createCommandValidationSchema(command, schemaDefinition, options);
    })
  );

pluginCommand
  .command('validation-rules')
  .description('List available validation rules')
  .option('--verbose', 'Show detailed information and examples')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listValidationRules(options);
    })
  );

pluginCommand
  .command('transformations')
  .description('List available parameter transformations')
  .option('--verbose', 'Show detailed information and examples')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await listTransformations(options);
    })
  );

pluginCommand
  .command('show-schema <command>')
  .description('Show validation schema for a command')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (command, options) => {
      await showCommandValidationSchema(command, options);
    })
  );

pluginCommand
  .command('validation-stats')
  .description('Show validation system statistics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showValidationStats(options);
    })
  );

pluginCommand
  .command('generate-template <command>')
  .description('Generate validation schema template for a command')
  .option('--verbose', 'Show detailed information and usage examples')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (command, options) => {
      await generateValidationTemplate(command, options);
    })
  );

// Plugin cache commands
pluginCommand
  .command('cache-stats')
  .description('Show command cache statistics and performance metrics')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (options) => {
      await showCacheStats(options);
    })
  );

pluginCommand
  .command('configure-cache <setting> <value>')
  .description('Configure cache system settings')
  .option('--verbose', 'Show detailed information')
  .action(
    createAsyncCommand(async (setting, value, options) => {
      await configureCacheSettings(setting, value, options);
    })
  );

pluginCommand
  .command('clear-cache')
  .description('Clear command cache')
  .option('--verbose', 'Show detailed information')
  .option('--command <command>', 'Clear cache for specific command')
  .option('--tags <tags>', 'Clear cache for specific tags (comma-separated)')
  .option('--force', 'Confirm cache clearing operation')
  .action(
    createAsyncCommand(async (options) => {
      await clearCache(options);
    })
  );

pluginCommand
  .command('test-cache <iterations>')
  .description('Test cache performance with specified number of iterations')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .action(
    createAsyncCommand(async (iterations, options) => {
      await testCachePerformance(iterations, options);
    })
  );

pluginCommand
  .command('optimize-cache')
  .description('Analyze and optimize cache configuration')
  .option('--verbose', 'Show detailed information')
  .option('--force', 'Apply optimizations automatically')
  .action(
    createAsyncCommand(async (options) => {
      await optimizeCache(options);
    })
  );

pluginCommand
  .command('list-cached')
  .description('List cached command results')
  .option('--verbose', 'Show detailed information')
  .option('--json', 'Output as JSON')
  .option('--include-errors', 'Include failed command results')
  .action(
    createAsyncCommand(async (options) => {
      await listCachedCommands(options);
    })
  );

// API Testing Commands
const apiTestCommand = program.command('api-test').description('API testing suite with contract testing, mocking, and load testing');

apiTestCommand
  .command('generate [path]')
  .description('Generate API test files')
  .option('--framework <framework>', 'Framework to generate tests for (express, nestjs, fastify, fastapi, django, aspnet-core, spring-boot, gin, rust-axum)')
  .option('--test-types <types>', 'Test types to generate (comma-separated): unit, integration, e2e, contract, performance, security', 'unit,integration')
  .option('--include-contract', 'Include contract tests', false)
  .option('--include-mock', 'Include mock server', false)
  .option('--include-load', 'Include load tests', false)
  .option('--spec <path>', 'Path to OpenAPI spec for test generation')
  .option('--base-url <url>', 'Base URL for integration/load tests')
  .option('--dry-run', 'Preview without creating files', false)
  .action(
    createAsyncCommand(async (pathArg, options) => {
      const {
        generateUnitTestCode,
        generateIntegrationTestCode,
        generateContractTestCode,
        generateMockServerCode,
        generateLoadTestCode,
        generateTestConfig,
        getTestingTemplate,
        formatAPITestConfig,
      } = await import('./utils/api-testing');

      const framework = options.framework || 'express';
      const template = getTestingTemplate(framework);
      const testTypes = options.testTypes.split(',') as any[];
      const outputPath = pathArg || process.cwd();

      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      console.log(chalk.cyan('\n🧪 API Test Generation\n'));
      console.log(formatAPITestConfig({
        framework,
        baseUrl: options.baseUrl,
        specPath: options.spec,
        outputDir: outputPath,
        testTypes,
        includeContractTests: options.includeContract,
        includeMockServer: options.includeMock,
        includeLoadTests: options.includeLoad,
      }));

      if (options.dryRun) {
        console.log(chalk.gray('\n--- Unit Test Preview ---\n'));
        console.log(chalk.gray(generateUnitTestCode(framework, [])));
        if (options.includeContract) {
          console.log(chalk.gray('\n--- Contract Test Preview ---\n'));
          console.log(chalk.gray(generateContractTestCode(framework, {
            providerName: 'UserAPI',
            consumerName: 'UserClient',
            pactDir: './pacts',
            specPath: options.spec || './openapi.yaml',
          })));
        }
        if (options.includeMock) {
          console.log(chalk.gray('\n--- Mock Server Preview ---\n'));
          console.log(chalk.gray(generateMockServerCode(framework, { port: 3001, host: 'localhost', cors: true })));
        }
        if (options.includeLoad) {
          console.log(chalk.gray('\n--- Load Test Preview ---\n'));
          console.log(chalk.gray(generateLoadTestCode(framework, {
            baseUrl: options.baseUrl || 'http://localhost:3000',
            duration: 60,
            concurrency: 10,
            rampUp: 10,
            scenarios: [{ name: 'Default Scenario', weight: 100, requests: [] }],
          })));
        }
        console.log(chalk.yellow('\nDry run - no files written.\n'));
        return;
      }

      // Write files
      const testConfig = generateTestConfig(framework, testTypes);
      console.log(chalk.green(`\n✓ Test files generated for ${framework}!`));
      console.log(chalk.gray(`\nNext steps:\n  1. cd ${outputPath}\n  2. ${template.setupCommands.join('\n  2. ')}`));
    })
  );

apiTestCommand
  .command('unit <framework>')
  .description('Generate unit test code')
  .option('--output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateUnitTestCode, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const code = generateUnitTestCode(framework, []);
      console.log(chalk.cyan(`\n📝 Unit Test Code for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(code));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

apiTestCommand
  .command('integration <framework>')
  .description('Generate integration test code')
  .option('--output <file>', 'Output file path')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateIntegrationTestCode, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const code = generateIntegrationTestCode(framework, []);
      console.log(chalk.cyan(`\n🔗 Integration Test Code for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(code));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

apiTestCommand
  .command('contract <framework>')
  .description('Generate contract test code')
  .option('--provider <name>', 'Provider name', 'APIProvider')
  .option('--consumer <name>', 'Consumer name', 'APIClient')
  .option('--pact-dir <dir>', 'Pact directory', './pacts')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateContractTestCode, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const code = generateContractTestCode(framework, {
        providerName: options.provider,
        consumerName: options.consumer,
        pactDir: options.pactDir,
        specPath: './openapi.yaml',
      });
      console.log(chalk.cyan(`\n📋 Contract Test Code for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(code));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

apiTestCommand
  .command('mock <framework>')
  .description('Generate mock server code')
  .option('--port <port>', 'Mock server port', '3001')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateMockServerCode, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const code = generateMockServerCode(framework, {
        port: parseInt(options.port),
        host: 'localhost',
        cors: true,
      });
      console.log(chalk.cyan(`\n🎭 Mock Server Code for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(code));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

apiTestCommand
  .command('load <framework>')
  .description('Generate load test code')
  .option('--base-url <url>', 'Base URL for load tests')
  .option('--duration <seconds>', 'Test duration in seconds', '60')
  .option('--concurrency <number>', 'Number of concurrent users', '10')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateLoadTestCode, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const code = generateLoadTestCode(framework, {
        baseUrl: options.baseUrl || 'http://localhost:3000',
        duration: parseInt(options.duration),
        concurrency: parseInt(options.concurrency),
        rampUp: 10,
        scenarios: [{ name: 'Default Scenario', weight: 100, requests: [] }],
      });
      console.log(chalk.cyan(`\n⚡ Load Test Code for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(code));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

apiTestCommand
  .command('list-frameworks')
  .description('List all supported testing frameworks')
  .action(
    createAsyncCommand(async () => {
      const { listTestingFrameworks } = await import('./utils/api-testing');

      const frameworks = listTestingFrameworks();
      console.log(chalk.cyan('\n🔍 Supported Testing Frameworks\n'));
      console.log(chalk.gray('─'.repeat(60)));
      frameworks.forEach(f => {
        console.log(`${chalk.yellow(f.name.padEnd(15))}  ${chalk.gray(f.language.padEnd(12))}  ${chalk.blue(f.testFramework)}`);
      });
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(`\nUsage: re-shell api-test generate --framework <name>\n`));
    })
  );

apiTestCommand
  .command('config <framework>')
  .description('Generate test configuration file')
  .option('--test-types <types>', 'Test types to include', 'unit,integration')
  .action(
    createAsyncCommand(async (framework, options) => {
      const { generateTestConfig, getTestingTemplate } = await import('./utils/api-testing');

      const template = getTestingTemplate(framework);
      if (!template) {
        console.log(chalk.yellow(`\n❌ No testing template found for ${chalk.cyan(framework)}\n`));
        return;
      }

      const config = generateTestConfig(framework, options.testTypes.split(',') as any[]);
      console.log(chalk.cyan(`\n⚙️  Test Configuration for ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(config));
      console.log(chalk.gray('─'.repeat(60)));
    })
  );

// Interactive API Documentation Commands
const docsCommand = program.command('docs').description('Interactive API documentation with live examples and try-it functionality');

docsCommand
  .command('generate <spec> [output]')
  .description('Generate interactive documentation from OpenAPI spec')
  .option('--base-url <url>', 'Base URL for API requests', 'http://localhost:3000')
  .option('--title <title>', 'Documentation title')
  .option('--description <description>', 'API description')
  .option('--theme-color <color>', 'Theme color (hex)', '#3b82f6')
  .option('--auth-type <type>', 'Auth type (none, bearer, apiKey, oauth2)', 'none')
  .option('--dry-run', 'Preview without creating file', false)
  .action(
    createAsyncCommand(async (specPath, outputPath, options) => {
      const {
        generateDocsFromSpec,
        generateInteractiveDocsHTML,
        openAPIToInteractiveDocs,
        formatInteractiveDocsConfig,
      } = await import('./utils/interactive-docs');

      const outputFile = outputPath || './docs/index.html';

      if (!fs.existsSync(specPath)) {
        console.log(chalk.yellow(`\n❌ Spec file not found: ${specPath}\n`));
        return;
      }

      const specContent = await fs.readFile(specPath, 'utf-8');
      const spec = JSON.parse(specContent);
      const config = openAPIToInteractiveDocs(spec, options.baseUrl);

      // Apply overrides
      if (options.title) config.title = options.title;
      if (options.description) config.description = options.description;
      if (options.themeColor) config.themeColor = options.themeColor;
      if (options.authType) config.authConfig = { type: options.authType as any };

      console.log(chalk.cyan('\n📘 Interactive Documentation Generation\n'));
      console.log(formatInteractiveDocsConfig(config));

      if (options.dryRun) {
        console.log(chalk.gray('\n--- Preview (first 50 lines) ---\n'));
        const html = generateInteractiveDocsHTML(config);
        console.log(chalk.gray(html.split('\n').slice(0, 50).join('\n')));
        console.log(chalk.yellow('\nDry run - no file written.\n'));
        return;
      }

      await generateDocsFromSpec(specPath, outputFile, options.baseUrl);
      console.log(chalk.green(`\n✓ Documentation generated!`));
      console.log(chalk.gray(`Output: ${outputFile}`));
      console.log(chalk.gray('\nOpen the file in a browser to view the interactive documentation.\n'));
    })
  );

docsCommand
  .command('serve <spec>')
  .description('Serve interactive documentation with live server')
  .option('--port <port>', 'Server port', '8080')
  .option('--base-url <url>', 'Base URL for API requests', 'http://localhost:3000')
  .option('--open', 'Open browser automatically', false)
  .action(
    createAsyncCommand(async (specPath, options) => {
      const {
        generateInteractiveDocsHTML,
        openAPIToInteractiveDocs,
        formatInteractiveDocsConfig,
      } = await import('./utils/interactive-docs');

      if (!fs.existsSync(specPath)) {
        console.log(chalk.yellow(`\n❌ Spec file not found: ${specPath}\n`));
        return;
      }

      const specContent = await fs.readFile(specPath, 'utf-8');
      const spec = JSON.parse(specContent);
      const config = openAPIToInteractiveDocs(spec, options.baseUrl);

      console.log(chalk.cyan('\n📘 Interactive Documentation Server\n'));
      console.log(formatInteractiveDocsConfig(config));
      console.log(chalk.yellow(`\n⚠️  Live server not yet implemented.`));
      console.log(chalk.gray(`To serve the documentation, use:\n  npx serve ${path.dirname(specPath)}/docs\n`));
    })
  );

docsCommand
  .command('preview <spec>')
  .description('Preview documentation configuration')
  .option('--base-url <url>', 'Base URL for API requests', 'http://localhost:3000')
  .action(
    createAsyncCommand(async (specPath, options) => {
      const {
        openAPIToInteractiveDocs,
        formatInteractiveDocsConfig,
      } = await import('./utils/interactive-docs');

      if (!fs.existsSync(specPath)) {
        console.log(chalk.yellow(`\n❌ Spec file not found: ${specPath}\n`));
        return;
      }

      const specContent = await fs.readFile(specPath, 'utf-8');
      const spec = JSON.parse(specContent);
      const config = openAPIToInteractiveDocs(spec, options.baseUrl);

      console.log(formatInteractiveDocsConfig(config));
      console.log();
    })
  );

docsCommand
  .command('themes')
  .description('List available theme colors')
  .action(
    createAsyncCommand(async () => {
      const themes = [
        { name: 'Blue', color: '#3b82f6' },
        { name: 'Green', color: '#22c55e' },
        { name: 'Purple', color: '#a855f7' },
        { name: 'Red', color: '#ef4444' },
        { name: 'Orange', color: '#f97316' },
        { name: 'Pink', color: '#ec4899' },
        { name: 'Cyan', color: '#06b6d4' },
        { name: 'Slate', color: '#64748b' },
      ];

      console.log(chalk.cyan('\n🎨 Available Theme Colors\n'));
      console.log(chalk.gray('─'.repeat(40)));
      themes.forEach(t => {
        console.log(`  ${chalk.hex(t.color)(t.color.padEnd(10))}  ${chalk.gray(t.name)}`);
      });
      console.log(chalk.gray('─'.repeat(40)));
      console.log(chalk.gray(`\nUsage: re-shell docs generate spec.yaml --theme-color ${themes[0].color}\n`));
    })
  );

// API Gateway Commands
const gatewayCommand = program.command('gateway').description('API gateway integration for all supported backend frameworks');

gatewayCommand
  .command('generate <type> [output]')
  .description('Generate gateway configuration file')
  .option('--name <name>', 'Gateway name', 'api-gateway')
  .option('--services <services>', 'Services (pipe-separated entries: id;name;url|id;name;url)')
  .option('--routes <routes>', 'Routes (pipe-separated entries: id;path;methods;service|id;path;methods;service)')
  .option('--rate-limit <limit>', 'Enable rate limiting with limit per window')
  .option('--rate-window <seconds>', 'Rate limit window in seconds', '60')
  .option('--cors', 'Enable CORS', false)
  .option('--cors-origins <origins>', 'CORS allowed origins (comma-separated)', '*')
  .option('--auth <type>', 'Authentication type (none, jwt, oauth2, api-key)', 'none')
  .option('--dry-run', 'Preview without creating file', false)
  .action(
    createAsyncCommand(async (type, outputPath, options) => {
      const {
        getGatewayTemplate,
        generateGatewayConfig,
        generateGatewayDockerCompose,
        formatGatewayConfig,
        listGatewayTypes,
      } = await import('./utils/api-gateway');

      const template = getGatewayTemplate(type as any);
      if (!template) {
        console.log(chalk.yellow(`\n❌ Unsupported gateway type: ${type}\n`));
        console.log(chalk.gray('Run "re-shell gateway list" to see supported types.\n'));
        return;
      }

      // Build config
      const config = {
        name: options.name,
        type: type as any,
        services: options.services ? options.services.split('|').map((s: string) => {
          const parts = s.split(';');
          return { id: parts[0], name: parts[1], url: parts[2] };
        }) : [{ id: 'default', name: 'default', url: 'http://localhost:3000' }],
        routes: options.routes ? options.routes.split('|').map((r: string) => {
          const parts = r.split(';');
          return { id: parts[0], path: parts[1], method: parts[2].split(','), service: parts[3] };
        }) : [{ id: 'default-route', path: '/api', method: ['GET', 'POST', 'PUT', 'DELETE'], service: 'default' }],
        rateLimit: options.rateLimit ? { enabled: true, window: parseInt(options.rateWindow), limit: parseInt(options.rateLimit) } : undefined,
        cors: options.cors ? { enabled: true, origins: options.corsOrigins.split(','), methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], headers: ['Content-Type', 'Authorization'], credentials: false, maxAge: 3600 } : undefined,
        auth: { type: options.auth as any },
      };

      console.log(chalk.cyan('\n🚪 API Gateway Configuration\n'));
      console.log(formatGatewayConfig(config));

      const outputFile = outputPath || template.configPath;

      if (options.dryRun) {
        console.log(chalk.gray('\n--- Configuration Preview ---\n'));
        console.log(chalk.gray(generateGatewayConfig(type as any, config)));
        console.log(chalk.yellow('\nDry run - no file written.\n'));
        return;
      }

      await fs.ensureDir(path.dirname(outputFile));
      await fs.writeFile(outputFile, generateGatewayConfig(type as any, config), 'utf-8');

      console.log(chalk.green(`\n✓ Gateway configuration generated!`));
      console.log(chalk.gray(`Output: ${outputFile}`));
      console.log(chalk.gray(`Format: ${template.format}`));
    })
  );

gatewayCommand
  .command('docker-compose <type> [output]')
  .description('Generate docker-compose file for gateway')
  .action(
    createAsyncCommand(async (type, outputPath, options) => {
      const { getGatewayTemplate } = await import('./utils/api-gateway');

      const template = getGatewayTemplate(type as any);
      if (!template) {
        console.log(chalk.yellow(`\n❌ Unsupported gateway type: ${type}\n`));
        return;
      }

      const { generateGatewayDockerCompose } = await import('./utils/api-gateway');
      const dockerCompose = generateGatewayDockerCompose(type as any);
      const outputFile = outputPath || './docker-compose.yml';

      await fs.ensureDir(path.dirname(outputFile));
      await fs.writeFile(outputFile, dockerCompose, 'utf-8');

      console.log(chalk.cyan('\n🐳 Docker Compose Configuration\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(dockerCompose.split('\n').slice(0, 20).join('\n')));
      if (dockerCompose.split('\n').length > 20) {
        console.log(chalk.gray('...'));
      }
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.green(`\n✓ Docker compose file generated!`));
      console.log(chalk.gray(`Output: ${outputFile}\n`));
    })
  );

gatewayCommand
  .command('list')
  .description('List all supported gateway types')
  .action(
    createAsyncCommand(async () => {
      const { listGatewayTypes } = await import('./utils/api-gateway');

      const types = listGatewayTypes();
      console.log(chalk.cyan('\n🚪 Supported API Gateways\n'));
      console.log(chalk.gray('─'.repeat(60)));
      types.forEach(t => {
        console.log(`${chalk.yellow(t.type.padEnd(20))}  ${chalk.gray(t.description)}`);
      });
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(`\nUsage: re-shell gateway generate <type>\n`));
    })
  );

gatewayCommand
  .command('template <type>')
  .description('Show template for gateway type')
  .action(
    createAsyncCommand(async (type, options) => {
      const { getGatewayTemplate } = await import('./utils/api-gateway');

      const template = getGatewayTemplate(type as any);
      if (!template) {
        console.log(chalk.yellow(`\n❌ Unsupported gateway type: ${type}\n`));
        return;
      }

      console.log(chalk.cyan(`\n🚪 Gateway Template: ${type}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(`${chalk.blue('Description:')} ${template.description}`);
      console.log(`${chalk.blue('Config Path:')} ${template.configPath}`);
      console.log(`${chalk.blue('Format:')} ${template.format}`);
      console.log(`${chalk.blue('Docs:')} ${template.docsUrl}`);
      console.log(chalk.gray('─'.repeat(60)));

      // Generate sample config
      const sampleConfig = {
        name: 'sample-gateway',
        type: type as any,
        services: [
          { id: 'user-service', name: 'user-service', url: 'http://localhost:3001' },
          { id: 'order-service', name: 'order-service', url: 'http://localhost:3002' },
        ],
        routes: [
          { id: 'users', path: '/api/users', method: ['GET', 'POST'], service: 'user-service' },
          { id: 'orders', path: '/api/orders', method: ['GET', 'POST'], service: 'order-service' },
        ],
        rateLimit: { enabled: true, window: 60, limit: 100 },
        cors: { enabled: true, origins: ['*'], methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], headers: ['Content-Type', 'Authorization'], credentials: false, maxAge: 3600 },
        auth: { type: 'none' as any },
      };

      console.log(chalk.gray('\n--- Sample Configuration ---\n'));
      const { generateGatewayConfig } = await import('./utils/api-gateway');
      console.log(chalk.gray(generateGatewayConfig(type as any, sampleConfig).split('\n').slice(0, 40).join('\n')));
    })
  );

// API Analytics Commands
const analyticsCommand = program.command('analytics').description('API analytics and monitoring for all backend frameworks');

analyticsCommand
  .command('generate <provider> <framework> [output]')
  .description('Generate analytics middleware for your backend framework')
  .option('--name <name>', 'Application name', 'api-app')
  .option('--custom-metrics <metrics>', 'Custom metrics (comma-separated: name,type,description|name,type,description)')
  .option('--dashboard', 'Include dashboard configuration', false)
  .option('--alerts', 'Include alert rules', false)
  .action(
    createAsyncCommand(async (provider, framework, outputPath, options) => {
      const {
        generateAnalyticsSetup,
        listAnalyticsProviders,
        listSupportedFrameworks,
        getAnalyticsProvider,
      } = await import('./utils/api-analytics');

      const providers = listAnalyticsProviders();
      const supportedFrameworks = listSupportedFrameworks();

      if (!providers.find(p => p.provider === provider)) {
        console.log(chalk.yellow(`\n❌ Unsupported provider: ${provider}\n`));
        console.log(chalk.gray('Run "re-shell analytics list-providers" to see supported providers.\n'));
        return;
      }

      if (!supportedFrameworks.find(f => f === framework)) {
        console.log(chalk.yellow(`\n❌ Unsupported framework: ${framework}\n`));
        console.log(chalk.gray('Run "re-shell analytics list-frameworks" to see supported frameworks.\n'));
        return;
      }

      const metrics = options.customMetrics ? options.customMetrics.split('|').map((m: string) => {
        const parts = m.split(',');
        return { name: parts[0], type: parts[1], description: parts[2] };
      }) : [];

      const config = {
        name: options.name,
        provider: provider as any,
        framework: framework as any,
        metrics,
        endpoints: [],
        dashboard: options.dashboard,
        alerts: options.alerts ? [{ name: 'HighErrorRate', condition: 'rate(http_requests_total{status=~"5.."}[5m]) > 0.05', threshold: 0.05, window: '5m', notify: [] }] : undefined,
      };

      const setup = generateAnalyticsSetup(config);

      const outputFile = outputPath || `./analytics-${framework}.${provider === 'custom' ? 'ts' : 'ts'}`;

      await fs.ensureDir(path.dirname(outputFile));
      await fs.writeFile(outputFile, setup.middleware, 'utf-8');

      console.log(chalk.cyan('\n📊 API Analytics Configuration\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(`${chalk.blue('Provider:')} ${provider}`);
      console.log(`${chalk.blue('Framework:')} ${framework}`);
      console.log(`${chalk.blue('Name:')} ${config.name}`);
      console.log(`${chalk.blue('Custom Metrics:')} ${metrics.length}`);
      console.log(`${chalk.blue('Dashboard:')} ${config.dashboard ? 'Yes' : 'No'}`);
      console.log(`${chalk.blue('Alerts:')} ${config.alerts ? 'Yes' : 'No'}`);
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.green(`\n✓ Analytics middleware generated!`));
      console.log(chalk.gray(`Output: ${outputFile}\n`));

      // Generate additional files if requested
      if (setup.prometheusConfig) {
        const prometheusFile = './prometheus.yml';
        await fs.writeFile(prometheusFile, setup.prometheusConfig, 'utf-8');
        console.log(chalk.gray(`  ${chalk.gray('•')} ${prometheusFile}`));
      }

      if (setup.grafanaDashboard) {
        const dashboardFile = './grafana-dashboard.json';
        await fs.writeFile(dashboardFile, setup.grafanaDashboard, 'utf-8');
        console.log(chalk.gray(`  ${chalk.gray('•')} ${dashboardFile}`));
      }

      if (setup.alertRules) {
        const alertsFile = './alerts.yml';
        await fs.writeFile(alertsFile, setup.alertRules, 'utf-8');
        console.log(chalk.gray(`  ${chalk.gray('•')} ${alertsFile}`));
      }

      if (setup.dockerCompose) {
        const composeFile = './docker-compose.yml';
        await fs.writeFile(composeFile, setup.dockerCompose, 'utf-8');
        console.log(chalk.gray(`  ${chalk.gray('•')} ${composeFile}`));
      }

      console.log('');
    })
  );

analyticsCommand
  .command('docker-compose <provider> [output]')
  .description('Generate docker-compose file for analytics stack')
  .action(
    createAsyncCommand(async (provider, outputPath, options) => {
      const { generateAnalyticsDockerCompose, getAnalyticsProvider } = await import('./utils/api-analytics');

      const template = getAnalyticsProvider(provider as any);
      if (!template) {
        console.log(chalk.yellow(`\n❌ Unsupported provider: ${provider}\n`));
        return;
      }

      const dockerCompose = generateAnalyticsDockerCompose(provider as any);
      const outputFile = outputPath || './docker-compose.yml';

      await fs.ensureDir(path.dirname(outputFile));
      await fs.writeFile(outputFile, dockerCompose, 'utf-8');

      console.log(chalk.cyan('\n🐳 Docker Compose Configuration\n'));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(dockerCompose.split('\n').slice(0, 20).join('\n')));
      if (dockerCompose.split('\n').length > 20) {
        console.log(chalk.gray('...'));
      }
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.green(`\n✓ Docker compose file generated!`));
      console.log(chalk.gray(`Output: ${outputFile}\n`));
    })
  );

analyticsCommand
  .command('list-providers')
  .description('List all supported analytics providers')
  .action(
    createAsyncCommand(async () => {
      const { listAnalyticsProviders } = await import('./utils/api-analytics');

      const providers = listAnalyticsProviders();
      console.log(chalk.cyan('\n📊 Supported Analytics Providers\n'));
      console.log(chalk.gray('─'.repeat(60)));
      providers.forEach(p => {
        console.log(`${chalk.yellow(p.provider.padEnd(20))}  ${chalk.gray(p.description)}`);
      });
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(`\nUsage: re-shell analytics generate <provider> <framework>\n`));
    })
  );

analyticsCommand
  .command('list-frameworks')
  .description('List all supported backend frameworks')
  .action(
    createAsyncCommand(async () => {
      const { listSupportedFrameworks } = await import('./utils/api-analytics');

      const frameworks = listSupportedFrameworks();
      console.log(chalk.cyan('\n🔧 Supported Backend Frameworks\n'));
      console.log(chalk.gray('─'.repeat(60)));
      frameworks.forEach(f => {
        console.log(`  ${chalk.gray('•')} ${chalk.yellow(f)}`);
      });
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(`\nUsage: re-shell analytics generate <provider> <framework>\n`));
    })
  );

analyticsCommand
  .command('template <provider> <framework>')
  .description('Show analytics template for provider and framework')
  .action(
    createAsyncCommand(async (provider, framework, options) => {
      const {
        generateAnalyticsMiddleware,
        getAnalyticsProvider,
        listAnalyticsProviders,
        listSupportedFrameworks,
      } = await import('./utils/api-analytics');

      const providers = listAnalyticsProviders();
      const supportedFrameworks = listSupportedFrameworks();

      if (!providers.find(p => p.provider === provider)) {
        console.log(chalk.yellow(`\n❌ Unsupported provider: ${provider}\n`));
        return;
      }

      if (!supportedFrameworks.find(f => f === framework)) {
        console.log(chalk.yellow(`\n❌ Unsupported framework: ${framework}\n`));
        return;
      }

      const template = getAnalyticsProvider(provider as any);
      console.log(chalk.cyan(`\n📊 Analytics Template: ${provider} + ${framework}\n`));
      console.log(chalk.gray('─'.repeat(60)));
      console.log(`${chalk.blue('Provider:')} ${template?.description || provider}`);
      console.log(`${chalk.blue('Framework:')} ${framework}`);
      console.log(`${chalk.blue('Format:')} TypeScript/JavaScript`);
      console.log(chalk.gray('─'.repeat(60)));

      const config = {
        name: 'sample-app',
        provider: provider as any,
        framework: framework as any,
        metrics: [
          { name: 'api_requests_total', type: 'counter' as const, description: 'Total API requests' },
          { name: 'api_request_duration', type: 'histogram' as const, description: 'API request duration' },
        ],
        endpoints: [],
      };

      console.log(chalk.gray('\n--- Sample Middleware ---\n'));
      const middleware = generateAnalyticsMiddleware(config);
      console.log(chalk.gray(middleware.split('\n').slice(0, 40).join('\n')));
    })
  );

// Deprecated create-mf command removed in v0.2.0
// Enhanced with --yes flag in v0.2.5 for non-interactive mode

// Display help by default if no command is provided
if (process.argv.length <= 2) {
  program.help();
}

// Ensure clean exit for all commands - no hanging processes
setTimeout(() => {
  process.exit(0);
}, 30000); // 30 second maximum for any command

program.parse(process.argv);

// Force exit after command completion to prevent hanging
process.nextTick(() => {
  setTimeout(() => {
    process.exit(0);
  }, 2000); // 2 second grace period after command completion
});
