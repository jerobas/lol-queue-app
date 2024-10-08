import burguerButton from '../../components/burguerButton/index.js';
import minimizeButton from '../../components/minimizeButton/index.js';
import closeButton from '../../components/closeButton/index.js';

const header = (parseHTML) => {
    const headerString = /* html */ `
        <div id="header" class="w-full absolute top-0 right-0 mt-1 px-2 flex justify-between items-center">
        </div>
    `;

    const buttons = [
        burguerButton(),
        minimizeButton(),
        closeButton()
    ]

    const onRender = (header) => {
        const buttonsHolder = document.createElement("div");
        buttonsHolder.classList.add("flex", "space-x-1");

        let renderedButtons = buttons.map(([buttonString, onRender]) => {
            const button = parseHTML(buttonString);
            onRender(button);
            button.classList.add("clickable")

            return button;
        });

        let burguerButton = renderedButtons.shift();

        renderedButtons.forEach(button => {
            buttonsHolder.appendChild(button);
        });

        header.appendChild(burguerButton);
        header.appendChild(buttonsHolder);
    };

    return [headerString, onRender];
};

export default header;