const { app } = require("electron");
const path = require('path');
const { readdir } = require("fs/promises");
const { existsSync } = require("fs");

async function getCollections(event, targetDir) {
  const collectionsPath = path.join(app.getPath(targetDir), "Swan MP");
  const collectionsData = [];
  
  // Get all collections in specified directory
  const collections = (await readdir(collectionsPath, {withFileTypes: true})).filter(col => col.isDirectory());

  collections.forEach(col => {
    // Check if an image exists
    let imgExists = existsSync(path.join(collectionsPath, col.name, "coverImg.png"));

    // Push name and image (if exists) data to collectionsData array
    collectionsData.push({
      name: col.name,
      img: imgExists && path.join(collectionsPath, col.name, "coverImg.png")
    });
  });

  return collectionsData;
};

module.exports = { getCollections };