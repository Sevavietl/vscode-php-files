import Entity from './entity';
import FullyQualifiedName from './fullyQualifiedName';

export default class PhpInterface extends Entity {
    constructor(file) {
        super();
        this.file = file;
        this.subject = file.findInterface();
    }

    public setExtends(names) {
        const interfaces = names.split(',').map(name => name.trim()).reduce((carry, name) => {
            const _interface = new FullyQualifiedName(name);

            if (_interface.hasNamespace()) {
                this.setUsegroup(name);                
            }

            carry.push(_interface.basename);

            return carry;
        }, [])

        this.subject.setExtends(interfaces.join(','));

        return this;
    }
}
