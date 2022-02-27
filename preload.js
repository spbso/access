const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    handleCardScan: (callback) => ipcRenderer.on('card-scan', callback),
    logPerson: (person) => ipcRenderer.invoke('log-person', person)
})
