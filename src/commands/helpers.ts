import { Uri, workspace, window } from 'vscode';
import { Stream } from 'stream';
import * as fs from 'fs';
import * as path from 'path';

export function getPath(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            window.showInformationMessage('Sorry, this feature not implemented for this context yet.');
            reject();
        }

        resolve(path)
    });
}

export function getFullyQualifiedName() {
    return new Promise((resolve, reject) => {
        window.showInputBox({ prompt: 'Name' }).then(name => {
            if (!name) {
                window.showErrorMessage('Name is required.');
                reject();
            }

            resolve(name);
        });
    });
}

export function getExtends() {
    return new Promise((resolve, reject) => {
        window.showInputBox({ prompt: 'Extends' }).then(parent => resolve(parent));
    });
}

export function getImplements() {
    return new Promise((resolve, reject) => {
        window.showInputBox({ prompt: 'Implements' }).then(interfaces => resolve(interfaces));
    }); 
}

export function isFullyQualifiedName(name) {
    return name.indexOf('\\') !== -1;
}

export function getNamespace(name) {
    return name.split('\\').slice(0, -1).join('\\');
}

export function getBasename(name) {
    return name.split('\\').pop();
}

export function notValidPath(filePath) {
    if (fs.existsSync(filePath)) {
        window.showErrorMessage('File with name "' + path.basename(filePath) + '" already exists.');
        
        return true;
    }

    return false;
}
