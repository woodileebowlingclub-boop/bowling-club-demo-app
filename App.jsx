import React, { useMemo, useState } from "react";

const MEMBER_PIN = "1234";
const ADMIN_PIN = "9999";
const DEMO_CLUB_NAME = "Riverside Bowling Club";
const DEMO_SUBTITLE = "Demo club app";

const initialPosts = [
  {
    id: 1,
    title: "Opening Day",
    message: "Our opening day is on Saturday 2nd May at 2.00 pm. Members and guests welcome.",
    date_posted: "2026-05-02",
    pinned: true,
    attachment_link: "",
    button_text: "",
  },
  {
    id: 2,
    title: "Membership Reminder",
    message: "Membership subscriptions are now due. Please speak to the Treasurer if you need assistance.",
    date_posted: "2026-04-28",
    pinned: false,
    attachment_link: "",
    button_text: "",
  },
];

const initialDocuments = [
  {
    id: 1,
    title: "Membership Form",
    description: "Example membership form for new members.",
    file_url: "",
    button_text: "Open form",
    category: "Forms",
  },
  {
    id: 2,
    title: "Fixtures List",
    description: "Example fixtures list for the season.",
    file_url: "",
    button_text: "Open fixtures",
    category: "Fixtures",
  },
];

const initialMembers = [
  { id: 1, name: "Alan Stewart", section: "Gents" },
  { id: 2, name: "Brian Kerr", section: "Gents" },
  { id: 3, name: "David Moore", section: "Gents" },
  { id: 4, name: "John Fraser", section: "Gents" },
  { id: 5, name: "Margaret Allan", section: "Ladies" },
  { id: 6, name: "Jean Murray", section: "Ladies" },
  { id: 7, name: "Linda Scott", section: "Ladies" },
  { id: 8, name: "Anne McLean", section: "Ladies" },
  { id: 9, name: "Peter Wilson", section: "Associate" },
  { id: 10, name: "Susan Clark", section: "Associate" },
];

const initialEvents = [
  {
    id: 1,
    title: "Club Practice",
    event_date: "2026-05-05",
    event_time: "18:30",
    location: "Main Green",
    notes: "Friendly practice session for all members.",
  },
  {
    id: 2,
    title: "Ladies Friendly Match",
    event_date: "2026-05-09",
    event_time: "14:00",
    location: "Home",
    notes: "Tea and biscuits after the match.",
  },
  {
    id: 3,
    title: "Committee Meeting",
    event_date: "2026-05-12",
    event_time: "19:00",
    location: "Clubhouse",
    notes: "Committee members only.",
  },
];

const initialOfficeBearers = [
  { id: 1, role: "President", name: "James Robertson", phone: "", email: "" },
  { id: 2, role: "Vice President", name: "William Craig", phone: "", email: "" },
  { id: 3, role: "Secretary", name: "Moira Campbell", phone: "", email: "" },
  { id: 4, role: "Treasurer", name: "Helen Stewart", phone: "", email: "" },
  { id: 5, role: "Match Secretary", name: "Tom Bennett", phone: "", email: "" },
];

const initialCoaches = [
  { id: 1, name: "Gordon Reid", role: "Club Coach", phone: "", email: "", notes: "Tuesday coaching evening." },
  { id: 2, name: "Sandra McKay", role: "Junior Coach", phone: "", email: "", notes: "Sunday morning beginner sessions." },
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("home");

  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [savedAdminPin, setSavedAdminPin] = useState(ADMIN_PIN);
  const [savedMemberPin, setSavedMemberPin] = useState(MEMBER_PIN);
  const [newAdminPin, setNewAdminPin] = useState("");
  const [newMemberPin, setNewMemberPin] = useState("");

  const [posts, setPosts] = useState(initialPosts);
  const [documents, setDocuments] = useState(initialDocuments);
  const [members, setMembers] = useState(initialMembers);
  const [events, setEvents] = useState(initialEvents);
  const [officeBearers, setOfficeBearers] = useState(initialOfficeBearers);
  const [coaches, setCoaches] = useState(initialCoaches);

  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postPinned, setPostPinned] = useState(false);

  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentCategory, setDocumentCategory] = useState("General");

  const [memberName, setMemberName] = useState("");
  const [memberSection, setMemberSection] = useState("Gents");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventNotes, setEventNotes] = useState("");

  const [memberSearch, setMemberSearch] = useState("");

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.date_posted) - new Date(a.date_posted);
    });
  }, [posts]);

  const filteredMembers = useMemo(() => {
    const search = memberSearch.trim().toLowerCase();
    if (!search) return members;
    return members.filter((m) => m.name.toLowerCase().includes(search) || m.section.toLowerCase().includes(search));
  }, [members, memberSearch]);

  const groupedMembers = useMemo(() => {
    return {
      Gents: filteredMembers.filter((m) => m.section === "Gents"),
      Ladies: filteredMembers.filter((m) => m.section === "Ladies"),
      Associate: filteredMembers.filter((m) => m.section === "Associate"),
    };
  }, [filteredMembers]);

  const handleLogin = () => {
    if (pin === savedMemberPin) {
      setLoggedIn(true);
      setMessage("");
      return;
    }
    setMessage("Incorrect PIN");
  };

  const handleAdminLogin = () => {
    if (adminPin === savedAdminPin) {
      setAdminUnlocked(true);
      setMessage("");
      return;
    }
    setMessage("Incorrect admin PIN");
  };

  const savePinSettings = () => {
    if (!newAdminPin && !newMemberPin) {
      setMessage("Enter a new admin PIN or member PIN.");
      return;
    }

    if (newAdminPin) setSavedAdminPin(newAdminPin);
    if (newMemberPin) setSavedMemberPin(newMemberPin);

    setNewAdminPin("");
    setNewMemberPin("");
    setMessage("PIN settings updated in demo app.");
  };

  const savePost = () => {
    if (!postTitle || !postMessage || !postDate) {
      setMessage("Enter post title, message and date.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: postTitle,
      message: postMessage,
      date_posted: postDate,
      attachment_link: "",
      button_text: "",
      pinned: postPinned,
    };

    setPosts((prev) => [newItem, ...prev]);
    setPostTitle("");
    setPostMessage("");
    setPostDate("");
    setPostPinned(false);
    setMessage("Notice added to demo app.");
  };

  const saveDocument = () => {
    if (!documentTitle) {
      setMessage("Enter document title.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: documentTitle,
      description: documentDescription,
      file_url: "",
      button_text: "Open document",
      category: documentCategory,
    };

    setDocuments((prev) => [newItem, ...prev]);
    setDocumentTitle("");
    setDocumentDescription("");
    setDocumentCategory("General");
    setMessage("Document added to demo app.");
  };

  const saveMember = () => {
    if (!memberName) {
      setMessage("Enter member name.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: memberName,
      section: memberSection,
    };

    setMembers((prev) => [...prev, newItem]);
    setMemberName("");
    setMemberSection("Gents");
    setMessage("Member added to demo app.");
  };

  const saveEvent = () => {
    if (!eventTitle || !eventDate) {
      setMessage("Enter event title and date.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: eventTitle,
      event_date: eventDate,
      event_time: eventTime,
      location: eventLocation,
      notes: eventNotes,
    };

    setEvents((prev) => [...prev, newItem].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)));
    setEventTitle("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
    setEventNotes("");
    setMessage("Diary entry added to demo app.");
  };

  const removeItem = (setter, id) => {
    setter((prev) => prev.filter((item) => item.id !== id));
    setMessage("Item removed from demo app.");
  };

  if (!loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginPanel}>
          <div style={styles.demoLogo}>RB</div>
          <h1 style={{ marginBottom: 6 }}>{DEMO_CLUB_NAME}</h1>
          <p style={{ marginTop: 0, color: "#555" }}>{DEMO_SUBTITLE}</p>
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
          <div style={styles.demoHint}>Demo member PIN: {savedMemberPin}</div>
          {message && <div style={styles.message}>{message}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <div style={styles.demoLogoSmall}>RB</div>
            <div>
              <h1 style={styles.title}>{DEMO_CLUB_NAME}</h1>
              <p style={styles.subtitle}>{DEMO_SUBTITLE}</p>
            </div>
          </div>
        </div>

        <div style={styles.tabs}>
          <button style={styles.tab(tab === "home")} onClick={() => setTab("home")}>Home</button>
          <button style={styles.tab(tab === "diary")} onClick={() => setTab("diary")}>Diary</button>
          <button style={styles.tab(tab === "notices")} onClick={() => setTab("notices")}>Notices</button>
          <button style={styles.tab(tab === "members")} onClick={() => setTab("members")}>Members</button>
          <button style={styles.tab(tab === "office")} onClick={() => setTab("office")}>Office Bearers</button>
          <button style={styles.tab(tab === "coaches")} onClick={() => setTab("coaches")}>Coaches</button>
          <button style={styles.tab(tab === "documents")} onClick={() => setTab("documents")}>Documents</button>
          <button style={styles.tab(tab === "admin")} onClick={() => setTab("admin")}>Admin</button>
        </div>

        {message && <div style={styles.messageBar}>{message}</div>}

        {tab === "home" && (
          <div style={styles.grid}>
            <div style={styles.panel}>
              <h3>Welcome</h3>
              <p>This is a generic bowling club demo app with fictitious names, events and information.</p>
              <p>It is suitable for showing to other clubs as an example.</p>
            </div>
            <div style={styles.panel}>
              <h3>Next Events</h3>
              {events.slice(0, 3).map((event) => (
                <div key={event.id} style={styles.itemCard}>
                  <strong>{event.title}</strong>
                  <div>{formatDate(event.event_date)}{event.event_time ? ` • ${event.event_time}` : ""}</div>
                  {event.location && <div>{event.location}</div>}
                </div>
              ))}
            </div>
            <div style={styles.panel}>
              <h3>Latest Notices</h3>
              {sortedPosts.slice(0, 3).map((post) => (
                <div key={post.id} style={styles.itemCard}>
                  <strong>{post.title}{post.pinned ? " • Pinned" : ""}</strong>
                  <div>{formatDate(post.date_posted)}</div>
                  <div>{post.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "diary" && (
          <div style={styles.panel}>
            <h3>Diary</h3>
            {events.map((event) => (
              <div key={event.id} style={styles.itemCard}>
                <strong>{event.title}</strong>
                <div>{formatDate(event.event_date)}{event.event_time ? ` • ${event.event_time}` : ""}</div>
                {event.location && <div>{event.location}</div>}
                {event.notes && <div>{event.notes}</div>}
              </div>
            ))}
          </div>
        )}

        {tab === "notices" && (
          <div style={styles.panel}>
            <h3>Notices</h3>
            {sortedPosts.map((post) => (
              <div key={post.id} style={styles.itemCard}>
                <strong>{post.title}{post.pinned ? " • Pinned" : ""}</strong>
                <div>{formatDate(post.date_posted)}</div>
                <div>{post.message}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "members" && (
          <div style={styles.panel}>
            <h3>Members</h3>
            <input
              type="text"
              placeholder="Search members"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              style={styles.input}
            />

            <h4>Gents</h4>
            {groupedMembers.Gents.map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}

            <h4>Ladies</h4>
            {groupedMembers.Ladies.map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}

            <h4>Associate</h4>
            {groupedMembers.Associate.map((m) => (
              <div key={m.id} style={styles.memberRow}>{m.name}</div>
            ))}
          </div>
        )}

        {tab === "office" && (
          <div style={styles.panel}>
            <h3>Office Bearers</h3>
            {officeBearers.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <strong>{item.role}</strong>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "coaches" && (
          <div style={styles.panel}>
            <h3>Club Coaches</h3>
            {coaches.map((coach) => (
              <div key={coach.id} style={styles.itemCard}>
                <strong>{coach.name}</strong>
                <div>{coach.role}</div>
                {coach.notes && <div>{coach.notes}</div>}
              </div>
            ))}
          </div>
        )}

        {tab === "documents" && (
          <div style={styles.panel}>
            <h3>Documents</h3>
            {documents.map((doc) => (
              <div key={doc.id} style={styles.itemCard}>
                <strong>{doc.title}</strong>
                <div>{doc.category}</div>
                {doc.description && <div>{doc.description}</div>}
              </div>
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
                  placeholder="Enter admin PIN"
                />
                <button onClick={handleAdminLogin} style={styles.button}>
                  Enter
                </button>
                <div style={styles.demoHint}>Demo admin PIN: {savedAdminPin}</div>
              </>
            ) : (
              <div style={styles.grid}>
                <div style={styles.panelInner}>
                  <h3>PIN Settings</h3>
                  <div>Current member PIN: {savedMemberPin}</div>
                  <div>Current admin PIN: {savedAdminPin}</div>
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
                  <button onClick={savePinSettings} style={styles.button}>Save PIN Settings</button>
                </div>

                <div style={styles.panelInner}>
                  <h3>Add Notice</h3>
                  <input type="text" placeholder="Title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} style={styles.input} />
                  <textarea placeholder="Message" value={postMessage} onChange={(e) => setPostMessage(e.target.value)} style={styles.textarea} />
                  <input type="date" value={postDate} onChange={(e) => setPostDate(e.target.value)} style={styles.input} />
                  <label style={styles.checkRow}>
                    <input type="checkbox" checked={postPinned} onChange={(e) => setPostPinned(e.target.checked)} />
                    Pinned notice
                  </label>
                  <button onClick={savePost} style={styles.button}>Save Notice</button>
                </div>

                <div style={styles.panelInner}>
                  <h3>Add Document</h3>
                  <input type="text" placeholder="Title" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} style={styles.input} />
                  <textarea placeholder="Description" value={documentDescription} onChange={(e) => setDocumentDescription(e.target.value)} style={styles.textarea} />
                  <input type="text" placeholder="Category" value={documentCategory} onChange={(e) => setDocumentCategory(e.target.value)} style={styles.input} />
                  <button onClick={saveDocument} style={styles.button}>Save Document</button>
                </div>

                <div style={styles.panelInner}>
                  <h3>Add Member</h3>
                  <input type="text" placeholder="Name" value={memberName} onChange={(e) => setMemberName(e.target.value)} style={styles.input} />
                  <select value={memberSection} onChange={(e) => setMemberSection(e.target.value)} style={styles.input}>
                    <option>Gents</option>
                    <option>Ladies</option>
                    <option>Associate</option>
                  </select>
                  <button onClick={saveMember} style={styles.button}>Save Member</button>
                </div>

                <div style={styles.panelInner}>
                  <h3>Add Diary Entry</h3>
                  <input type="text" placeholder="Event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} style={styles.input} />
                  <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={styles.input} />
                  <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} style={styles.input} />
                  <input type="text" placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} style={styles.input} />
                  <textarea placeholder="Notes" value={eventNotes} onChange={(e) => setEventNotes(e.target.value)} style={styles.textarea} />
                  <button onClick={saveEvent} style={styles.button}>Save Diary Entry</button>
                </div>

                <div style={styles.panelInner}>
                  <h3>Quick Remove</h3>
                  <div style={styles.smallNote}>For demo use only.</div>
                  {posts.slice(0, 2).map((item) => (
                    <button key={item.id} onClick={() => removeItem(setPosts, item.id)} style={styles.removeButton}>
                      Remove notice: {item.title}
                    </button>
                  ))}
                  {documents.slice(0, 2).map((item) => (
                    <button key={item.id} onClick={() => removeItem(setDocuments, item.id)} style={styles.removeButton}>
                      Remove doc: {item.title}
                    </button>
                  ))}
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
    background: "linear-gradient(180deg, #1f4e5f 0%, #2d667b 50%, #3e7f95 100%)",
    padding: 18,
    fontFamily: "Arial, sans-serif",
  },
  wrap: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  loginPanel: {
    maxWidth: 420,
    margin: "60px auto",
    background: "#fff",
    borderRadius: 20,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
  },
  header: {
    background: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  demoLogo: {
    width: 84,
    height: 84,
    borderRadius: "50%",
    margin: "0 auto 14px",
    background: "#1f4e5f",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    fontWeight: 700,
  },
  demoLogoSmall: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#1f4e5f",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: 700,
  },
  title: {
    margin: 0,
    color: "#1f4e5f",
    fontSize: 30,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 0,
    color: "#444",
    fontSize: 17,
  },
  tabs: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tab: (active) => ({
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    background: active ? "#1f4e5f" : "#d7ebf2",
    color: active ? "#fff" : "#18404d",
    cursor: "pointer",
    fontWeight: 700,
  }),
  panel: {
    background: "#fff",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
  },
  panelInner: {
    background: "#f7fbfc",
    border: "1px solid #d9e7ec",
    borderRadius: 14,
    padding: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  itemCard: {
    border: "1px solid #dbe7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    background: "#fbfdfe",
  },
  memberRow: {
    padding: "8px 0",
    borderBottom: "1px solid #e6eef1",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #c9d7dc",
    fontSize: 14,
    marginBottom: 10,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #c9d7dc",
    fontSize: 14,
    marginBottom: 10,
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "#1f4e5f",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  removeButton: {
    display: "block",
    width: "100%",
    marginBottom: 8,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    background: "#b00020",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    textAlign: "left",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  demoHint: {
    marginTop: 12,
    color: "#4c6169",
    fontSize: 14,
  },
  message: {
    marginTop: 12,
    color: "#1f4e5f",
    fontWeight: 700,
  },
  messageBar: {
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    color: "#1f4e5f",
    fontWeight: 700,
  },
  smallNote: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
};
