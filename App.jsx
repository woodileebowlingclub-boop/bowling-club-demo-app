import React, { useMemo, useState } from "react";

const MEMBER_PIN = "1234";
const ADMIN_PIN = "9999";
const CLUB_NAME = "Riverside Bowling Club";
const CLUB_SUBTITLE = "Demo club app with members, diary, notices and club information";

const initialNotices = [
  {
    id: 1,
    title: "Opening Day",
    text: "Opening Day will take place on Saturday 2nd May at 2.00 pm. Members and guests welcome.",
    date: "2026-05-02",
    pinned: true,
  },
  {
    id: 2,
    title: "Membership Reminder",
    text: "Membership subscriptions are now due. Please speak to the Treasurer if required.",
    date: "2026-04-28",
    pinned: false,
  },
];

const initialMembers = [
  { id: 1, name: "John Smith", section: "Gents" },
  { id: 2, name: "David Brown", section: "Gents" },
  { id: 3, name: "Alan Wilson", section: "Gents" },
  { id: 4, name: "Brian Clark", section: "Gents" },
  { id: 5, name: "Mary Campbell", section: "Ladies" },
  { id: 6, name: "Jean Robertson", section: "Ladies" },
  { id: 7, name: "Anne Stewart", section: "Ladies" },
  { id: 8, name: "Linda Fraser", section: "Ladies" },
  { id: 9, name: "Peter Murray", section: "Associate" },
  { id: 10, name: "Susan Kerr", section: "Associate" },
];

const initialEvents = [
  { id: 1, title: "Opening Day", date: "2026-05-02", time: "14:00", location: "Club Green", notes: "Members and guests welcome." },
  { id: 2, title: "Practice Evening", date: "2026-05-05", time: "18:30", location: "Main Green", notes: "Friendly roll-up for all sections." },
  { id: 3, title: "Committee Meeting", date: "2026-05-12", time: "19:00", location: "Clubhouse", notes: "Committee members only." },
];

const initialOfficeBearers = [
  { id: 1, role: "President", name: "James Robertson" },
  { id: 2, role: "Vice President", name: "William Craig" },
  { id: 3, role: "Secretary", name: "Moira Campbell" },
  { id: 4, role: "Treasurer", name: "Helen Stewart" },
  { id: 5, role: "Match Secretary", name: "Tom Bennett" },
];

const initialCoaches = [
  { id: 1, name: "Gordon Reid", role: "Club Coach", notes: "Tuesday coaching evening." },
  { id: 2, name: "Sandra McKay", role: "Junior Coach", notes: "Sunday morning beginner sessions." },
];

const initialDocuments = [
  { id: 1, title: "Membership Form", category: "Forms", description: "Example membership form for new members." },
  { id: 2, title: "Fixture List", category: "Fixtures", description: "Example fixture list for the season." },
  { id: 3, title: "Club Rules", category: "Rules", description: "Example club rules and guidance for members." },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function App() {
  const [pin, setPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [memberPin, setMemberPin] = useState(MEMBER_PIN);
  const [adminPin, setAdminPin] = useState(ADMIN_PIN);
  const [newMemberPin, setNewMemberPin] = useState("");
  const [newAdminPin, setNewAdminPin] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("home");
  const [memberSearch, setMemberSearch] = useState("");

  const [notices, setNotices] = useState(initialNotices);
  const [members, setMembers] = useState(initialMembers);
  const [events, setEvents] = useState(initialEvents);
  const [officeBearers, setOfficeBearers] = useState(initialOfficeBearers);
  const [coaches, setCoaches] = useState(initialCoaches);
  const [documents, setDocuments] = useState(initialDocuments);

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeText, setNoticeText] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [noticePinned, setNoticePinned] = useState(false);

  const [memberName, setMemberName] = useState("");
  const [memberSection, setMemberSection] = useState("Gents");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventNotes, setEventNotes] = useState("");

  const [documentTitle, setDocumentTitle] = useState("");
  const [documentCategory, setDocumentCategory] = useState("General");
  const [documentDescription, setDocumentDescription] = useState("");

  const sortedNotices = useMemo(() => {
    return [...notices].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.date) - new Date(a.date);
    });
  }, [notices]);

  const filteredMembers = useMemo(() => {
    const search = memberSearch.trim().toLowerCase();
    if (!search) return members;
    return members.filter(
      (m) => m.name.toLowerCase().includes(search) || m.section.toLowerCase().includes(search)
    );
  }, [members, memberSearch]);

  const counts = useMemo(() => {
    const gents = members.filter((m) => m.section === "Gents").length;
    const ladies = members.filter((m) => m.section === "Ladies").length;
    const associate = members.filter((m) => m.section === "Associate").length;
    return { gents, ladies, associate, total: members.length };
  }, [members]);

  function handleLogin() {
    if (pin === memberPin) {
      setLoggedIn(true);
      setAdminUnlocked(false);
      setMessage("");
    } else if (pin === adminPin) {
      setLoggedIn(true);
      setAdminUnlocked(true);
      setMessage("");
    } else {
      setMessage("Incorrect PIN");
    }
  }

  function handleAdminUnlock() {
    if (adminPinInput === adminPin) {
      setAdminUnlocked(true);
      setAdminPinInput("");
      setMessage("");
    } else {
      setMessage("Incorrect admin PIN");
    }
  }

  function savePinSettings() {
    if (!newMemberPin && !newAdminPin) {
      setMessage("Enter a new member PIN or admin PIN");
      return;
    }
    if (newMemberPin) setMemberPin(newMemberPin);
    if (newAdminPin) setAdminPin(newAdminPin);
    setNewMemberPin("");
    setNewAdminPin("");
    setMessage("PIN settings updated");
  }

  function saveNotice() {
    if (!noticeTitle || !noticeText || !noticeDate) {
      setMessage("Enter notice title, text and date");
      return;
    }
    const item = {
      id: Date.now(),
      title: noticeTitle,
      text: noticeText,
      date: noticeDate,
      pinned: noticePinned,
    };
    setNotices((prev) => [item, ...prev]);
    setNoticeTitle("");
    setNoticeText("");
    setNoticeDate("");
    setNoticePinned(false);
    setMessage("Notice added");
  }

  function saveMember() {
    if (!memberName) {
      setMessage("Enter member name");
      return;
    }
    const item = {
      id: Date.now(),
      name: memberName,
      section: memberSection,
    };
    setMembers((prev) => [...prev, item]);
    setMemberName("");
    setMemberSection("Gents");
    setMessage("Member added");
  }

  function saveEvent() {
    if (!eventTitle || !eventDate) {
      setMessage("Enter event title and date");
      return;
    }
    const item = {
      id: Date.now(),
      title: eventTitle,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      notes: eventNotes,
    };
    setEvents((prev) => [...prev, item].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventNotes("");
    setMessage("Diary entry added");
  }

  function saveDocument() {
    if (!documentTitle) {
      setMessage("Enter document title");
      return;
    }
    const item = {
      id: Date.now(),
      title: documentTitle,
      category: documentCategory,
      description: documentDescription,
    };
    setDocuments((prev) => [item, ...prev]);
    setDocumentTitle("");
    setDocumentCategory("General");
    setDocumentDescription("");
    setMessage("Document added");
  }

  function removeItem(setter, id, itemName) {
    setter((prev) => prev.filter((item) => item.id !== id));
    setMessage(`${itemName} removed`);
  }

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginWrap}>
          <div style={styles.loginCard}>
            <div style={styles.logoLarge}>RB</div>
            <h1 style={styles.loginTitle}>{CLUB_NAME}</h1>
            <p style={styles.loginSubtitle}>{CLUB_SUBTITLE}</p>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.buttonPrimary}>Enter</button>
            <div style={styles.hint}>Demo member PIN: {memberPin}</div>
            {message && <div style={styles.message}>{message}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.topCard}>
          <div style={styles.topRow}>
            <div style={styles.logoSmall}>RB</div>
            <div>
              <h1 style={styles.title}>{CLUB_NAME}</h1>
              <p style={styles.subtitle}>{CLUB_SUBTITLE}</p>
            </div>
          </div>
        </div>

        <div style={styles.tabsCard}>
          <div style={styles.tabsGrid}>
            {[
              ["home", "HOME"],
              ["diary", "DIARY"],
              ["members", "MEMBERS"],
              ["notices", "NOTICEBOARD"],
              ["documents", "RULES"],
              ["office", "OFFICE BEARERS"],
              ["coaches", "COACHES"],
              ["admin", "ADMIN"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={tab === key ? styles.activeTabButton : styles.tabButton}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {message && <div style={styles.messageBar}>{message}</div>}

        {tab === "home" && (
          <>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Gents</div>
                <div style={styles.statNumber}>{counts.gents}</div>
                <div style={styles.statText}>Full members</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Ladies</div>
                <div style={styles.statNumber}>{counts.ladies}</div>
                <div style={styles.statText}>Full members</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Associate</div>
                <div style={styles.statNumber}>{counts.associate}</div>
                <div style={styles.statText}>Associate members</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statTitle}>Total Members</div>
                <div style={styles.statNumber}>{counts.total}</div>
                <div style={styles.statText}>All sections</div>
              </div>
            </div>

            <div style={styles.twoColGrid}>
              <div style={styles.sectionCard}>
                <h3 style={styles.sectionHeading}>Latest Notices</h3>
                {sortedNotices.slice(0, 3).map((notice) => (
                  <div key={notice.id} style={styles.listCard}>
                    <div style={styles.listTitle}>{notice.title}{notice.pinned ? " • Pinned" : ""}</div>
                    <div style={styles.listMeta}>{formatDate(notice.date)}</div>
                    <div>{notice.text}</div>
                  </div>
                ))}
              </div>

              <div style={styles.sectionCard}>
                <h3 style={styles.sectionHeading}>Upcoming Diary</h3>
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} style={styles.listCard}>
                    <div style={styles.listTitle}>{event.title}</div>
                    <div style={styles.listMeta}>
                      {formatDate(event.date)}{event.time ? ` • ${event.time}` : ""}
                    </div>
                    {event.location && <div>{event.location}</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "diary" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Diary</h3>
            {events.map((event) => (
              <div key={event.id} style={styles.listCard}>
                <div style={styles.listTitle}>{event.title}</div>
                <div style={styles.listMeta}>
                  {formatDate(event.date)}{event.time ? ` • ${event.time}` : ""}
                </div>
                {event.location && <div>{event.location}</div>}
                {event.notes && <div>{event.notes}</div>}
                {adminUnlocked && (
                  <button style={styles.removeButton} onClick={() => removeItem(setEvents, event.id, "Diary entry")}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "members" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Members</h3>
            <input
              type="text"
              placeholder="Search members"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              style={styles.input}
            />

            <h4 style={styles.subHeading}>Gents</h4>
            {filteredMembers.filter((m) => m.section === "Gents").map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}

            <h4 style={styles.subHeading}>Ladies</h4>
            {filteredMembers.filter((m) => m.section === "Ladies").map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}

            <h4 style={styles.subHeading}>Associate</h4>
            {filteredMembers.filter((m) => m.section === "Associate").map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}
          </div>
        )}

        {tab === "notices" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Noticeboard</h3>
            {sortedNotices.map((notice) => (
              <div key={notice.id} style={styles.listCard}>
                <div style={styles.listTitle}>{notice.title}{notice.pinned ? " • Pinned" : ""}</div>
                <div style={styles.listMeta}>{formatDate(notice.date)}</div>
                <div>{notice.text}</div>
                {adminUnlocked && (
                  <button style={styles.removeButton} onClick={() => removeItem(setNotices, notice.id, "Notice")}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "documents" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Rules and Documents</h3>
            {documents.map((doc) => (
              <div key={doc.id} style={styles.listCard}>
                <div style={styles.listTitle}>{doc.title}</div>
                <div style={styles.listMeta}>{doc.category}</div>
                <div>{doc.description}</div>
                {adminUnlocked && (
                  <button style={styles.removeButton} onClick={() => removeItem(setDocuments, doc.id, "Document")}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "office" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Office Bearers</h3>
            {officeBearers.map((item) => (
              <div key={item.id} style={styles.listCard}>
                <div style={styles.listTitle}>{item.role}</div>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "coaches" && (
          <div style={styles.sectionCard}>
            <h3 style={styles.sectionHeading}>Club Coaches</h3>
            {coaches.map((coach) => (
              <div key={coach.id} style={styles.listCard}>
                <div style={styles.listTitle}>{coach.name}</div>
                <div style={styles.listMeta}>{coach.role}</div>
                {coach.notes && <div>{coach.notes}</div>}
              </div>
            ))}
          </div>
        )}

        {tab === "admin" && (
          <div style={styles.sectionCard}>
            {!adminUnlocked ? (
              <div style={styles.adminLockBox}>
                <h3 style={styles.sectionHeading}>Admin Login</h3>
                <input
                  type="password"
                  placeholder="Enter admin PIN"
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleAdminUnlock} style={styles.buttonPrimary}>Enter</button>
                <div style={styles.hint}>Demo admin PIN: {adminPin}</div>
              </div>
            ) : (
              <div style={styles.adminGrid}>
                <div style={styles.adminCard}>
                  <h3 style={styles.sectionHeading}>PIN Settings</h3>
                  <div style={styles.infoLine}>Current member PIN: {memberPin}</div>
                  <div style={styles.infoLine}>Current admin PIN: {adminPin}</div>
                  <input
                    type="password"
                    placeholder="New member PIN"
                    value={newMemberPin}
                    onChange={(e) => setNewMemberPin(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="New admin PIN"
                    value={newAdminPin}
                    onChange={(e) => setNewAdminPin(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={savePinSettings} style={styles.buttonPrimary}>Save PIN Settings</button>
                </div>

                <div style={styles.adminCard}>
                  <h3 style={styles.sectionHeading}>Add Notice</h3>
                  <input
                    type="text"
                    placeholder="Notice title"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    style={styles.input}
                  />
                  <textarea
                    placeholder="Notice text"
                    value={noticeText}
                    onChange={(e) => setNoticeText(e.target.value)}
                    style={styles.textarea}
                  />
                  <input
                    type="date"
                    value={noticeDate}
                    onChange={(e) => setNoticeDate(e.target.value)}
                    style={styles.input}
                  />
                  <label style={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={noticePinned}
                      onChange={(e) => setNoticePinned(e.target.checked)}
                    />
                    Pinned notice
                  </label>
                  <button onClick={saveNotice} style={styles.buttonPrimary}>Save Notice</button>
                </div>

                <div style={styles.adminCard}>
                  <h3 style={styles.sectionHeading}>Add Member</h3>
                  <input
                    type="text"
                    placeholder="Member name"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    style={styles.input}
                  />
                  <select
                    value={memberSection}
                    onChange={(e) => setMemberSection(e.target.value)}
                    style={styles.input}
                  >
                    <option>Gents</option>
                    <option>Ladies</option>
                    <option>Associate</option>
                  </select>
                  <button onClick={saveMember} style={styles.buttonPrimary}>Save Member</button>
                </div>

                <div style={styles.adminCard}>
                  <h3 style={styles.sectionHeading}>Add Diary Entry</h3>
                  <input
                    type="text"
                    placeholder="Event title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    style={styles.input}
                  />
                  <textarea
                    placeholder="Notes"
                    value={eventNotes}
                    onChange={(e) => setEventNotes(e.target.value)}
                    style={styles.textarea}
                  />
                  <button onClick={saveEvent} style={styles.buttonPrimary}>Save Diary Entry</button>
                </div>

                <div style={styles.adminCard}>
                  <h3 style={styles.sectionHeading}>Add Document</h3>
                  <input
                    type="text"
                    placeholder="Document title"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={documentCategory}
                    onChange={(e) => setDocumentCategory(e.target.value)}
                    style={styles.input}
                  />
                  <textarea
                    placeholder="Description"
                    value={documentDescription}
                    onChange={(e) => setDocumentDescription(e.target.value)}
                    style={styles.textarea}
                  />
                  <button onClick={saveDocument} style={styles.buttonPrimary}>Save Document</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #184f6a 0%, #256982 60%, #2f7a94 100%)",
    padding: 18,
    fontFamily: "Arial, sans-serif",
  },
  wrap: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  loginWrap: {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    width: "100%",
    maxWidth: 420,
    background: "#f7f7f7",
    borderRadius: 24,
    padding: 28,
    textAlign: "center",
    boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
  },
  logoLarge: {
    width: 86,
    height: 86,
    borderRadius: "50%",
    background: "#ffffff",
    color: "#1d5576",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: 32,
    fontWeight: 700,
  },
  loginTitle: {
    margin: 0,
    color: "#1d5576",
    fontSize: 34,
  },
  loginSubtitle: {
    marginTop: 8,
    color: "#4a5c69",
    fontSize: 18,
  },
  topCard: {
    background: "#f2f2f2",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
  },
  topRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
  },
  logoSmall: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#ffffff",
    color: "#1d5576",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    fontWeight: 700,
  },
  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: 30,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 0,
    color: "#dbe7ef",
    fontSize: 15,
  },
  tabsCard: {
    background: "rgba(197, 215, 239, 0.4)",
    borderRadius: 22,
    padding: 10,
    marginBottom: 18,
  },
  tabsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 10,
  },
  tabButton: {
    padding: "16px 12px",
    borderRadius: 16,
    border: "none",
    background: "transparent",
    color: "#0f2f4f",
    fontWeight: 700,
    cursor: "pointer",
  },
  activeTabButton: {
    padding: "16px 12px",
    borderRadius: 16,
    border: "none",
    background: "#ffffff",
    color: "#123f69",
    fontWeight: 700,
    cursor: "pointer",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18,
    marginBottom: 18,
  },
  statCard: {
    background: "#f5f5f5",
    borderRadius: 24,
    padding: 24,
    border: "3px solid #66d0ff",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  },
  statTitle: {
    color: "#14499b",
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 18,
  },
  statNumber: {
    color: "#14499b",
    fontSize: 54,
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: 8,
  },
  statText: {
    color: "#4a6074",
    fontSize: 16,
  },
  twoColGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 18,
  },
  sectionCard: {
    background: "#f5f5f5",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  },
  sectionHeading: {
    marginTop: 0,
    color: "#14499b",
    fontSize: 22,
    marginBottom: 16,
  },
  subHeading: {
    color: "#14499b",
    marginTop: 18,
    marginBottom: 10,
  },
  listCard: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    border: "1px solid #d5e0ea",
  },
  listTitle: {
    fontWeight: 700,
    color: "#163f78",
    marginBottom: 6,
  },
  listMeta: {
    color: "#5f7280",
    fontSize: 14,
    marginBottom: 6,
  },
  memberRow: {
    background: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    border: "1px solid #d5e0ea",
  },
  adminGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  adminCard: {
    background: "#ffffff",
    borderRadius: 18,
    padding: 18,
    border: "1px solid #d5e0ea",
  },
  adminLockBox: {
    maxWidth: 420,
  },
  input: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid #c5d0d8",
    fontSize: 14,
    marginBottom: 10,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 88,
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid #c5d0d8",
    fontSize: 14,
    marginBottom: 10,
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  },
  buttonPrimary: {
    padding: "11px 16px",
    borderRadius: 10,
    border: "none",
    background: "#14499b",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  removeButton: {
    marginTop: 10,
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#b00020",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    color: "#355064",
  },
  infoLine: {
    marginBottom: 10,
    color: "#355064",
  },
  hint: {
    marginTop: 12,
    color: "#355064",
  },
  message: {
    marginTop: 12,
    color: "#b00020",
    fontWeight: 700,
  },
  messageBar: {
    background: "#ffffff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    color: "#14499b",
    fontWeight: 700,
  },
};
