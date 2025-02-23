const { app } = require("electron");
const path = require('path');
const fs = require('fs');

function handleDelFile(event, [files, targetDirdir]) {
  files.forEach((el) => {
    fs.unlinkSync(path.join(app.getAppPath(), "/devTemp/", targetDirdir, el));
  });
};

module.exports = { handleDelFile };