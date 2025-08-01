const path = require('path');
const { app } = require("electron");
const { rm } = require('fs/promises');

async function deleteCollection(event, deleteData) {
    try {
        await rm(path.join(app.getPath(deleteData.targetDir), "Swan MP", deleteData.name), { recursive: true, force: true });

        return "deleted";
    } catch (error) {
        console.log(error);
        return error.message;
    };
};

module.exports = { deleteCollection };