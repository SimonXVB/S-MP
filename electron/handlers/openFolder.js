const path = require('path');
const { shell, app } = require("electron");

function openFolder(event, targetDir) {
    shell.openPath(path.join(app.getPath(targetDir)));
};

module.exports = { openFolder };