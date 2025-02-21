const path = require('path');
const fs = require('fs');

function handleDelVideo(event, path) {
  path.forEach((el) => {
    fs.unlinkSync("./devTemp/videos/" + el)
  });
};

function handleDelAudio(event, path) {
  path.forEach((el) => {
    fs.unlinkSync("./devTemp/audio/" + el)
  });
};

module.exports = { handleDelVideo, handleDelAudio };