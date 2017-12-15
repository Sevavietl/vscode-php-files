export default class FullyQuialifiedName {
    private _namespace: String;
    private _basename: String;

    constructor(name: String) {
        this._namespace = this.retrieveNamespace(name);
        this._basename = this.retrieveBasename(name);
    }

    private retrieveNamespace(name) {
        return name.split('\\').slice(0, -1).join('\\');
    }

    private retrieveBasename(name) {
        return name.split('\\').pop();
    }

    get namespace(): String {
        return this._namespace;
    }

    get basename(): String {
        return this._basename;
    }

    public hasNamespace(): Boolean {
        return Boolean(this.namespace);
    }
}
