import { hapiTypeScriptTemplate } from './hapi-ts';
import { djangoTemplate } from './django';
import { djangoEnhancedTemplate } from './django-enhanced';
import { tornadoTemplate } from './tornado-py';
import { sanicTemplate } from './sanic-py';
import { starletteTemplate } from './starlette';
import { actixWebTemplate } from './actix-web';
import { warpTemplate } from './warp';
import { rocketTemplate } from './rocket';
import { axumTemplate } from './axum';
import { springBootTemplate } from './spring-boot';
import { quarkusTemplate } from './quarkus';
import { micronautTemplate } from './micronaut';
import { vertxTemplate } from './vertx';
// Kotlin
import { ktorTemplate } from './ktor';
import { http4kTemplate } from './http4k';
import { springBootKotlinTemplate } from './spring-boot-kotlin';
import { micronautKotlinTemplate } from './micronaut-kotlin';
// Scala
import { akkaHttpTemplate } from './akka-http';
import { playScalaTemplate } from './play-scala';
import { http4sScalaTemplate } from './http4s-scala';
// Deno
import { oakDenoTemplate } from './oak-deno';
import { freshDenoTemplate } from './fresh-deno';
import { alephDenoTemplate } from './aleph-deno';
// Bun
import { elysiaBunTemplate } from './elysia-bun';
import { honoTemplate } from './hono';
// Elixir
import { phoenixTemplate } from './phoenix';
import { plugExTemplate } from './plug-ex';
import { nervesExTemplate } from './nerves-ex';
// Crystal
import { kemalTemplate } from './kemal';
import { luckyCrTemplate } from './lucky-cr';
import { amberCrTemplate } from './amber-cr';
// Zig
import { zigHttpTemplate } from './zig-http';
import { zapZigTemplate } from './zap-zig';
// Nim
import { jesterTemplate } from './jester';
import { prologueNimTemplate } from './prologue-nim';
import { happyxNimTemplate } from './happyx-nim';
// V
import { vwebTemplate } from './vweb';
import { vexVTemplate } from './vex-v';
// Gleam
import { wispTemplate } from './wisp';
// Haskell
import { servantTemplate } from './servant';
import { yesodHsTemplate } from './yesod-hs';
import { scottyHsTemplate } from './scotty-hs';
import { spockHsTemplate } from './spock-hs';
// F#
import { giraffeTemplate } from './giraffe';
import { saturnFsTemplate } from './saturn-fs';
import { suaveFsTemplate } from './suave-fs';
// Clojure
import { compojureTemplate } from './compojure';
import { luminusCljTemplate } from './luminus-clj';
import { reititCljTemplate } from './reitit-clj';
import { pedestalCljTemplate } from './pedestal-clj';
// Julia
import { genieJlTemplate } from './genie-jl';
import { oxygenJlTemplate } from './oxygen-jl';
// OCaml
import { dreamOcamlTemplate } from './dream-ocaml';
import { opiumOcamlTemplate } from './opium-ocaml';
// Odin
import { odinHttpTemplate } from './odin-http';
// Pony
import { jennetPonyTemplate } from './jennet-pony';
// Red
import { redHttpTemplate } from './red-http';
// ReScript
import { rescriptExpressTemplate } from './rescript-express';
import { rescriptFastifyTemplate } from './rescript-fastify';
// Grain
import { grainTemplate } from './grain';
// Mojo
import { mojoTemplate } from './mojo';
// Perl
import { mojoliciousTemplate } from './mojolicious-perl';
import { dancer2Template } from './dancer2-perl';
import { catalystTemplate } from './catalyst-perl';
import { aspnetCoreWebApiTemplate } from './aspnet-core-webapi';
import { aspnetCoreMinimalTemplate } from './aspnet-core-minimal';
import { blazorServerTemplate } from './blazor-server';
import { grpcServiceTemplate } from './grpc-service';
import { aspnetDapperTemplate } from './aspnet-dapper';
import { aspnetAutoMapperTemplate } from './aspnet-automapper';
import { aspnetXUnitTemplate } from './aspnet-xunit';
import { aspnetEFCoreTemplate } from './aspnet-efcore';
import { aspnetHotReloadTemplate } from './aspnet-hotreload';
import { aspnetSerilogTemplate } from './aspnet-serilog';
import { aspnetSwaggerTemplate } from './aspnet-swagger';
import { aspnetJwtTemplate } from './aspnet-jwt';
import { laravelTemplate } from './laravel';
import { symfonyTemplate } from './symfony';
import { slimTemplate } from './slim';
import { codeigniterTemplate } from './codeigniter';
import { ginTemplate } from './gin';
import { echoTemplate } from './echo';
import { fiberTemplate } from './fiber';
import { chiTemplate } from './chi';
import { grpcGoTemplate } from './grpc-go';
import { goSqlxTemplate } from './go-sqlx';
import { railsApiTemplate } from './rails-api';
import { sinatraTemplate } from './sinatra';
import { grapeTemplate } from './grape';
import { openrestyTemplate } from './openresty';
import { lapisTemplate } from './lapis';
import { luaHttpTemplate } from './lua-http';
import { kongPluginTemplate } from './kong-plugin';
import { crowTemplate } from './crow';
import { drogonTemplate } from './drogon';
import { cppHttplibTemplate } from './cpp-httplib';
import { pistacheTemplate } from './pistache';
import { beastTemplate } from './beast';
import { vaporTemplate } from './vapor';
import { perfectTemplate } from './perfect';
import { kituraTemplate } from './kitura';
import { hummingbirdTemplate } from './hummingbird';
import { shelfTemplate } from './shelf';
import { angel3Template } from './angel3';
import { conduitTemplate } from './conduit';
import { expressTemplate } from './express';
import { fastapiTemplate } from './fastapi';
import { nestjsTemplate } from './nestjs';
import { flaskTemplate } from './flask';
import { koaTemplate } from './koa';
import { fastifyTemplate } from './fastify';
import { loopbackTemplate } from './loopback';
import { adonisjsTemplate } from './adonisjs';
import { restifyTemplate } from './restify';
import { feathersJsTemplate } from './feathersjs';
import { moleculerTemplate } from './moleculer';
import { sailsjsTemplate } from './sailsjs';
import { strapiTemplate } from './strapi';
import { meteorjsTemplate } from './meteorjs';
import { totaljsTemplate } from './totaljs';
import { eggjsTemplate } from './eggjs';
import { thinkjsTemplate } from './thinkjs';
import { actionheroTemplate } from './actionherojs';
import { foaltsTemplate } from './foalts';
import { marblejsTemplate } from './marblejs';
import { tsedTemplate } from './tsed';
import { middyTemplate } from './middy';
import { polkaTemplate } from './polka';
import { tinyhttpTemplate } from './tinyhttp';
import { hyperExpressTemplate } from './hyper-express';
import { apolloServerTemplate } from './apollo-server';
import { graphqlYogaTemplate } from './graphql-yoga';
import { BackendTemplate } from '../types';

export const backendTemplates: Record<string, BackendTemplate> = {
  // Node.js/TypeScript
  'express': expressTemplate,
  'fastify': fastifyTemplate,
  'nestjs': nestjsTemplate,
  'koa': koaTemplate,
  'loopback': loopbackTemplate,
  'adonisjs': adonisjsTemplate,
  'restify': restifyTemplate,
  'feathersjs': feathersJsTemplate,
  'moleculer': moleculerTemplate,
  'sailsjs': sailsjsTemplate,
  'strapi': strapiTemplate,
  'meteorjs': meteorjsTemplate,
  'totaljs': totaljsTemplate,
  'eggjs': eggjsTemplate,
  'thinkjs': thinkjsTemplate,
  'actionherojs': actionheroTemplate,
  'foalts': foaltsTemplate,
  'marblejs': marblejsTemplate,
  'tsed': tsedTemplate,
  'middy': middyTemplate,
  'polka': polkaTemplate,
  'tinyhttp': tinyhttpTemplate,
  'hyper-express': hyperExpressTemplate,
  'apollo-server': apolloServerTemplate,
  'graphql-yoga': graphqlYogaTemplate,
  'hapi-ts': hapiTypeScriptTemplate,
  
  // Python
  'fastapi': fastapiTemplate,
  'flask': flaskTemplate,
  'django': djangoTemplate,
  'django-enhanced': djangoEnhancedTemplate,
  'tornado-py': tornadoTemplate,
  'sanic-py': sanicTemplate,
  'starlette': starletteTemplate,
  'actix-web': actixWebTemplate,
  'warp': warpTemplate,
  'rocket': rocketTemplate,
  'axum': axumTemplate,
  'spring-boot': springBootTemplate,
  'quarkus': quarkusTemplate,
  'micronaut': micronautTemplate,
  'vertx': vertxTemplate,
  'aspnet-core-webapi': aspnetCoreWebApiTemplate,
  'aspnet-core-minimal': aspnetCoreMinimalTemplate,
  'blazor-server': blazorServerTemplate,
  'grpc-service': grpcServiceTemplate,
  'aspnet-dapper': aspnetDapperTemplate,
  'aspnet-automapper': aspnetAutoMapperTemplate,
  'aspnet-xunit': aspnetXUnitTemplate,
  'aspnet-efcore': aspnetEFCoreTemplate,
  'aspnet-hotreload': aspnetHotReloadTemplate,
  'aspnet-serilog': aspnetSerilogTemplate,
  'aspnet-swagger': aspnetSwaggerTemplate,
  'aspnet-jwt': aspnetJwtTemplate,
  'laravel': laravelTemplate,
  'symfony': symfonyTemplate,
  'slim': slimTemplate,
  'codeigniter': codeigniterTemplate,
  'gin': ginTemplate,
  'echo': echoTemplate,
  'fiber': fiberTemplate,
  'chi': chiTemplate,
  'grpc-go': grpcGoTemplate,
  'go-sqlx': goSqlxTemplate,
  'rails-api': railsApiTemplate,
  'sinatra': sinatraTemplate,
  'grape': grapeTemplate,
  'openresty': openrestyTemplate,
  'lapis': lapisTemplate,
  'lua-http': luaHttpTemplate,
  'kong-plugin': kongPluginTemplate,
  'crow': crowTemplate,
  'drogon': drogonTemplate,
  'cpp-httplib': cppHttplibTemplate,
  'pistache': pistacheTemplate,
  'beast': beastTemplate,
  'vapor': vaporTemplate,
  'perfect': perfectTemplate,
  'kitura': kituraTemplate,
  'hummingbird': hummingbirdTemplate,
  'shelf': shelfTemplate,
  'angel3': angel3Template,
  'conduit': conduitTemplate,
  // Kotlin
  'ktor': ktorTemplate,
  'http4k': http4kTemplate,
  'spring-boot-kotlin': springBootKotlinTemplate,
  'micronaut-kotlin': micronautKotlinTemplate,
  // Scala
  'akka-http': akkaHttpTemplate,
  'play-scala': playScalaTemplate,
  'http4s-scala': http4sScalaTemplate,
  // Deno
  'oak-deno': oakDenoTemplate,
  'fresh-deno': freshDenoTemplate,
  'aleph-deno': alephDenoTemplate,
  // Bun
  'elysia-bun': elysiaBunTemplate,
  'hono': honoTemplate,
  // Elixir
  'phoenix': phoenixTemplate,
  'plug-ex': plugExTemplate,
  'nerves-ex': nervesExTemplate,
  // Crystal
  'kemal': kemalTemplate,
  'lucky-cr': luckyCrTemplate,
  'amber-cr': amberCrTemplate,
  // Zig
  'zig-http': zigHttpTemplate,
  'zap-zig': zapZigTemplate,
  // Nim
  'jester': jesterTemplate,
  'prologue-nim': prologueNimTemplate,
  'happyx-nim': happyxNimTemplate,
  // V
  'vweb': vwebTemplate,
  'vex-v': vexVTemplate,
  // Gleam
  'wisp': wispTemplate,
  // Haskell
  'servant': servantTemplate,
  'yesod-hs': yesodHsTemplate,
  'scotty-hs': scottyHsTemplate,
  'spock-hs': spockHsTemplate,
  // F#
  'giraffe': giraffeTemplate,
  'saturn-fs': saturnFsTemplate,
  'suave-fs': suaveFsTemplate,
  // Clojure
  'compojure': compojureTemplate,
  'luminus-clj': luminusCljTemplate,
  'reitit-clj': reititCljTemplate,
  'pedestal-clj': pedestalCljTemplate,
  // Julia
  'genie-jl': genieJlTemplate,
  'oxygen-jl': oxygenJlTemplate,
  // OCaml
  'dream-ocaml': dreamOcamlTemplate,
  'opium-ocaml': opiumOcamlTemplate,
  // Odin
  'odin-http': odinHttpTemplate,
  // Pony
  'jennet-pony': jennetPonyTemplate,
  // Red
  'red-http': redHttpTemplate,
  // ReScript
  'rescript-express': rescriptExpressTemplate,
  'rescript-fastify': rescriptFastifyTemplate,
  // Grain
  'grain': grainTemplate,
  // Mojo
  'mojo': mojoTemplate,
  // Perl
  'mojolicious': mojoliciousTemplate,
  'dancer2': dancer2Template,
  'catalyst': catalystTemplate,
};

export function getBackendTemplate(id: string): BackendTemplate | undefined {
  return backendTemplates[id];
}

export function listBackendTemplates(): BackendTemplate[] {
  return Object.values(backendTemplates);
}

export function getBackendTemplatesByLanguage(language: string): BackendTemplate[] {
  return Object.values(backendTemplates).filter(template => template.language === language);
}

export function getBackendTemplatesByFramework(framework: string): BackendTemplate[] {
  return Object.values(backendTemplates).filter(template => template.framework === framework);
}

// Export individual templates for backward compatibility
export { hapiTypeScriptTemplate } from './hapi-ts';
export { djangoTemplate } from './django';
export { djangoEnhancedTemplate } from './django-enhanced';
export { tornadoTemplate } from './tornado-py';
export { sanicTemplate } from './sanic-py';
export { starletteTemplate } from './starlette';
export { actixWebTemplate } from './actix-web';
export { warpTemplate } from './warp';
export { rocketTemplate } from './rocket';
export { axumTemplate } from './axum';
export { springBootTemplate } from './spring-boot';
export { quarkusTemplate } from './quarkus';
export { micronautTemplate } from './micronaut';
export { vertxTemplate } from './vertx';
export { aspnetCoreWebApiTemplate } from './aspnet-core-webapi';
export { aspnetCoreMinimalTemplate } from './aspnet-core-minimal';
export { blazorServerTemplate } from './blazor-server';
export { grpcServiceTemplate } from './grpc-service';
export { aspnetDapperTemplate } from './aspnet-dapper';
export { aspnetAutoMapperTemplate } from './aspnet-automapper';
export { aspnetXUnitTemplate } from './aspnet-xunit';
export { aspnetEFCoreTemplate } from './aspnet-efcore';
export { aspnetHotReloadTemplate } from './aspnet-hotreload';
export { aspnetSerilogTemplate } from './aspnet-serilog';
export { aspnetSwaggerTemplate } from './aspnet-swagger';
export { aspnetJwtTemplate } from './aspnet-jwt';
export { laravelTemplate } from './laravel';
export { symfonyTemplate } from './symfony';
export { slimTemplate } from './slim';
export { codeigniterTemplate } from './codeigniter';
export { ginTemplate } from './gin';
export { echoTemplate } from './echo';
export { fiberTemplate } from './fiber';
export { chiTemplate } from './chi';
export { grpcGoTemplate } from './grpc-go';
export { goSqlxTemplate } from './go-sqlx';
export { railsApiTemplate } from './rails-api';
export { sinatraTemplate } from './sinatra';
export { grapeTemplate } from './grape';
export { openrestyTemplate } from './openresty';
export { lapisTemplate } from './lapis';
export { luaHttpTemplate } from './lua-http';
export { kongPluginTemplate } from './kong-plugin';
export { crowTemplate } from './crow';
export { drogonTemplate } from './drogon';
export { cppHttplibTemplate } from './cpp-httplib';
export { pistacheTemplate } from './pistache';
export { beastTemplate } from './beast';
export { vaporTemplate } from './vapor';
export { perfectTemplate } from './perfect';
export { kituraTemplate } from './kitura';
export { hummingbirdTemplate } from './hummingbird';
export { shelfTemplate } from './shelf';
export { angel3Template } from './angel3';
export { conduitTemplate } from './conduit';
export { expressTemplate } from './express';
export { fastapiTemplate } from './fastapi';
export { nestjsTemplate } from './nestjs';
export { flaskTemplate } from './flask';
export { koaTemplate } from './koa';
export { fastifyTemplate } from './fastify';
export { loopbackTemplate } from './loopback';
export { adonisjsTemplate } from './adonisjs';
export { restifyTemplate } from './restify';
export { feathersJsTemplate } from './feathersjs';
export { moleculerTemplate } from './moleculer';
export { sailsjsTemplate } from './sailsjs';
export { strapiTemplate } from './strapi';
export { meteorjsTemplate } from './meteorjs';
export { totaljsTemplate } from './totaljs';
export { eggjsTemplate } from './eggjs';
export { thinkjsTemplate } from './thinkjs';
export { actionheroTemplate } from './actionherojs';
export { foaltsTemplate } from './foalts';
export { marblejsTemplate } from './marblejs';
export { tsedTemplate } from './tsed';
export { middyTemplate } from './middy';
export { polkaTemplate } from './polka';
export { tinyhttpTemplate } from './tinyhttp';
export { hyperExpressTemplate } from './hyper-express';
export { apolloServerTemplate } from './apollo-server';
export { graphqlYogaTemplate } from './graphql-yoga';
export { ComposerGenerator, generateComposerFiles } from './php-composer';
export type { ComposerConfig } from './php-composer';
export { PhpFpmGenerator, generatePhpFpmConfig } from './php-fpm';
export type { PhpFpmConfig } from './php-fpm';
export { generateCppOpenApiFiles } from './cpp-openapi';
export type { CppOpenApiConfig } from './cpp-openapi';
export { generateCppSanitizersFiles } from './cpp-sanitizers';
export type { CppSanitizersConfig } from './cpp-sanitizers';
export { generateCppQualityToolsFiles } from './cpp-quality-tools';
export type { CppQualityToolsConfig } from './cpp-quality-tools';
// Kotlin
export { ktorTemplate } from './ktor';
export { http4kTemplate } from './http4k';
export { springBootKotlinTemplate } from './spring-boot-kotlin';
export { micronautKotlinTemplate } from './micronaut-kotlin';
// Scala
export { akkaHttpTemplate } from './akka-http';
export { playScalaTemplate } from './play-scala';
export { http4sScalaTemplate } from './http4s-scala';
// Deno
export { oakDenoTemplate } from './oak-deno';
export { freshDenoTemplate } from './fresh-deno';
export { alephDenoTemplate } from './aleph-deno';
// Bun
export { elysiaBunTemplate } from './elysia-bun';
export { honoTemplate } from './hono';
// Elixir
export { phoenixTemplate } from './phoenix';
export { plugExTemplate } from './plug-ex';
export { nervesExTemplate } from './nerves-ex';
// Crystal
export { kemalTemplate } from './kemal';
export { luckyCrTemplate } from './lucky-cr';
export { amberCrTemplate } from './amber-cr';
// Zig
export { zigHttpTemplate } from './zig-http';
export { zapZigTemplate } from './zap-zig';
// Nim
export { jesterTemplate } from './jester';
export { prologueNimTemplate } from './prologue-nim';
export { happyxNimTemplate } from './happyx-nim';
// V
export { vwebTemplate } from './vweb';
export { vexVTemplate } from './vex-v';
// Gleam
export { wispTemplate } from './wisp';
// Haskell
export { servantTemplate } from './servant';
export { yesodHsTemplate } from './yesod-hs';
export { scottyHsTemplate } from './scotty-hs';
export { spockHsTemplate } from './spock-hs';
// F#
export { giraffeTemplate } from './giraffe';
export { saturnFsTemplate } from './saturn-fs';
export { suaveFsTemplate } from './suave-fs';
// Clojure
export { compojureTemplate } from './compojure';
export { luminusCljTemplate } from './luminus-clj';
export { reititCljTemplate } from './reitit-clj';
export { pedestalCljTemplate } from './pedestal-clj';
// Julia
export { genieJlTemplate } from './genie-jl';
export { oxygenJlTemplate } from './oxygen-jl';
// OCaml
export { dreamOcamlTemplate } from './dream-ocaml';
export { opiumOcamlTemplate } from './opium-ocaml';
// Odin
export { odinHttpTemplate } from './odin-http';
// Pony
export { jennetPonyTemplate } from './jennet-pony';
// Red
export { redHttpTemplate } from './red-http';
// ReScript
export { rescriptExpressTemplate } from './rescript-express';
export { rescriptFastifyTemplate } from './rescript-fastify';
// Grain
export { grainTemplate } from './grain';
// Mojo
export { mojoTemplate } from './mojo';
// Perl
export { mojoliciousTemplate } from './mojolicious-perl';
export { dancer2Template } from './dancer2-perl';
export { catalystTemplate } from './catalyst-perl';