const discordJoinButton = (channelLink) => {
    const discordJoinButtonString = /*html*/`
        <a
            href="${channelLink}"
            target="_blank"
            class="inline-block mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
            style="-webkit-app-region: no-drag"
        >
            Join Game Room
        </a>
    `;

    const onRender = (discordJoinButtonElement) => { };

    return [discordJoinButtonString, onRender];
}

export default discordJoinButton;