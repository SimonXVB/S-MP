const { ipcMain, app, BrowserWindow } = require('electron');
const { handleCopyFile } = require("./handlers/fileHandlers/copyFileHandler");
const { handleReadDir } = require("./handlers/fileHandlers/readFileHandler");
const { handleDelFile } = require("./handlers/fileHandlers/delFileHandler");
const { handleRenameFile } = require("./handlers/fileHandlers/renameFileHandler");
const { handleOpenFolder } = require("./handlers/fileHandlers/openFolderHandler");
const { handleReturnDir } = require("./handlers/dirHandlers/returnDirHandler");
const { handleCreateDir } = require("./handlers/dirHandlers/createDirHandler");
const { handleDelDir } = require("./handlers/dirHandlers/deleteDirHandler");
const { handleRenameDir} = require("./handlers/dirHandlers/renameDirHandler");
const { handlerCreateMediaDir } = require("./handlers/dirHandlers/createMediaDirHandler");
const path = require('path');

if (require('electron-squirrel-startup')) app.quit();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 600,
    minWidth: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    }
  });

  win.setIcon(path.join(__dirname, "swan.png"));
  win.setMenu(null);
  win.loadFile('./dist/index.html');
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

//copy
ipcMain.handle("copyFile", handleCopyFile);
//read
ipcMain.handle("readDir", handleReadDir);
//del
ipcMain.handle("delFile", handleDelFile);
//rename
ipcMain.handle("renameFile", handleRenameFile);
//open
ipcMain.handle("openFolder", handleOpenFolder);

//return dir
ipcMain.handle("returnPlaylist", handleReturnDir);
//create dir
ipcMain.handle("createPlaylist", handleCreateDir);
//del dir
ipcMain.handle("deletePlaylist", handleDelDir);
//rename dir
ipcMain.handle("renamePlaylist", handleRenameDir);
//create media dir
ipcMain.handle("createMediaDir", handlerCreateMediaDir);

ipcMain.handle("getAppPath", () => {
  return app.getPath("documents");
});