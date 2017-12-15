import Entity from './entity';
import FullyQualifiedName from './fullyQualifiedName';

export default class PhpClass extends Entity {
    constructor(file, name: String) {
        super();
        this.file = file;
        this.subject = file.findInterface('PHPInterface');
    }

    public setExtends(names) {
        const interfaces = names.split(',').map(name => name.trim()).reduce((carry, name) => {
            const _interface = new FullyQualifiedName(name);

            if (_interface.hasNamespace()) {
                this.file.addUsergroup(name);
            }

            carry.push(_interface.basename);

            return carry;
        }, [])

        this.subject.setExtends(interfaces.join(','));

        return this;
    }
}
