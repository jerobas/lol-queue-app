import sse from "../../components/sse";

const home = () => {
    const homeString = /* html */ `
        <div class="mt-4 text-lg" id="server-updates"></div>
    `;

    const onRender = (sseHolder) => {
        sse();
    }

    return [homeString, onRender];
};

export default home;