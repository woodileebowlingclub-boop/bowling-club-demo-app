import React, { useMemo, useRef, useState } from "react";

const CLUB_NAME = "Rockview Bowling Club";
const CLUB_SUBTITLE = "Friendship • Sport • Community";
const ADMIN_PIN = "1954";

const COLOURS = {
  navy: "#10306f",
  royal: "#2050c7",
  teal: "#0d7c8e",
  gold: "#f2c94c",
  cream: "#f7f4ec",
  white: "#ffffff",
  red: "#cf202f",
  text: "#1b2430",
  soft: "#edf3ff",
  border: "#d5def0",
  shadow: "0 10px 30px rgba(16, 48, 111, 0.10)",
  muted: "#667085",
};

const starterDiary = [
  {
    id: 1,
    title: "Opening Day",
    date: "Saturday 2 May 2026",
    time: "2:00 pm",
    place: "Main Green",
    notes: "Members, guests and visitors welcome. Tea and sandwiches in the clubhouse afterwards.",
    fileName: "Opening Day Poster.pdf",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Tuesday Practice Evening",
    date: "Tuesday 5 May 2026",
    time: "6:30 pm",
    place: "Club Green",
    notes: "Friendly roll-up for all sections. New bowlers welcome.",
    fileName: "Practice Evening Notes.docx",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "Committee Meeting",
    date: "Wednesday 13 May 2026",
    time: "7:00 pm",
    place: "Clubhouse Lounge",
    notes: "Office bearers and committee members only.",
    fileName: "Agenda.pdf",
    fileUrl: "#",
  },
  {
    id: 4,
    title: "Ladies Friendly v Meadowbank",
    date: "Sunday 17 May 2026",
    time: "2:00 pm",
    place: "Away Match",
    notes: "Transport leaves club at 1:00 pm.",
    fileName: "Team Sheet.pdf",
    fileUrl: "#",
  },
];

const starterNotices = [
  {
    id: 1,
    title: "Membership Now Open",
    body: "New members are welcome for the 2026 season. Beginners are encouraged to come along and try bowls.",
    date: "20 April 2026",
    fileName: "Membership Form 2026.pdf",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Green Maintenance",
    body: "The green will be closed every Monday morning for cutting and seasonal maintenance until 1:00 pm.",
    date: "18 April 2026",
    fileName: "Maintenance Schedule.pdf",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "Volunteers Required",
    body: "Helpers needed for teas, raffle sales and match-day setup throughout the season.",
    date: "15 April 2026",
    fileName: "Volunteer Rota.xlsx",
    fileUrl: "#",
  },
];

const starterCompetitions = [
  {
    id: 1,
    name: "Club Singles Championship",
    closes: "31 May 2026",
    starts: "6 June 2026",
    notes: "Open to all full members. Draw will be displayed in the clubhouse and app.",
    fileName: "Singles Entry Form.pdf",
    fileUrl: "#",
  },
  {
    id: 2,
    name: "Pairs Knockout",
    closes: "14 June 2026",
    starts: "20 June 2026",
    notes: "Choose your own partner. First round to be completed within two weeks.",
    fileName: "Pairs Rules.pdf",
    fileUrl: "#",
  },
  {
    id: 3,
    name: "Mixed Triples Day",
    closes: "1 July 2026",
    starts: "11 July 2026",
    notes: "One-day friendly competition with lunch included.",
    fileName: "Triples Poster.jpg",
    fileUrl: "#",
  },
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
  { id: 13, name: "Colin Paterson", section: "Gents", phone: "07700 900113", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 14, name: "Anne McGill", section: "Ladies", phone: "07700 900114", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 15, name: "Thomas Reid", section: "Associate", phone: "07700 900115", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 16, name: "Sharon Douglas", section: "Ladies", phone: "07700 900116", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 17, name: "Michael Connell", section: "Gents", phone: "07700 900117", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 18, name: "Sandra White", section: "Ladies", phone: "07700 900118", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 19, name: "Graham Boyd", section: "Gents", phone: "07700 900119", fileName: "Member Details.pdf", fileUrl: "#" },
  { id: 20, name: "Linda Ferguson", section: "Associate", phone: "07700 900120", fileName: "Member Details.pdf", fileUrl: "#" },
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
    borderRadius: 20,
    border: `1px solid ${COLOURS.border}`,
    boxShadow: COLOURS.shadow,
    ...extra,
  };
}

function SectionTitle({ children, colour = COLOURS.navy, right }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
        flexWrap: "wrap",
      }}
    >
      <h2
        style={{
          color: colour,
          fontSize: 34,
          fontWeight: 900,
          margin: 0,
          letterSpacing: 0.2,
        }}
      >
        {children}
      </h2>
      {right}
    </div>
  );
}

function StatCard({ title, value, sub, bg }) {
  return (
    <div
      style={cardStyle({
        background: bg,
        color: COLOURS.white,
        padding: 18,
        minHeight: 122,
      })}
    >
      <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10, letterSpacing: 0.5 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 17, fontWeight: 700, marginTop: 8 }}>{sub}</div>
    </div>
  );
}

function TopButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 18px",
        fontSize: 18,
        fontWeight: 900,
        background: active ? COLOURS.red : COLOURS.white,
        color: active ? COLOURS.white : COLOURS.navy,
        border: "none",
        borderRadius: 14,
        cursor: "pointer",
        boxShadow: active ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function ActionButton({ children, onClick, secondary = false, danger = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: danger ? COLOURS.red : secondary ? COLOURS.white : COLOURS.royal,
        color: danger ? COLOURS.white : secondary ? COLOURS.navy : COLOURS.white,
        border: secondary ? `1px solid ${COLOURS.border}` : "none",
        borderRadius: 12,
        padding: "12px 16px",
        fontSize: 16,
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
    <a
      href={url || "#"}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-block",
        marginTop: 12,
        fontSize: 15,
        fontWeight: 800,
        color: COLOURS.royal,
        textDecoration: "none",
      }}
    >
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
    title: "",
    date: "",
    time: "",
    place: "",
    notes: "",
    body: "",
    name: "",
    closes: "",
    starts: "",
    section: "",
    phone: "",
    role: "",
    category: "",
    fileName: "",
    fileUrl: "",
  });

  const navItems = [
    ["home", "🏠 Home"],
    ["diary", "📅 Diary"],
    ["members", "👥 Members"],
    ["notices", "📢 Noticeboard"],
    ["comps", "🏆 Competitions"],
    ["office", "🧾 Office Bearers"],
    ["coaches", "🎯 Coaches"],
    ["documents", "📄 Documents"],
  ];

  const adminSections = [
    ["diary", "Diary"],
    ["notices", "Noticeboard"],
    ["comps", "Competitions"],
    ["members", "Members"],
    ["office", "Office Bearers"],
    ["coaches", "Coaches"],
    ["documents", "Documents"],
  ];

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.section || "").toLowerCase().includes(q) ||
        (m.phone || "").includes(q)
    );
  }, [search, members]);

  const summaryCounts = {
    members: members.length,
    events: diaryEvents.length,
    notices: notices.length,
    docs: documents.length,
  };

  function resetForm() {
    setEditingId(null);
    setForm({
      title: "",
      date: "",
      time: "",
      place: "",
      notes: "",
      body: "",
      name: "",
      closes: "",
      starts: "",
      section: "",
      phone: "",
      role: "",
      category: "",
      fileName: "",
      fileUrl: "",
    });
    if (fileRef.current) fileRef.current.value = "";
  }

  function currentItems() {
    switch (adminSection) {
      case "diary":
        return diaryEvents;
      case "notices":
        return notices;
      case "comps":
        return competitions;
      case "members":
        return members;
      case "office":
        return officeBearers;
      case "coaches":
        return coaches;
      case "documents":
        return documents;
      default:
        return [];
    }
  }

  function setCurrentItems(newItems) {
    switch (adminSection) {
      case "diary":
        setDiaryEvents(newItems);
        break;
      case "notices":
        setNotices(newItems);
        break;
      case "comps":
        setCompetitions(newItems);
        break;
      case "members":
        setMembers(newItems);
        break;
      case "office":
        setOfficeBearers(newItems);
        break;
      case "coaches":
        setCoaches(newItems);
        break;
      case "documents":
        setDocuments(newItems);
        break;
      default:
        break;
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
    setForm((prev) => ({
      ...prev,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
    }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      date: item.date || "",
      time: item.time || "",
      place: item.place || "",
      notes: item.notes || "",
      body: item.body || "",
      name: item.name || "",
      closes: item.closes || "",
      starts: item.starts || "",
      section: item.section || "",
      phone: item.phone || "",
      role: item.role || "",
      category: item.category || "",
      fileName: item.fileName || "",
      fileUrl: item.fileUrl || "",
    });
  }

  function buildItemFromForm(id) {
    if (adminSection === "diary") {
      return {
        id,
        title: form.title,
        date: form.date,
        time: form.time,
        place: form.place,
        notes: form.notes,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    if (adminSection === "notices") {
      return {
        id,
        title: form.title,
        body: form.body,
        date: form.date,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    if (adminSection === "comps") {
      return {
        id,
        name: form.name,
        closes: form.closes,
        starts: form.starts,
        notes: form.notes,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    if (adminSection === "members") {
      return {
        id,
        name: form.name,
        section: form.section,
        phone: form.phone,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    if (adminSection === "office") {
      return {
        id,
        role: form.role,
        name: form.name,
        phone: form.phone,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    if (adminSection === "coaches") {
      return {
        id,
        title: form.title,
        name: form.name,
        phone: form.phone,
        fileName: form.fileName,
        fileUrl: form.fileUrl,
      };
    }
    return {
      id,
      name: form.name,
      category: form.category,
      fileName: form.fileName,
      fileUrl: form.fileUrl,
    };
  }

  function saveItem() {
    const items = currentItems();
    const itemId = editingId || nextId(items);
    const newItem = buildItemFromForm(itemId);

    let updated;
    if (editingId) {
      updated = items.map((item) => (item.id === editingId ? newItem : item));
      setAdminMessage("Item updated.");
    } else {
      updated = [newItem, ...items];
      setAdminMessage("Item added.");
    }
    setCurrentItems(updated);
    resetForm();
  }

  function deleteItem(id) {
    const items = currentItems().filter((item) => item.id !== id);
    setCurrentItems(items);
    if (editingId === id) resetForm();
    setAdminMessage("Item removed.");
  }

  function renderAdminFields() {
    const inputStyle = {
      width: "100%",
      padding: "12px 14px",
      fontSize: 16,
      borderRadius: 12,
      border: `1px solid ${COLOURS.border}`,
      boxSizing: "border-box",
      marginBottom: 12,
    };

    const textAreaStyle = {
      ...inputStyle,
      minHeight: 92,
      resize: "vertical",
    };

    if (adminSection === "diary") {
      return (
        <>
          <input style={inputStyle} placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={inputStyle} placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input style={inputStyle} placeholder="Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <input style={inputStyle} placeholder="Venue or place" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} />
          <textarea style={textAreaStyle} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </>
      );
    }
    if (adminSection === "notices") {
      return (
        <>
          <input style={inputStyle} placeholder="Notice title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={inputStyle} placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <textarea style={textAreaStyle} placeholder="Notice body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        </>
      );
    }
    if (adminSection === "comps") {
      return (
        <>
          <input style={inputStyle} placeholder="Competition name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Entry closing date" value={form.closes} onChange={(e) => setForm({ ...form, closes: e.target.value })} />
          <input style={inputStyle} placeholder="Start date" value={form.starts} onChange={(e) => setForm({ ...form, starts: e.target.value })} />
          <textarea style={textAreaStyle} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        </>
      );
    }
    if (adminSection === "members") {
      return (
        <>
          <input style={inputStyle} placeholder="Member name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} />
          <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </>
      );
    }
    if (adminSection === "office") {
      return (
        <>
          <input style={inputStyle} placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </>
      );
    }
    if (adminSection === "coaches") {
      return (
        <>
          <input style={inputStyle} placeholder="Coach title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </>
      );
    }
    return (
      <>
        <input style={inputStyle} placeholder="Document name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input style={inputStyle} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
      </>
    );
  }

  function renderAdminList() {
    const items = currentItems();
    return (
      <div style={{ display: "grid", gap: 10, maxHeight: 380, overflowY: "auto", paddingRight: 4 }}>
        {items.map((item) => {
          const title = item.title || item.name || item.role || "Item";
          const sub = item.date || item.section || item.category || item.phone || item.closes || item.title || "";
          return (
            <div key={item.id} style={cardStyle({ padding: 14, boxShadow: "none" })}>
              <div style={{ fontSize: 16, fontWeight: 900, color: COLOURS.navy }}>{title}</div>
              <div style={{ fontSize: 14, color: COLOURS.muted, marginTop: 4 }}>{sub}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                <ActionButton secondary onClick={() => startEdit(item)}>Edit</ActionButton>
                <ActionButton danger onClick={() => deleteItem(item.id)}>Delete</ActionButton>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: `linear-gradient(180deg, ${COLOURS.cream} 0%, #eef3fb 100%)`,
        minHeight: "100vh",
        color: COLOURS.text,
      }}
    >
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: 18 }}>
        <div style={cardStyle({ overflow: "hidden", marginBottom: 18, borderRadius: 24 })}>
          <div
            style={{
              background: `linear-gradient(135deg, ${COLOURS.navy} 0%, ${COLOURS.royal} 62%, ${COLOURS.teal} 100%)`,
              color: COLOURS.white,
              padding: 24,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "110px minmax(0, 1fr) 200px 200px",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  background: COLOURS.red,
                  border: `5px solid ${COLOURS.gold}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 900,
                  color: COLOURS.white,
                  boxSizing: "border-box",
                }}
              >
                RB
              </div>

              <div>
                <div style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.03 }}>{CLUB_NAME}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.gold, marginTop: 8 }}>{CLUB_SUBTITLE}</div>
                <div style={{ fontSize: 19, fontWeight: 700, marginTop: 10, opacity: 0.96 }}>
                  Demo club app with editable sections, admin controls and file attachments.
                </div>
              </div>

              <StatCard title="📅 NEXT EVENT" value="Opening Day" sub="Sat 2 May • 2:00 PM" bg={COLOURS.red} />
              <StatCard title="👥 MEMBERS" value={String(summaryCounts.members)} sub="New members always welcome" bg={COLOURS.royal} />
            </div>
          </div>

          <div
            style={{
              background: COLOURS.royal,
              padding: 14,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {navItems.map(([key, label]) => (
                <TopButton key={key} active={tab === key} onClick={() => setTab(key)}>
                  {label}
                </TopButton>
              ))}
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              style={{
                background: COLOURS.gold,
                color: COLOURS.navy,
                border: "none",
                borderRadius: 14,
                padding: "13px 18px",
                fontSize: 18,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              ⚙️ Admin
            </button>
          </div>
        </div>

        <div style={{ paddingBottom: 20 }}>
          {tab === "home" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1.25fr 0.95fr", gap: 18, marginBottom: 18 }}>
                <div style={cardStyle({ background: COLOURS.navy, color: COLOURS.white, padding: 24, minHeight: 330 })}>
                  <SectionTitle colour={COLOURS.white}>⭐ Welcome to Rockview Bowling Club</SectionTitle>
                  <p style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.5, marginTop: 0 }}>
                    The empty space is gone now because the home page has been rebuilt into balanced cards that fill the row properly.
                  </p>
                  <p style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.5 }}>
                    This version looks more professional, keeps the club feel, and adds a working admin panel where sections can be edited, added or removed.
                  </p>
                  <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
                    <ActionButton onClick={() => setTab("members")}>Join Us</ActionButton>
                    <ActionButton secondary onClick={() => setTab("documents")}>View Documents</ActionButton>
                  </div>
                </div>

                <div
                  style={cardStyle({
                    minHeight: 330,
                    overflow: "hidden",
                    background: "linear-gradient(180deg, #9bd1ff 0%, #dff3ff 34%, #7fc67d 35%, #86c97c 62%, #6eaf69 100%)",
                    position: "relative",
                  })}
                >
                  <div style={{ position: "absolute", inset: 0, padding: 22, boxSizing: "border-box" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ width: 190, height: 104, background: "#b8a48e", borderRadius: 12 }} />
                      <div style={{ width: 245, height: 94, background: "#41464b", borderRadius: 12 }} />
                    </div>
                    <div style={{ position: "absolute", left: 34, right: 34, bottom: 42, height: 160, borderRadius: 150, background: "linear-gradient(180deg, #9ddf72 0%, #7bc85d 100%)", border: "6px solid #dcf2d6" }} />
                    <div style={{ position: "absolute", right: 28, bottom: 18, width: 122, height: 54, borderRadius: 10, background: "#914f39" }} />
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18, minHeight: 330 }}>
                  <div style={cardStyle({ padding: 0, overflow: "hidden" })}>
                    <div style={{ background: COLOURS.red, color: COLOURS.white, padding: "14px 18px", fontSize: 26, fontWeight: 900 }}>📢 Club News</div>
                    <div style={{ padding: 18 }}>
                      {notices.slice(0, 3).map((item) => (
                        <div key={item.id} style={{ borderBottom: `1px solid ${COLOURS.border}`, paddingBottom: 12, marginBottom: 12 }}>
                          <div style={{ fontSize: 21, fontWeight: 900 }}>{item.title}</div>
                          <div style={{ fontSize: 17, marginTop: 6 }}>{item.body}</div>
                        </div>
                      ))}
                      <ActionButton onClick={() => setTab("notices")}>View All News</ActionButton>
                    </div>
                  </div>

                  <div style={cardStyle({ padding: 18 })}>
                    <div style={{ fontSize: 25, fontWeight: 900, color: COLOURS.royal, marginBottom: 14 }}>📊 Quick Totals</div>
                    <div style={{ display: "grid", gap: 12 }}>
                      <div style={{ fontSize: 19, fontWeight: 800 }}>Events: {summaryCounts.events}</div>
                      <div style={{ fontSize: 19, fontWeight: 800 }}>Notices: {summaryCounts.notices}</div>
                      <div style={{ fontSize: 19, fontWeight: 800 }}>Documents: {summaryCounts.docs}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.9fr", gap: 18 }}>
                <div style={cardStyle({ padding: 24 })}>
                  <SectionTitle colour={COLOURS.royal}>📅 Upcoming Events</SectionTitle>
                  {diaryEvents.slice(0, 3).map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "86px 1fr auto",
                        gap: 16,
                        alignItems: "center",
                        borderBottom: `1px solid ${COLOURS.border}`,
                        paddingBottom: 16,
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${COLOURS.border}`, textAlign: "center", fontWeight: 900 }}>
                        <div style={{ background: COLOURS.red, color: COLOURS.white, padding: "6px 0", fontSize: 15 }}>MAY</div>
                        <div style={{ background: COLOURS.white, color: COLOURS.text, padding: "10px 0", fontSize: 30 }}>{String(idx + 2).padStart(2, "0")}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                        <div style={{ fontSize: 18, marginTop: 6 }}>{item.place}</div>
                      </div>
                      <div style={{ fontSize: 21, fontWeight: 800 }}>{item.time}</div>
                    </div>
                  ))}
                  <ActionButton onClick={() => setTab("diary")}>View Full Diary</ActionButton>
                </div>

                <div style={cardStyle({ padding: 24 })}>
                  <SectionTitle colour={COLOURS.royal}>ℹ️ Club Information</SectionTitle>
                  {[
                    ["Established", "1984"],
                    ["Affiliation", "County Bowling Association"],
                    ["Green Type", "Grass"],
                    ["Club Colours", "Navy, Royal Blue, Red and Gold"],
                    ["Address", "123 Green Lane, Rockview"],
                    ["Phone", "01234 567890"],
                    ["Email", "info@rockviewbc.co.uk"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, padding: "11px 0", borderBottom: `1px solid ${COLOURS.border}` }}>
                      <div style={{ fontSize: 19, fontWeight: 800, color: COLOURS.navy }}>{label}:</div>
                      <div style={{ fontSize: 19 }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div style={cardStyle({ padding: 0, overflow: "hidden" })}>
                    <div style={{ background: COLOURS.royal, color: COLOURS.white, padding: "14px 18px", fontSize: 26, fontWeight: 900 }}>🏆 Competitions</div>
                    <div style={{ padding: 18 }}>
                      {competitions.map((item) => (
                        <div key={item.id} style={{ borderBottom: `1px solid ${COLOURS.border}`, paddingBottom: 12, marginBottom: 12 }}>
                          <div style={{ fontSize: 21, fontWeight: 900 }}>{item.name}</div>
                          <div style={{ fontSize: 17, marginTop: 6 }}>Entry closes {item.closes}</div>
                        </div>
                      ))}
                      <ActionButton onClick={() => setTab("comps")}>View All Competitions</ActionButton>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === "diary" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>📅 Diary</SectionTitle>
              {diaryEvents.map((item) => (
                <div key={item.id} style={{ background: COLOURS.white, border: `1px solid ${COLOURS.border}`, borderLeft: `8px solid ${COLOURS.royal}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: COLOURS.red, marginTop: 8 }}>{item.date} • {item.time}</div>
                  <div style={{ fontSize: 19, marginTop: 8 }}><b>Venue:</b> {item.place}</div>
                  <div style={{ fontSize: 19, marginTop: 8 }}>{item.notes}</div>
                  <FileLink name={item.fileName} url={item.fileUrl} />
                </div>
              ))}
            </div>
          )}

          {tab === "members" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle
                right={<div style={{ fontSize: 18, fontWeight: 800, color: COLOURS.muted }}>{filteredMembers.length} members shown</div>}
              >
                👥 Members
              </SectionTitle>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members by name, section or phone"
                style={{ width: "100%", padding: "16px 18px", fontSize: 20, borderRadius: 12, border: `2px solid ${COLOURS.border}`, marginBottom: 20, boxSizing: "border-box" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {filteredMembers.map((member) => (
                  <div key={member.id} style={cardStyle({ padding: 18, background: COLOURS.soft })}>
                    <div style={{ fontSize: 23, fontWeight: 900, color: COLOURS.navy }}>{member.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLOURS.red, marginTop: 6 }}>{member.section}</div>
                    <div style={{ fontSize: 18, marginTop: 10 }}>📞 {member.phone}</div>
                    <FileLink name={member.fileName} url={member.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notices" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>📢 Noticeboard</SectionTitle>
              {notices.map((item) => (
                <div key={item.id} style={{ background: COLOURS.white, border: `1px solid ${COLOURS.border}`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: COLOURS.red, marginTop: 6 }}>{item.date}</div>
                  <div style={{ fontSize: 19, marginTop: 10 }}>{item.body}</div>
                  <FileLink name={item.fileName} url={item.fileUrl} />
                </div>
              ))}
            </div>
          )}

          {tab === "comps" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>🏆 Competitions</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {competitions.map((item) => (
                  <div key={item.id} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: COLOURS.navy }}>{item.name}</div>
                    <div style={{ fontSize: 18, marginTop: 10 }}><b>Entry closes:</b> {item.closes}</div>
                    <div style={{ fontSize: 18, marginTop: 6 }}><b>Starts:</b> {item.starts}</div>
                    <div style={{ fontSize: 18, marginTop: 12 }}>{item.notes}</div>
                    <FileLink name={item.fileName} url={item.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "office" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>🧾 Office Bearers</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {officeBearers.map((person) => (
                  <div key={person.id} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: COLOURS.red }}>{person.role}</div>
                    <div style={{ fontSize: 27, fontWeight: 900, color: COLOURS.navy, marginTop: 8 }}>{person.name}</div>
                    <div style={{ fontSize: 19, marginTop: 12 }}>📞 {person.phone}</div>
                    <FileLink name={person.fileName} url={person.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "coaches" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>🎯 Coaches</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {coaches.map((coach) => (
                  <div key={coach.id} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 17, fontWeight: 800, color: COLOURS.red }}>{coach.title}</div>
                    <div style={{ fontSize: 27, fontWeight: 900, color: COLOURS.navy, marginTop: 8 }}>{coach.name}</div>
                    <div style={{ fontSize: 19, marginTop: 12 }}>📞 {coach.phone}</div>
                    <FileLink name={coach.fileName} url={coach.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "documents" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>📄 Documents</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {documents.map((doc) => (
                  <div key={doc.id} style={cardStyle({ padding: 20 })}>
                    <div style={{ display: "inline-block", background: COLOURS.soft, color: COLOURS.royal, borderRadius: 999, padding: "7px 12px", fontSize: 15, fontWeight: 800 }}>{doc.category}</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy, marginTop: 14 }}>{doc.name}</div>
                    <FileLink name={doc.fileName} url={doc.fileUrl} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 18,
            background: `linear-gradient(90deg, ${COLOURS.red} 0%, #e53935 100%)`,
            color: COLOURS.white,
            padding: "18px 26px",
            textAlign: "center",
            fontWeight: 900,
            fontSize: 28,
            borderRadius: 18,
            boxShadow: "0 6px 18px rgba(198,40,40,0.25)",
          }}
        >
          Visitors and New Members Always Welcome!
        </div>
      </div>

      {isAdminOpen && (
        <div
          onClick={() => setIsAdminOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(7, 14, 32, 0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(1180px, 100%)",
              maxHeight: "92vh",
              overflow: "auto",
              ...cardStyle({ borderRadius: 24 }),
            }}
          >
            <div style={{ background: COLOURS.navy, color: COLOURS.white, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 30, fontWeight: 900 }}>⚙️ Admin Panel</div>
                <div style={{ fontSize: 16, marginTop: 6, opacity: 0.95 }}>Edit, add or remove all main sections. You can also attach files to most section items.</div>
              </div>
              <ActionButton secondary onClick={() => setIsAdminOpen(false)}>Close</ActionButton>
            </div>

            {!isAdmin ? (
              <div style={{ padding: 24 }}>
                <div style={{ maxWidth: 420 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Enter admin PIN</div>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="PIN"
                    style={{ width: "100%", padding: "14px 16px", fontSize: 18, borderRadius: 12, border: `1px solid ${COLOURS.border}`, boxSizing: "border-box" }}
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <ActionButton onClick={handleAdminLogin}>Log in</ActionButton>
                  </div>
                  {adminMessage ? <div style={{ marginTop: 12, fontSize: 15, fontWeight: 800, color: COLOURS.red }}>{adminMessage}</div> : null}
                </div>
              </div>
            ) : (
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {adminSections.map(([key, label]) => (
                      <TopButton
                        key={key}
                        active={adminSection === key}
                        onClick={() => {
                          setAdminSection(key);
                          resetForm();
                        }}
                      >
                        {label}
                      </TopButton>
                    ))}
                  </div>
                  <ActionButton danger onClick={handleLogout}>Log out</ActionButton>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
                  <div style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: COLOURS.navy, marginBottom: 16 }}>
                      {editingId ? "Edit item" : "Add new item"}
                    </div>
                    {renderAdminFields()}
                    <div style={{ marginBottom: 10 }}>
                      <input ref={fileRef} type="file" onChange={handleFileChange} style={{ fontSize: 15 }} />
                    </div>
                    {form.fileName ? (
                      <div style={{ fontSize: 14, fontWeight: 800, color: COLOURS.royal, marginBottom: 12 }}>
                        Attached file: {form.fileName}
                      </div>
                    ) : null}
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <ActionButton onClick={saveItem}>{editingId ? "Update item" : "Add item"}</ActionButton>
                      <ActionButton secondary onClick={resetForm}>Clear form</ActionButton>
                    </div>
                    {adminMessage ? <div style={{ marginTop: 14, fontSize: 14, fontWeight: 800, color: COLOURS.red }}>{adminMessage}</div> : null}
                  </div>

                  <div style={cardStyle({ padding: 20 })}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: COLOURS.navy, marginBottom: 16 }}>Current items</div>
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
