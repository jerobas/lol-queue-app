import { useState, useEffect } from "react";

const useChampion = (championId) => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    const fetchChampionIcon = async () => {
      if (!championId) return;

      try {
        const versionUrl =
          "https://ddragon.leagueoflegends.com/api/versions.json";
        const championsUrl =
          "https://ddragon.leagueoflegends.com/cdn/<VERSION>/data/en_US/champion.json";

        const versions = await fetch(versionUrl).then((res) => res.json());
        const latestVersion = versions[0];

        const champions = await fetch(
          championsUrl.replace("<VERSION>", latestVersion)
        ).then((res) => res.json());

        const champion = Object.values(champions.data).find(
          (champ) => champ.key === String(championId)
        );

        if (!champion) {
          throw new Error("Champion not found");
        }

        const iconUrl = `http://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.id}.png`;
        setIconUrl(iconUrl);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchChampionIcon();
  }, [championId]);

  return iconUrl;
};

export default useChampion;
