import React, { useState } from "react";

const CLUB_PIN = "1234";
const ADMIN_PIN = "9999";

export default function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [tab, setTab] = useState("home");

  const [members, setMembers] = useState([
    { id: 1, name: "John Smith", section: "Gents" },
    { id: 2, name: "David Brown", section: "Gents" },
    { id: 3, name: "Alan Wilson", section: "Gents" },
    { id: 4, name: "Mary Campbell", section: "Ladies" },
    { id: 5, name: "Jean Robertson", section: "Ladies" },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: "Opening Day", date: "2026-04-12" },
    { id: 2, title: "Club Competition", date: "2026-05-10" },
  ]);

  const [notice, setNotice] = useState("");

  function handleLogin() {
    if (pin === CLUB_PIN) {
      setLoggedIn(true);
      setAdmin(false);
    } else if (pin === ADMIN_PIN) {
      setLoggedIn(true);
      setAdmin(true);
    } else {
      alert("Incorrect PIN");
    }
  }

  return (
    <div style={styles.page}>
      {!loggedIn ? (
        <div style={styles.loginBox}>
          <div style={styles.logo}>RB</div>
          <h1>Riverside Bowling Club</h1>
          <p>Demo club app</p>

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

          <p style={{ marginTop: 10 }}>Member PIN: 1234</p>
        </div>
      ) : (
        <div style={styles.wrap}>
          <div style={styles.header}>
            <div style={styles.logoSmall}>RB</div>
            <h2>Riverside Bowling Club</h2>
          </div>

          <div style={styles.tabs}>
            <button onClick={() => setTab("home")}>Home</button>
            <button onClick={() => setTab("members")}>Members</button>
            <button onClick={() => setTab("events")}>Diary</button>
            {admin && <button onClick={() => setTab("admin")}>Admin</button>}
          </div>

          {tab === "home" && (
            <div style={styles.panel}>
              <h3>Club Notice</h3>
              <p>{notice || "No notices yet"}</p>
            </div>
          )}

          {tab === "members" && (
            <div style={styles.panel}>
              <h3>Members</h3>

              <h4>Gents</h4>
              {members
                .filter((m) => m.section === "Gents")
                .map((m) => (
                  <div key={m.id}>{m.name}</div>
                ))}

              <h4>Ladies</h4>
              {members
                .filter((m) => m.section === "Ladies")
                .map((m) => (
                  <div key={m.id}>{m.name}</div>
                ))}
            </div>
          )}

          {tab === "events" && (
            <div style={styles.panel}>
              <h3>Diary</h3>
              {events.map((e) => (
                <div key={e.id}>
                  {e.title} – {e.date}
                </div>
              ))}
            </div>
          )}

          {tab === "admin" && (
            <div style={styles.panel}>
              <h3>Admin Panel</h3>

              <input
                placeholder="New notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                style={styles.input}
              />

              <button style={styles.button}>Save Notice</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #1f4e5f, #2f6f82)",
    fontFamily: "Arial",
    padding: 20,
  },
  loginBox: {
    maxWidth: 350,
    margin: "100px auto",
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    textAlign: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: "#1f4e5f",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
    fontSize: 28,
  },
  logoSmall: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "#fff",
    color: "#1f4e5f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    maxWidth: 800,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    color: "#fff",
    marginBottom: 20,
  },
  tabs: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  panel: {
    background: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  input: {
    padding: 10,
    margin: "10px 0",
    width: "100%",
  },
  button: {
    padding: 10,
    background: "#1f4e5f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};
