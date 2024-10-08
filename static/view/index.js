import home from './pages/home/index.js';
import commonTemplate from './templates/common/index.js';

const parser = new DOMParser();
const parseHTML = (html) => parser.parseFromString(html, "text/html").body.firstChild;

const index = () => {
    const body = document.querySelector("body");

    commonTemplate(body, parseHTML);
    const [homeString, onHomeRender] = home();
    const homeElement = parseHTML(homeString);

    body.appendChild(homeElement);

    onHomeRender(homeElement);
}

window.addEventListener("DOMContentLoaded", index);