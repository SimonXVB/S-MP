const path = require('path');
const { mkdir, writeFile, readdir } = require('fs/promises');
const { app } = require("electron");

async function createCollection(event, collectionData) {
    try {
        const collectionPath = path.join(app.getPath(collectionData.targetDir), "Swan MP");
        const collections = (await readdir(collectionPath, {withFileTypes: true})).filter(col => col.isDirectory());

        // Throw error when name is empty
        if(collectionData.name === "") {
            throw new Error("empty");
        };

        // Throw error when a folder with the same name aleady exists
        if(collections.some(col => col.name === collectionData.name)) {
            throw new Error("exists");
        };

        //Create collection folder and add cover image to folder (if present)
        await mkdir(path.join(collectionPath, collectionData.name));

        if(collectionData.img) {
            const base64Img = collectionData.img.split(';base64,').pop();
            await writeFile(path.join(collectionPath, collectionData.name, "coverImg.png"), base64Img, {encoding: "base64"});
        };

        return "created";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { createCollection };