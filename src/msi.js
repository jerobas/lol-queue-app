const { MSICreator } = require("electron-wix-msi");
const path = require("path");
const fs = require("fs");

const packageJson = require(path.join(__dirname, "../package.json"));


const APP_DIR = path.join(__dirname, "../", "build");
const OUT_DIR = path.join(__dirname, "../", "msi-installer");

const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,
  description: packageJson.description,
  exe: packageJson.build.msi.shortcutName,
  name: packageJson.build.msi.shortcutName,
  manufacturer: "Jerobas",
  version: packageJson.version,
  ui: {
    chooseDirectory: true,
  },
});

msiCreator.create().then(function () {
  msiCreator.compile().then(() => {
    fs.rm(APP_DIR, { recursive: true, force: true }, (err) => {
      if (err) console.log(`Erro for delete build folder: ${err}`);
      else console.log("Build folder was deleted");
    });
  });
});
