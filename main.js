const { app, BrowserWindow} = require('electron/main')
const path = require('node:path')

function createMainWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    frame: true,
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, 'assets', 
      process.platform === 'win32' ? 'instagram-icon.ico' :
      process.platform === 'darwin' ? 'instagram-icon.icns' : 'instagram-icon.png'  
    ),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,   // ← REQUIRED: enables <webview> tag in the HTML
      zoomFactor: 0.8
    }
  })

  win.loadURL('https://www.instagram.com/')
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})