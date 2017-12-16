import Entity from './entity';
import PhpName from './phpName';

export default class PhpClass extends Entity {
    constructor(file) {
        super();
        this.file = file;
        this.subject = file.findClass();
    }

    public setExtends(name) {
        this.processName(name, name => this.subject.setExtends(name));
        
        return this;
    }

    public setImplements(names) {
        const implementsNames = names.split(',').map(name => name.trim()).reduce((carry, name) => {
            this.processName(name, name => carry.push(name));

            return carry;
        }, [])

        this.subject.setImplements(implementsNames);

        return this;
    }
}
