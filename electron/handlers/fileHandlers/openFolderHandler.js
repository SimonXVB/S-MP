const path = require('path');
const { shell, app } = require("electron");

function handleOpenFolder(event, targetDir) {
    shell.openPath(path.join(app.getAppPath(), targetDir));
};

module.exports = { handleOpenFolder };