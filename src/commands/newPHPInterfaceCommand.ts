import * as vscode from 'vscode';
import * as fs from 'fs';
import * as writer from 'php-writer';

import TemplatesRepository from '../templatesRepository';

import {
    getPath,
    getFullyQualifiedName,
    getExtends,
    getBasename,
    notValidPath
} from './helpers';

import PhpInterface from '../entities/phpInterface';

export function run(templatesRepository: TemplatesRepository, args: any) {
    const template = templatesRepository.findByName('PHPInterface');
    const phpInterface = new PhpInterface(new writer(template));

    getPath(args && args.fsPath).then(targetFolder => {
        getFullyQualifiedName().then(name => {
            const filePath = targetFolder + '/' + getBasename(name) + '.php';
            
            if (notValidPath(filePath)) {
                return;
            }
            
            getExtends().then(interfaces => {
                phpInterface
                    .setName(name)
                    .setExtends(interfaces)
                    .save(filePath);
            });
        });
    });
}
