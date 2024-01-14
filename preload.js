// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  register: (name, password) => ipcRenderer.invoke('register', name, password)
})