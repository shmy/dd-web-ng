const { app, dialog, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;
function setFocus() {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
}

function createWindow() {
  win = new BrowserWindow({ width: 850, height: 600, show: false });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dd-web/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
  
  // The following is optional and will open the DevTools:
  win.once('ready-to-show', () => {
    // win.webContents.openDevTools();
    win.show();
  });
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);
app.on('second-instance', () => {
  setFocus();
});
// on macOS, closing the window doesn't quit the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// initialize the app's main window
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
