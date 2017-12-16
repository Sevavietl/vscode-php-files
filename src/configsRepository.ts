import { workspace } from 'vscode';
import * as fs from 'fs-extra';

export default class ConfigsRepository {
    private configs = { namespaces: {} };

    constructor() {
        const path = workspace.rootPath + '/.php-files.json';
        const configs = fs.existsSync(path) ? require(path) : null;
        
        if (configs instanceof Object && !Array.isArray(configs)) {
            this.configs = configs;
        }
    }

    public getNamespaces() {
        return this.configs['namespaces'];
    }
}
