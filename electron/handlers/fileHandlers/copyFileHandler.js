const { dialog, app } = require("electron");
const path = require('path');
const fs = require('fs');

async function handleCopyFile(event, [targetDir, type]) {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["multiSelections"]
  });
  const formatsVideo = [".mp4", ".webm", ".ogg"];
  const formatsAudio = [".mp3", ".wav", ".ogg"];

  const formats = type === "videos" ? formatsVideo : formatsAudio;

  if (!canceled) {
    filePaths.forEach((file) => {
      const fileName = path.basename(file);
      const data = fs.readdirSync(path.join(app.getAppPath(), "/devTemp/", targetDir));

      if(data.some(e => e.toLowerCase() === fileName.toLowerCase())) {
        throw new Error("exists");
      };

      if(!formats.includes(path.extname(fileName))) {
        throw new Error("format");
      };

      fs.copyFile(file, path.join(app.getAppPath(), "/devTemp/", targetDir, fileName), (err) => {
        if(err) {
          console.log(err);
        };
      });
    });

    return "success";
  };
};

module.exports = { handleCopyFile };