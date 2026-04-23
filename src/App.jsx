import React, { useState } from "react";

const CLUB_NAME = "Rockview Bowling Club";
const CLUB_SUBTITLE = "Friendship • Sport • Community";

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#f4f6f9" }}>

      {/* HEADER */}
      <div style={{ background: "#0b3d91", color: "white", padding: "20px" }}>
        <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "bold" }}>{CLUB_NAME}</h1>
        <p style={{ fontSize: "18px", marginTop: "5px" }}>{CLUB_SUBTITLE}</p>
        <p style={{ fontSize: "14px", opacity: 0.9 }}>
          Demo club app with fictitious members, fixtures, notices and club information
        </p>
      </div>

      {/* NAV */}
      <div style={{ background: "#1e4db7", padding: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {[
          ["home", "🏠 Home"],
          ["diary", "📅 Diary"],
          ["members", "👥 Members"],
          ["notices", "📢 Noticeboard"],
          ["comps", "🏆 Competitions"]
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              fontWeight: "bold",
              background: tab === key ? "#e31b23" : "white",
              color: tab === key ? "white" : "#0b3d91",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>

              <div style={{ background: "#0b3d91", color: "white", padding: "20px", borderRadius: "12px" }}>
                <h2 style={{ fontSize: "26px" }}>⭐ Welcome to Rockview Bowling Club</h2>
                <p style={{ fontSize: "18px" }}>
                  A friendly club for all ages and abilities.
                </p>
                <p style={{ fontSize: "18px" }}>
                  Come along, have fun and enjoy the game!
                </p>

                <button style={{ marginTop: "15px", padding: "10px 20px", background: "#e31b23", color: "white", border: "none", borderRadius: "8px" }}>
                  Join Us
                </button>
              </div>

              <div style={{ background: "#e31b23", color: "white", padding: "20px", borderRadius: "12px" }}>
                <h3 style={{ fontSize: "22px" }}>📅 Next Event</h3>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Opening Day</p>
                <p>Sat 2 May • 2:00 PM</p>
              </div>

            </div>

            <div style={{ marginTop: "20px", background: "white", padding: "20px", borderRadius: "12px" }}>
              <h2 style={{ color: "#0b3d91" }}>📢 Club News</h2>
              <p><b>Fixtures Released</b> – Season schedule now available.</p>
              <p><b>Green Maintenance</b> – Monday mornings until 1pm.</p>
              <p><b>Volunteers Needed</b> – Help required for match days.</p>
            </div>
          </div>
        )}

        {/* DIARY */}
        {tab === "diary" && (
          <div>
            <h2 style={{ color: "#0b3d91" }}>📅 Diary</h2>

            {[
              "Opening Day – 2 May 2pm",
              "Practice Night – 5 May 6:30pm",
              "Committee Meeting – 13 May 7pm"
            ].map((e, i) => (
              <div key={i} style={{ background: "white", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
                {e}
              </div>
            ))}
          </div>
        )}

        {/* MEMBERS */}
        {tab === "members" && (
          <div>
            <h2 style={{ color: "#0b3d91" }}>👥 Members</h2>
            {[
              "James McLaren",
              "Margaret Boyd",
              "Alan Fraser",
              "Jean Robertson"
            ].map((m, i) => (
              <div key={i} style={{ background: "white", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
                {m}
              </div>
            ))}
          </div>
        )}

        {/* NOTICES */}
        {tab === "notices" && (
          <div>
            <h2 style={{ color: "#0b3d91" }}>📢 Noticeboard</h2>
            <div style={{ background: "white", padding: "15px", borderRadius: "8px" }}>
              Membership now open – new members welcome!
            </div>
          </div>
        )}

        {/* COMPETITIONS */}
        {tab === "comps" && (
          <div>
            <h2 style={{ color: "#0b3d91" }}>🏆 Competitions</h2>
            <div style={{ background: "white", padding: "15px", borderRadius: "8px" }}>
              Club Singles Championship – Entries close 31 May
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ background: "#e31b23", color: "white", padding: "15px", textAlign: "center", fontWeight: "bold" }}>
        Visitors & New Members Always Welcome!
      </div>

    </div>
  );
}
