const path = require('path');
const { app } = require("electron");
const { rm } = require('fs/promises');
const { existsSync } = require('fs');

async function deleteCollection(event, deleteData) {
    try {
        const deletePath = path.join(app.getPath(deleteData.targetDir), "Swan MP", deleteData.name);

        // Throw error when folder is not found
        if(!existsSync(deletePath)) {
            throw new Error("notFound");
        };

        //Delete folder
        await rm(deletePath, { recursive: true, force: true });

        return "deleted";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { deleteCollection };