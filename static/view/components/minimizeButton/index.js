const minimizeButton = () => {
    const button = /*html*/ `
        <button id="minimize-button" class="w-8 h-8 rounded focus:outline-none">
            <i class="fa-solid fa-circle-minus"></i>
        </button>
    `;

    const onRender = (button) => {
        button.addEventListener("click", () => {
            window.windowControl.minimize();
        });
    };

    return [button, onRender];
};

export default minimizeButton;