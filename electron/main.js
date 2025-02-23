const { ipcMain, app, BrowserWindow } = require('electron');
const { handleCopyFile } = require("./handlers/fileHandlers/copyFileHandler");
const { handleReadDir } = require("./handlers/fileHandlers/readFileHandler");
const { handleDelFile } = require("./handlers/fileHandlers/delFileHandler");
const { handleRenameFile } = require("./handlers/fileHandlers/renameFileHandler");
const { handleOpenFolder } = require("./handlers/fileHandlers/openFolderHandler");
const { handleReturnDir } = require("./handlers/playlistHandlers/returnDirHandler");
const { handleCreateDir } = require("./handlers/playlistHandlers/createDirHandler");
const { handleDelDir } = require("./handlers/playlistHandlers/deleteDirHandler");
const { handleRenameDir} = require("./handlers/playlistHandlers/renameDirHandler");
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 600,
    minWidth: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
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

ipcMain.handle("getAppPath", () => {
  return app.getAppPath();
});