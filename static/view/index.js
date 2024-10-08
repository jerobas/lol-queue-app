import commonTemplate from './templates/common/index.js';

import sse from "../utils/sse.js";

import home from './pages/home/index.js';
import settings from './pages/settings/index.js';
import discord from './pages/discord/index.js';

const parser = new DOMParser();
const parseHTML = (html) => parser.parseFromString(html, "text/html").body.firstChild;

const body = document.querySelector("body");

const goTo = (page) => pagesRender(page);

const pagesRender = (page) => {
    document.querySelector(".page")?.remove();

    const [pageString, onPageRender] = page(parseHTML);
    const pageElement = parseHTML(pageString);
    pageElement.classList.add("page");
    body.appendChild(pageElement);
    onPageRender(pageElement);

    return;
};

const index = () => {
    commonTemplate(body, parseHTML);

    pagesRender(home);
}

goToPage = goTo;
pagesDict = {
    "home": [home, "home", "fa-solid fa-home"],
    "settings": [settings, "settings", "fa-solid fa-gear"],
    "discord": [discord, "discord", "fa-brands fa-discord"]
};
eventSource = sse();

window.addEventListener("DOMContentLoaded", index);