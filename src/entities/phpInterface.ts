import Entity from './entity';
import PhpName from './phpName';

export default class PhpInterface extends Entity {
    constructor(file) {
        super();
        this.file = file;
        this.subject = file.findInterface();
    }

    public setExtends(names) {
        const extendsNames = names.split(',').map(name => name.trim()).reduce((carry, name) => {
            this.processName(name, name => carry.push(name));

            return carry;
        }, [])

        this.subject.setExtends(extendsNames);

        return this;
    }
}
