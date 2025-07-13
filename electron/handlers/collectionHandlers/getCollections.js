const { app } = require("electron");
const path = require('path');

function getCollections() {
  const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));

  return data;
};

module.exports = { getCollections };