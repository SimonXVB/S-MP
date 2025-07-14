const path = require('path');
const { mkdir, writeFile } = require('fs/promises');
const { app } = require("electron");

async function createCollection(event, collectionData) {
    try {
        const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
        const collectionPath = path.join(app.getPath(collectionData.targetDir), "Swan MP", collectionData.name);

        // Throw error when name is empty
        if(collectionData.name === "") {
            throw new Error("empty");
        };

        // Throw error when a folder with the same name aleady exists
        if(data[collectionData.targetDir].some(e => e.name === collectionData.name)) {
            throw new Error("exists");
        };

        //Create collection folder and corresponding entry in data.json file
        await mkdir(collectionPath);

        data[collectionData.targetDir].push({
            name: collectionData.name,
            img: collectionData.img,
            path: collectionPath,
            creationDate: Date.now()
        });
        await writeFile(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"), JSON.stringify(data));

        return "created";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { createCollection };