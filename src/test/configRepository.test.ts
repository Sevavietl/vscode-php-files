import * as assert from 'assert';

import ConfigsRepository from '../configsRepository';

suite('ConfigRepository', () => {
    let configsRepository: ConfigsRepository;

    setup(() => {
        configsRepository = new ConfigsRepository;
    });

    suite('#getNamespaces', () => {
        test('returns empty object when not .php-files.json present', () => {
            assert.deepEqual({}, configsRepository.getNamespaces());
        });
    });
});
