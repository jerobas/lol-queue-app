import accept from "../assets/accept.png";
import menu from "../assets/menu.png";
import lobby from "../assets/lobby.png";
import queue from "../assets/queue.png";

const sse = () => {
    const eventSource = new EventSource("http://localhost:3000/events");
    eventSource.onmessage = (event) => {
        const serverUpdates = document.getElementById("server-updates");
        const message = JSON.parse(event.data).message;

        let imgSrc = "";
        if (message === "ReadyCheck") {
            imgSrc = accept;
        } else if (message === "You are not able to accept a queue") {
            imgSrc = menu;
        } else if (message === "Lobby") {
            imgSrc = lobby;
        } else if (message === "Matchmaking") {
            imgSrc = queue;
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
}

export default sse;