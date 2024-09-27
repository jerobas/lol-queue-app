const { MSICreator } = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.join(__dirname, 'build', 'win-unpacked'); 
const OUT_DIR = path.join(__dirname, 'msi-installer');

const msiCreator = new MSICreator({
  appDirectory: APP_DIR,
  outputDirectory: OUT_DIR,
  description: 'AutoQueue for League of Legends',
  exe: 'AutoQueue',
  name: 'AutoQueue',
  manufacturer: 'Jerobas',
  version: '1.0.3',
  ui: {
    chooseDirectory: true
  },
});

msiCreator.create().then(function () {
  msiCreator.compile();
});
