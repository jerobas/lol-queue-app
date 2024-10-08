const closeButton = () => {
    const button = /*html*/ `
        <button id="close-button">
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