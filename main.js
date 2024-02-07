// main.js

// Modules to control application life and create native browser window
const { globalShortcut, app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs');
const { Blob } = require("buffer");
const Store = require('electron-store')
const path = require('node:path')
const { jwtDecode } = require("jwt-decode");

const serverUrl = "http://127.0.0.1:5000"

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth:900,
    minHeight:500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    }
  })

  mainWindow.maximize();
  //mainWindow.setMenuBarVisibility(false);
  mainWindow.setMenu(null);

  globalShortcut.register('CommandOrControl+=', () => {
    const zoomLevel = mainWindow.webContents.getZoomLevel();
    mainWindow.webContents.setZoomLevel(zoomLevel+1);
  })

  globalShortcut.register('CommandOrControl+-', () => {
    const zoomLevel = mainWindow.webContents.getZoomLevel();
    mainWindow.webContents.setZoomLevel(zoomLevel-1);
  })

  globalShortcut.register('CommandOrControl+0', () => {
    mainWindow.webContents.setZoomLevel(0);
  })

  const store = new Store();
  let token = store.get('token');

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
      token = result['token'];
      store.set('token', result['token']);
      mainWindow.loadFile('index.html')
      return "ok";
    }
    else {
      return result.error;
    }
  })


  ipcMain.handle('uploadFile', async (event, filePath, fileName) => {
    let data = new FormData();

    let buffer = fs.readFileSync(filePath);
    let blob = new Blob([buffer]);

    data.append('file', blob, fileName);
    console.log(1);
    console.log(fileName);

    const response = await fetch(`${serverUrl}/upload`, {
      method: 'POST',
      headers: {
        'x-token': token,
      },
      body: data,
    });

    result = await response.json();

    if (response.ok) {
      return true;
    }
    return false;
  })

  ipcMain.handle('uploads', async (event) => {
    const response = await fetch(`${serverUrl}/uploads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
    });

    result = await response.json();

    if (response.ok) {
      return result['files'];
    }
    else {
      return result['error'];
    }
  })

  ipcMain.handle('deleteFile', async (event, fileName) => {
    const response = await fetch(`${serverUrl}/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        filename: fileName,
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

  ipcMain.handle('predict', async (event, days) => {
    const response = await fetch(`${serverUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify({
        days: days,
      }),
    });

    result = await response.json();

    if (response.ok) {
      return result['days'];
    }
    else {
      return result['error'];
    }
  })


  if (token === undefined) {
    mainWindow.loadFile('register.html');
  } else {
    try {
      const tokenDecoded = jwtDecode(token);
      if (tokenDecoded['exp'] < Math.floor(Date.now() / 1000)) {
        store.set('token', "");
        token = "";
        mainWindow.loadFile('register.html');
      }
      else {
        mainWindow.loadFile('index.html');
      }
    }
    catch {
      store.set('token', "");
      token = "";
      mainWindow.loadFile('register.html');
    }
  }
  // TODO: delete this!
  // mainWindow.loadFile('index.html');

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

try {
	require('electron-reloader')(module);
} catch {}