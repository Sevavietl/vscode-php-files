import { window } from 'vscode';

export function getPath(path) {
    return new Promise((resolve, reject) => {
        if (!path) {
            window.showInformationMessage('Sorry, this feature not implemented for this context yet.');
            reject();
        }

        resolve(path)
    });
}
