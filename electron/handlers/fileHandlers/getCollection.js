const { app } = require("electron");
const { readdir } = require('fs/promises');
const path = require('path');

async function getCollection(event, getData) {
  try {
    const basePath = path.join(app.getPath(getData.targetDir), "Swan MP", getData.targetCol);

    const data = await readdir(basePath);

    // Set formats based on targetDir
    const formats = getData.targetDir === "videos" ? [".mp4", ".webm", ".ogg"] : [".mp3", ".wav", ".ogg"];

    const correctFormatFiles = [];

    // Filter files based on format
    data.forEach(file => {
      const ext = path.extname(file);

      if(formats.includes(ext)) {
        correctFormatFiles.push({
          name: file,
          source: path.join(basePath, file)
        });
      };
    });

    return correctFormatFiles;
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { getCollection };