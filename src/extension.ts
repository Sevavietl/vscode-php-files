'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import TemplatesRepository from './templatesRepository';
import * as newPHPClassCommand from './commands/newPHPClassCommand';
import * as newPHPInterfaceCommand from './commands/newPHPInterfaceCommand';
import * as newPHPTraitCommand from './commands/newPHPTraitCommand';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "php-files" is now active!');

    const templatesRepository = new TemplatesRepository(vscode.workspace.getConfiguration('php-files'))

    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPClass', newPHPClassCommand.run.bind(undefined, templatesRepository)));
    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPInterface', newPHPInterfaceCommand.run.bind(undefined, templatesRepository)));
    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPTrait', newPHPTraitCommand.run.bind(undefined, templatesRepository)));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
