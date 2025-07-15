const path = require('path');
const { app } = require("electron");
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
function createRootDirs(event) {
    //Create Video/Audio folders if folders don't exist
    if(!fs.existsSync(path.join(app.getPath("videos"), "Swan MP"))) {
        fs.mkdirSync(path.join(app.getPath("videos"), "Swan MP"));
    };

    if(!fs.existsSync(path.join(app.getPath("music"), "Swan MP"))) {
        fs.mkdirSync(path.join(app.getPath("music"), "Swan MP"));
    };
};

module.exports = { createRootDirs };