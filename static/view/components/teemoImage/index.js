import accept from "../../../assets/accept.png";
import menu from "../../../assets/menu.png";
import lobby from "../../../assets/lobby.png";
import queue from "../../../assets/queue.png";

import loading from "../../components/loading";

let teemoImageElement = null;

const imageDict = {
    "ReadyCheck": accept,
    "You are not able to accept a queue": menu,
    "Lobby": lobby,
    "Matchmaking": queue
}

const teemoImageOrText = (message) => {
    let imgString = '';

    if (!message) {
        imgString =  /* html */ `<p>Erro na comunicação com o servidor</p>`;
    } else {
        imgString = imageDict[message] ? /* html */ `
            <img src="${imageDict[message]}" alt="${message}" class="mx-auto mt-4" width="300" height="300">` : /* html */ `<p>${message}</p>`;
    }

    return imgString;
}

const teemoImage = async (parseHTML) => {
    const [loadingString, onLoadingRender] = await loading();

    let imgString = loadingString;

    const onRender = (imageElement) => {
        teemoImageElement = imageElement
        onLoadingRender();
    };

    const onUpdate = (message) => {
        const parsedHTML = parseHTML(teemoImageOrText(message));
        teemoImageElement.replaceWith(parsedHTML);
        teemoImageElement = parsedHTML;
    }

    return [imgString, onRender, onUpdate];
}

export default teemoImage;