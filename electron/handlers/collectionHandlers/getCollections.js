const { app } = require("electron");
const path = require('path');

function getCollections(event, currentTab) {
  const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
  return data[currentTab];
};

module.exports = { getCollections };