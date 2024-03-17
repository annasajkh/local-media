import { app, BrowserWindow } from "electron";
import path from "node:path";

import contextMenu from "electron-context-menu";
import { IpcMainInvokeEvent, ipcMain } from "electron"
import os from "os"
import { spawn } from "child_process";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

contextMenu({
	showSaveImageAs: true,
	showInspectElement: true,
});

function createWindow() {
	win = new BrowserWindow({
		width: 960,
		height: 540,
		autoHideMenuBar: true,
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(process.env.DIST, "index.html"));
	}
}

ipcMain.handle("searchYoutubeVideo", async (_event: IpcMainInvokeEvent, query: string, count: number): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        if (os.platform() == "win32") {

            const ytDlp = spawn(".\\externals\\yt-dlp\\yt-dlp-windows.exe", [`ytsearch${count}:${query}`, "--dump-json", "--flat-playlist"]);
            let output: string = "";

            ytDlp.stdout.on("data", (data: string) => {
                output += data;
            });

            ytDlp.stderr.on("data", (data: string) => {
                console.error(`stderr: ${data}`);
            });

            ytDlp.on("close", (code) => {
                if (code !== 0) {
                    console.error(`yt-dlp process exited with code ${code}`);
                    reject(new Error(`yt-dlp process exited with code ${code}`));
                } else {
                    try {
                        const videos: string[] = output.split('\n').filter(line => line.trim() !== '');

                        let videosString: string = "[";

                        for (let i = 0; i < videos.length - 1; i++) {
                            videosString += `${videos[i]},`;
                        }

                        videosString += videos[videos.length - 1];
                        videosString += "]";

                        resolve(videosString);
                    } catch (err) {
                        console.error('Failed to parse JSON:', err);
                        reject(err);
                    }
                }
            });
        } else {
            resolve(null);
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
