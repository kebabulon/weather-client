// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  register: (name, password) => ipcRenderer.invoke('register', name, password),
  login: (name, password) => ipcRenderer.invoke('login', name, password),

  uploadFile: (filePath, fileName) => ipcRenderer.invoke('uploadFile', filePath, fileName),
  deleteFile: (fileName) => ipcRenderer.invoke('deleteFile', fileName),
  on: (...args) => ipcRenderer.on(...args),
  uploads: () => ipcRenderer.invoke('uploads'),

  predict: (radio) => ipcRenderer.invoke('predict', radio),
  sendToHost: ipcRenderer.sendToHost,
})