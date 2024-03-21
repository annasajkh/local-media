/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IpcMainInvokeEvent } from "electron";

declare global {
	interface Window {
		electron: any;
	}
}

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge
window.electron.ipcRenderer.on("main-process-message", (_event: IpcMainInvokeEvent, message: string) => {
	console.log(message);
});
