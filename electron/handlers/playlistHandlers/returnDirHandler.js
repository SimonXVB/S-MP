const { app } = require("electron");
const fs = require('fs');
const path = require('path');

function handleReturnDir(event, targetDir) {
  const data = fs.readdirSync(path.join(app.getAppPath(), "/devTemp/", targetDir), { withFileTypes: true });

  return data.filter((el) => {
    return el.isDirectory();
  });
};

module.exports = { handleReturnDir };