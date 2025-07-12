const path = require('path');
const { app } = require("electron");
const fs = require('fs');

// eslint-disable-next-line no-unused-vars
function createRootDirs(event) {
    //Create "Swan MP Data" folder if folder doesnt't exist
    if(!fs.existsSync(path.join(app.getPath("userData"), "Swan MP Data"))) {
        fs.mkdirSync(path.join(app.getPath("userData"), "Swan MP Data"));

        if(!fs.existsSync(path.join(app.getPath("userData"), "Swan MP Data", "data.json"))) {
            fs.writeFileSync(path.join(app.getPath("userData"), "Swan MP Data", "data.json"), '{"videos": [], "audio": []}');
        };

        if(!fs.existsSync(path.join(app.getPath("userData"), "Swan MP Data", "Cover Images"))) {
            fs.mkdirSync(path.join(app.getPath("userData"), "Swan MP Data", "Cover Images"));
        };
    };

    //Create Video/Audio folders if folders don't exist
    if(!fs.existsSync(path.join(app.getPath("videos"), "Swan MP"))) {
        fs.mkdirSync(path.join(app.getPath("videos"), "Swan MP"));
    };

    if(!fs.existsSync(path.join(app.getPath("music"), "Swan MP"))) {
        fs.mkdirSync(path.join(app.getPath("music"), "Swan MP"));
    };
};

module.exports = { createRootDirs };