import { exec } from "node:child_process";

const isProcessRunning = (): Promise<boolean> => {
  return new Promise((resolve) => {
    exec("tasklist", (err, stdout) => {
      if (err) return resolve(false);
      const process = stdout.toLocaleLowerCase();
      const allRunning = [
        "leagueclientuxrender.exe",
        "leagueclientux.exe",
        "leagueclient.exe",
      ].every((name) => process.includes(name.toLocaleLowerCase()));
      resolve(allRunning);
    });
  });
};

export default isProcessRunning;
