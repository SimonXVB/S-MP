const { app } = require("electron");
const path = require('path');
const fs = require('fs');

function handleRenameFile(event, [oldName, newName, targetDir]) {
  if(newName === "") {
    throw new Error("empty");
  };

  const data = fs.readdirSync(path.join(app.getAppPath(), "media", targetDir));
  
  if(data.some(e => e.toLowerCase() === (newName.toLowerCase() + path.extname(oldName)))) {
    throw new Error("exists");
  };
  
  fs.renameSync(
    path.join(app.getAppPath(), "media", targetDir, oldName), 
    path.join(app.getAppPath(), "media", targetDir, (newName + path.extname(oldName)))
  );
};

module.exports = { handleRenameFile };