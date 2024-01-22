// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  register: (name, password) => ipcRenderer.invoke('register', name, password),
  login: (name, password) => ipcRenderer.invoke('login', name, password),
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('uploadFile', filePath, fileName),
  uploads: () => ipcRenderer.invoke('uploads'),
  sendToHost: ipcRenderer.sendToHost,
})