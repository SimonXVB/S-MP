const { app } = require("electron");
const path = require('path');
const { unlink } = require('fs/promises');

async function deleteFile(event, deleteData) {
  try {
    await unlink(path.join(app.getPath(deleteData.targetDir), "Swan MP", deleteData.targetCol, deleteData.name));

    return "deleted";
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { deleteFile };