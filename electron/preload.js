const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('files', {
  copyToCollection: copyData => ipcRenderer.invoke('copyToCollection', copyData),
  getCollection: getData => ipcRenderer.invoke('getCollection', getData),
  deleteFile: deleteData => ipcRenderer.invoke('deleteFile', deleteData),
  renameFile: editData => ipcRenderer.invoke('renameFile', editData),
});

contextBridge.exposeInMainWorld("collection", {
  createCollection: collectionData => ipcRenderer.invoke("createCollection", collectionData),
  getCollections: currentTab => ipcRenderer.invoke("getCollections", currentTab),
  deleteCollection: deleteData => ipcRenderer.invoke("deleteCollection", deleteData),
  editName: editData => ipcRenderer.invoke("editName", editData)
});

contextBridge.exposeInMainWorld("utils", {
  createRootDirs: () => ipcRenderer.invoke("createRootDirs"),
  openFolder: targetDir => ipcRenderer.invoke("openFolder", targetDir),
});