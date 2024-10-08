const { shell } = require('electron');
const fs = require('fs');
const path = require('path');
const util = require('util');
const child_process = require('child_process');

const exec = util.promisify(child_process.exec);;

const shortcutPath = (drive) => path.join(drive, "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Riot Games")

async function ls() {
    const { stdout, stderr } = await exec('wmic logicaldisk get caption');
    if (stderr) {
        console.log('stderr:', stderr);
        return stderr;
    }

    let stdoutArray = stdout
        .trim()
        .split('\n')

    stdoutArray = stdoutArray
        .slice(1, stdoutArray.length)
        .map((item) => item.trim());

    let promises = [];
    for (let drive of stdoutArray) {
        const shortcutLocation = shortcutPath(drive);
        promises.push(exec(`dir "${shortcutLocation}"`));
    }

    try {
        let results = await Promise.any(promises);
        const re = /([A-Z]):\\/;
        const match = re.exec(results.stdout);
        return match[1];
    } catch (error) {
        console.error(error);
        return -1;
    }
}

async function findLockfile() {
    let drive = await ls();
    if (drive === -1) {
        console.error('Could not find Riot Games folder');
        return;
    }
    drive = drive + ":";

    let parsed = shell.readShortcutLink(path.join(shortcutPath(drive), "League of Legends.lnk"));
    parsed = path.resolve(parsed.target, "..", "..", "League of Legends", "lockfile");
    console.log((parsed));

    return fs.readFileSync(
        parsed,
        "utf8"
    );
}

module.exports = {
    findLockfile,
};