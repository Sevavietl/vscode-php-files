import * as vscode from 'vscode';
import * as fs from 'fs';
import * as writer from 'php-writer';

import TemplatesRepository from '../templatesRepository';

import { getPath } from './helpers';

import PhpInterface from '../entities/phpInterface';
import PathManager from '../pathManager';
import InputManager from '../inputManager';

export function run(
    templatesRepository: TemplatesRepository,
    pathManager: PathManager,
    inputManager: InputManager,
    args: any
) { 
    const template = templatesRepository.findByName('PHPInterface');
    const phpInterface = new PhpInterface(new writer(template));
    
    getPath(args && args.fsPath).then(async (targetFolder) => {
        const namespace = pathManager.resolveNamespace(targetFolder);
        const name = await inputManager.getInput(inputManager.getNamingOptions(namespace));
        
        if (!name) {
            return;
        }

        const defaultPath = pathManager.prepareDefaultPath(targetFolder, name);
        const filePath = pathManager.resolvePath(name, defaultPath);

        if (!pathManager.validatePath(filePath)) {
            vscode.window.showErrorMessage('File with name "' + pathManager.basename(filePath) + '" already exists.');
            return;
        }

        const interfaces = await inputManager.getInput({ prompt: 'Extends' }) || '';

        phpInterface
            .setName(name)
            .setExtends(interfaces)
            .save(filePath);

        const textDocument = await vscode.workspace.openTextDocument(filePath);
        const editor = vscode.window.showTextDocument(textDocument);
    });
}
