const path = require('path');
const { shell, app } = require("electron");

function openFolder(event, dir) {
    shell.openPath(path.join(app.getAppPath(), dir));
};

module.exports = { openFolder };