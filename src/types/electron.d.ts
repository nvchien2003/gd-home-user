export {};

declare global {
  interface Window {
    electronAPI?: {
      ping: () => string;
      getVersion: () => Promise<string>;
      getPlatform: () => Promise<NodeJS.Platform>;
    };
  }
}
