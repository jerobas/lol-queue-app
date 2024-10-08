import teemoImage from "../../components/teemoImage";
import discordJoinButton from "../../components/discordJoinButton";

const home = (parseHTML) => {
    const homeString = /* html */ `
        <div class="mt-4 text-lg" id="server-updates"></div>
    `;

    const onRender = (homeElement) => {
        const [teemoImageString, onTeemoImageRender, onTeemoImageUpdate] = teemoImage(parseHTML);
        const teemoImageElement = parseHTML(teemoImageString);
        homeElement.appendChild(teemoImageElement);
        onTeemoImageRender(teemoImageElement);

        const [discordJoinButtonString, onDiscordJoinButtonRender] = discordJoinButton("https://discord.gg/EzDj9rUk");
        const discordJoinButtonElement = parseHTML(discordJoinButtonString);
        homeElement.appendChild(discordJoinButtonElement);
        onDiscordJoinButtonRender(discordJoinButtonElement);

        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data).message;
            onTeemoImageUpdate(message);
        };
    }

    return [homeString, onRender];
};

export default home;