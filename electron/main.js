const { ipcMain, dialog, app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 320,
    minWidth: 320,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.webContents.openDevTools();

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

async function handleVideoFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  const formats = [".mp4", "webm", ".ogg"];

  if (!canceled) {
    const fileName = path.basename(filePaths[0]);

    if(formats.includes(path.extname(fileName))) {
      fs.copyFile(filePaths[0], "./devTemp/videos/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    } else {
      console.log("Incorrect file type");
    };
  };
};
ipcMain.handle("copyVideoFile", handleVideoFile);

async function handleAudioFile() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  const formats = [".mp3", "wav", ".ogg"];

  if (!canceled) {
    const fileName = path.basename(filePaths[0]);

    if(formats.includes(path.extname(fileName))) {
      fs.copyFile(filePaths[0], "./devTemp/music/" + fileName, (err) => {
        if(err) {
          console.log(err);
        };
      });
    } else {
      console.log("Incorrect file type");
    };
  };
};
ipcMain.handle("copyAudioFile", handleAudioFile);

function handleReadVideo() {
  const data = fs.readdirSync("./devTemp/videos");
  return data;
};
ipcMain.handle("readVideoDir", handleReadVideo);

function handleReadAudio() {
  const data = fs.readdirSync("./devTemp/music");
  return data;
};
ipcMain.handle("readAudioDir", handleReadAudio);

function handleDelVideo(event, path) {
  fs.unlinkSync("./devTemp/videos/" + path);
};
ipcMain.handle("delVideoFile", handleDelVideo);

function handleDelAudio(event, path) {
  fs.unlinkSync("./devTemp/music/" + path);
};
ipcMain.handle("delAudioFile", handleDelAudio);

function handleRenameVideo(event, [oldName, newName]) {
  fs.renameSync("./devTemp/videos/" + oldName, "./devTemp/videos/" + newName + path.extname(oldName));
};
ipcMain.handle("renameVideoFile", handleRenameVideo);

function handleRenameAudio(event, [oldName, newName]) {
  fs.renameSync("./devTemp/music/" + oldName, "./devTemp/music/" + newName + path.extname(oldName));
};
ipcMain.handle("renameAudioFile", handleRenameAudio);