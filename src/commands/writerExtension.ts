const Writer = require('php-writer');
const parser = require('php-parser');

Writer.prototype.setNamespace = function(name) {
    if (this.ast.kind !== 'program') {
        return this;
    }

    var namespace = parser.parseEval('namespace a;').children.shift();

    namespace.name = name;
    this.ast.children.forEach(function (node) {
        namespace.children.push(node);
    });

    this.ast.children = [namespace];

    return this;
}

Writer.prototype.addUsergroup = function (name) {
    if (this.ast.kind !== 'program') {
        return this;
    }

    var usergroup = parser.parseEval('use a;').children.shift();
    usergroup.items[0].name = name;

    var insertBefore = this.ast.children[0].children.findIndex(function (node) {
        return node.kind !== 'usergroup';
    });

    this.ast.children[0].children.splice(insertBefore, 0, usergroup);

    return this;
}
