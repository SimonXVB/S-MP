const path = require('path');
const { mkdir, readdir } = require('fs/promises');
const { app } = require("electron");

async function createCollection(event, collectionData) {
    try {
        const collectionPath = path.join(app.getPath(collectionData.targetDir), "Swan MP");
        const allCollections = (await readdir(collectionPath, {withFileTypes: true})).filter(col => col.isDirectory());

        // Throw error when name is empty
        if(collectionData.name === "") {
            throw new Error("emptyCollection");
        };

        // Throw error when a folder with the same name aleady exists
        if(allCollections.some(col => col.name.toLowerCase() === collectionData.name.toLowerCase())) {
            throw new Error("existsCollection");
        };

        //Create collection folder
        await mkdir(path.join(collectionPath, collectionData.name));

        return "created";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { createCollection };