import React, { useMemo, useState } from "react";

const ADMIN_PIN = "9999";

const firstNames = [
  "Angus","Mairi","Duncan","Fiona","Graham","Robert","Morag","Alistair","James","Iain",
  "Colin","David","William","Andrew","Peter","Stuart","Brian","Thomas","George","Alan",
  "Margaret","Jean","Shona","Anne","Moira","Linda","Sandra","Eilidh","Lesley","Helen",
  "Irene","Sheila","Elaine","Morven","Isobel","Frances","Kathleen","Janet","Carol","Aileen"
];

const lastNames = [
  "McLaren","Campbell","Reid","Stewart","Sinclair","Aitken","Douglas","Brown","Smith","Fraser",
  "MacLeod","Kerr","Wilson","Murray","Grant","Thomson","Robertson","Boyd","Graham","Fleming"
];

function makeMembers() {
  const members = [];
  for (let i = 1; i <= 60; i += 1) {
    let section = "Gents";
    if (i > 20 && i <= 40) section = "Ladies";
    if (i > 49) section = "Associate";
    const first = firstNames[(i - 1) % firstNames.length];
    const last = lastNames[(i * 3) % lastNames.length];
    members.push({
      id: i,
      name: `${first} ${last}`,
      section,
      phone: `07700 ${String(100000 + i)}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@demo.co.uk`.replace(/[^a-z0-9.@]/g, ""),
    });
  }
  return members;
}

const initialOfficeBearers = [
  { id: 1, role: "President", name: "Angus McLaren" },
  { id: 2, role: "Vice President", name: "Mairi Campbell" },
  { id: 3, role: "Past President", name: "Duncan Reid" },
  { id: 4, role: "Secretary", name: "Fiona Stewart" },
  { id: 5, role: "Treasurer", name: "Graham Sinclair" },
  { id: 6, role: "Gents Match Secretary", name: "Robert Aitken" },
  { id: 7, role: "Ladies Match Secretary", name: "Morag Douglas" },
  { id: 8, role: "Bar Convenor", name: "Colin Murray" },
];

const initialDiary = [
  { id: 1, date: "2026-05-04", section: "Gents", opponent: "Lochview BC", venue: "Home", notes: "League match" },
  { id: 2, date: "2026-05-05", section: "Ladies", opponent: "Balmore Ladies", venue: "Away", notes: "League match" },
  { id: 3, date: "2026-05-11", section: "Gents", opponent: "Milngavie West", venue: "Away", notes: "League match" },
  { id: 4, date: "2026-05-12", section: "Ladies", opponent: "Townhead Ladies", venue: "Home", notes: "League match" },
  { id: 5, date: "2026-05-18", section: "Gents", opponent: "Campsie Glen", venue: "Home", notes: "Cup tie" },
  { id: 6, date: "2026-05-19", section: "Ladies", opponent: "Springfield BC", venue: "Away", notes: "Friendly" },
];

const initialNotices = [
  { id: 1, text: "Green maintenance on Monday from 9:00 am. Please keep off the green until reopened." },
  { id: 2, text: "Entries for the club championship close on Friday 15th May at 7:00 pm." },
  { id: 3, text: "Social bowls and sandwiches on Saturday after the home fixture." },
  { id: 4, text: "Bar rota for the month is now posted in the clubhouse." },
  { id: 5, text: "New members are welcome. Please speak to the secretary for forms." },
];

const initialRules = [
  { id: 1, text: "Club colours should be worn for all league, cup and representative matches." },
  { id: 2, text: "Members should arrive at least 15 minutes before the published start time." },
  { id: 3, text: "If unavailable for a match, members must notify the relevant match secretary promptly." },
  { id: 4, text: "Members are expected to show courtesy and respect at all times in the clubhouse and on the green." },
];

const initialGentsCompetitions = [
  { id: 1, round: "Quarter Final", player1: "Alistair Brown", player2: "James Kerr" },
  { id: 2, round: "Quarter Final", player1: "David Wilson", player2: "Peter Grant" },
  { id: 3, round: "Quarter Final", player1: "Stuart Boyd", player2: "Alan Robertson" },
  { id: 4, round: "Quarter Final", player1: "Brian Thomson", player2: "Iain Murray" },
];

const initialLadiesCompetitions = [
  { id: 1, round: "Quarter Final", player1: "Margaret Fraser", player2: "Jean Campbell" },
  { id: 2, round: "Quarter Final", player1: "Shona Reid", player2: "Anne Stewart" },
  { id: 3, round: "Quarter Final", player1: "Moira Sinclair", player2: "Linda Douglas" },
  { id: 4, round: "Quarter Final", player1: "Sandra Kerr", player2: "Helen MacLeod" },
];

function nextId(items) {
  return items.length ? Math.max(...items.map((x) => x.id)) + 1 : 1;
}

function normalisePhone(phone) {
  return String(phone || "").replace(/\s+/g, "").replace(/^0/, "44");
}

function Panel({ title, children, action }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <h3>{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}

function MemberCard({ member }) {
  const wa = normalisePhone(member.phone);
  return (
    <div className="member-card">
      <div className="member-name">{member.name}</div>
      <div className="member-meta">{member.phone}</div>
      <div className="member-meta">{member.email}</div>
      <div className="member-actions">
        <a className="btn btn-blue small" href={`tel:${member.phone}`}>Call</a>
        <a className="btn btn-green small" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="btn btn-cyan small" href={`mailto:${member.email}`}>Email</a>
      </div>
    </div>
  );
}

function DrawCard({ match }) {
  return (
    <div className="draw-card">
      <div className="draw-round">{match.round}</div>
      <div className="draw-player">{match.player1}</div>
      <div className="draw-v">v</div>
      <div className="draw-player">{match.player2}</div>
    </div>
  );
}

function TextRowEditor({ value, onChange, onDelete }) {
  return (
    <div className="editor-row editor-two">
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} />
      <button className="btn btn-red" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [adminAccess, setAdminAccess] = useState(false);
  const [pin, setPin] = useState("");

  const [officeBearers, setOfficeBearers] = useState(initialOfficeBearers);
  const [diary, setDiary] = useState(initialDiary);
  const [members, setMembers] = useState(makeMembers());
  const [notices, setNotices] = useState(initialNotices);
  const [rules, setRules] = useState(initialRules);
  const [gentsComp, setGentsComp] = useState(initialGentsCompetitions);
  const [ladiesComp, setLadiesComp] = useState(initialLadiesCompetitions);

  const [newBearer, setNewBearer] = useState({ role: "", name: "" });
  const [newDiary, setNewDiary] = useState({ date: "", section: "Gents", opponent: "", venue: "Home", notes: "" });
  const [newMember, setNewMember] = useState({ name: "", section: "Gents", phone: "", email: "" });
  const [newNotice, setNewNotice] = useState("");
  const [newRule, setNewRule] = useState("");
  const [newGentsMatch, setNewGentsMatch] = useState({ round: "Quarter Final", player1: "", player2: "" });
  const [newLadiesMatch, setNewLadiesMatch] = useState({ round: "Quarter Final", player1: "", player2: "" });

  const memberGroups = useMemo(() => ({
    Gents: members.filter((m) => m.section === "Gents"),
    Ladies: members.filter((m) => m.section === "Ladies"),
    Associate: members.filter((m) => m.section === "Associate"),
  }), [members]);

  const login = () => {
    if (pin === ADMIN_PIN) {
      setAdminAccess(true);
      setPin("");
    } else {
      alert("Wrong PIN");
    }
  };

  const navTabs = [
    ["home", "HOME"],
    ["diary", "DIARY"],
    ["members", "MEMBERS"],
    ["board", "NOTICEBOARD"],
    ["rules", "RULES"],
    ["internal", "INTERNAL COMP"],
    ["admin", "ADMIN"],
  ];

  return (
    <div className="app-shell">
      <div className="container">
        <div className="header-card">
          <div className="logo-circle">SBC</div>
          <div>
            <h1>Strathkelvin Bowling Club</h1>
            <p>Demo app with members, diary, noticeboard and internal competitions</p>
          </div>
        </div>

        <div className="tab-bar">
          {navTabs.map(([id, label]) => (
            <button
              key={id}
              className={`tab-btn ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "home" && (
          <div className="stack">
            <div className="stats-grid">
              <Panel title="Gents">
                <div className="big-number">{memberGroups.Gents.length}</div>
                <div className="subtle">Full members</div>
              </Panel>
              <Panel title="Ladies">
                <div className="big-number">{memberGroups.Ladies.length}</div>
                <div className="subtle">Full members</div>
              </Panel>
              <Panel title="Associate">
                <div className="big-number">{memberGroups.Associate.length}</div>
                <div className="subtle">Associate members</div>
              </Panel>
              <Panel title="Total Members">
                <div className="big-number">{members.length}</div>
                <div className="subtle">All sections</div>
              </Panel>
            </div>

            <Panel title="Office Bearers">
              <div className="stack compact">
                {officeBearers.map((o) => (
                  <div key={o.id} className="list-box">
                    {o.role} - {o.name}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {tab === "diary" && (
          <Panel title="Diary and Fixtures">
            <div className="stack compact">
              {diary.map((item) => (
                <div key={item.id} className="diary-row">
                  <div className="date-cell">{item.date}</div>
                  <div>{item.section}</div>
                  <div>{item.opponent}</div>
                  <div><span className={`pill ${item.venue === "Home" ? "pill-blue" : "pill-cyan"}`}>{item.venue}</span></div>
                  <div className="subtle">{item.notes}</div>
                </div>
              ))}
            </div>
          </Panel>
        )}

        {tab === "members" && (
          <div className="members-grid">
            {Object.entries(memberGroups).map(([section, list]) => (
              <Panel key={section} title={`${section} (${list.length})`}>
                <div className="members-list">
                  {list.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        )}

        {tab === "board" && (
          <Panel title="Noticeboard">
            <div className="stack compact">
              {notices.map((notice) => (
                <div key={notice.id} className="list-box">{notice.text}</div>
              ))}
            </div>
          </Panel>
        )}

        {tab === "rules" && (
          <Panel title="Club Rules">
            <div className="stack compact">
              {rules.map((rule) => (
                <div key={rule.id} className="list-box">{rule.text}</div>
              ))}
            </div>
          </Panel>
        )}

        {tab === "internal" && (
          <div className="two-col">
            <Panel title="Gents Club Championship">
              <div className="draw-grid">
                {gentsComp.map((match) => <DrawCard key={match.id} match={match} />)}
              </div>
            </Panel>
            <Panel title="Ladies Club Championship">
              <div className="draw-grid">
                {ladiesComp.map((match) => <DrawCard key={match.id} match={match} />)}
              </div>
            </Panel>
          </div>
        )}

        {tab === "admin" && !adminAccess && (
          <Panel title="Admin Login">
            <div className="login-box">
              <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="PIN" />
              <button className="btn btn-blue" onClick={login}>Login</button>
              <div className="subtle">Admin PIN is 9999</div>
            </div>
          </Panel>
        )}

        {tab === "admin" && adminAccess && (
          <div className="stack">
            <Panel title="Admin Controls" action={<button className="btn btn-dark" onClick={() => setAdminAccess(false)}>Logout</button>}>
              <div className="subtle">Edit every section below. You can add and delete items as well.</div>
            </Panel>

            <Panel title="Edit Office Bearers">
              <div className="stack compact">
                {officeBearers.map((o) => (
                  <div key={o.id} className="editor-row three">
                    <input value={o.role} onChange={(e) => setOfficeBearers(officeBearers.map((x) => x.id === o.id ? { ...x, role: e.target.value } : x))} />
                    <input value={o.name} onChange={(e) => setOfficeBearers(officeBearers.map((x) => x.id === o.id ? { ...x, name: e.target.value } : x))} />
                    <button className="btn btn-red" onClick={() => setOfficeBearers(officeBearers.filter((x) => x.id !== o.id))}>Delete</button>
                  </div>
                ))}
                <div className="editor-row three">
                  <input placeholder="Role" value={newBearer.role} onChange={(e) => setNewBearer({ ...newBearer, role: e.target.value })} />
                  <input placeholder="Name" value={newBearer.name} onChange={(e) => setNewBearer({ ...newBearer, name: e.target.value })} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newBearer.role.trim() || !newBearer.name.trim()) return;
                    setOfficeBearers([...officeBearers, { id: nextId(officeBearers), ...newBearer }]);
                    setNewBearer({ role: "", name: "" });
                  }}>Add</button>
                </div>
              </div>
            </Panel>

            <Panel title="Edit Diary">
              <div className="stack compact">
                {diary.map((item) => (
                  <div key={item.id} className="editor-row six">
                    <input value={item.date} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, date: e.target.value } : x))} />
                    <input value={item.section} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, section: e.target.value } : x))} />
                    <input value={item.opponent} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, opponent: e.target.value } : x))} />
                    <input value={item.venue} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, venue: e.target.value } : x))} />
                    <input value={item.notes} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, notes: e.target.value } : x))} />
                    <button className="btn btn-red" onClick={() => setDiary(diary.filter((x) => x.id !== item.id))}>Delete</button>
                  </div>
                ))}
                <div className="editor-row six">
                  <input placeholder="Date" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
                  <input placeholder="Section" value={newDiary.section} onChange={(e) => setNewDiary({ ...newDiary, section: e.target.value })} />
                  <input placeholder="Opponent" value={newDiary.opponent} onChange={(e) => setNewDiary({ ...newDiary, opponent: e.target.value })} />
                  <input placeholder="Venue" value={newDiary.venue} onChange={(e) => setNewDiary({ ...newDiary, venue: e.target.value })} />
                  <input placeholder="Notes" value={newDiary.notes} onChange={(e) => setNewDiary({ ...newDiary, notes: e.target.value })} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newDiary.date.trim() || !newDiary.opponent.trim()) return;
                    setDiary([...diary, { id: nextId(diary), ...newDiary }]);
                    setNewDiary({ date: "", section: "Gents", opponent: "", venue: "Home", notes: "" });
                  }}>Add</button>
                </div>
              </div>
            </Panel>

            <Panel title="Edit Members">
              <div className="stack compact admin-scroll">
                {members.map((m) => (
                  <div key={m.id} className="editor-row five">
                    <input value={m.name} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x))} />
                    <input value={m.section} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, section: e.target.value } : x))} />
                    <input value={m.phone} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, phone: e.target.value } : x))} />
                    <input value={m.email} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, email: e.target.value } : x))} />
                    <button className="btn btn-red" onClick={() => setMembers(members.filter((x) => x.id !== m.id))}>Delete</button>
                  </div>
                ))}
              </div>
              <div className="editor-row five top-gap">
                <input placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
                <input placeholder="Section" value={newMember.section} onChange={(e) => setNewMember({ ...newMember, section: e.target.value })} />
                <input placeholder="Phone" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} />
                <input placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
                <button className="btn btn-blue" onClick={() => {
                  if (!newMember.name.trim()) return;
                  setMembers([...members, { id: nextId(members), ...newMember }]);
                  setNewMember({ name: "", section: "Gents", phone: "", email: "" });
                }}>Add</button>
              </div>
            </Panel>

            <Panel title="Edit Noticeboard">
              <div className="stack compact">
                {notices.map((n) => (
                  <TextRowEditor
                    key={n.id}
                    value={n.text}
                    onChange={(val) => setNotices(notices.map((x) => x.id === n.id ? { ...x, text: val } : x))}
                    onDelete={() => setNotices(notices.filter((x) => x.id !== n.id))}
                  />
                ))}
                <div className="editor-row editor-two">
                  <textarea placeholder="New notice" value={newNotice} onChange={(e) => setNewNotice(e.target.value)} rows={2} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newNotice.trim()) return;
                    setNotices([...notices, { id: nextId(notices), text: newNotice }]);
                    setNewNotice("");
                  }}>Add</button>
                </div>
              </div>
            </Panel>

            <Panel title="Edit Rules">
              <div className="stack compact">
                {rules.map((r) => (
                  <TextRowEditor
                    key={r.id}
                    value={r.text}
                    onChange={(val) => setRules(rules.map((x) => x.id === r.id ? { ...x, text: val } : x))}
                    onDelete={() => setRules(rules.filter((x) => x.id !== r.id))}
                  />
                ))}
                <div className="editor-row editor-two">
                  <textarea placeholder="New rule" value={newRule} onChange={(e) => setNewRule(e.target.value)} rows={2} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newRule.trim()) return;
                    setRules([...rules, { id: nextId(rules), text: newRule }]);
                    setNewRule("");
                  }}>Add</button>
                </div>
              </div>
            </Panel>

            <Panel title="Edit Gents Club Championship">
              <div className="stack compact">
                {gentsComp.map((m) => (
                  <div key={m.id} className="editor-row four">
                    <input value={m.round} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, round: e.target.value } : x))} />
                    <input value={m.player1} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, player1: e.target.value } : x))} />
                    <input value={m.player2} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, player2: e.target.value } : x))} />
                    <button className="btn btn-red" onClick={() => setGentsComp(gentsComp.filter((x) => x.id !== m.id))}>Delete</button>
                  </div>
                ))}
                <div className="editor-row four">
                  <input placeholder="Round" value={newGentsMatch.round} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, round: e.target.value })} />
                  <input placeholder="Player 1" value={newGentsMatch.player1} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, player1: e.target.value })} />
                  <input placeholder="Player 2" value={newGentsMatch.player2} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, player2: e.target.value })} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newGentsMatch.player1.trim() || !newGentsMatch.player2.trim()) return;
                    setGentsComp([...gentsComp, { id: nextId(gentsComp), ...newGentsMatch }]);
                    setNewGentsMatch({ round: "Quarter Final", player1: "", player2: "" });
                  }}>Add</button>
                </div>
              </div>
            </Panel>

            <Panel title="Edit Ladies Club Championship">
              <div className="stack compact">
                {ladiesComp.map((m) => (
                  <div key={m.id} className="editor-row four">
                    <input value={m.round} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, round: e.target.value } : x))} />
                    <input value={m.player1} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, player1: e.target.value } : x))} />
                    <input value={m.player2} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, player2: e.target.value } : x))} />
                    <button className="btn btn-red" onClick={() => setLadiesComp(ladiesComp.filter((x) => x.id !== m.id))}>Delete</button>
                  </div>
                ))}
                <div className="editor-row four">
                  <input placeholder="Round" value={newLadiesMatch.round} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, round: e.target.value })} />
                  <input placeholder="Player 1" value={newLadiesMatch.player1} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, player1: e.target.value })} />
                  <input placeholder="Player 2" value={newLadiesMatch.player2} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, player2: e.target.value })} />
                  <button className="btn btn-blue" onClick={() => {
                    if (!newLadiesMatch.player1.trim() || !newLadiesMatch.player2.trim()) return;
                    setLadiesComp([...ladiesComp, { id: nextId(ladiesComp), ...newLadiesMatch }]);
                    setNewLadiesMatch({ round: "Quarter Final", player1: "", player2: "" });
                  }}>Add</button>
                </div>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
