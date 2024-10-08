import './styles.scss';

const burguerButton = () => {
    const button = /*html*/ `
        <div id="burguer-button">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    const onRender = (button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("open");
        });
    };

    return [button, onRender];
}

export default burguerButton;