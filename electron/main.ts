import { app, BrowserWindow } from "electron";
import path from "node:path";

import contextMenu from "electron-context-menu";
import { IpcMainInvokeEvent, ipcMain, net} from "electron";
import os from "os";
import { spawn } from "child_process";
import { VideoData } from "../src/utils/InterfaceTypes";

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
        minWidth: 674,
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

ipcMain.handle("searchYoutubeVideo", async (_event: IpcMainInvokeEvent, query: string, count: number): Promise<VideoData[] | null> => {
	return new Promise((resolve, reject) => {
		let executablePath: string = "";

		switch (os.platform()) {
			case "win32":
				executablePath = ".\\externals\\yt-dlp\\yt-dlp-windows.exe";
				break;
		
			case "linux":
				executablePath = "./externals/yt-dlp/yt-dlp-linux";
				break;
			
			case "darwin":
				executablePath = "./externals/yt-dlp/yt-dlp-macos";
				break;
		}

		const ytDlp = spawn(executablePath, [`ytsearch${count}:${query}`, "--dump-json", "--flat-playlist"]);
		let output: string = "";

		ytDlp.stdout.on("data", (data: string) => {
			output += data;
		});

		ytDlp.stderr.on("data", (data: string) => {
			console.error(`stderr: ${data}`);
		});

		ytDlp.on("close", async (code) => {
			if (code !== 0) {
				console.error(`yt-dlp process exited with code ${code}`);
				reject(new Error(`yt-dlp process exited with code ${code}`));
			} else {
				try {
					const videoListString: string[] = output.split("\n").filter((line) => line.trim() !== "");
					const videoListJson: VideoData[] = [];

					for (let i = 0; i < videoListString.length; i++) {
						const videoJson = JSON.parse(videoListString[i]);
						const videoThumbnailURL: string = videoJson.thumbnails[videoJson.thumbnails.length - 1].url;

						videoListJson.push({
                            is_short: videoJson.duration_string == null,
							thumbnail_url: videoThumbnailURL,
							duration: videoJson.duration_string,
							title: videoJson.title,
							channel_name: videoJson.channel,
							channel_is_verified: videoJson.channel_is_verified,
							view_count: videoJson.view_count,
							url: videoJson.url,
							background_color: null,
						});
					}

					const foundURL: string[] = [];
					const duplicateFiltered: VideoData[] = []

					for (let i = 0; i < videoListJson.length; i++) {
						if (!foundURL.includes(videoListJson[i].url)) {
							foundURL.push(videoListJson[i].url)
							duplicateFiltered.push(videoListJson[i])
						}
					}
					

					resolve(duplicateFiltered);

				} catch (error) {
					console.error(error);
					reject(error);
				}
			}
		});
	});
});

ipcMain.handle("fetchImage", async (_event: IpcMainInvokeEvent, imageUrl: string): Promise<Buffer | null>  => {
	return new Promise((resolve, reject) => {
		const request = net.request(imageUrl);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const imageData: any = [];
		request.on("response", (response) => {
			response.on("data", (chunk) => {
				imageData.push(chunk);
			});
			response.on("end", () => resolve(Buffer.concat(imageData)));
			response.on("error", reject);
		});
		request.end();
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
