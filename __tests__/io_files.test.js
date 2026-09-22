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


t.test('files/loadFully returns the whole file as text', async (t) => {
    const dir = t.testdir({ 'hello.txt': 'contents\n' });

    t.equal(await loadFully(path.join(dir, 'hello.txt')), 'contents\n');
});


t.test('files/loadFully returns an empty string for an empty file', async (t) => {
    const dir = t.testdir({ 'empty.txt': '' });

    t.equal(await loadFully(path.join(dir, 'empty.txt')), '',
        'an empty file is distinguishable from a failed read');
});


t.test('files/loadFully preserves multi-line and unicode content', async (t) => {
    const body = 'first\nsecond\n\u03b1\u03b2\u03b3\n';
    const dir = t.testdir({ 'multi.txt': body });

    t.equal(await loadFully(path.join(dir, 'multi.txt')), body);
});
