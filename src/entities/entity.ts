import * as fs from 'fs';
import FullyQualifiedName from './fullyQualifiedName';

export default abstract class Entity {
    protected file;
    protected subject;
 
    public setName(name) {
        name = new FullyQualifiedName(name);

        if (name.hasNamespace()) {
            this.file.addNamespace(name.namespace);
        }

        this.subject.setName(name.basename);

        return this;
    }

    public save(path) {
        fs.writeFileSync(path, this.file);
        
        return this;
    }

    protected setUsegroup(name) {
        (this.file.findNamespace() || this.file).addUsegroup(name);
    }
}
