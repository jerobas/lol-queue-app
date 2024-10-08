// import { Notyf } from 'notyf';
import sse from './sse.js';
import '../styles/index.scss';

const index = () => {
    // const notyf = Notyf();

    // notyf.success('A sala foi criada')

    sse();

    const minimizeBtn = document.getElementById("minimize-btn");
    minimizeBtn.addEventListener("click", () => {
        window.windowControl.minimize();
    });
    minimizeBtn.classList.add("clickable");

    const closeBtn = document.getElementById("close-btn");
    closeBtn.addEventListener("click", () => {
        window.windowControl.close();
    });
    closeBtn.classList.add("clickable");
}

window.addEventListener("DOMContentLoaded", index);