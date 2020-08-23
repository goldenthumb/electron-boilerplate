import { app, BrowserWindow } from 'electron';
import { createWindow } from './window';
import { supportAllClosed } from './config';

let win: Nullable<BrowserWindow> = null;

app.allowRendererProcessReuse = true;

app.on('ready', async () => {
    win = await createWindow();
});

app.on('window-all-closed', () => {
    if (supportAllClosed) {
        app.quit();
    }
});

app.on('activate', async () => {
    if (!win) {
        win = await createWindow();
        win.on('closed', () => {
            win = null;
        });
    }
});
