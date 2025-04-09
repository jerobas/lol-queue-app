import { useAudioInput } from "../../context/audioContext";

const Config = () => {
  const { selectedDeviceId, setSelectedDeviceId, availableDevices } =
    useAudioInput();

  return (
    <div className="overflow-y-auto p-4 flex flex-col items-center justify-center">
      <label className="text-sm font-medium text-gray-700 mb-2 self-start">
        Selecione seu microfone
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedDeviceId || ""}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
      >
        {availableDevices.map((device: any) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || ""}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Config;
