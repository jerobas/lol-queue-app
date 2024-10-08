const closeButton = () => {
    const button = /*html*/ `
        <button id="close-button" class="w-8 h-8 rounded focus:outline-none">
            <i class="fa-solid fa-circle-xmark"></i>
        </button>
    `;

    const onRender = (button) => {
        button.addEventListener("click", () => {
            window.windowControl.close();
        });
    };

    return [button, onRender];
};

export default closeButton;