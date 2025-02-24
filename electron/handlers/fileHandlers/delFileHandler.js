const { app } = require("electron");
const path = require('path');
const fs = require('fs');

function handleDelFile(event, [files, targetDir]) {
  files.forEach((el) => {
    fs.unlinkSync(path.join(app.getAppPath(), "media", targetDir, el));
  });
};

module.exports = { handleDelFile };