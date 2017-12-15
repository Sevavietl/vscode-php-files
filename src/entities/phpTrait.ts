import Entity from './entity';
import FullyQualifiedName from './fullyQualifiedName';

export default class PhpTrait extends Entity {
    constructor(file) {
        super();
        this.file = file;
        this.subject = file.findTrait();
    }
}
