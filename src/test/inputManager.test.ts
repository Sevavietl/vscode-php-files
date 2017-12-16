import * as assert from 'assert';
import { InputBoxOptions } from 'vscode';
import InputManager from '../inputManager';


suite('InputManager', () => {
    let inputManager: InputManager;

    setup(() => {
        inputManager = new InputManager;
    });

    suite('#getNamingOptions', () => {
        test('contains value when namespace given', () => {
            const options: InputBoxOptions = inputManager.getNamingOptions('Foo\\Bar');
            
            assert.equal('Foo\\Bar\\', options.value);
            assert.deepEqual([8, 8], options.valueSelection);
        });
    });
});
