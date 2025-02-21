const path = require('path');
const fs = require('fs');

function handleRenameVideo(event, [oldName, newName]) {
  if(newName === "") {
    throw new Error("empty");
  };

  if(fs.readdirSync("./devTemp/videos").includes(newName + path.extname(oldName))) {
    throw new Error("exists");
  };

  fs.renameSync("./devTemp/videos/" + oldName, "./devTemp/videos/" + newName + path.extname(oldName));
};

function handleRenameAudio(event, [oldName, newName]) {
  if(newName === "") {
    throw new Error("empty");
  };

  if(fs.readdirSync("./devTemp/audio").includes(newName + path.extname(oldName))) {
    throw new Error("exists");
  };

  fs.renameSync("./devTemp/audio/" + oldName, "./devTemp/audio/" + newName + path.extname(oldName));
};

module.exports = { handleRenameVideo, handleRenameAudio };