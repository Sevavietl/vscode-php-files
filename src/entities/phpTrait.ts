import Entity from './entity';

export default class PhpTrait extends Entity {
    constructor(file) {
        super();
        this.file = file;
        this.subject = file.findTrait();
    }
}
