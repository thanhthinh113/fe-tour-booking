import React, { useEffect } from "react";
import Banner from "./Banner";
import TourList from "./TourList";

function Home() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }

    if (!document.querySelector("df-messenger")) {
      const dfMessenger = document.createElement("df-messenger");
      dfMessenger.setAttribute("intent", "WELCOME");
      dfMessenger.setAttribute("chat-title", "AI_Tour");
      dfMessenger.setAttribute(
        "agent-id",
        "561db30f-428c-4e14-950c-f0a18ed83642"
      );
      dfMessenger.setAttribute("language-code", "en");

      document.body.appendChild(dfMessenger);
    }
  }, []);

  return (
    <div>
      <Banner />
      <TourList />
    </div>
  );
}

export default Home;
