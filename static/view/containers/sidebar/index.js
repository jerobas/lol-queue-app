import pageButton from "../../components/pageButton";

import "./styles.scss";

const sidebar = (burguerButton, parseHTML) => {
    const sidebarString = /* html */ `
        <div id="sidebar" class="h-full absolute top-0 left-0 p-2 flex flex-col space-y-2 items-center z-10">
        </div>
    `;

    const onRender = (sidebar) => {
        sidebar.appendChild(parseHTML(/*html*/ `
            <div style="height: 32px"></div>
        `));

        console.log(pagesDict);

        Object.values(pagesDict).forEach((page) => {
            const [buttonString, onRender] = pageButton(page);
            const button = parseHTML(buttonString);
            onRender(button);
            button.classList.add("clickable")
            sidebar.appendChild(button);
        });

        burguerButton.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    };

    return [sidebarString, onRender];
};

export default sidebar;