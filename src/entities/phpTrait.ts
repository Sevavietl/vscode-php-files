import Entity from './entity';
import FullyQualifiedName from './fullyQualifiedName';

export default class PhpClass extends Entity {
    constructor(file, name: String) {
        super();
        this.file = file;
        this.subject = file.findTrait('PHPTrait');
    }
}
