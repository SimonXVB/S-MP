const { app } = require("electron");
const path = require('path');
const { rename, readdir } = require('fs/promises');

async function renameFile(event, editData) {
  try {
    if(editData.newName === "") {
      return;
    };

    const noExtNewName = editData.newName.split(path.extname(editData.oldName))[0];
    const noExtOldName = editData.oldName.split(path.extname(editData.oldName))[0];

    if(noExtNewName === noExtOldName) {
      return;
    };

    const data = await readdir(path.join(app.getPath(editData.targetDir), "Swan MP", editData.targetCol));
    
    // Throw error when file with same name already exists
    if(data.some(el => el === (editData.newName + path.extname(editData.oldName)))) {
      throw new Error("existsFile");
    };
    
    await rename(
      path.join(app.getPath(editData.targetDir), "Swan MP", editData.targetCol, editData.oldName), 
      path.join(app.getPath(editData.targetDir), "Swan MP", editData.targetCol, (editData.newName + path.extname(editData.oldName)))
    );

    return "edited";
  } catch (error) {
    console.log(error);
    return error.message;
  };
};

module.exports = { renameFile };