const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('FS', {
  copyVideoFile: () => ipcRenderer.invoke('copyVideoFile'),
  copyAudioFile: () => ipcRenderer.invoke('copyAudioFile'),
  readVideoDir: () => ipcRenderer.invoke('readVideoDir'),
  readAudioDir: () => ipcRenderer.invoke('readAudioDir'),
  delVideoFile: (path) => ipcRenderer.invoke('delVideoFile', path),
  delAudioFile: (path) => ipcRenderer.invoke('delAudioFile', path),
  renameVideoFile: (oldName, newName) => ipcRenderer.invoke('renameVideoFile', [oldName, newName]),
  renameAudioFile: (oldName, newName) => ipcRenderer.invoke('renameAudioFile', [oldName, newName]),
  openFolder: (path) => ipcRenderer.invoke("openFolder", path)
});