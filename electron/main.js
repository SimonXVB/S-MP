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
  const fileName = path.basename(filePaths[0]);
  const formats = [".mp4", "webm", ".ogg"];

  if (!canceled) {
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
  const fileName = path.basename(filePaths[0]);
  const formats = [".mp3", "wav", ".ogg"];

  if (!canceled) {
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

async function handleReadVideo() {
  const data = fs.readdirSync("./devTemp/videos");
  return data;
};
ipcMain.handle("readVideoDir", handleReadVideo);

async function handleReadAudio() {
  const data = fs.readdirSync("./devTemp/music");
  return data;
};
ipcMain.handle("readAudioDir", handleReadAudio);