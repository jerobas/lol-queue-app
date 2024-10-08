import accept from "../../../assets/accept.png";
import menu from "../../../assets/menu.png";
import lobby from "../../../assets/lobby.png";
import queue from "../../../assets/queue.png";

let teemoImageElement = null;

const imageDict = {
    "ReadyCheck": accept,
    "You are not able to accept a queue": menu,
    "Lobby": lobby,
    "Matchmaking": queue
}

const teemoImageOrText = (message) => {
    let imgString = '';
    console.log(message);

    if (!message) {
        imgString =  /* html */ `<p>Erro na comunicação com o servidor</p>`;
    } else {
        imgString = imageDict[message] ? /* html */ `
            <img src="${imageDict[message]}" alt="${message}" class="mx-auto mt-4" width="300" height="300">` : /* html */ `<p>${message}</p>`;
    }

    return imgString;
}

const teemoImage = (parseHTML) => {
    let imgString = '<p></p>';

    const onRender = (imageElement) => teemoImageElement = imageElement;

    const onUpdate = (message) => {
        const parsedHTML = parseHTML(teemoImageOrText(message));
        teemoImageElement.replaceWith(parsedHTML);
    }

    return [imgString, onRender, onUpdate];
}

export default teemoImage;