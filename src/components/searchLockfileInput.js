const searchLockfileInput = () => {
    const controls = document.getElementById("controls");
    const controlsFileInput = document.createElement("input");
    controlsFileInput.type = "file";
    controlsFileInput.accept = "webkitdirectory";

    controls.setAttribute("style", "-webkit-app-region: no-drag;");

    controls.appendChild(controlsFileInput);

    controlsFileInput.addEventListener("change", async (e) => {
        const path = e.target.files[0].path;
        const lockfile = await getLockfile(path);
        if (lockfile) {
            ipcRenderer.send("lockfile-path", lockfile);
        }
    });
}

module.exports = searchLockfileInput;
