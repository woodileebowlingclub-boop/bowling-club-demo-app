import React, { useState } from "react";
import logo from "./assets/WBC Logo.png";

const CLUB_PIN = "1234";
const ADMIN_PIN = "2059";

const styles = {
  page: {
    padding: 16,
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(180deg, #5b1d2a 0%, #7a2638 45%, #a33a4d 100%)",
    minHeight: "100vh",
    color: "#222",
  },
  wrap: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    background: "#5a1323",
    color: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 60,
  },
  title: {
    margin: 0,
  },
  subtitle: {
    margin: 0,
    opacity: 0.8,
  },
  tabs: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
  },
  tab: (active) => ({
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    background: active ? "#7a2638" : "#ddd",
    color: active ? "#fff" : "#000",
  }),
  panel: {
    background: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  loginPanel: {
    maxWidth: 320,
    margin: "100px auto",
    textAlign: "center",
    background: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    background: "#7a2638",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
};

export default function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("home");

  const [adminPin, setAdminPin] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const [members] = useState([
    { id: 1, name: "John Smith", section: "Gents" },
    { id: 2, name: "Alex Brown", section: "Gents" },
    { id: 3, name: "Mary Wilson", section: "Ladies" },
    { id: 4, name: "Jane McDonald", section: "Ladies" },
  ]);

  const handleLogin = () => {
    if (pin === CLUB_PIN) {
      setLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Incorrect PIN");
    }
  };

  const handleAdminLogin = () => {
    if (adminPin === ADMIN_PIN) {
      setAdminUnlocked(true);
      setMessage("");
    } else {
      setMessage("Wrong admin PIN");
    }
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginPanel}>
          <img src={logo} style={styles.logo} />
          <h1>Victoria Torrance Bowling Club</h1>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleLogin} style={styles.button}>
            Enter
          </button>

          {message && <div>{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <img src={logo} style={styles.logo} />
            <div>
              <h1 style={styles.title}>Victoria Torrance Bowling Club</h1>
              <p style={styles.subtitle}>Club App</p>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          <button style={styles.tab(tab==="home")} onClick={()=>setTab("home")}>
            Home
          </button>
          <button style={styles.tab(tab==="leaderboard")} onClick={()=>setTab("leaderboard")}>
            Monday Points
          </button>
          <button style={styles.tab(tab==="members")} onClick={()=>setTab("members")}>
            Members
          </button>
          <button style={styles.tab(tab==="admin")} onClick={()=>setTab("admin")}>
            Admin
          </button>
        </div>

        {tab === "home" && (
          <div style={styles.panel}>
            <h3>Welcome</h3>
            <p>Welcome to Victoria Torrance Bowling Club App.</p>
          </div>
        )}

        {tab === "members" && (
          <div style={styles.panel}>
            <h3>Members</h3>

            <h4>Gents</h4>
            {members.filter(m=>m.section==="Gents").map(m=>(
              <div key={m.id}>{m.name}</div>
            ))}

            <h4>Ladies</h4>
            {members.filter(m=>m.section==="Ladies").map(m=>(
              <div key={m.id}>{m.name}</div>
            ))}
          </div>
        )}

        {tab === "admin" && (
          <div style={styles.panel}>
            {!adminUnlocked ? (
              <>
                <h3>Admin Login</h3>

                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  style={styles.input}
                />

                <button onClick={handleAdminLogin} style={styles.button}>
                  Enter
                </button>
              </>
            ) : (
              <>
                <h3>Admin Panel</h3>
                <p>Admin controls go here.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
