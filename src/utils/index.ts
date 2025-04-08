export const ipc = (method: string, route: string, ...args: any[]) => {
  return window.ipcRenderer.invoke(method, route, ...args);
};

export const findChampionIcon = async (
  championId: number
): Promise<string | null> => {
  const versionUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
  const championsUrl =
    "https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/champion.json";

  const versions: string[] = await fetch(versionUrl).then((res) => res.json());
  const latestVersion = versions[0];

  const champions = await fetch(
    championsUrl.replace("<VERSION>", latestVersion)
  ).then((res) => res.json());

  const champion = Object.values(champions.data).find(
    (champ: any) => champ.key === String(championId)
  );

  if (!champion) {
    console.error(`Champion with ID ${championId} not found`);
    return null;
  }

  return `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.id}.png`;
};
