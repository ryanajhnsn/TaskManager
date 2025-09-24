const { app, BrowserWindow } = require('electron');
const path = require('path');

// Hot reload
try {
  require('electron-reload')(
    path.join(__dirname, 'taskmanager-frontend/dist/taskmanager-frontend/browser'),
    {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
    }
  );
} catch (_) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Load Angular output (with browser folder)
  win.loadFile(
    path.join(__dirname, 'taskmanager-frontend/dist/taskmanager-frontend/browser/index.html')
  );

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
