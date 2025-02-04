const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('FS', {
  copyVideoFile: () => ipcRenderer.invoke('copyVideoFile'),
  copyAudioFile: () => ipcRenderer.invoke('copyAudioFile'),
  readVideoDir: () => ipcRenderer.invoke('readVideoDir'),
  readAudioDir: () => ipcRenderer.invoke('readAudioDir')
});