const pageButton = (page) => {
    const button = /*html*/ `
        <button id="page-button" class="w-5 h-5 rounded focus:outline-none">
            <i class="${page[2]}"></i>
        </button>
    `;

    const onRender = (button) => {
        button.addEventListener("click", () => {
            goToPage(page[0]);
        });
    };

    return [button, onRender];
};

export default pageButton;