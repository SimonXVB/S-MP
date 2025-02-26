const path = require('path');
const { shell, app } = require("electron");

function handleOpenFolder(event, targetDir) {
    shell.openPath(path.join(app.getPath("documents"), "swan-media-player", targetDir));
};

module.exports = { handleOpenFolder };