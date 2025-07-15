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
  getCollections: currentTab => ipcRenderer.invoke("getCollections", currentTab),
  deleteCollection: deleteData => ipcRenderer.invoke("deleteCollection", deleteData),
  editName: editData => ipcRenderer.invoke("editName", editData),
  editCover: img => ipcRenderer.invoke("editCover", img) 
});

contextBridge.exposeInMainWorld("utils", {
  createRootDirs: () => ipcRenderer.invoke("createRootDirs")
});