import "./styles.scss";

import header from "../../containers/header/index.js";
import sidebar from "../../containers/sidebar/index.js";

const commonTemplate = (body, parseHTML) => {
    const [headerString, onHeaderRender] = header(parseHTML);

    const headerElement = parseHTML(headerString);
    const burguerButton = onHeaderRender(headerElement);

    const [sidebarString, onSidebarRender] = sidebar(burguerButton, parseHTML);

    const sidebarElement = parseHTML(sidebarString);
    onSidebarRender(sidebarElement);

    body.appendChild(headerElement);
    body.appendChild(sidebarElement);
}

export default commonTemplate;