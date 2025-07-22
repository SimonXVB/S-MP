const { dialog, app } = require("electron");
const path = require('path');
const { readdir, copyFile } = require('fs/promises');

async function copyToCollection(event, copyData) {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["multiSelections"]
    });

    // Set formats based on targetDir
    const formats = copyData.targetDir === "videos" ? [".mp4", ".webm", ".ogg"] : [".mp3", ".wav", ".ogg"];

    if (canceled) {
      return;
    };

    const currentDir = await readdir(path.join(app.getPath(copyData.targetDir), "Swan MP", copyData.targetCol));

    // Loop over filePaths and copy files to target Collection + handle errors
    for (const file of filePaths) {
      const baseName = path.basename(file);
      const ext = path.extname(file);

      // Throw error when file has incorrect file format
      if(!formats.includes(ext)) {
        if(copyData.targetDir === "videos") {
          throw new Error("formatVideo");
        } else {
          throw new Error("formatAudio");
        };
      };

      // Throw error when a file with the same name already exists
      if(currentDir.some(file => file === baseName)) {
        throw new Error("existsFile");
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