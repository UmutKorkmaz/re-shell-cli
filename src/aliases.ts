/**
 * Backward-compatibility aliases for old flat command names.
 *
 * As commands are extracted from the flat structure into groups,
 * the old names are preserved here with `.hideHelp()` to keep them
 * working without cluttering --help output.
 *
 * Deprecation policy:
 *  - Aliases emit a console.warn() message on stderr
 *  - Aliases will be removed in v1.0.0 (major version) only
 *  - Each alias delegates to the new group command handler
 *
 * Format:
 *   program.command('old-flat-name')
 *     .hideHelp()
 *     .description('[deprecated] Use: re-shell <group> <sub>')
 *     .action(async () => {
 *       console.warn('[deprecated] re-shell old-flat-name → re-shell <group> <sub>');
 *       // delegate to group command
 *     });
 */

import { Command } from 'commander';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function registerAliases(_program: Command): void {
  // Populated incrementally as groups are extracted.
  // Each alias is added here when its parent group is created.
}
