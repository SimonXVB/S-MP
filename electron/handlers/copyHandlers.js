const { dialog } = require("electron");
const path = require('path');
const fs = require('fs');

async function handleVideoFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  const formats = [".mp4", ".webm", ".ogg"];

  if (!canceled) {
    const fileName = path.basename(filePaths[0]);

    if(formats.includes(path.extname(fileName))) {
      fs.copyFile(filePaths[0], "./devTemp/videos/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    } else {
      console.log("Incorrect file type");
    };
  };
};

async function handleAudioFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  const formats = [".mp3", ".wav", ".ogg"];

  if (!canceled) {
    const fileName = path.basename(filePaths[0]);

    if(formats.includes(path.extname(fileName))) {
      fs.copyFile(filePaths[0], "./devTemp/music/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    } else {
      console.log("Incorrect file type");
    };
  };
};

module.exports = { handleVideoFile, handleAudioFile };