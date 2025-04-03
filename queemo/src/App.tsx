import { useState, useEffect } from "react";
import ApiService from "./api";
function App() {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetch = async () => {
      const result = await window.ipcRenderer.invoke("get-lockfile");
      // const api = await ApiService.create(result.port, result.password)
      // console.log(api)
      const api = new ApiService(result.port, result.password);
      const response = await api.get('/lol-api/lol-gameflow/v1/session')
      console.log(response)
      setData(result);
    };
    fetch();
  }, []);
  return <div>{data && <p>{JSON.stringify(data, null, 2)}</p>}</div>;
}

export default App;
