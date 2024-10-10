const startServer = () => {
    const path = require("path");
    const express = require("express");

    const {
        getLockFileInfo,
        createLolClient,
        handleAccept,
    } = require("./utils/index");
    const searchLockfileInput = require("./components/searchLockfileInput");

    const { GamePhase } = require("./constants/index");

    const localServer = express();

    localServer.use(express.static(path.join(__dirname, "../", "dist")));

    localServer.get("/globals.js", (req, res) => {
        const filePath = path.join(__dirname, 'globals.js');
        res.type('application/javascript');
        res.sendFile(filePath);
    });

    localServer.get("/events", async (req, res) => {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        try {
            await getLockFileInfo();

            if (!global.port) {
                searchLockfileInput();
                return;
            }

            const api = createLolClient();

            const intervalId = setInterval(async () => {
                try {
                    const response = await handleAccept(api);
                    if (response.phase == GamePhase.READYCHECK) {
                        handleAccept(api);
                        res.write(
                            `data: ${JSON.stringify({
                                message: response.phase,
                            })}\n\n`
                        );
                    } else
                        res.write(
                            `data: ${JSON.stringify({
                                message: response.phase,
                            })}\n\n`
                        );
                } catch (error) {
                    console.error("Error during handleAccept:", error.message);
                    clearInterval(intervalId);
                    res.end();
                }
            }, 2000);

            req.on("close", () => {
                clearInterval(intervalId);
                res.end();
            });
        } catch (error) {
            console.error("Error initializing events:", error.message);
            res.status(500).send("Error initializing SSE");
        }
    });

    localServer.get("/home", (req, res) => {
        const filePath = path.join(__dirname, "index.html");
        res.sendFile(filePath);
    });

    let listener = localServer.listen(0, () => {
        console.log(`Local server is running on http://localhost:${listener.address().port}`);
        global.port = listener.address().port;
    });
}

module.exports = startServer;