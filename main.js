
const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const {parse: parseCsv} = require('csv-parse/sync')
const {parse: parseDate} = require('date-fns');



const isDev = require('electron-is-dev');

// If in development use electron-reload to watch for
// changes in the current directory
if (isDev) {
    require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
    });
}

let win;

function createWindow() {
    // Create the browser window with node integration
    win = new BrowserWindow({
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
                {
                    accelerator: process.platform === 'darwin' ? 'Cmd+3' : 'Ctrl+3',
                    click: () => win.webContents.openDevTools(),
                    label: "Я самый умный"
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
    if (isDev)
        win.webContents.openDevTools()
}

function initLogging() {
    // const timestamp = Number(new Date())
    // const logFile = fs.createWriteStream(path.join(__dirname, `public/logs/log-${timestamp}.json`))

    ipcMain.handle('log-person', (_event, value) => {
        // value.timestamp = new Date()
        // logFile.write(JSON.stringify(value) + "\n")
    })
}

app.whenReady().then(() => {
    initLogging();

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
    const {canceled, filePaths} = await dialog.showOpenDialog(win)
    if (canceled) {
        console.log('cancelled')
        return {
            path: null,
            people: []
        }
    } else {
        const contents = fs.readFileSync(filePaths[0], {encoding: 'utf8', flag: 'r'})
        const records = parseCsv(contents, {
            columns: ['id', 'uid', 'fio', 'brigade', 'rso', 'ticket'],
            from: 2,
            skip_empty_lines: true,
            cast: (value, context) => {
                if (context.column === "ticket") {
                    return value === "TRUE"
                } else if (context.column === "rso") {
                    return value ? parseDate(value, 'dd.MM.yyyy', new Date()) : null
                } else {
                    return value
                }
            }
        })
        console.log('records', records)
        return {
            path: path.dirname(filePaths[0]),
            people: records
        }
    }
}


const {NFC} = require('nfc-pcsc');
const nfc = new NFC(); // optionally you can pass logger
nfc.on('reader', reader => {
    console.log(reader.name + ' reader attached, waiting for cards ...');
    reader.on('card', async card => {
        console.log('card', card.uid);
        win.webContents.send('card-scan', card.uid);
    });
    reader.on('error', err => {
        console.error('reader error', err);
    });
    reader.on('end', () => {
        console.log(reader.name + ' reader disconnected.');
    });
});
nfc.on('error', err => {
    console.error(err);
});

// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();

// const { poll, DeviceInfo } = require(`nfc-poll-wrapper`);

// const instance = poll();

// instance.on("device", ({ raw, UID, NFCIDversion }) => {
//     console.info("Device ID:", UID, "v", NFCIDversion);
//     win.webContents.send('card-scan', UID);
// });
