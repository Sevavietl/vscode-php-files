import {workspace} from 'vscode';
import * as fs from 'fs';
import * as p from 'path';
import ConfigsRepository from './configsRepository';
import PhpName from './entities/phpName';

export default class PathManager {
    private configsRepository: ConfigsRepository;

    constructor(configsRepository: ConfigsRepository) {
        this.configsRepository = configsRepository;
    }

    public prepareDefaultPath(target, name) {
        const phpName = new PhpName(name);

        return target + '/' + phpName.getUnqualifiedName() + '.php';
    }

    public validatePath(path) {
        return !fs.existsSync(path);
    }

    public basename(path) {
        return p.basename(path);
    }

    public resolveNamespace(path) {
        const namespaces = this.configsRepository.getNamespaces();
        
        return Object.keys(namespaces).reduce((carry, namespace) => {
            if (carry !== null) {
                return carry;
            }
            
            const resolvedPath = workspace.rootPath + '/' + namespaces[namespace];

            const offset = this.getOffset(resolvedPath, path);

            if (offset !== null) {
                return (namespace + offset).split('/').join('\\');
            }

            return carry;
        }, null);
    }

    public resolvePath(name, defaultPath) {
        const phpName = new PhpName(name);
        const namespace = phpName.getNamespace() || '';
        const namespaces = this.configsRepository.getNamespaces();

        const resolvedPath = Object.keys(namespaces).reduce((carry, ns) => {
            if (carry !== null) {
                return carry;
            }

            let offset = this.getOffset(ns, namespace);

            if (offset !== null) {
                offset = offset.split('\\').concat([phpName.getUnqualifiedName() + '.php']).join('/');
                carry = workspace.rootPath + '/' + namespaces[ns] + offset;
            }
            
            return carry;
        }, null);

        return resolvedPath || defaultPath;
    }

    private getOffset(base, full) {
        return full.indexOf(base) === 0 ? full.slice(base.length) : null;
    }
}
