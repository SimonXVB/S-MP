const { dialog, app } = require("electron");
const path = require('path');
const { readdir, copyFile } = require('fs/promises');

async function copyToCollection(event, copyData) {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["multiSelections"]
    });

    // Set formats based on targetDir
    const formatsVideo = [".mp4", ".webm", ".ogg"];
    const formatsAudio = [".mp3", ".wav", ".ogg"];
    const formats = copyData.targetDir === "videos" ? formatsVideo : formatsAudio;

    if (canceled) {
      return;
    };

    const currentDir = await readdir(path.join(app.getPath(copyData.targetDir), "Swan MP", copyData.targetCol));

    // Loop over filePaths and copy files to target Collection + handle errors
    for (const file of filePaths) {
      const baseName = path.basename(file);
      const ext = path.extname(file);

      if(!formats.includes(ext)) {
        throw new Error("format");
      };

      if(currentDir.some(file => file === baseName)) {
        throw new Error("exists");
      };

      await copyFile(file, path.join(app.getPath(copyData.targetDir), "Swan MP", copyData.targetCol, baseName));
    };

    return "copied";
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { copyToCollection };