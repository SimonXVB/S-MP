const { app } = require("electron");
const path = require('path');
const { rename, readdir, writeFile } = require('fs/promises');

async function editName(event, editData) {
	try {
		const editPath = path.join(app.getPath(editData.targetDir), "Swan MP");
		const collections = (await readdir(editPath, {withFileTypes: true})).filter(col => col.isDirectory());

		// Throw error when name is empty
		if(editData.newName === "") {
			throw new Error("empty");
		};

        // Throw error when a folder with the same name aleady exists
       	if(collections.some(col => col.name === editData.newName)) {
            throw new Error("exists");
        };

		// Rename corresponding folder
		rename(path.join(app.getPath(editData.targetDir), "Swan MP", editData.oldName), path.join(app.getPath(editData.targetDir), "Swan MP", editData.newName));

		return "edited";
	} catch (error) {
		console.log(error);
		return error.message;
	};
};

async function editCover(event, editData) {
	try {
		const editPath = path.join(app.getPath(editData.targetDir), "Swan MP", editData.name);

		//Edit image
		const base64Img = editData.img.split(';base64,').pop();
		await writeFile(path.join(editPath, "coverImg.png"), base64Img, {encoding: "base64"});

		return "edited";
	} catch (error) {
		console.log(error);
		return error.message;
	};
};

module.exports = { editName, editCover };