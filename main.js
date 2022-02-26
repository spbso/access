const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const url = require('url')


const isDev = require('electron-is-dev');

// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}

function createWindow() {
    // Create the browser window with node integration
    const win = new BrowserWindow({
        width: 1100,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => win.webContents.send('update-counter', 1),
                    label: 'Increment',
                },
                {
                    click: () => win.webContents.send('update-counter', -1),
                    label: 'Decrement',
                },
                {
                    role: 'help',
                    accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
                    click: () => { console.log('Electron rocks!') }
                }
            ]
        }

    ])

    Menu.setApplicationMenu(menu)

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, 'public/index.html'),
            protocol: 'file:',
            slashes: true
        })
    )

    // Open the DevTools only if app is in development
    // If in production, don't show.
    // if (isDev)
    //     win.webContents.openDevTools()
}

app.whenReady().then(() => {

    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })

    ipcMain.handle('dialog:openFile', handleFileOpen)
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}
