'use strict';
import * as vscode from 'vscode';
import TemplatesRepository from './templatesRepository';
import * as newPHPClassCommand from './commands/newPHPClassCommand';
import * as newPHPInterfaceCommand from './commands/newPHPInterfaceCommand';
import * as newPHPTraitCommand from './commands/newPHPTraitCommand';

export function activate(context: vscode.ExtensionContext) {
    const templatesRepository = new TemplatesRepository(vscode.workspace.getConfiguration('php-files'))

    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPClass', newPHPClassCommand.run.bind(undefined, templatesRepository)));
    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPInterface', newPHPInterfaceCommand.run.bind(undefined, templatesRepository)));
    context.subscriptions.push(vscode.commands.registerCommand('extension.newPHPTrait', newPHPTraitCommand.run.bind(undefined, templatesRepository)));
}

export function deactivate() {
}
