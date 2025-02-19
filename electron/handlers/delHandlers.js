const path = require('path');
const fs = require('fs');

function handleDelVideo(event, path) {
  path.forEach((el) => {
    fs.unlink("./devTemp/videos/" + el, (err) => {
      if(err) console.log(err);
    });
  });
};

function handleDelAudio(event, path) {
  path.forEach((el) => {
    fs.unlink("./devTemp/audio/" + el, (err) => {
      if(err) console.log(err);
    });
  });
};

module.exports = { handleDelVideo, handleDelAudio };