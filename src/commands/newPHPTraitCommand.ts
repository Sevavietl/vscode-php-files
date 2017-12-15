import * as vscode from 'vscode';
import * as fs from 'fs';
import * as writer from 'php-writer';

import TemplatesRepository from '../templatesRepository';

import { getPath, getFullyQualifiedName, getBasename, notValidPath } from './helpers';

import PhpTrait from '../entities/phpTrait';

export function run(templatesRepository: TemplatesRepository, args: any) {
    const template = templatesRepository.findByName('PHPTrait');
    const phpTrait = new PhpTrait(new writer(template));

    getPath(args && args.fsPath).then(targetFolder => {
        getFullyQualifiedName().then(name => {
            const filePath = targetFolder + '/' + getBasename(name) + '.php';
            
            if (notValidPath(filePath)) {
                return;
            }

            phpTrait
                .setName(name)
                .save(filePath);
        });
    });
}
