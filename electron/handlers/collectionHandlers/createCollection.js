const path = require('path');
const { app } = require("electron");
const fs = require('fs');

function createCollection(event, [targetDirName, collectionName]) {
    if(collectionName === "") {
        throw new Error("empty");
    };

    const directories = fs.readdirSync(path.join(app.getPath("documents"), "swan-media-player", targetDirName), { withFileTypes: true }).filter((el) => {
        return el.isDirectory();
    });

    if(directories.some(e => e.name.toLowerCase() === collectionName.toLowerCase())) {
        throw new Error("exists");
    };

    fs.mkdirSync(path.join(app.getPath("documents"), "swan-media-player", targetDirName, collectionName));
};

module.exports = { createCollection };