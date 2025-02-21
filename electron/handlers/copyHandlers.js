const { dialog } = require("electron");
const path = require('path');
const fs = require('fs');

async function handleVideoFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["multiSelections"]
  });
  const formats = [".mp4", ".webm", ".ogg"];

  if (!canceled) {
    filePaths.forEach((file) => {
      const fileName = path.basename(file);

      if(fs.readdirSync("./devTemp/videos").includes(fileName)) {
        throw new Error("exists");
      };
  
      if(!formats.includes(path.extname(fileName))) {
        throw new Error("format");
      };
  
      fs.copyFile(file, "./devTemp/videos/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    });

    return "success";
  };
};

async function handleAudioFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["multiSelections"]
  });
  const formats = [".mp3", ".wav", ".ogg"];

  if (!canceled) {
    filePaths.forEach((file) => {
      const fileName = path.basename(file);

      if(fs.readdirSync("./devTemp/audio").includes(fileName)) {
        throw new Error("exists");
      };
  
      if(!formats.includes(path.extname(fileName))) {
        throw new Error("format");
      };
  
      fs.copyFile(file, "./devTemp/audio/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    });

    return "success";
  };
};

module.exports = { handleVideoFile, handleAudioFile };