const path = require('path');
const fs = require('fs');
const { app } = require("electron");

function createCollection(event, collectionData) {
    const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
    const collectionPath = path.join(app.getPath(collectionData.targetDir), "Swan MP", collectionData.name);

    // Throw error when name is empty
    if(collectionData.name === "") {
        throw new Error("empty");
    };

    // Returns sub-dirs of corresponding parent-dir and stores it in "collections" var
    const collections = fs.readdirSync(path.join(app.getPath(collectionData.targetDir), "Swan MP"), {withFileTypes: true}).filter(el => el.isDirectory());

    // Throw error when a folder with the same name aleady exists
    if(collections.some(e => e.name.toLowerCase() === collectionData.name.toLowerCase())) {
        throw new Error("exists");
    };

    //Create collection folder and corresponding entry in data.json file
    fs.mkdirSync(collectionPath);

    data[collectionData.targetDir].push({
        name: collectionData.name,
        coverImg: collectionData.imgBase64,
        path: collectionPath,
        creationData: Date.now()
    });

    fs.writeFileSync(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"), JSON.stringify(data));
};

module.exports = { createCollection };