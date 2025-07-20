const path = require('path');
const { ipcMain, app, BrowserWindow, screen } = require('electron');
const { createRootDirs } = require("./handlers/createRootDirs");
const { createCollection } = require("./handlers/collectionHandlers/createCollection");
const { getCollections } = require("./handlers/collectionHandlers/getCollections");
const { deleteCollection } = require("./handlers/collectionHandlers/deleteCollection");
const { editName, editCover } = require("./handlers/collectionHandlers/editCollection");
const { copyToCollection } = require("./handlers/fileHandlers/copyToCollection");
const { getCollection } = require("./handlers/fileHandlers/getCollection");
const { deleteFile } = require("./handlers/fileHandlers/deleteFile");
const { renameFile } = require("./handlers/fileHandlers/editFile");
const { openFolder } = require("./handlers/openFolder");

const createWindow = () => {
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  if (externalDisplay) {
    const window = new BrowserWindow({
      width: 1600,
      height: 900,
      minHeight: 600,
      minWidth: 1000,
      x: externalDisplay.bounds.x + 150,
      y: externalDisplay.bounds.y + 75,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      }
    });

    window.webContents.openDevTools()
    window.loadFile('./dist/index.html');
  } else {
    const window = new BrowserWindow({
      width: 1600,
      height: 900,
      minHeight: 600,
      minWidth: 1000,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      }
    });

    window.webContents.openDevTools()
    window.loadFile('./dist/index.html');
  };
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    };
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

// Create root directories
ipcMain.handle("createRootDirs", createRootDirs);

// Open root directories
ipcMain.handle("openFolder", openFolder);

// Collection handlers
ipcMain.handle("createCollection", createCollection);
ipcMain.handle("getCollections", getCollections);
ipcMain.handle("deleteCollection", deleteCollection);
ipcMain.handle("editName", editName);
ipcMain.handle("editCover", editCover);

// File handlers
ipcMain.handle("copyToCollection", copyToCollection);
ipcMain.handle("getCollection", getCollection);
ipcMain.handle("renameFile", renameFile);
ipcMain.handle("deleteFile", deleteFile);