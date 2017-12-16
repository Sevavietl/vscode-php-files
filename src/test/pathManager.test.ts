import * as assert from 'assert';
import { mock, when, instance } from 'ts-mockito';
import * as vscode from 'vscode';

import ConfigsRepository from '../configsRepository';
import PathManager from '../pathManager';

suite('PathManager', () => {
    let pathManager: PathManager;

    setup(() => {
        const configsRepository: ConfigsRepository = mock(ConfigsRepository);
        when(configsRepository.getNamespaces()).thenReturn({
            'Foo': 'dist',
            'Bar\\Baz': 'src'
        });

        pathManager = new PathManager(instance(configsRepository));
    });

    suite('#prepareDefaultPath', () => {
        test('prepares path from target folder and class name', () => {
            const targetFolder = 'foo/bar';
            const name = 'Baz';

            const defaultPath = pathManager.prepareDefaultPath(targetFolder, name);

            assert.equal('foo/bar/Baz.php', defaultPath);
        })
    });
    
    suite('#basename', () => {
        test('return filename from path', () => {
            assert.equal('Baz.php', pathManager.basename('foo/bar/Baz.php'));
        })
    });

    suite('#resolveNamespace', () => {
        test('should resolve namespace from path', () => {
            const path = vscode.workspace.rootPath + '/dist/Quux';
            const namespace = pathManager.resolveNamespace(path);

            assert.equal('Foo\\Quux', namespace);
        });
        
        test('should return null when cannot resolve', () => {
            const path = 'non/resolvable/path';
            const namespace = pathManager.resolveNamespace(path);

            assert.equal(null, namespace);
        });
    });
    
    suite('#resolvePath', () => {
        test('should resolve path from namespace', () => {
            const namespace = 'Foo\\Bar\\Baz';
            const path = pathManager.resolvePath(namespace, 'foo');
            const expectedPath = vscode.workspace.rootPath + '/dist/Bar/Baz.php';

            assert.equal(expectedPath, path);
        });

        test('should return default path when cannot resolve', () => {
            const namespace = 'Quux';
            const path = pathManager.resolvePath(namespace, 'default/path');

            assert.equal('default/path', path);
        });
    });
});
