const { app } = require("electron");
const fs = require('fs');
const path = require('path');

function handleReadDir(event, targetDir) {
  const data = fs.readdirSync(path.join(app.getPath("documents"), "swan-media-player", targetDir));
  return data;
};

module.exports = { handleReadDir };