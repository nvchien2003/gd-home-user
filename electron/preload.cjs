const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => "pong", // ❌ bỏ TS type ": string"
  getVersion: () => ipcRenderer.invoke("get-version"),
});