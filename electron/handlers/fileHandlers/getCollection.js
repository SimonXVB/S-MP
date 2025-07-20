const { app } = require("electron");
const { readdir } = require('fs/promises');
const path = require('path');

async function getCollection(event, getData) {
  try {
    const data = await readdir(path.join(app.getPath(getData.targetDir), "Swan MP", getData.targetCol));

    // Set formats based on targetDir
    const formatsVideo = [".mp4", ".webm", ".ogg"];
    const formatsAudio = [".mp3", ".wav", ".ogg"];
    const formats = getData.targetDir === "videos" ? formatsVideo : formatsAudio;

    const correctFormatFiles = [];

    // Loops over dir entries and checks for correct file format
    data.forEach(file => {
      const ext = path.extname(file);

      if(formats.includes(ext)) {
        correctFormatFiles.push(file);
      };
    });

    return correctFormatFiles;
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { getCollection };