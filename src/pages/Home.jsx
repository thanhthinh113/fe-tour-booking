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

      {/* Google Map Section */}
      <div style={{ marginTop: "40px", padding: "0 16px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Bản đồ</h2>
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238637.48341190434!2d106.98481534247551!3d20.84338647575843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5796518cee87%3A0x55c6b0bcc85478db!2zVuG7i25oIEjhuqEgTG9uZw!5e0!3m2!1svi!2s!4v1747214127339!5m2!1svi!2s"
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Home;
