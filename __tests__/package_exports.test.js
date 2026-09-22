const t = require('tap');
const fs = require('fs');
const path = require('path');

const root = require('@wizhut_tech/wizjs');

const PUBLIC_NAMESPACES = ['io', 'lang', 'math'];
const SRC = path.join(__dirname, '..', 'src');


function areasOf(namespace) {
    return fs.readdirSync(path.join(SRC, namespace))
        .filter((name) => name.endsWith('.js'))
        .map((name) => name.slice(0, -3))
        .sort();
}


t.test('exports/every public leaf module has a subpath', (t) => {
    for (const namespace of PUBLIC_NAMESPACES) {
        const areas = areasOf(namespace);
        t.ok(areas.length > 0, `${namespace} has at least one area`);

        for (const area of areas) {
            const subpath = `@wizhut_tech/wizjs/${namespace}/${area}`;

            t.equal(
                require(subpath),
                root[namespace][area],
                `${subpath} is the same object as root.${namespace}.${area}`
            );

            t.equal(
                require(`${subpath}.js`),
                root[namespace][area],
                `${subpath}.js resolves to the same object`
            );
        }
    }

    t.end();
});


t.test('exports/root entry point still resolves', (t) => {
    t.equal(require('@wizhut_tech/wizjs'), root);
    t.type(root.lang.collections.Counter, 'function');
    t.type(root.exceptions.BadlyInitializedError, 'function');
    t.end();
});


t.test('exports/internals stay private', (t) => {
    t.throws(
        () => require('@wizhut_tech/wizjs/internal/exceptions'),
        { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' },
        'src/internal is not reachable as a subpath'
    );

    t.throws(
        () => require('@wizhut_tech/wizjs/src/lang/collections.js'),
        { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' },
        'the raw src/ layout is not part of the public surface'
    );

    t.throws(
        () => require('@wizhut_tech/wizjs/lang/does-not-exist'),
        { code: 'MODULE_NOT_FOUND' },
        'an unknown area under a mapped namespace fails to resolve'
    );

    t.end();
});


t.test('exports/package.json is reachable', (t) => {
    t.equal(require('@wizhut_tech/wizjs/package.json').name, '@wizhut_tech/wizjs');
    t.end();
});
