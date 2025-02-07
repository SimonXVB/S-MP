const path = require('path');
const fs = require('fs');

function handleDelVideo(event, path) {
  fs.unlink("./devTemp/videos/" + path, (err) => {
    if(err) console.log(err);
  });
};

function handleDelAudio(event, path) {
  fs.unlink("./devTemp/music/" + path, (err) => {
    if(err) console.log(err)
  });
};

module.exports = { handleDelVideo, handleDelAudio };