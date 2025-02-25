const fs = require('fs').promises;


async function loadFully(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
    } catch (err) {
        return null;
    }
}


module.exports = {
    loadFully
};
