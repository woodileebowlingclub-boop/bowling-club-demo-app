import React, { useMemo, useState } from "react";
import logo from "./assets/lenzie-logo.png";

const CLUB_NAME = "Lenzie Bowling Club";
const CLUB_SUBTITLE = "Members diary, notices, competitions and club information";

const DEFAULT_ADMIN_PIN = "1234";
const DEFAULT_MEMBER_PIN = "2026";

const COLOURS = {
  navy: "#1d1a7a",
  blue: "#2c2fa3",
  gold: "#e4d52f",
  green: "#1f8a2c",
  white: "#ffffff",
  page: "#eef3f9",
  panel: "#f8fbff",
  border: "#d9e2ef",
  text: "#1e293b",
  muted: "#64748b",
  shadow: "0 10px 26px rgba(29,26,122,0.10)",
};

const starterDiary = [
  {
    id: 1,
    title: "Opening Day",
    date: "Saturday 2 May 2026",
    time: "2:00 pm",
    place: "Main Green",
    notes: "Members, guests and visitors welcome.",
  },
  {
    id: 2,
    title: "Friendly Match",
    date: "Saturday 9 May 2026",
    time: "2:00 pm",
    place: "Lenzie Bowling Club",
    notes: "Friendly fixture against Woodilee Bowling Club.",
  },
];

const starterNotices = [
  {
    id: 1,
    title: "Welcome to the Club App",
    message: "This app is for members to view club notices, diary dates and information.",
    date: "2026",
  },
];

const starterCompetitions = [
  {
    id: 1,
    title: "Club Championship",
    details: "Draws and updates will appear here.",
  },
];

const starterDocuments = [
  {
    id: 1,
    title: "Club Rules",
    details: "Upload or link club documents here.",
  },
];

function getStoredPin(key, fallback) {
  return localStorage.getItem(key) || fallback;
}

export default function App() {
  const [adminPin, setAdminPin] = useState(() =>
    getStoredPin("lenzieAdminPin", DEFAULT_ADMIN_PIN)
  );
  const [memberPin, setMemberPin] = useState(() =>
    getStoredPin("lenzieMemberPin", DEFAULT_MEMBER_PIN)
  );

  const [enteredPin, setEnteredPin] = useState("");
  const [access, setAccess] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const [diary, setDiary] = useState(starterDiary);
  const [notices, setNotices] = useState(starterNotices);
  const [competitions, setCompetitions] = useState(starterCompetitions);
  const [documents, setDocuments] = useState(starterDocuments);

  const [newAdminPin, setNewAdminPin] = useState("");
  const [newMemberPin, setNewMemberPin] = useState("");

  const [diaryForm, setDiaryForm] = useState({
    title: "",
    date: "",
    time: "",
    place: "",
    notes: "",
  });

  const [noticeForm, setNoticeForm] = useState({
    title: "",
    message: "",
  });

  const [competitionForm, setCompetitionForm] = useState({
    title: "",
    details: "",
  });

  const [documentForm, setDocumentForm] = useState({
    title: "",
    details: "",
  });

  const isAdmin = access === "admin";
  const isMember = access === "member" || access === "admin";

  const nextEvent = useMemo(() => diary[0], [diary]);

  function handleLogin() {
    if (enteredPin === adminPin) {
      setAccess("admin");
      setEnteredPin("");
      return;
    }

    if (enteredPin === memberPin) {
      setAccess("member");
      setEnteredPin("");
      return;
    }

    alert("Incorrect PIN number.");
  }

  function logout() {
    setAccess(null);
    setEnteredPin("");
    setActiveTab("home");
  }

  function changeAdminPin() {
    if (!newAdminPin.trim()) {
      alert("Enter a new admin PIN.");
      return;
    }

    localStorage.setItem("lenzieAdminPin", newAdminPin.trim());
    setAdminPin(newAdminPin.trim());
    setNewAdminPin("");
    alert("Admin PIN changed.");
  }

  function changeMemberPin() {
    if (!newMemberPin.trim()) {
      alert("Enter a new member PIN.");
      return;
    }

    localStorage.setItem("lenzieMemberPin", newMemberPin.trim());
    setMemberPin(newMemberPin.trim());
    setNewMemberPin("");
    alert("Member PIN changed.");
  }

  function addDiaryEvent() {
    if (!diaryForm.title || !diaryForm.date) {
      alert("Please enter at least a title and date.");
      return;
    }

    setDiary([
      ...diary,
      {
        id: Date.now(),
        ...diaryForm,
      },
    ]);

    setDiaryForm({
      title: "",
      date: "",
      time: "",
      place: "",
      notes: "",
    });
  }

  function addNotice() {
    if (!noticeForm.title || !noticeForm.message) {
      alert("Please enter a title and message.");
      return;
    }

    setNotices([
      {
        id: Date.now(),
        title: noticeForm.title,
        message: noticeForm.message,
        date: new Date().toLocaleDateString("en-GB"),
      },
      ...notices,
    ]);

    setNoticeForm({
      title: "",
      message: "",
    });
  }

  function addCompetition() {
    if (!competitionForm.title || !competitionForm.details) {
      alert("Please enter competition details.");
      return;
    }

    setCompetitions([
      ...competitions,
      {
        id: Date.now(),
        ...competitionForm,
      },
    ]);

    setCompetitionForm({
      title: "",
      details: "",
    });
  }

  function addDocument() {
    if (!documentForm.title || !documentForm.details) {
      alert("Please enter document details.");
      return;
    }

    setDocuments([
      ...documents,
      {
        id: Date.now(),
        ...documentForm,
      },
    ]);

    setDocumentForm({
      title: "",
      details: "",
    });
  }

  function deleteItem(setter, items, id) {
    setter(items.filter((item) => item.id !== id));
  }

  if (!isMember) {
    return (
      <div style={styles.page}>
        <div style={styles.loginBox}>
          <img src={logo} alt="Lenzie Bowling Club Logo" style={styles.logo} />

          <h1 style={styles.title}>{CLUB_NAME}</h1>
          <p style={styles.subtitle}>{CLUB_SUBTITLE}</p>

          <input
            style={styles.pinInput}
            type="password"
            placeholder="Enter PIN number"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />

          <button style={styles.primaryButton} onClick={handleLogin}>
            Enter App
          </button>

          <p style={styles.smallText}>Member PIN: 2026 | Admin PIN: 1234</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.appShell}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <img src={logo} alt="Lenzie Bowling Club Logo" style={styles.headerLogo} />
            <div>
              <h1 style={styles.headerTitle}>{CLUB_NAME}</h1>
              <p style={styles.headerSubtitle}>{CLUB_SUBTITLE}</p>
            </div>
          </div>

          <div style={styles.headerRight}>
            <strong>{isAdmin ? "Admin Mode" : "Member Mode"}</strong>
            <button style={styles.logoutButton} onClick={logout}>
              Log Out
            </button>
          </div>
        </header>

        <nav style={styles.nav}>
          {[
            ["home", "Home"],
            ["diary", "Diary"],
            ["notices", "Notices"],
            ["competitions", "Competitions"],
            ["documents", "Documents"],
            ["settings", "Admin Settings"],
          ]
            .filter(([key]) => key !== "settings" || isAdmin)
            .map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  ...styles.navButton,
                  background: activeTab === key ? COLOURS.navy : COLOURS.white,
                  color: activeTab === key ? COLOURS.white : COLOURS.navy,
                }}
              >
                {label}
              </button>
            ))}
        </nav>

        <main style={styles.main}>
          {activeTab === "home" && (
            <section>
              <h2 style={styles.sectionTitle}>Home</h2>

              <div style={styles.card}>
                <h3>Next Event</h3>
                {nextEvent ? (
                  <>
                    <h4>{nextEvent.title}</h4>
                    <p>
                      <strong>Date:</strong> {nextEvent.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {nextEvent.time}
                    </p>
                    <p>
                      <strong>Place:</strong> {nextEvent.place}
                    </p>
                    <p>{nextEvent.notes}</p>
                  </>
                ) : (
                  <p>No diary events added yet.</p>
                )}
              </div>

              <div style={styles.card}>
                <h3>Latest Notice</h3>
                {notices[0] ? (
                  <>
                    <h4>{notices[0].title}</h4>
                    <p>{notices[0].message}</p>
                  </>
                ) : (
                  <p>No notices added yet.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === "diary" && (
            <section>
              <h2 style={styles.sectionTitle}>Diary</h2>

              {isAdmin && (
                <div style={styles.adminPanel}>
                  <h3>Add Diary Event</h3>
                  <input
                    style={styles.input}
                    placeholder="Event title"
                    value={diaryForm.title}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, title: e.target.value })
                    }
                  />
                  <input
                    style={styles.input}
                    placeholder="Date"
                    value={diaryForm.date}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, date: e.target.value })
                    }
                  />
                  <input
                    style={styles.input}
                    placeholder="Time"
                    value={diaryForm.time}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, time: e.target.value })
                    }
                  />
                  <input
                    style={styles.input}
                    placeholder="Place"
                    value={diaryForm.place}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, place: e.target.value })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    placeholder="Notes"
                    value={diaryForm.notes}
                    onChange={(e) =>
                      setDiaryForm({ ...diaryForm, notes: e.target.value })
                    }
                  />
                  <button style={styles.primaryButton} onClick={addDiaryEvent}>
                    Add Event
                  </button>
                </div>
              )}

              {diary.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3>{item.title}</h3>
                  <p>
                    <strong>Date:</strong> {item.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {item.time}
                  </p>
                  <p>
                    <strong>Place:</strong> {item.place}
                  </p>
                  <p>{item.notes}</p>

                  {isAdmin && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteItem(setDiary, diary, item.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </section>
          )}

          {activeTab === "notices" && (
            <section>
              <h2 style={styles.sectionTitle}>Notices</h2>

              {isAdmin && (
                <div style={styles.adminPanel}>
                  <h3>Add Notice</h3>
                  <input
                    style={styles.input}
                    placeholder="Notice title"
                    value={noticeForm.title}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, title: e.target.value })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    placeholder="Notice message"
                    value={noticeForm.message}
                    onChange={(e) =>
                      setNoticeForm({ ...noticeForm, message: e.target.value })
                    }
                  />
                  <button style={styles.primaryButton} onClick={addNotice}>
                    Add Notice
                  </button>
                </div>
              )}

              {notices.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                  <small>{item.date}</small>

                  {isAdmin && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteItem(setNotices, notices, item.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </section>
          )}

          {activeTab === "competitions" && (
            <section>
              <h2 style={styles.sectionTitle}>Competitions</h2>

              {isAdmin && (
                <div style={styles.adminPanel}>
                  <h3>Add Competition</h3>
                  <input
                    style={styles.input}
                    placeholder="Competition title"
                    value={competitionForm.title}
                    onChange={(e) =>
                      setCompetitionForm({
                        ...competitionForm,
                        title: e.target.value,
                      })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    placeholder="Details"
                    value={competitionForm.details}
                    onChange={(e) =>
                      setCompetitionForm({
                        ...competitionForm,
                        details: e.target.value,
                      })
                    }
                  />
                  <button style={styles.primaryButton} onClick={addCompetition}>
                    Add Competition
                  </button>
                </div>
              )}

              {competitions.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>

                  {isAdmin && (
                    <button
                      style={styles.deleteButton}
                      onClick={() =>
                        deleteItem(setCompetitions, competitions, item.id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </section>
          )}

          {activeTab === "documents" && (
            <section>
              <h2 style={styles.sectionTitle}>Documents</h2>

              {isAdmin && (
                <div style={styles.adminPanel}>
                  <h3>Add Document</h3>
                  <input
                    style={styles.input}
                    placeholder="Document title"
                    value={documentForm.title}
                    onChange={(e) =>
                      setDocumentForm({
                        ...documentForm,
                        title: e.target.value,
                      })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    placeholder="Details or link"
                    value={documentForm.details}
                    onChange={(e) =>
                      setDocumentForm({
                        ...documentForm,
                        details: e.target.value,
                      })
                    }
                  />
                  <button style={styles.primaryButton} onClick={addDocument}>
                    Add Document
                  </button>
                </div>
              )}

              {documents.map((item) => (
                <div key={item.id} style={styles.card}>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>

                  {isAdmin && (
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteItem(setDocuments, documents, item.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </section>
          )}

          {activeTab === "settings" && isAdmin && (
            <section>
              <h2 style={styles.sectionTitle}>Admin Settings</h2>

              <div style={styles.card}>
                <h3>Change Admin PIN</h3>
                <p>Current admin PIN is hidden for security.</p>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="New admin PIN"
                  value={newAdminPin}
                  onChange={(e) => setNewAdminPin(e.target.value)}
                />
                <button style={styles.primaryButton} onClick={changeAdminPin}>
                  Save New Admin PIN
                </button>
              </div>

              <div style={styles.card}>
                <h3>Change Member PIN</h3>
                <p>Current member PIN is hidden for security.</p>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="New member PIN"
                  value={newMemberPin}
                  onChange={(e) => setNewMemberPin(e.target.value)}
                />
                <button style={styles.primaryButton} onClick={changeMemberPin}>
                  Save New Member PIN
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: COLOURS.page,
    fontFamily: "Arial, sans-serif",
    color: COLOURS.text,
    padding: "20px",
    boxSizing: "border-box",
  },

  loginBox: {
    maxWidth: "520px",
    margin: "40px auto",
    background: COLOURS.white,
    borderRadius: "24px",
    padding: "30px",
    textAlign: "center",
    boxShadow: COLOURS.shadow,
    border: `4px solid ${COLOURS.gold}`,
  },

  logo: {
    width: "220px",
    maxWidth: "80%",
    marginBottom: "20px",
  },

  title: {
    color: COLOURS.navy,
    fontSize: "34px",
    margin: "10px 0",
  },

  subtitle: {
    color: COLOURS.muted,
    fontSize: "16px",
    marginBottom: "25px",
  },

  pinInput: {
    width: "100%",
    padding: "14px",
    fontSize: "18px",
    borderRadius: "12px",
    border: `2px solid ${COLOURS.border}`,
    marginBottom: "15px",
    boxSizing: "border-box",
    textAlign: "center",
  },

  appShell: {
    maxWidth: "1100px",
    margin: "0 auto",
    background: COLOURS.white,
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: COLOURS.shadow,
  },

  header: {
    background: "linear-gradient(135deg, #1d1a7a, #2c2fa3)",
    color: COLOURS.white,
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  headerLogo: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    background: COLOURS.white,
    borderRadius: "50%",
    padding: "6px",
  },

  headerTitle: {
    margin: 0,
    fontSize: "30px",
  },

  headerSubtitle: {
    margin: "6px 0 0",
    color: "#f5f5f5",
  },

  headerRight: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    padding: "15px",
    background: "#f4f7fb",
    borderBottom: `1px solid ${COLOURS.border}`,
  },

  navButton: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: `2px solid ${COLOURS.navy}`,
    cursor: "pointer",
    fontWeight: "bold",
  },

  main: {
    padding: "20px",
  },

  sectionTitle: {
    color: COLOURS.navy,
    borderBottom: `3px solid ${COLOURS.gold}`,
    paddingBottom: "8px",
  },

  card: {
    background: COLOURS.panel,
    border: `1px solid ${COLOURS.border}`,
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "16px",
    boxShadow: COLOURS.shadow,
  },

  adminPanel: {
    background: "#fffce8",
    border: `2px solid ${COLOURS.gold}`,
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${COLOURS.border}`,
    marginBottom: "10px",
    boxSizing: "border-box",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: `1px solid ${COLOURS.border}`,
    marginBottom: "10px",
    boxSizing: "border-box",
    fontSize: "16px",
    minHeight: "90px",
  },

  primaryButton: {
    background: COLOURS.navy,
    color: COLOURS.white,
    border: `2px solid ${COLOURS.gold}`,
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  logoutButton: {
    background: COLOURS.gold,
    color: COLOURS.navy,
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  deleteButton: {
    background: "#c62828",
    color: COLOURS.white,
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },

  smallText: {
    color: COLOURS.muted,
    fontSize: "13px",
    marginTop: "18px",
  },
};
