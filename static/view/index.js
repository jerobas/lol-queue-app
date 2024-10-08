// import { Notyf } from 'notyf';
import sse from './sse.js';

import header from './containers/header/index.js';

import '../styles/index.scss';

const parser = new DOMParser();
const parseHTML = (html) => parser.parseFromString(html, "text/html").body.firstChild;

const index = () => {
    // const notyf = Notyf();

    // notyf.success('A sala foi criada')

    sse();

    const [headerString, onHeaderRender] = header(parseHTML);

    const headerElement = parseHTML(headerString);
    onHeaderRender(headerElement);

    console.log(headerElement);
    console.log(document.querySelector("body"));

    document.querySelector("body").appendChild(headerElement);
}

window.addEventListener("DOMContentLoaded", index);