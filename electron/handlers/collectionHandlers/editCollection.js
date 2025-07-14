const { app } = require("electron");
const path = require('path');
const { rename, writeFile } = require('fs/promises');

async function editCollection(event, editData) {
	try {
		const data = require(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"));
		const toEditIndex = data[editData.targetDir].findIndex(el => el.name === editData.oldName);

		// Throw error when name is empty
		if(editData.name === "") {
			throw new Error("empty");
		};

        // Throw error when a folder with the same name aleady exists
        if(data[editData.targetDir].some(e => e.name === editData.name)) {
            throw new Error("exists");
        };

		// Rename corresponding folder
		rename(path.join(app.getPath(editData.targetDir), "Swan MP", editData.oldName), path.join(app.getPath(editData.targetDir), "Swan MP", editData.newName));

		// Edit entry in data.json file
		const entry = data[editData.targetDir][toEditIndex];

		entry.name = editData.newName;
		entry.img = editData.img;
		
		await writeFile(path.join(app.getPath('appData'), "Swan MP", "Swan MP Data", "data.json"), JSON.stringify(data));

		return "edited";
	} catch (error) {
		console.log(error);
		return error.message;
	};
};

module.exports = { editCollection };