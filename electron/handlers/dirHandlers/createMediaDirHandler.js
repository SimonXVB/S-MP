const path = require('path');
const { app } = require("electron");
const fs = require('fs');

function handlerCreateMediaDir(event) {
    if(!fs.existsSync(path.join(app.getPath("documents"), "swan-media-player"))) {
        fs.mkdirSync(path.join(app.getPath("documents"), "swan-media-player"));
    };

    if(!fs.existsSync(path.join(app.getPath("documents"), "swan-media-player", "videos"))) {
        fs.mkdirSync(path.join(app.getPath("documents"), "swan-media-player", "videos"));
    };

    if(!fs.existsSync(path.join(app.getPath("documents"), "swan-media-player", "audio"))) {
        fs.mkdirSync(path.join(app.getPath("documents"), "swan-media-player", "audio"));
    };
};

module.exports = { handlerCreateMediaDir };