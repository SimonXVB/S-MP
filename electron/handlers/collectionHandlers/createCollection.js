const path = require('path');
const { readdir, mkdir, writeFile } = require('fs/promises');
const { app } = require("electron");

async function createCollection(event, collectionData) {
    try {
        const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
        const collectionPath = path.join(app.getPath(collectionData.targetDir), "Swan MP", collectionData.name);

        // Throw error when name is empty
        if(collectionData.name === "") {
            throw new Error("empty");
        };

        // Returns sub-dirs of corresponding parent-dir and stores it in "collections" var
        const files = await readdir(path.join(app.getPath(collectionData.targetDir), "Swan MP"), {withFileTypes: true});
        const collections = files.filter(el => el.isDirectory());

        // Throw error when a folder with the same name aleady exists
        if(collections.some(e => e.name.toLowerCase() === collectionData.name.toLowerCase())) {
            throw new Error("exists");
        };

        //Create collection folder and corresponding entry in data.json file
        await mkdir(collectionPath);

        data[collectionData.targetDir].push({
            name: collectionData.name,
            coverImg: collectionData.imgBase64,
            path: collectionPath,
            creationDate: Date.now()
        });
        await writeFile(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"), JSON.stringify(data));

        // Returns "created" string to renderer
        return "created";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { createCollection };