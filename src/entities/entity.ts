import * as fs from 'fs-extra';
import PhpName from './phpName';

export default abstract class Entity {
    protected file;
    protected subject;
 
    public setName(name) {
        name = new PhpName(name);

        const namespace = name.getNamespace();
        if (namespace) {
            this.file.addNamespace(namespace);
        }

        this.subject.setName(name.getUnqualifiedName());

        return this;
    }

    public save(path) {
        fs.outputFileSync(path, this.file);
        
        return this;
    }

    protected setUsegroup(name) {
        (this.file.findNamespace() || this.file).addUsegroup(name);
    }

    protected processName(name, action) {
        const phpName = new PhpName(name);
        
        if (phpName.isFullyQualified()) {
            action(phpName.getFullyQualifiedName());
            return;
        } 
        
        const usergroup = phpName.getQualifiedName() || phpName.getUnqualifiedName();
            
        if (usergroup) {
            this.setUsegroup(usergroup);
        }
            
        action(phpName.getUnqualifiedName());
    }
}
