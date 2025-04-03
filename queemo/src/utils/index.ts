export const ipc = (method: string, route: string, ...args: any[]) => {
  return window.ipcRenderer.invoke(method, route, ...args);
};
