const discordWidget = () => {
    const discordWidget = document.createElement("iframe");
    discordWidget.src = "https://discord.com/widget?id=1291471408425205761&theme=dark";
    discordWidget.className = "w-full h-52 rounded-lg border-none";
    discordWidget.sandbox = "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts";
    discordWidget.style = "-webkit-app-region: no-drag";

    const joinButton = document.createElement("a");
    joinButton.href = "https://discord.gg/EzDj9rUk";
    joinButton.target = "_blank";
    joinButton.className = "inline-block mt-3 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300";
    joinButton.style = "-webkit-app-region: no-drag";
    joinButton.textContent = "Join Game Room";

    const container = document.querySelector("body");
    container.appendChild(discordWidget);
};

export default discordWidget;