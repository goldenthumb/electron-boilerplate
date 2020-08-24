import { BrowserWindow } from 'electron';
import { dev, loadURL, nodeIntegration } from './config';

export const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration,
        },
    });

    win.loadURL(loadURL);

    if (dev) {
        win.webContents.once('dom-ready', () => {
            win.webContents.openDevTools();
        });
    }

    return win;
};
