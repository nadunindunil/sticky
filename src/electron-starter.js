const electron = require('electron');
// Module to control application life.
const app = electron.app;
const globalShortcut = electron.globalShortcut;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const { Menu, Tray } = require('electron');
// Auto Launch
// const AutoLaunch = require('auto-launch');

const ipc = electron.ipcMain;

const path = require('path');
const url = require('url');
var isShown = false;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: 300,
    frame: false,
    resizable: false,
    skipTaskbar: true
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  mainWindow.setPosition(0, -100);
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  tray = new Tray(path.join(__dirname, '/../public/note.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);

  tray.setToolTip('Sticky App');
  //   tray.setContextMenu(contextMenu)

  mainWindow.hide();

  globalShortcut.register('CommandOrControl+down', () => {

    if (isShown) {
      mainWindow.hide();
      isShown = false;
    } else {
      mainWindow.show();
      isShown = true;
    }
  });

  // globalShortcut.register("CommandOrControl", () => {
  //   mainWindow.webContents.send('message', {data: electron.clipboard.readText()});
  // });

  // Auto Launch
  // let autoLaunch = new AutoLaunch({
  //   name: 'Your app name goes here',
  //   path: app.getPath('exe'),
  // });
  // autoLaunch.isEnabled().then((isEnabled) => {
  //   if (!isEnabled) autoLaunch.enable();
  // });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
