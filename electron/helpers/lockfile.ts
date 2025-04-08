import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import os from "os";

export const getLockFile = () => {
  if (os.platform() !== "win32") {
    throw new Error("Lockfile lookup only supported on Windows.");
  }

  let possibleDrives: string[] = [];

  try {
    possibleDrives = execSync("wmic logicaldisk get name")
      .toString()
      .split("\n")
      .slice(1)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    console.error("Failed to list drives", error);
    throw new Error("Failed to list drives");
  }

  for (const drive of possibleDrives) {
    const filePath = path.join(
      drive,
      "Riot Games",
      "League of Legends",
      "lockfile"
    );
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      const [name, pid, port, password, protocol] = content.split(":");

      return {
        name,
        pid: Number(pid),
        port: Number(port),
        password,
        protocol,
      };
    }
  }

  throw new Error("Lockfile not found on any disk.");
};
