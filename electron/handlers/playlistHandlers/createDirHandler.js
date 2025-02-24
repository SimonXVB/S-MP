const path = require('path');
const { app } = require("electron");
const fs = require('fs');

function handleCreateDir(event, [targetDir, name]) {
    if(name === "") {
        throw new Error("empty");
    };

    const data = fs.readdirSync(path.join(app.getAppPath(), "media", targetDir), { withFileTypes: true }).filter((el) => {
        return el.isDirectory();
    });

    if(data.some(e => e.name.toLowerCase() === name.toLowerCase())) {
        throw new Error("exists");
    };

    fs.mkdirSync(path.join(app.getAppPath(), "media", targetDir, name));
};

module.exports = { handleCreateDir };