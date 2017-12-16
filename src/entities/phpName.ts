export default class PhpName {
    private name;
    private namespace;
    private unqualifiedName;
    private fullyQualifiedName;
    private qualifiedName;

    private types = {
        unqualified: 0,
        qualified: 1,
        fullyQualified: 2
    };

    private type;

    constructor(name) {
        this.name = name;
        this.setType();
        this.setUnqualifiedName();
        this.setNamespace();        
    }

    private setType() {
        if (this.name.indexOf('\\') === 0) {
            this.type = this.types.fullyQualified;
            this.fullyQualifiedName = this.name;
        } else if (this.name.indexOf('\\') > 0) {
            this.type = this.types.qualified;
            this.qualifiedName = this.name;
        } else {
            this.type = this.types.unqualified;
        }
    }

    private setUnqualifiedName() {
        this.unqualifiedName = this.name.split('\\').pop();
    }

    private setNamespace() {
        let name = this.name;
        
        if (this.isFullyQualified()) {
            name = name.substr(1);
        }

        const namespace = this.retrieveNamespace(name);

        if (namespace) {
            this.namespace = namespace;
        }
    }

    private retrieveNamespace(name) {
        return name.split('\\').slice(0, -1).join('\\');
    }

    public isUnqualified() {
        return this.type === this.types.unqualified;
    }

    public isQualified() {
        return this.type === this.types.qualified;
    }

    public isFullyQualified() {
        return this.type === this.types.fullyQualified;
    }

    public getNamespace(){
        return this.namespace;
    }

    public getUnqualifiedName() {
        return this.unqualifiedName;
    }

    public getFullyQualifiedName() {
        return this.fullyQualifiedName;
    }

    public getQualifiedName() {
        return this.qualifiedName;
    }
}
