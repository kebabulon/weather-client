// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const Store = require('electron-store')
const path = require('node:path')
const { jwtDecode } = require("jwt-decode");

const serverUrl = "http://127.0.0.1:5000"

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.removeMenu();

  const store = new Store();

  // Create an IPC channel
  ipcMain.handle('register', async (event, name, password) => {
    const response = await fetch(`${serverUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });

    result = await response.json();

    if (response.ok) {
      return "ok";
    }
    else {
      return result['error'];
    }
  })


  ipcMain.handle('login', async (event, name, password) => {
    const response = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });

    result = await response.json();

    if (response.ok) {
      store.set('token', result['token']);
      mainWindow.loadFile('index.html')
      return "ok";
    }
    else {
      return result.error;
    }
  })


  let token = store.get('token');
  if (token === undefined) {
    mainWindow.loadFile('register.html');
  } else {
    try {
      const tokenDecoded = jwtDecode(token);
      mainWindow.loadFile('index.html');
    }
    catch {
      mainWindow.loadFile('register.html');
    }
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
