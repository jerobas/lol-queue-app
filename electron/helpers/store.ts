import Store from "electron-store";
import { IStore } from "../../src/interfaces";

const store = new Store<IStore>({
  defaults: {
    audioDeviceId: null,
  },
});

export default store;
