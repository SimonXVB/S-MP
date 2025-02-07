const path = require('path');
const fs = require('fs');

function handleRenameVideo(event, [oldName, newName]) {
  fs.rename("./devTemp/videos/" + oldName, "./devTemp/videos/" + newName + path.extname(oldName), (err) => {
    if (err) console.log(err);
  });
};

function handleRenameAudio(event, [oldName, newName]) {
  fs.rename("./devTemp/music/" + oldName, "./devTemp/music/" + newName + path.extname(oldName), (err) => {
    if (err) console.log(err);
  });
};

module.exports = { handleRenameVideo, handleRenameAudio };