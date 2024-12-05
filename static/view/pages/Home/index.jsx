import React, { useEffect, useState } from "react";
import TeemoImage from "../../components/TeemoImage";

const Home = ({ eventSource }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    eventSource.onmessage = (event) => {
      if (!JSON.parse(event.data).phase) {
        const newMessage = JSON.parse(event.data).message;
        setMessage(newMessage);
      }
    };
  }, [eventSource]);

  return (
    <div>
      <div className="mt-4 text-lg" id="server-updates"></div>
      <TeemoImage message={message} />
    </div>
  );
};

export default Home;
