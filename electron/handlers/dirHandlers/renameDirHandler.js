const { app } = require("electron");
const path = require('path');
const fs = require('fs');

function handleRenameDir(event, [oldName, newName, targetDir]) {
  if(newName === "") {
    throw new Error("empty");
  };

  const data = fs.readdirSync(path.join(app.getPath("documents"), "swan-media-player", targetDir));

  if(data.some(e => e.toLowerCase() === newName.toLowerCase())) {
    throw new Error("exists");
  };

  fs.renameSync(
    path.join(app.getPath("documents"), "swan-media-player", targetDir, oldName), 
    path.join(app.getPath("documents"), "swan-media-player", targetDir, newName)
  );
};

module.exports = { handleRenameDir };