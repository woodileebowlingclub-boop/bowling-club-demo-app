import React, { useMemo, useRef, useState } from "react";

const CLUB_NAME = "Rockview Bowling Club";
const CLUB_SUBTITLE = "Members diary, notices, competitions and club information";
const ADMIN_PIN = "1954";

const COLOURS = {
  navy: "#123b7a",
  blue: "#1f5fbf",
  red: "#c62828",
  gold: "#d6a21d",
  white: "#ffffff",
  page: "#eef3f9",
  panel: "#f8fbff",
  border: "#d9e2ef",
  text: "#1e293b",
  muted: "#64748b",
  shadow: "0 10px 26px rgba(18,59,122,0.08)",
};

const starterDiary = [
  { id: 1, title: "Opening Day", date: "Saturday 2 May 2026", time: "2:00 pm", place: "Main Green", notes: "Members, guests and visitors welcome.", fileName: "Opening Day Poster.pdf", fileUrl: "#" },
  { id: 2, title: "Tuesday Practice Evening", date: "Tuesday 5 May 2026", time: "6:30 pm", place: "Club Green", notes: "Friendly roll-up for all sections.", fileName: "Practice Evening Notes.docx", fileUrl: "#" },
  { id: 3, title: "Committee Meeting", date: "Wednesday 13 May 2026", time: "7:00 pm", place: "Clubhouse Lounge", notes: "Office bearers and committee members only.", fileName: "Agenda.pdf", fileUrl: "#" },
  { id: 4, title: "Ladies Friendly v Meadowbank", date: "Sunday 17 May 2026", time: "2:00 pm", place: "Away Match", notes: "Transport leaves club at 1:00 pm.", fileName: "Team Sheet.pdf", fileUrl: "#" },
];

const starterNotices = [
  { id: 1, title: "Membership Now Open", body: "New members are welcome for the 2026 season. Beginners are encouraged to come along and try bowls.", date: "20 April 2026", fileName: "Membership Form 2026.pdf", fileUrl: "#" },
  { id: 2, title: "Green Maintenance", body: "The green will be closed every Monday morning for cutting and seasonal maintenance until 1:00 pm.", date: "18 April 2026", fileName: "Maintenance Schedule.pdf", fileUrl: "#" },
  { id: 3, title: "Volunteers Required", body: "Helpers needed for teas, raffle sales and match-day setup throughout the season.", date: "15 April 2026", fileName: "Volunteer Rota.xlsx", fileUrl: "#" },
];

const starterCompetitions = [
  { id: 1, name: "Club Singles Championship", closes: "31 May 2026", starts: "6 June 2026", notes: "Open to all full members.", fileName: "Singles Entry Form.pdf", fileUrl: "#" },
  { id: 2, name: "Pairs Knockout", closes: "14 June 2026", starts: "20 June 2026", notes: "Choose your own partner.", fileName: "Pairs Rules.pdf", fileUrl: "#" },
  { id: 3, name: "Mixed Triples Day", closes: "1 July 2026", starts: "11 July 2026", notes: "One-day friendly competition with lunch included.", fileName: "Triples Poster.jpg", fileUrl: "#" },
];

const starterMembers = [
  { id: 1, name: "James McLaren", section: "Gents", phone: "07700 900101", fileName: "Profile Note.pdf", fileUrl: "#" },
  { id: 2, name: "Margaret Boyd", section: "Ladies", phone: "07700 900102", fileName: "Contact Sheet.pdf", fileUrl: "#" },
  { id: 3, name: "Alan Fraser", section: "Gents", phone: "07700 900103", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 4, name: "Jean Robertson", section: "Ladies", phone: "07700 900104", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 5, name: "Robert Sinclair", section: "Associate", phone: "07700 900105", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 6, name: "Fiona Kerr", section: "Ladies", phone: "07700 900106", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 7, name: "David Thomson", section: "Gents", phone: "07700 900107", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 8, name: "Moira Campbell", section: "Associate", phone: "07700 900108", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 9, name: "George Allan", section: "Gents", phone: "07700 900109", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 10, name: "Helen Stewart", section: "Ladies", phone: "07700 900110", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 11, name: "Brian Kelly", section: "Gents", phone: "07700 900111", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 12, name: "Irene Morton", section: "Ladies", phone: "07700 900112", fileName: "Member Details.pdf", fileUrl: "#" },
];

const starterOfficeBearers = [
  { id: 1, role: "President", name: "William Hart", phone: "07700 900201", fileName: "Role Note.pdf", fileUrl: "#" },
  { id: 2, role: "Secretary", name: "Elaine Morton", phone: "07700 900202", fileName: "Role Note.pdf", fileUrl: "#" },
  { id: 3, role: "Treasurer", name: "Gordon McBride", phone: "07700 900203", fileName: "Role Note.pdf", fileUrl: "#" },
  { id: 4, role: "Match Secretary", name: "Sandra Allan", phone: "07700 900204", fileName: "Role Note.pdf", fileUrl: "#" },
];

const starterCoaches = [
  { id: 1, name: "Peter Lawson", title: "Club Coach", phone: "07700 900301", fileName: "Coaching Info.pdf", fileUrl: "#" },
  { id: 2, name: "Linda Ferguson", title: "Volunteer Coach", phone: "07700 900302", fileName: "Coaching Info.pdf", fileUrl: "#" },
];

const starterDocuments = [
  { id: 1, name: "Membership Form 2026", category: "Forms", fileName: "Membership Form 2026.pdf", fileUrl: "#" },
  { id: 2, name: "Club Constitution", category: "Rules", fileName: "Club Constitution.pdf", fileUrl: "#" },
  { id: 3, name: "Competition Entry Sheet", category: "Competitions", fileName: "Competition Entry Sheet.pdf", fileUrl: "#" },
  { id: 4, name: "Fixture List", category: "Fixtures", fileName: "Fixture List.pdf", fileUrl: "#" },
];

function nextId(items) {
  return items.length ? Math.max(...items.map((item) => item.id || 0)) + 1 : 1;
}

function cardStyle(extra = {}) {
  return {
    background: COLOURS.white,
    borderRadius: 18,
    border: `1px solid ${COLOURS.border}`,
    boxShadow: COLOURS.shadow,
    ...extra,
  };
}

function Button({ children, onClick, variant = "primary" }) {
  const styles = {
    primary: { background: COLOURS.blue, color: COLOURS.white, border: "none" },
    secondary: { background: COLOURS.white, color: COLOURS.navy, border: `1px solid ${COLOURS.border}` },
    danger: { background: COLOURS.red, color: COLOURS.white, border: "none" },
    gold: { background: COLOURS.gold, color: COLOURS.navy, border: "none" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...styles[variant],
        borderRadius: 12,
        padding: "11px 16px",
        fontSize: 15,
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function FileLink({ name, url }) {
  if (!name) return null;
  return (
    <a href={url || "#"} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 800, color: COLOURS.blue, textDecoration: "none", marginTop: 10, display: "inline-block" }}>
      📎 {name}
    </a>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminSection, setAdminSection] = useState("diary");
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef(null);

  const [diaryEvents, setDiaryEvents] = useState(starterDiary);
  const [notices, setNotices] = useState(starterNotices);
  const [competitions, setCompetitions] = useState(starterCompetitions);
  const [members, setMembers] = useState(starterMembers);
  const [officeBearers, setOfficeBearers] = useState(starterOfficeBearers);
  const [coaches, setCoaches] = useState(starterCoaches);
  const [documents, setDocuments] = useState(starterDocuments);

  const [form, setForm] = useState({
    title: "", date: "", time: "", place: "", notes: "", body: "", name: "", closes: "", starts: "", section: "", phone: "", role: "", category: "", fileName: "", fileUrl: "",
  });

  const navItems = [
    ["home", "Home"], ["diary", "Diary"], ["members", "Members"], ["notices", "Noticeboard"], ["comps", "Competitions"], ["office", "Office Bearers"], ["coaches", "Coaches"], ["documents", "Documents"],
  ];
  const adminSections = [
    ["diary", "Diary"], ["notices", "Noticeboard"], ["comps", "Competitions"], ["members", "Members"], ["office", "Office Bearers"], ["coaches", "Coaches"], ["documents", "Documents"],
  ];

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q) || (m.section || "").toLowerCase().includes(q) || (m.phone || "").includes(q));
  }, [search, members]);

  function resetForm() {
    setEditingId(null);
    setForm({ title: "", date: "", time: "", place: "", notes: "", body: "", name: "", closes: "", starts: "", section: "", phone: "", role: "", category: "", fileName: "", fileUrl: "" });
    if (fileRef.current) fileRef.current.value = "";
  }

  function currentItems() {
    switch (adminSection) {
      case "diary": return diaryEvents;
      case "notices": return notices;
      case "comps": return competitions;
      case "members": return members;
      case "office": return officeBearers;
      case "coaches": return coaches;
      case "documents": return documents;
      default: return [];
    }
  }

  function setCurrentItems(newItems) {
    switch (adminSection) {
      case "diary": setDiaryEvents(newItems); break;
      case "notices": setNotices(newItems); break;
      case "comps": setCompetitions(newItems); break;
      case "members": setMembers(newItems); break;
      case "office": setOfficeBearers(newItems); break;
      case "coaches": setCoaches(newItems); break;
      case "documents": setDocuments(newItems); break;
      default: break;
    }
  }

  function handleAdminLogin() {
    if (pinInput === ADMIN_PIN) {
      setIsAdmin(true);
      setAdminMessage("Admin access granted.");
      setPinInput("");
    } else {
      setAdminMessage("Incorrect PIN.");
    }
  }

  function handleLogout() {
    setIsAdmin(false);
    setAdminMessage("Logged out.");
    resetForm();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, fileName: file.name, fileUrl: URL.createObjectURL(file) }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "", date: item.date || "", time: item.time || "", place: item.place || "", notes: item.notes || "", body: item.body || "", name: item.name || "", closes: item.closes || "", starts: item.starts || "", section: item.section || "", phone: item.phone || "", role: item.role || "", category: item.category || "", fileName: item.fileName || "", fileUrl: item.fileUrl || "",
    });
  }

  function buildItemFromForm(id) {
    if (adminSection === "diary") return { id, title: form.title, date: form.date, time: form.time, place: form.place, notes: form.notes, fileName: form.fileName, fileUrl: form.fileUrl };
    if (adminSection === "notices") return { id, title: form.title, body: form.body, date: form.date, fileName: form.fileName, fileUrl: form.fileUrl };
    if (adminSection === "comps") return { id, name: form.name, closes: form.closes, starts: form.starts, notes: form.notes, fileName: form.fileName, fileUrl: form.fileUrl };
    if (adminSection === "members") return { id, name: form.name, section: form.section, phone: form.phone, fileName: form.fileName, fileUrl: form.fileUrl };
    if (adminSection === "office") return { id, role: form.role, name: form.name, phone: form.phone, fileName: form.fileName, fileUrl: form.fileUrl };
    if (adminSection === "coaches") return { id, title: form.title, name: form.name, phone: form.phone, fileName: form.fileName, fileUrl: form.fileUrl };
    return { id, name: form.name, category: form.category, fileName: form.fileName, fileUrl: form.fileUrl };
  }

  function saveItem() {
    const items = currentItems();
    const itemId = editingId || nextId(items);
    const newItem = buildItemFromForm(itemId);
    const updated = editingId ? items.map((item) => (item.id === editingId ? newItem : item)) : [newItem, ...items];
    setCurrentItems(updated);
    setAdminMessage(editingId ? "Item updated." : "Item added.");
    resetForm();
  }

  function deleteItem(id) {
    setCurrentItems(currentItems().filter((item) => item.id !== id));
    if (editingId === id) resetForm();
    setAdminMessage("Item removed.");
  }

  function renderAdminFields() {
    const inputStyle = { width: "100%", padding: "12px 14px", fontSize: 15, borderRadius: 12, border: `1px solid ${COLOURS.border}`, boxSizing: "border-box", marginBottom: 12 };
    const textAreaStyle = { ...inputStyle, minHeight: 90, resize: "vertical" };
    if (adminSection === "diary") return <><input style={inputStyle} placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><input style={inputStyle} placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><input style={inputStyle} placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /><input style={inputStyle} placeholder="Venue or place" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} /><textarea style={textAreaStyle} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></>;
    if (adminSection === "notices") return <><input style={inputStyle} placeholder="Notice title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><input style={inputStyle} placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /><textarea style={textAreaStyle} placeholder="Notice body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></>;
    if (adminSection === "comps") return <><input style={inputStyle} placeholder="Competition name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input style={inputStyle} placeholder="Entry closing date" value={form.closes} onChange={(e) => setForm({ ...form, closes: e.target.value })} /><input style={inputStyle} placeholder="Start date" value={form.starts} onChange={(e) => setForm({ ...form, starts: e.target.value })} /><textarea style={textAreaStyle} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></>;
    if (adminSection === "members") return <><input style={inputStyle} placeholder="Member name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input style={inputStyle} placeholder="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} /><input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></>;
    if (adminSection === "office") return <><input style={inputStyle} placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /><input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></>;
    if (adminSection === "coaches") return <><input style={inputStyle} placeholder="Coach title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /><input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></>;
    return <><input style={inputStyle} placeholder="Document name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input style={inputStyle} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></>;
  }

  function renderAdminList() {
    return (
      <div style={{ display: "grid", gap: 10, maxHeight: 380, overflowY: "auto", paddingRight: 4 }}>
        {currentItems().map((item) => {
          const title = item.title || item.name || item.role || "Item";
          const sub = item.date || item.section || item.category || item.phone || item.closes || item.title || "";
          return (
            <div key={item.id} style={cardStyle({ padding: 14, boxShadow: "none" })}>
              <div style={{ fontSize: 15, fontWeight: 900, color: COLOURS.navy }}>{title}</div>
              <div style={{ fontSize: 13, color: COLOURS.muted, marginTop: 4 }}>{sub}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <Button variant="secondary" onClick={() => startEdit(item)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: COLOURS.page, minHeight: "100vh", color: COLOURS.text }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: 18 }}>
        <div style={cardStyle({ overflow: "hidden", marginBottom: 18, borderRadius: 24 })}>
          <div style={{ background: `linear-gradient(135deg, ${COLOURS.navy} 0%, ${COLOURS.blue} 100%)`, color: COLOURS.white, padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "90px 1fr auto", gap: 18, alignItems: "center" }}>
              <div style={{ width: 82, height: 82, borderRadius: "50%", background: COLOURS.red, border: `4px solid ${COLOURS.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900 }}>RB</div>
              <div>
                <div style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.05 }}>{CLUB_NAME}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{CLUB_SUBTITLE}</div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
                <div style={{ ...cardStyle({ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "none", padding: 14, minWidth: 170 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.9 }}>NEXT EVENT</div>
                  <div style={{ fontSize: 20, fontWeight: 900, marginTop: 6 }}>Opening Day</div>
                  <div style={{ fontSize: 14, marginTop: 6 }}>Sat 2 May • 2:00 pm</div>
                </div>
                <div style={{ ...cardStyle({ background: COLOURS.red, border: "none", boxShadow: "none", padding: 14, minWidth: 150 }) }}>
                  <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.95 }}>MEMBERS</div>
                  <div style={{ fontSize: 24, fontWeight: 900, marginTop: 6 }}>{members.length}</div>
                  <div style={{ fontSize: 14, marginTop: 6 }}>Always welcoming</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: COLOURS.white, borderTop: `1px solid ${COLOURS.border}`, padding: 14, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {navItems.map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)} style={{ background: tab === key ? COLOURS.navy : COLOURS.panel, color: tab === key ? COLOURS.white : COLOURS.navy, border: `1px solid ${tab === key ? COLOURS.navy : COLOURS.border}`, borderRadius: 12, padding: "11px 15px", fontSize: 15, fontWeight: 900, cursor: "pointer" }}>{label}</button>
              ))}
            </div>
            <Button variant="gold" onClick={() => setIsAdminOpen(true)}>Admin</Button>
          </div>
        </div>

        {tab === "home" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 18 }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={cardStyle({ padding: 24 })}>
                <div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 12 }}>Welcome to {CLUB_NAME}</div>
                <div style={{ fontSize: 18, lineHeight: 1.6, color: COLOURS.text }}>A clean demonstration app with fictitious names, diary items, notices, competitions and documents. This version uses a more formal club layout with no artificial middle graphic.</div>
                <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                  <Button onClick={() => setTab("diary")}>View Diary</Button>
                  <Button variant="secondary" onClick={() => setTab("documents")}>View Documents</Button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div style={cardStyle({ padding: 22 })}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy, marginBottom: 14 }}>Upcoming Events</div>
                  {diaryEvents.slice(0, 3).map((item) => (
                    <div key={item.id} style={{ padding: "12px 0", borderBottom: `1px solid ${COLOURS.border}` }}>
                      <div style={{ fontSize: 18, fontWeight: 900 }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: COLOURS.muted, marginTop: 6 }}>{item.date} • {item.time}</div>
                      <div style={{ fontSize: 15, marginTop: 6 }}>{item.place}</div>
                    </div>
                  ))}
                </div>

                <div style={cardStyle({ padding: 22 })}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy, marginBottom: 14 }}>Club Information</div>
                  {[["Established", "1984"], ["Affiliation", "County Bowling Association"], ["Green Type", "Grass"], ["Colours", "Blue, red and gold"], ["Address", "123 Green Lane, Rockview"], ["Phone", "01234 567890"]].map(([label, value]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLOURS.border}` }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: COLOURS.navy }}>{label}</div>
                      <div style={{ fontSize: 15 }}>{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              <div style={cardStyle({ padding: 22 })}>
                <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy, marginBottom: 14 }}>Latest Notices</div>
                {notices.map((item) => (
                  <div key={item.id} style={{ padding: "12px 0", borderBottom: `1px solid ${COLOURS.border}` }}>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: COLOURS.muted, marginTop: 6 }}>{item.date}</div>
                    <div style={{ fontSize: 15, marginTop: 8 }}>{item.body}</div>
                  </div>
                ))}
              </div>

              <div style={cardStyle({ padding: 22 })}>
                <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy, marginBottom: 14 }}>Open Competitions</div>
                {competitions.map((item) => (
                  <div key={item.id} style={{ padding: "12px 0", borderBottom: `1px solid ${COLOURS.border}` }}>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>{item.name}</div>
                    <div style={{ fontSize: 15, marginTop: 6 }}>Entry closes {item.closes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "diary" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Diary</div>{diaryEvents.map((item) => <div key={item.id} style={{ padding: 18, border: `1px solid ${COLOURS.border}`, borderRadius: 14, marginBottom: 14, background: COLOURS.panel }}><div style={{ fontSize: 22, fontWeight: 900 }}>{item.title}</div><div style={{ fontSize: 15, color: COLOURS.muted, marginTop: 8 }}>{item.date} • {item.time}</div><div style={{ fontSize: 15, marginTop: 8 }}>{item.place}</div><div style={{ fontSize: 15, marginTop: 8 }}>{item.notes}</div><FileLink name={item.fileName} url={item.fileUrl} /></div>)}</div>}

        {tab === "members" && <div style={cardStyle({ padding: 24 })}><div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy }}>Members</div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members" style={{ padding: "11px 14px", fontSize: 15, borderRadius: 12, border: `1px solid ${COLOURS.border}`, minWidth: 260 }} /></div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>{filteredMembers.map((member) => <div key={member.id} style={cardStyle({ padding: 18, background: COLOURS.panel })}><div style={{ fontSize: 18, fontWeight: 900 }}>{member.name}</div><div style={{ fontSize: 14, color: COLOURS.red, fontWeight: 800, marginTop: 6 }}>{member.section}</div><div style={{ fontSize: 15, marginTop: 8 }}>{member.phone}</div><FileLink name={member.fileName} url={member.fileUrl} /></div>)}</div></div>}

        {tab === "notices" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Noticeboard</div>{notices.map((item) => <div key={item.id} style={{ padding: 18, border: `1px solid ${COLOURS.border}`, borderRadius: 14, marginBottom: 14, background: COLOURS.panel }}><div style={{ fontSize: 22, fontWeight: 900 }}>{item.title}</div><div style={{ fontSize: 14, color: COLOURS.muted, marginTop: 8 }}>{item.date}</div><div style={{ fontSize: 15, marginTop: 8 }}>{item.body}</div><FileLink name={item.fileName} url={item.fileUrl} /></div>)}</div>}

        {tab === "comps" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Competitions</div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>{competitions.map((item) => <div key={item.id} style={cardStyle({ padding: 18, background: COLOURS.panel })}><div style={{ fontSize: 20, fontWeight: 900 }}>{item.name}</div><div style={{ fontSize: 15, marginTop: 8 }}>Entry closes: {item.closes}</div><div style={{ fontSize: 15, marginTop: 6 }}>Starts: {item.starts}</div><div style={{ fontSize: 15, marginTop: 8 }}>{item.notes}</div><FileLink name={item.fileName} url={item.fileUrl} /></div>)}</div></div>}

        {tab === "office" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Office Bearers</div><div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>{officeBearers.map((person) => <div key={person.id} style={cardStyle({ padding: 18, background: COLOURS.panel })}><div style={{ fontSize: 14, color: COLOURS.red, fontWeight: 800 }}>{person.role}</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{person.name}</div><div style={{ fontSize: 15, marginTop: 8 }}>{person.phone}</div><FileLink name={person.fileName} url={person.fileUrl} /></div>)}</div></div>}

        {tab === "coaches" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Coaches</div><div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>{coaches.map((coach) => <div key={coach.id} style={cardStyle({ padding: 18, background: COLOURS.panel })}><div style={{ fontSize: 14, color: COLOURS.red, fontWeight: 800 }}>{coach.title}</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{coach.name}</div><div style={{ fontSize: 15, marginTop: 8 }}>{coach.phone}</div><FileLink name={coach.fileName} url={coach.fileUrl} /></div>)}</div></div>}

        {tab === "documents" && <div style={cardStyle({ padding: 24 })}><div style={{ fontSize: 30, fontWeight: 900, color: COLOURS.navy, marginBottom: 18 }}>Documents</div><div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>{documents.map((doc) => <div key={doc.id} style={cardStyle({ padding: 18, background: COLOURS.panel })}><div style={{ display: "inline-block", padding: "6px 10px", borderRadius: 999, background: "#e7eefb", color: COLOURS.blue, fontSize: 13, fontWeight: 800 }}>{doc.category}</div><div style={{ fontSize: 22, fontWeight: 900, marginTop: 10 }}>{doc.name}</div><FileLink name={doc.fileName} url={doc.fileUrl} /></div>)}</div></div>}

        <div style={{ marginTop: 18, background: COLOURS.red, color: COLOURS.white, padding: "16px 22px", textAlign: "center", fontWeight: 900, fontSize: 24, borderRadius: 16 }}>Visitors and New Members Always Welcome</div>
      </div>

      {isAdminOpen && (
        <div onClick={() => setIsAdminOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", justifyContent: "center", alignItems: "center", padding: 20, zIndex: 1000 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1160px, 100%)", maxHeight: "92vh", overflow: "auto", ...cardStyle({ borderRadius: 24 }) }}>
            <div style={{ background: COLOURS.navy, color: COLOURS.white, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div><div style={{ fontSize: 28, fontWeight: 900 }}>Admin Panel</div><div style={{ fontSize: 15, marginTop: 6, opacity: 0.95 }}>Add, edit or remove items and attach files.</div></div>
              <Button variant="secondary" onClick={() => setIsAdminOpen(false)}>Close</Button>
            </div>

            {!isAdmin ? (
              <div style={{ padding: 24 }}>
                <div style={{ maxWidth: 420 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>Enter admin PIN</div>
                  <input type="password" value={pinInput} onChange={(e) => setPinInput(e.target.value)} placeholder="PIN" style={{ width: "100%", padding: "14px 16px", fontSize: 17, borderRadius: 12, border: `1px solid ${COLOURS.border}`, boxSizing: "border-box" }} />
                  <div style={{ marginTop: 12 }}><Button onClick={handleAdminLogin}>Log in</Button></div>
                  {adminMessage ? <div style={{ marginTop: 12, fontSize: 14, fontWeight: 800, color: COLOURS.red }}>{adminMessage}</div> : null}
                </div>
              </div>
            ) : (
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {adminSections.map(([key, label]) => (
                      <button key={key} onClick={() => { setAdminSection(key); resetForm(); }} style={{ background: adminSection === key ? COLOURS.navy : COLOURS.panel, color: adminSection === key ? COLOURS.white : COLOURS.navy, border: `1px solid ${adminSection === key ? COLOURS.navy : COLOURS.border}`, borderRadius: 12, padding: "10px 14px", fontSize: 14, fontWeight: 900, cursor: "pointer" }}>{label}</button>
                    ))}
                  </div>
                  <Button variant="danger" onClick={handleLogout}>Log out</Button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 20 }}>
                  <div style={cardStyle({ padding: 20, background: COLOURS.panel })}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: COLOURS.navy, marginBottom: 16 }}>{editingId ? "Edit item" : "Add new item"}</div>
                    {renderAdminFields()}
                    <div style={{ marginBottom: 10 }}><input ref={fileRef} type="file" onChange={handleFileChange} style={{ fontSize: 14 }} /></div>
                    {form.fileName ? <div style={{ fontSize: 13, fontWeight: 800, color: COLOURS.blue, marginBottom: 12 }}>Attached file: {form.fileName}</div> : null}
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <Button onClick={saveItem}>{editingId ? "Update item" : "Add item"}</Button>
                      <Button variant="secondary" onClick={resetForm}>Clear form</Button>
                    </div>
                    {adminMessage ? <div style={{ marginTop: 14, fontSize: 13, fontWeight: 800, color: COLOURS.red }}>{adminMessage}</div> : null}
                  </div>
                  <div style={cardStyle({ padding: 20 })}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: COLOURS.navy, marginBottom: 16 }}>Current items</div>
                    {renderAdminList()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
