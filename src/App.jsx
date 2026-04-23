import React, { useMemo, useState } from "react";

const CLUB_NAME = "Rockview Bowling Club";
const CLUB_SUBTITLE = "Friendship • Sport • Community";

const COLOURS = {
  navy: "#0f2d6b",
  royal: "#1f4fbf",
  teal: "#0f7c8a",
  gold: "#f2c94c",
  cream: "#f7f3ea",
  white: "#ffffff",
  red: "#c62828",
  text: "#18202a",
  soft: "#e7eefb",
  border: "#cfd9ee",
};

const diaryEvents = [
  {
    title: "Opening Day",
    date: "Saturday 2 May 2026",
    time: "2:00 pm",
    place: "Main Green",
    notes: "Members, guests and visitors welcome. Tea and sandwiches in the clubhouse afterwards.",
  },
  {
    title: "Tuesday Practice Evening",
    date: "Tuesday 5 May 2026",
    time: "6:30 pm",
    place: "Club Green",
    notes: "Friendly roll-up for all sections. New bowlers welcome.",
  },
  {
    title: "Committee Meeting",
    date: "Wednesday 13 May 2026",
    time: "7:00 pm",
    place: "Clubhouse Lounge",
    notes: "Office bearers and committee members only.",
  },
  {
    title: "Ladies Friendly v Meadowbank",
    date: "Sunday 17 May 2026",
    time: "2:00 pm",
    place: "Away Match",
    notes: "Transport leaves club at 1:00 pm.",
  },
  {
    title: "Try Bowls Open Day",
    date: "Saturday 23 May 2026",
    time: "11:00 am",
    place: "Main Green",
    notes: "Open to the public. Bowls available at the club.",
  },
  {
    title: "Gents League Match v Parkside",
    date: "Friday 29 May 2026",
    time: "6:45 pm",
    place: "Home Match",
    notes: "Selected team only. Dress code applies.",
  },
];

const notices = [
  {
    title: "Membership Now Open",
    body: "New members are welcome for the 2026 season. Beginners are encouraged to come along and try bowls.",
    date: "20 April 2026",
  },
  {
    title: "Green Maintenance",
    body: "The green will be closed every Monday morning for cutting and seasonal maintenance until 1:00 pm.",
    date: "18 April 2026",
  },
  {
    title: "Volunteers Required",
    body: "Helpers needed for teas, raffle sales and match-day setup throughout the season.",
    date: "15 April 2026",
  },
  {
    title: "Fixture List Published",
    body: "The new fixture list is now available in the documents section and on the clubhouse noticeboard.",
    date: "12 April 2026",
  },
];

const competitions = [
  {
    name: "Club Singles Championship",
    closes: "31 May 2026",
    starts: "6 June 2026",
    notes: "Open to all full members. Draw will be displayed in the clubhouse and app.",
  },
  {
    name: "Pairs Knockout",
    closes: "14 June 2026",
    starts: "20 June 2026",
    notes: "Choose your own partner. First round to be completed within two weeks.",
  },
  {
    name: "Mixed Triples Day",
    closes: "1 July 2026",
    starts: "11 July 2026",
    notes: "One-day friendly competition with lunch included.",
  },
];

const members = [
  { name: "James McLaren", section: "Gents", phone: "07700 900101" },
  { name: "Margaret Boyd", section: "Ladies", phone: "07700 900102" },
  { name: "Alan Fraser", section: "Gents", phone: "07700 900103" },
  { name: "Jean Robertson", section: "Ladies", phone: "07700 900104" },
  { name: "Robert Sinclair", section: "Associate", phone: "07700 900105" },
  { name: "Fiona Kerr", section: "Ladies", phone: "07700 900106" },
  { name: "David Thomson", section: "Gents", phone: "07700 900107" },
  { name: "Moira Campbell", section: "Associate", phone: "07700 900108" },
  { name: "George Allan", section: "Gents", phone: "07700 900109" },
  { name: "Helen Stewart", section: "Ladies", phone: "07700 900110" },
  { name: "Brian Kelly", section: "Gents", phone: "07700 900111" },
  { name: "Irene Morton", section: "Ladies", phone: "07700 900112" },
  { name: "Colin Paterson", section: "Gents", phone: "07700 900113" },
  { name: "Anne McGill", section: "Ladies", phone: "07700 900114" },
  { name: "Thomas Reid", section: "Associate", phone: "07700 900115" },
  { name: "Sharon Douglas", section: "Ladies", phone: "07700 900116" },
  { name: "Michael Connell", section: "Gents", phone: "07700 900117" },
  { name: "Sandra White", section: "Ladies", phone: "07700 900118" },
  { name: "Graham Boyd", section: "Gents", phone: "07700 900119" },
  { name: "Linda Ferguson", section: "Associate", phone: "07700 900120" },
];

const officeBearers = [
  { role: "President", name: "William Hart", phone: "07700 900201" },
  { role: "Secretary", name: "Elaine Morton", phone: "07700 900202" },
  { role: "Treasurer", name: "Gordon McBride", phone: "07700 900203" },
  { role: "Match Secretary", name: "Sandra Allan", phone: "07700 900204" },
];

const coaches = [
  { name: "Peter Lawson", title: "Club Coach", phone: "07700 900301" },
  { name: "Linda Ferguson", title: "Volunteer Coach", phone: "07700 900302" },
];

const documents = [
  { name: "Membership Form 2026", category: "Forms" },
  { name: "Club Constitution", category: "Rules" },
  { name: "Competition Entry Sheet", category: "Competitions" },
  { name: "Fixture List", category: "Fixtures" },
];

function cardStyle(extra = {}) {
  return {
    background: COLOURS.white,
    borderRadius: 18,
    border: `1px solid ${COLOURS.border}`,
    boxShadow: "0 6px 18px rgba(15,45,107,0.08)",
    ...extra,
  };
}

function StatCard({ title, value, sub, bg }) {
  return (
    <div
      style={cardStyle({
        background: bg,
        color: COLOURS.white,
        padding: 20,
        minHeight: 120,
      })}
    >
      <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{sub}</div>
    </div>
  );
}

function SectionTitle({ children, colour = COLOURS.navy }) {
  return (
    <h2
      style={{
        color: colour,
        fontSize: 34,
        fontWeight: 900,
        margin: "0 0 18px 0",
        letterSpacing: 0.2,
      }}
    >
      {children}
    </h2>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.section.toLowerCase().includes(q) ||
        m.phone.includes(q)
    );
  }, [search]);

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

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: `linear-gradient(180deg, ${COLOURS.cream} 0%, #eef3fb 100%)`,
        minHeight: "100vh",
        color: COLOURS.text,
      }}
    >
      <div style={{ maxWidth: 1450, margin: "0 auto", padding: 18 }}>
        <div
          style={cardStyle({
            overflow: "hidden",
            marginBottom: 18,
            borderRadius: 24,
          })}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLOURS.navy} 0%, ${COLOURS.royal} 65%, ${COLOURS.teal} 100%)`,
              color: COLOURS.white,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "120px 1fr 220px 220px",
                gap: 20,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: COLOURS.red,
                  border: `5px solid ${COLOURS.gold}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 34,
                  fontWeight: 900,
                  color: COLOURS.white,
                  boxSizing: "border-box",
                }}
              >
                RB
              </div>

              <div>
                <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.02, letterSpacing: 0.4 }}>
                  {CLUB_NAME}
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: COLOURS.gold, marginTop: 10 }}>
                  {CLUB_SUBTITLE}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 12, opacity: 0.95 }}>
                  Demo club app with fictitious members, fixtures, notices and club information
                </div>
              </div>

              <StatCard title="📅 NEXT EVENT" value="Opening Day" sub="Sat 2 May • 2:00 PM" bg={COLOURS.red} />
              <StatCard title="👥 MEMBERS" value="124" sub="New members always welcome" bg={COLOURS.royal} />
            </div>
          </div>

          <div
            style={{
              background: COLOURS.royal,
              padding: 14,
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            {navItems.map(([key, label]) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  style={{
                    padding: "13px 20px",
                    fontSize: 26,
                    fontWeight: 900,
                    background: active ? COLOURS.red : COLOURS.white,
                    color: active ? COLOURS.white : COLOURS.navy,
                    border: "none",
                    borderRadius: 14,
                    cursor: "pointer",
                    boxShadow: active ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ paddingBottom: 20 }}>
          {tab === "home" && (
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.45fr 0.9fr", gap: 18 }}>
              <div style={cardStyle({ background: COLOURS.navy, color: COLOURS.white, padding: 24 })}>
                <SectionTitle colour={COLOURS.white}>⭐ Welcome to Rockview Bowling Club</SectionTitle>
                <p style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.5 }}>
                  Styled in the spirit of a proper bowling club members app, with bold wording, bigger text and a clean club layout.
                </p>
                <p style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.5 }}>
                  This version uses different colours from Woodilee while keeping that same strong club-app feel.
                </p>
                <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
                  <button
                    style={{
                      background: COLOURS.red,
                      color: COLOURS.white,
                      border: "none",
                      borderRadius: 12,
                      padding: "16px 24px",
                      fontSize: 22,
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    Join Us
                  </button>
                  <button
                    style={{
                      background: "transparent",
                      color: COLOURS.white,
                      border: `2px solid ${COLOURS.white}`,
                      borderRadius: 12,
                      padding: "16px 24px",
                      fontSize: 22,
                      fontWeight: 900,
                      cursor: "pointer",
                    }}
                  >
                    About Our Club
                  </button>
                </div>
              </div>

              <div
                style={cardStyle({
                  padding: 0,
                  overflow: "hidden",
                  minHeight: 320,
                  background:
                    "linear-gradient(180deg, #8ec5ff 0%, #dff1ff 35%, #7fc67d 36%, #86c97c 60%, #6eb36a 100%)",
                })}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 24,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 180,
                        height: 95,
                        background: "#b9a48b",
                        borderRadius: 10,
                        boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.35)",
                      }}
                    />
                    <div
                      style={{
                        width: 230,
                        height: 90,
                        background: "#4a4a4a",
                        borderRadius: 10,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      alignSelf: "center",
                      width: "88%",
                      height: 145,
                      borderRadius: 120,
                      background: "linear-gradient(180deg, #9cd96f 0%, #7fc85a 100%)",
                      border: "6px solid #d7efda",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        width: 120,
                        height: 54,
                        background: "#944f39",
                        borderRadius: 10,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 18 }}>
                <div style={cardStyle({ padding: 0, overflow: "hidden" })}>
                  <div style={{ background: COLOURS.red, color: COLOURS.white, padding: "16px 20px", fontSize: 28, fontWeight: 900 }}>
                    📢 Club News
                  </div>
                  <div style={{ padding: 20 }}>
                    {notices.slice(0, 3).map((item) => (
                      <div key={item.title} style={{ borderBottom: `1px solid ${COLOURS.border}`, paddingBottom: 14, marginBottom: 14 }}>
                        <div style={{ fontSize: 22, fontWeight: 900 }}>{item.title}</div>
                        <div style={{ fontSize: 19, marginTop: 8 }}>{item.body}</div>
                      </div>
                    ))}
                    <button
                      style={{
                        width: "100%",
                        background: COLOURS.red,
                        color: COLOURS.white,
                        border: "none",
                        borderRadius: 10,
                        padding: "14px 18px",
                        fontSize: 22,
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      View All News
                    </button>
                  </div>
                </div>

                <div style={cardStyle({ padding: 0, overflow: "hidden" })}>
                  <div style={{ background: COLOURS.royal, color: COLOURS.white, padding: "16px 20px", fontSize: 28, fontWeight: 900 }}>
                    🏆 Upcoming Competitions
                  </div>
                  <div style={{ padding: 20 }}>
                    {competitions.map((item) => (
                      <div key={item.name} style={{ borderBottom: `1px solid ${COLOURS.border}`, paddingBottom: 14, marginBottom: 14 }}>
                        <div style={{ fontSize: 22, fontWeight: 900 }}>{item.name}</div>
                        <div style={{ fontSize: 19, marginTop: 6 }}>Entry closes {item.closes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={cardStyle({ padding: 24 })}>
                <SectionTitle colour={COLOURS.royal}>📅 Upcoming Events</SectionTitle>
                {diaryEvents.slice(0, 3).map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "82px 1fr auto",
                      gap: 16,
                      alignItems: "center",
                      borderBottom: `1px solid ${COLOURS.border}`,
                      paddingBottom: 16,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        border: `1px solid ${COLOURS.border}`,
                        textAlign: "center",
                        fontWeight: 900,
                      }}
                    >
                      <div style={{ background: COLOURS.red, color: COLOURS.white, padding: "6px 0", fontSize: 16 }}>MAY</div>
                      <div style={{ background: COLOURS.white, color: COLOURS.text, padding: "10px 0", fontSize: 30 }}>0{diaryEvents.indexOf(item) + 2}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 25, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                      <div style={{ fontSize: 19, marginTop: 6 }}>{item.place}</div>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{item.time}</div>
                  </div>
                ))}
                <button
                  style={{
                    width: "100%",
                    background: COLOURS.royal,
                    color: COLOURS.white,
                    border: "none",
                    borderRadius: 12,
                    padding: "16px 18px",
                    fontSize: 22,
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  View Full Diary
                </button>
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
                  <div
                    key={label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "190px 1fr",
                      gap: 18,
                      padding: "12px 0",
                      borderBottom: `1px solid ${COLOURS.border}`,
                    }}
                  >
                    <div style={{ fontSize: 21, fontWeight: 800, color: COLOURS.navy }}>{label}:</div>
                    <div style={{ fontSize: 21 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "diary" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>📅 Diary</SectionTitle>
              {diaryEvents.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: COLOURS.white,
                    border: `1px solid ${COLOURS.border}`,
                    borderLeft: `8px solid ${COLOURS.royal}`,
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 29, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                  <div style={{ fontSize: 21, fontWeight: 800, color: COLOURS.red, marginTop: 8 }}>
                    {item.date} • {item.time}
                  </div>
                  <div style={{ fontSize: 20, marginTop: 8 }}><b>Venue:</b> {item.place}</div>
                  <div style={{ fontSize: 20, marginTop: 8 }}>{item.notes}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "members" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>👥 Members</SectionTitle>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members by name, section or phone"
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  fontSize: 21,
                  borderRadius: 12,
                  border: `2px solid ${COLOURS.border}`,
                  marginBottom: 20,
                  boxSizing: "border-box",
                }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {filteredMembers.map((member) => (
                  <div key={member.name} style={cardStyle({ padding: 18, background: COLOURS.soft })}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: COLOURS.navy }}>{member.name}</div>
                    <div style={{ fontSize: 19, fontWeight: 800, color: COLOURS.red, marginTop: 6 }}>{member.section}</div>
                    <div style={{ fontSize: 19, marginTop: 10 }}>📞 {member.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "notices" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>📢 Noticeboard</SectionTitle>
              {notices.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: COLOURS.white,
                    border: `1px solid ${COLOURS.border}`,
                    borderRadius: 16,
                    padding: 20,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 27, fontWeight: 900, color: COLOURS.navy }}>{item.title}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: COLOURS.red, marginTop: 6 }}>{item.date}</div>
                  <div style={{ fontSize: 20, marginTop: 10 }}>{item.body}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "comps" && (
            <div style={cardStyle({ padding: 26 })}>
              <SectionTitle>🏆 Competitions</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {competitions.map((item) => (
                  <div key={item.name} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: COLOURS.navy }}>{item.name}</div>
                    <div style={{ fontSize: 19, marginTop: 10 }}><b>Entry closes:</b> {item.closes}</div>
                    <div style={{ fontSize: 19, marginTop: 6 }}><b>Starts:</b> {item.starts}</div>
                    <div style={{ fontSize: 19, marginTop: 12 }}>{item.notes}</div>
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
                  <div key={person.role} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLOURS.red }}>{person.role}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: COLOURS.navy, marginTop: 8 }}>{person.name}</div>
                    <div style={{ fontSize: 20, marginTop: 12 }}>📞 {person.phone}</div>
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
                  <div key={coach.name} style={cardStyle({ padding: 20, background: COLOURS.soft })}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLOURS.red }}>{coach.title}</div>
                    <div style={{ fontSize: 28, fontWeight: 900, color: COLOURS.navy, marginTop: 8 }}>{coach.name}</div>
                    <div style={{ fontSize: 20, marginTop: 12 }}>📞 {coach.phone}</div>
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
                  <div key={doc.name} style={cardStyle({ padding: 20 })}>
                    <div
                      style={{
                        display: "inline-block",
                        background: COLOURS.soft,
                        color: COLOURS.royal,
                        borderRadius: 999,
                        padding: "7px 12px",
                        fontSize: 16,
                        fontWeight: 800,
                      }}
                    >
                      {doc.category}
                    </div>
                    <div style={{ fontSize: 27, fontWeight: 900, color: COLOURS.navy, marginTop: 14 }}>{doc.name}</div>
                    <button
                      style={{
                        marginTop: 16,
                        background: COLOURS.royal,
                        color: COLOURS.white,
                        border: "none",
                        borderRadius: 10,
                        padding: "13px 18px",
                        fontSize: 20,
                        fontWeight: 900,
                        cursor: "pointer",
                      }}
                    >
                      View document →
                    </button>
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
            fontSize: 30,
            borderRadius: 18,
            boxShadow: "0 6px 18px rgba(198,40,40,0.25)",
          }}
        >
          Visitors and New Members Always Welcome!
        </div>
      </div>
    </div>
  );
}
