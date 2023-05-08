#!/usr/bin/env node

import CLIApplication from './app/cli.js';
import HelpCommand from './core/cli-command/help.command.js';
import VersionCommand from './core/cli-command/version.command.js';
import ImportCommand from './core/cli-command/import.command.js';

const myManager = new CLIApplication();
myManager.registerCommand([
  new HelpCommand, new VersionCommand, new ImportCommand
]);

myManager.processCommand(process.argv);
