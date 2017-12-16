'use strict';
import * as vscode from 'vscode';
import TemplatesRepository from './templatesRepository';
import ConfigsRepository from './configsRepository';
import * as newPHPClassCommand from './commands/newPHPClassCommand';
import * as newPHPInterfaceCommand from './commands/newPHPInterfaceCommand';
import * as newPHPTraitCommand from './commands/newPHPTraitCommand';
import PathManager from './pathManager';
import InputManager from './inputManager';

export function activate(context: vscode.ExtensionContext) {
    const templatesRepository = new TemplatesRepository(vscode.workspace.getConfiguration('php-files'));
    const configsRepository = new ConfigsRepository;
    const pathManager = new PathManager(configsRepository);
    const inputManager = new InputManager;

    const dependencies = [
        templatesRepository,
        pathManager,
        inputManager
    ];

    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.newPHPClass',
        newPHPClassCommand.run.bind(
            undefined,
            templatesRepository,
            pathManager,
            inputManager
        )
    ));
    
    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.newPHPInterface',
        newPHPInterfaceCommand.run.bind(
            undefined,
            templatesRepository,
            pathManager,
            inputManager
        )
    ));
    
    context.subscriptions.push(vscode.commands.registerCommand(
        'extension.newPHPTrait',
        newPHPTraitCommand.run.bind(undefined, ...dependencies)
    ));
}

export function deactivate() {
}
