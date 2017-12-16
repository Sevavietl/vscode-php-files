import { Uri, workspace, window, InputBoxOptions } from 'vscode';
import PhpName from './entities/phpName';

export default class InputManager {
    public async getInput(options: InputBoxOptions) {
        return await window.showInputBox(options);
    }

    public async getRequiredInput(options: InputBoxOptions) {
        const value = await this.getInput(options);

        if (value !== undefined && !value) {
            window.showErrorMessage(options.prompt + ' is required!');
        }

        return value;
    }

    public getNamingOptions(namespace?: string): InputBoxOptions {
        const options = { prompt: 'Name' } as InputBoxOptions;
    
        if (!namespace) {
            return options;
        }

        namespace += '\\';
        options.value = namespace;
        options.valueSelection = [namespace.length, namespace.length];

        return options;
    }

    public getRenamingOptions(name: string): InputBoxOptions {
        const options = { prompt: 'Name' } as InputBoxOptions;
        
        const phpName = new PhpName(name);
        
        options.value = name;
        options.valueSelection = [name.length - phpName.getUnqualifiedName().length, name.length];

        return options;
    }
}
