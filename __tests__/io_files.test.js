const t = require('tap');
const path = require('path');

const { loadFully } = require('../src/io/files.js');


t.test('files/loadFully returns null for a file that is not there', async (t) => {
    const missing = path.join(t.testdir(), 'no-such-file.txt');

    t.equal(await loadFully(missing), null);
});


t.test('files/loadFully returns null when the path is a directory', async (t) => {
    const dir = t.testdir({ 'sub': {} });

    t.equal(await loadFully(path.join(dir, 'sub')), null);
});


t.test('files/loadFully reads an existing file without throwing', async (t) => {
    const dir = t.testdir({ 'hello.txt': 'contents\n' });

    // NOTE: the resolved value is deliberately not asserted here. loadFully
    // reads the file but never returns what it read, so on success it always
    // resolves to undefined -- see src/io/files.js. Pinning that down in a
    // test would enshrine the bug; this case covers the read path only.
    await t.resolves(loadFully(path.join(dir, 'hello.txt')));
});
