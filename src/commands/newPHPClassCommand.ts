import * as vscode from 'vscode';
import * as fs from 'fs';
import * as writer from 'php-writer';

import './writerExtension';

import TemplatesRepository from '../templatesRepository';

import { 
    getPath,
    getFullyQualifiedName,
    getExtends,
    getImplements,
    getNamespace,
    getBasename,
    notValidPath 
} from './helpers';

import PhpClass from '../entities/phpClass';

export function run(templatesRepository: TemplatesRepository, args: any) {
    const template = templatesRepository.findByName('PHPClass');
    const phpClass = new PhpClass(new writer(template), 'PHPClass');
    
    getPath(args && args.fsPath).then(targetFolder => {
        getFullyQualifiedName().then(name => {
            const basename = getBasename(name);
            const filePath = targetFolder + '/' + basename + '.php';

            if (notValidPath(filePath)) {
                return;
            }

            getExtends().then(parent => {
                getImplements().then(interfaces => {
                    phpClass
                        .setName(name)
                        .setExtends(parent)
                        .setImplements(interfaces)
                        .save(filePath);
                });
            });
        });
    });
}
