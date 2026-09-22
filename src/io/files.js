const fs = require('fs').promises;


async function loadFully(filename) {
    try {
        return await fs.readFile(filename, 'utf8');
    } catch (err) {
        return null;
    }
}


module.exports = {
    loadFully
};
