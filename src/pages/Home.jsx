import React, { useEffect } from "react";
import Banner from "./Banner";
import TourList from "./TourList";
import hinh1 from "../assets/hinh1.png";

function Home() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      script.async = true;
      document.body.appendChild(script);
    }

    if (!document.querySelector("df-messenger")) {
      const dfMessenger = document.createElement("df-messenger");
      dfMessenger.setAttribute("intent", "WELCOME");
      dfMessenger.setAttribute("chat-title", "AI_Tour");
      dfMessenger.setAttribute("agent-id", "561db30f-428c-4e14-950c-f0a18ed83642");
      dfMessenger.setAttribute("language-code", "en");

      document.body.appendChild(dfMessenger);
    }
  }, []);

  const domesticTours = [
    {
      id: 1,
      image: hinh1,
      title: "Mùa Thu 1",
      description: "Tour Cao Bằng 3 ngày 2 đêm...",
      price: "2,100,000 VND",
    },
    {
      id: 2,
      image: hinh1,
      title: "Mùa Thu 2",
      description: "Tour Sapa 3 ngày 2 đêm...",
      price: "2,390,000 VND",
    },
  ];

  const internationalTours = [
    {
      id: 1,
      image: hinh1,
      title: "Mùa Thu 3",
      description: "Tour Châu Âu 7 ngày 6 đêm...",
      price: "18,100,000 VND",
    },
    {
      id: 2,
      image: hinh1,
      title: "Mùa Thu 4",
      description: "Tour Nhật Bản 5 ngày 4 đêm...",
      price: "18,190,000 VND",
    },
  ];

  return (
    <div>
      <Banner />
      <TourList title="Tour trong nước" tours={domesticTours} />
      <TourList title="Tour quốc tế" tours={internationalTours} />
    </div>
  );
}

export default Home;
