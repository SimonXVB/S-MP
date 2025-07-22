const path = require("path");
const { app } = require("electron");

function getMediaSource(event, sourceData) {
    return path.join(app.getPath(sourceData.targetDir, sourceData.targetCol));
};

module.exports = { getMediaSource };