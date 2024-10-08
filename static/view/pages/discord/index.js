const discord = () => {
    const discordString = /* html */ `
        <iframe
            src="https://discord.com/widget?id=1291471408425205761&theme=dark"
            class="w-full h-52 rounded-lg border-none"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            style="-webkit-app-region: no-drag"
        />
    `;

    const onRender = (discordElement) => { };

    return [discordString, onRender];
}

export default discord;