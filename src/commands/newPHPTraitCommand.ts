import * as vscode from 'vscode';
import * as fs from 'fs';
import * as writer from 'php-writer';

import TemplatesRepository from '../templatesRepository';

import { getPath, getFullyQualifiedName, getBaseName, notValidPath } from './helpers';

export function run(templatesRepository: TemplatesRepository, args: any) {
    const template = templatesRepository.findByName('PHPTrait');
    const phpTrait = new writer(template);

    getPath(args && args.fsPath).then(targetFolder => {
        getFullyQualifiedName().then(name => {
            const filePath = targetFolder + '/' + getBaseName(name) + '.php';
            
            if (notValidPath(filePath)) {
                return;
            }

            phpTrait
                .findTrait('PHPTrait')
                .setName(name)
            
            fs.writeFileSync(filePath, phpTrait);
        });
    });
}
