import { WorkspaceConfiguration } from 'vscode';

export default class TemplatesRepository {
    private config: WorkspaceConfiguration;

    constructor(config: WorkspaceConfiguration) {
        this.config = config;
    }

    public findAll() {
        const templates = this.config.get('templates');

        return Object.keys(templates).reduce((carry, name) => {
            carry[name] = this.stringify(templates[name])

            return carry;
        });
    }

    public findByName(name) {
        return this.stringify(this.config.get('templates.' + name));
    }

    private stringify(template: Array<String>)
    {
        return template.join("\n");
    }
}
