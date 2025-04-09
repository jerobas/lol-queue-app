import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

interface IAudioInputContext {
  selectedDeviceId: string | null;
  setSelectedDeviceId: (id: string) => void;
  availableDevices: MediaDeviceInfo[];
}

const audioInputContext = createContext<IAudioInputContext>();

export const AudioInputProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>(
    []
  );

  const loadDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(
        (device) => device.kind === 'audioinput'
      );
      setAvailableDevices(audioInputs);

      if (!selectedDeviceId && audioInputs.length > 0) {
        setSelectedDeviceId(audioInputs[0].deviceId);
      }
    } catch (error) {
      console.log("Erro");
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <audioInputContext.Provider
      value={{ selectedDeviceId, setSelectedDeviceId, availableDevices }}
    >
      {children}
    </audioInputContext.Provider>
  );
};

export const useAudioInput = () => {
  const context = useContext(audioInputContext);
  if (!context) console.log("sem ctx");
  return context;
};
