const Notyf = require("https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js")

const index = () => {
    const notyf = new Notyf();

    const eventSource = new EventSource("http://localhost:3000/events");
    eventSource.onmessage = (event) => {
        const serverUpdates = document.getElementById("server-updates");
        const message = JSON.parse(event.data).message;

        let imgSrc = "";
        if (message === "ReadyCheck") {
            imgSrc = "./accept";
        } else if (message === "You are not able to accept a queue") {
            imgSrc = "./menu.png";
        } else if (message === "Lobby") {
            imgSrc = "./lobby.png";
        } else if (message === "Matchmaking") {
            imgSrc = "./queue.png";
        }

        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = message;
            img.classList.add("mx-auto", "mt-4");
            img.width = 300;
            img.height = 300;

            serverUpdates.innerHTML = "";
            serverUpdates.appendChild(img);
        } else {
            serverUpdates.textContent = message;
        }
    };

    eventSource.onerror = () => {
        console.error("Error with SSE connection");
        eventSource.close();
    };

    document
        .getElementById("minimize-btn")
        .addEventListener("click", () => {
            window.windowControl.minimize();
        });

    document.getElementById("close-btn").addEventListener("click", () => {
        window.windowControl.close();
    });
}

window.addEventListener("DOMContentLoaded", index);
