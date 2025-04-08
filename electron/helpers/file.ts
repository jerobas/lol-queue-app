import path from "path";
import { app } from "electron";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getImagePath = (file: string): string => {
  if (import.meta.env.DEV) {
    return `/images/${file}`;
  }

  const basePath = app.isPackaged
    ? path.join(process.resourcesPath, "images")
    : path.join(__dirname, "../../public/images");

  return path.join(basePath, file);
};
