const { app } = require("electron");
const path = require('path');
const { rename, readdir } = require('fs/promises');

async function editName(event, editData) {
	try {
		// Return early when name is empty
		if(editData.newName === "") {
			return;
		};

		// Return early when old name and new name are the same
		if(editData.newName === editData.oldName) {			
			return;
		};

		const editPath = path.join(app.getPath(editData.targetDir), "Swan MP");
		const collections = (await readdir(editPath, {withFileTypes: true})).filter(col => col.isDirectory());

        // Throw error when a folder with the same name aleady exists
       	if(collections.some(col => col.name.toLowerCase() === editData.newName.toLowerCase())) {
            throw new Error("existsCollection");
        };

		// Rename folder
		await rename(path.join(editPath, editData.oldName), path.join(editPath, editData.newName));

		return "edited";
	} catch (error) {
		console.log(error);
		return error.message;
	};
};

module.exports = { editName };