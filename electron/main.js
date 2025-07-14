const path = require('path');
const { ipcMain, app, BrowserWindow, screen } = require('electron');
const { createRootDirs } = require("./handlers/createRootDirs");
const { createCollection } = require("./handlers/collectionHandlers/createCollection");
const { getCollections } = require("./handlers/collectionHandlers/getCollections");
const { deleteCollection } = require("./handlers/collectionHandlers/deleteCollection");
const { editCollection } = require("./handlers/collectionHandlers/editCollection");
const { handleCopyFile } = require("./handlers/fileHandlers/copyFileHandler");
const { handleReadDir } = require("./handlers/fileHandlers/readFileHandler");
const { handleDelFile } = require("./handlers/fileHandlers/delFileHandler");
const { handleRenameFile } = require("./handlers/fileHandlers/renameFileHandler");
const { handleOpenFolder } = require("./handlers/fileHandlers/openFolderHandler");

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

// Collection/Playlist handlers
ipcMain.handle("createCollection", createCollection);
ipcMain.handle("getCollections", getCollections);
ipcMain.handle("deleteCollection", deleteCollection);
ipcMain.handle("editCollection", editCollection);