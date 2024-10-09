import Store from 'electron-store';
import { app, shell } from 'electron';
import fs from 'fs';
import path from 'path';
import util from 'util';
import child_process from 'child_process';

const store = new Store();

const exec = util.promisify(child_process.exec);

const shortcutPath = (drive) => path.join(drive, "ProgramData", "Microsoft", "Windows", "Start Menu", "Programs", "Riot Games")

const error = (err) => {
    console.error(err);
    return false;
}

const listDisks = async () => {
    const { stdout, stderr } = await exec('wmic logicaldisk get caption');
    if (stderr) return error(stderr);

    const stdoutArray = stdout
        .trim()
        .split('\n')

    return stdoutArray.slice(1, stdoutArray.length).map((item) => item.trim());
}

const findRiotFolder = async () => {
    const stdoutArray = await listDisks();
    if (!stdoutArray) return false;
    const promises = stdoutArray.map((drive) => exec(`dir "${shortcutPath(drive)}"`));

    try {
        let results = await Promise.any(promises);
        if (results.stderr) return error(results.stderr);

        const match = /([A-Z]):\\/.exec(results.stdout);

        if (!match) return error('Could not find Riot Games folder');
        return match[1];
    } catch (errorMessage) { return error(errorMessage); }
}

const findLockfile = async () => {
    let drive = await findRiotFolder();
    if (!drive) return error('Could not find Riot Games folder');
    drive = drive + ":";

    let parsed = shell.readShortcutLink(path.join(shortcutPath(drive), "League of Legends.lnk"));
    parsed = path.resolve(parsed.target, "..", "..", "League of Legends", "lockfile");

    return parsed;
}

const readLockfile = async () => {
    let riotPath = store.get('riotPath', false);

    if (typeof riotPath !== 'string') {
        const newPath = await findLockfile();
        if (!newPath) return error('Could not find Riot Games folder');
        store.set('riotPath', newPath);
        riotPath = newPath;
    }

    return fs.readFileSync(
        riotPath,
        "utf8"
    );
}

export { readLockfile };