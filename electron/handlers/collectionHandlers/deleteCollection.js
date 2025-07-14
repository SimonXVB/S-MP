const path = require('path');
const { app } = require("electron");
const { rm, writeFile } = require('fs/promises');

async function deleteCollection(event, deleteData) {
    try {
        const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
        const toDeleteIndex = data[deleteData.targetDir].findIndex(el => el.name === deleteData.name);

        // Throw error when index is not found
        if(toDeleteIndex === -1) {
            throw new Error("notFound");
        };

        //Delete folder and corresponding entry in data.json file
        await rm(path.join(app.getPath(deleteData.targetDir),"Swan MP", deleteData.name), { recursive: true, force: true });

        data[deleteData.targetDir].splice(toDeleteIndex, 1);
        await writeFile(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"), JSON.stringify(data));

        return "deleted";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { deleteCollection };