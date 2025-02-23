const path = require('path');
const { app } = require("electron");
const fs = require('fs');

function handleDelDir(event, [targetDir, name]) {
    fs.rmSync(path.join(app.getAppPath(), "/devTemp/", targetDir, name), {recursive: true, force: true});
};

module.exports = { handleDelDir };