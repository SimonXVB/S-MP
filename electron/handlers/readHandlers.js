const fs = require('fs');
const path = require('path');

function handleReadVideo() {
  const data = fs.readdirSync("./devTemp/videos");
  return data;
};

function handleReadAudio() {
  const data = fs.readdirSync("./devTemp/music");
  return data;
};

module.exports = { handleReadVideo, handleReadAudio };