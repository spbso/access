const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')


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
                    accelerator: process.platform === 'darwin' ? 'Cmd+1' : 'Ctrl+1',
                    click: () => win.webContents.send('set-screen', 'scan'),
                    label: "Сканирование"
                },
                {
                    accelerator: process.platform === 'darwin' ? 'Cmd+2' : 'Ctrl+2',
                    click: () => win.webContents.send('set-screen', 'list'),
                    label: "Списки"
                },
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
    const timestamp = Number(new Date())
    const logFile = fs.createWriteStream(path.join(__dirname, `public/log-${timestamp}.json`))

    ipcMain.handle('log-person', (_event, value) => {
        // TODO: Add timestamp + consider CSV
        logFile.write(JSON.stringify(value) + "\n")
    })

    ipcMain.handle('dialog:openFile', handleFileOpen)

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    app.quit()
})

async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog()
    if (canceled) {
        return
    } else {
        const contents = fs.readFileSync(filePaths[0], {encoding: 'utf8', flag: 'r'})
        const data = JSON.parse(contents)
        return data
    }
}
