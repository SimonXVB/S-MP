const { app } = require("electron");
const { readdir } = require('fs/promises');
const path = require('path');

async function getCollection(event, getData) {
  try {
    const data = await readdir(path.join(app.getPath(getData.targetDir), "Swan MP", getData.targetCol));

    // Set formats based on targetDir
    const formats = getData.targetDir === "videos" ? [".mp4", ".webm", ".ogg"] : [".mp3", ".wav", ".ogg"];

    // Filter files based on format
    const correctFormatFiles = data.filter(file => {
      const ext = path.extname(file);

      if(formats.includes(ext)) {
        return file;
      };
    });

    return correctFormatFiles;
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { getCollection };