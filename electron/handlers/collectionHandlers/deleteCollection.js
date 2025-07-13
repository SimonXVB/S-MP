const path = require('path');
const { app } = require("electron");
const fs = require('fs/promises');

async function deleteCollection(event, deleteData) {
    const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
    
    console.log(data);
};

module.exports = { deleteCollection };