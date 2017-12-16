import * as vscode from 'vscode';
import * as writer from 'php-writer';

import TemplatesRepository from '../templatesRepository';

import { getPath } from './helpers';

import PhpClass from '../entities/phpClass';
import PathManager from '../pathManager';
import InputManager from '../inputManager';

export function run(
    templatesRepository: TemplatesRepository,
    pathManager: PathManager,
    inputManager: InputManager,
    args: any
) {
    const template = templatesRepository.findByName('PHPClass');
    const phpClass = new PhpClass(new writer(template));

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

        let parent = await inputManager.getInput({ prompt: 'Extends' });
        let interfaces = '';

        if (parent === undefined) {
            parent = '';
        } else { 
            interfaces = await inputManager.getInput({ prompt: 'Implements' }) || '';
        }

        phpClass
            .setName(name)
            .setExtends(parent)
            .setImplements(interfaces)
            .save(filePath);
            
        const textDocument = await vscode.workspace.openTextDocument(filePath);
        const editor = vscode.window.showTextDocument(textDocument);
    });
}
