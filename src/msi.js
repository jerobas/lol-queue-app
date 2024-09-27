const { MSICreator } = require("electron-wix-msi");
const path = require("path");
const fs = require("fs");

const packageJson = require(path.join(__dirname, "../package.json"));

const APP_DIR = path.join(__dirname, "../", "build", "win-unpacked");
const BIULD_DIR = path.join(__dirname, "../", "build");
const OUT_DIR = path.join(__dirname, "../", "msi-installer");
const ICON_DIR = path.join(__dirname, "lol.ico");

const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,
  description: packageJson.description,
  exe: packageJson.build.productName,
  name: packageJson.build.productName,
  manufacturer: "Jerobas",
  version: packageJson.version,
  ui: {
    chooseDirectory: true,
  },
  icon: ICON_DIR,
});

msiCreator.create().then(function () {
  msiCreator.compile().then(() => {
    fs.rm(BIULD_DIR, { recursive: true, force: true }, (err) => {
      if (err) console.log(`Erro for delete build folder: ${err}`);
      else console.log("Build folder was deleted");
    });
  });
});
