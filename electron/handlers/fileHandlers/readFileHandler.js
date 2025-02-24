const { app } = require("electron");
const fs = require('fs');
const path = require('path');

function handleReadDir(event, targetDir) {
  const data = fs.readdirSync(path.join(app.getAppPath(), "media", targetDir));
  return data;
};

module.exports = { handleReadDir };