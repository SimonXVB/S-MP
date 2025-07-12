const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('files', {
  copyFile: (targetDir) => ipcRenderer.invoke('copyFile', targetDir),
  readDir: (targetDir) => ipcRenderer.invoke('readDir', targetDir),
  delFile: (files, targetDir) => ipcRenderer.invoke('delFile', [files, targetDir]),
  renameFile: (oldName, newName, targetDir) => ipcRenderer.invoke('renameFile', [oldName, newName, targetDir]),
  openFolder: (targetDir) => ipcRenderer.invoke("openFolder", targetDir)
});

contextBridge.exposeInMainWorld("collection", {
  createCollection: collectionData => ipcRenderer.invoke("createCollection", collectionData),
  returnPlaylist: (targetDir) => ipcRenderer.invoke("returnPlaylist", targetDir),
  deletePlaylist: (targetDir, name) => ipcRenderer.invoke("deletePlaylist", [targetDir, name]),
  renamePlaylist: (oldName, newName, targetDir) => ipcRenderer.invoke('renamePlaylist', [oldName, newName, targetDir]),
});

contextBridge.exposeInMainWorld("utils", {
  getAppPath: () => ipcRenderer.invoke("getAppPath"),
  createRootDirs: () => ipcRenderer.invoke("createRootDirs")
});