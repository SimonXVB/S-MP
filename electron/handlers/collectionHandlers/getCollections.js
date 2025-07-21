const { app } = require("electron");
const path = require('path');
const { readdir } = require("fs/promises");

async function getCollections(event, targetDir) {
  try {
    const collectionsPath = path.join(app.getPath(targetDir), "Swan MP");
    
    // Get all collections in specified directory
    const collections = (await readdir(collectionsPath, {withFileTypes: true}))
      .filter(col => col.isDirectory())
      .map(col => col.name);

    return collections;
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { getCollections };