import Entity from './entity';
import FullyQualifiedName from './fullyQualifiedName';

export default class PhpClass extends Entity {
    constructor(file, name: String) {
        super();
        this.file = file;
        this.subject = file.findClass('PHPClass');
    }

    public setExtends(name) {
        const parent = new FullyQualifiedName(name);

        if (parent.hasNamespace()) {
            this.file.addUsergroup(name);
        }

        this.subject.setExtends(parent.basename);

        return this;
    }

    public setImplements(names) {
        const interfaces = names.split(',').map(name => name.trim()).reduce((carry, name) => {
            const _interface = new FullyQualifiedName(name);

            if (_interface.hasNamespace()) {
                this.file.addUsergroup(name);
            }

            carry.push(_interface.basename);

            return carry;
        }, [])

        this.subject.setImplements(interfaces);

        return this;
    }
}
