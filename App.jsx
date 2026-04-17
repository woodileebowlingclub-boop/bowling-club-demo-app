import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Users,
  CalendarDays,
  Trophy,
  Info,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  ClipboardList,
} from "lucide-react";

const ADMIN_PIN = "9999";
const STORAGE_KEY = "bowling-club-demo-app-data-v1";

const firstNames = [
  "Angus", "Mairi", "Duncan", "Fiona", "Graham", "Robert", "Morag", "Alistair", "James", "Iain",
  "Colin", "David", "William", "Andrew", "Peter", "Stuart", "Brian", "Thomas", "George", "Alan",
  "Margaret", "Jean", "Shona", "Anne", "Moira", "Linda", "Sandra", "Eilidh", "Lesley", "Helen",
  "Irene", "Sheila", "Elaine", "Morven", "Isobel", "Frances", "Kathleen", "Janet", "Carol", "Aileen"
];

const lastNames = [
  "McLaren", "Campbell", "Reid", "Stewart", "Sinclair", "Aitken", "Douglas", "Brown", "Smith", "Fraser",
  "MacLeod", "Kerr", "Wilson", "Murray", "Grant", "Thomson", "Robertson", "Boyd", "Graham", "Fleming"
];

const makeMembers = () => {
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
};

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

function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function Panel({ title, icon, children, action }) {
  return (
    <Card className="rounded-2xl border-2 border-cyan-300 bg-white text-black shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-blue-900">
            {icon} {title}
          </CardTitle>
          {action}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function MemberCard({ member }) {
  const wa = normalisePhone(member.phone);
  return (
    <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
      <p className="font-semibold text-blue-900">{member.name}</p>
      <p className="mt-1 text-sm text-slate-700">{member.phone}</p>
      <p className="text-xs text-slate-600">{member.email}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a href={`tel:${member.phone}`} className="inline-flex items-center gap-1 rounded-md bg-blue-700 px-3 py-1.5 text-xs font-medium text-white">
          <Phone className="h-3.5 w-3.5" /> Call
        </a>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white">
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
        <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1 rounded-md bg-cyan-700 px-3 py-1.5 text-xs font-medium text-white">
          <Mail className="h-3.5 w-3.5" /> Email
        </a>
      </div>
    </div>
  );
}

function DrawCard({ match }) {
  return (
    <div className="rounded-xl border-2 border-cyan-300 bg-cyan-50 p-4 text-center">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-800">{match.round}</p>
      <p className="font-semibold text-blue-900">{match.player1}</p>
      <p className="my-1 text-sm text-slate-500">v</p>
      <p className="font-semibold text-blue-900">{match.player2}</p>
    </div>
  );
}

export default function App() {
  const savedData = loadSavedData();

  const [adminAccess, setAdminAccess] = useState(false);
  const [pin, setPin] = useState("");

  const [officeBearers, setOfficeBearers] = useState(savedData?.officeBearers || initialOfficeBearers);
  const [diary, setDiary] = useState(savedData?.diary || initialDiary);
  const [members, setMembers] = useState(savedData?.members || makeMembers());
  const [notices, setNotices] = useState(savedData?.notices || initialNotices);
  const [rules, setRules] = useState(savedData?.rules || initialRules);
  const [gentsComp, setGentsComp] = useState(savedData?.gentsComp || initialGentsCompetitions);
  const [ladiesComp, setLadiesComp] = useState(savedData?.ladiesComp || initialLadiesCompetitions);

  const [newBearer, setNewBearer] = useState({ role: "", name: "" });
  const [newDiary, setNewDiary] = useState({ date: "", section: "Gents", opponent: "", venue: "Home", notes: "" });
  const [newMember, setNewMember] = useState({ name: "", section: "Gents", phone: "", email: "" });
  const [newNotice, setNewNotice] = useState("");
  const [newRule, setNewRule] = useState("");
  const [newGentsMatch, setNewGentsMatch] = useState({ round: "Quarter Final", player1: "", player2: "" });
  const [newLadiesMatch, setNewLadiesMatch] = useState({ round: "Quarter Final", player1: "", player2: "" });

  useEffect(() => {
    const dataToSave = {
      officeBearers,
      diary,
      members,
      notices,
      rules,
      gentsComp,
      ladiesComp,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore local save errors
    }
  }, [officeBearers, diary, members, notices, rules, gentsComp, ladiesComp]);

  const resetAllData = () => {
    if (!window.confirm("Reset everything back to the original demo data?")) return;

    setOfficeBearers(initialOfficeBearers);
    setDiary(initialDiary);
    setMembers(makeMembers());
    setNotices(initialNotices);
    setRules(initialRules);
    setGentsComp(initialGentsCompetitions);
    setLadiesComp(initialLadiesCompetitions);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore local remove errors
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-600 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-6 text-black shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-700 text-xl font-bold text-white">SBC</div>
          <div>
            <h1 className="text-2xl font-bold text-blue-900">Strathkelvin Bowling Club</h1>
            <p className="text-sm text-slate-600">Demo app with members, diary, noticeboard and internal competitions</p>
          </div>
        </div>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-white/30 p-2 text-black md:grid-cols-7">
            <TabsTrigger value="home">HOME</TabsTrigger>
            <TabsTrigger value="diary">DIARY</TabsTrigger>
            <TabsTrigger value="members">MEMBERS</TabsTrigger>
            <TabsTrigger value="board">NOTICEBOARD</TabsTrigger>
            <TabsTrigger value="rules">RULES</TabsTrigger>
            <TabsTrigger value="internal">INTERNAL COMP</TabsTrigger>
            <TabsTrigger value="admin">ADMIN</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Panel title="Office Bearers" icon={<Shield className="h-5 w-5" />}>
                <div className="space-y-2">
                  {officeBearers.map((o) => (
                    <div key={o.id} className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 font-medium text-blue-900">
                      {o.role} - {o.name}
                    </div>
                  ))}
                </div>
              </Panel>
              <Panel title="Gents" icon={<Users className="h-5 w-5" />}>
                <div className="text-3xl font-bold text-blue-900">{memberGroups.Gents.length}</div>
                <p className="text-sm text-slate-600">Full members</p>
              </Panel>
              <Panel title="Ladies" icon={<Users className="h-5 w-5" />}>
                <div className="text-3xl font-bold text-blue-900">{memberGroups.Ladies.length}</div>
                <p className="text-sm text-slate-600">Full members</p>
              </Panel>
              <Panel title="Associate" icon={<Users className="h-5 w-5" />}>
                <div className="text-3xl font-bold text-blue-900">{memberGroups.Associate.length}</div>
                <p className="text-sm text-slate-600">Associate members</p>
              </Panel>
            </div>
          </TabsContent>

          <TabsContent value="diary">
            <Panel title="Diary and Fixtures" icon={<CalendarDays className="h-5 w-5" />}>
              <div className="space-y-3">
                {diary.map((item) => (
                  <div key={item.id} className="grid gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 md:grid-cols-[120px_90px_1fr_90px_1fr] md:items-center">
                    <div className="font-semibold text-blue-900">{item.date}</div>
                    <div className="text-sm font-medium">{item.section}</div>
                    <div>{item.opponent}</div>
                    <Badge className={item.venue === "Home" ? "bg-blue-700" : "bg-cyan-700"}>{item.venue}</Badge>
                    <div className="text-sm text-slate-600">{item.notes}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid gap-6 lg:grid-cols-3">
              {Object.entries(memberGroups).map(([section, list]) => (
                <Panel key={section} title={`${section} (${list.length})`} icon={<Users className="h-5 w-5" />}>
                  <div className="space-y-2 max-h-[700px] overflow-auto pr-1">
                    {list.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </Panel>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="board">
            <Panel title="Noticeboard" icon={<Info className="h-5 w-5" />}>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div key={notice.id} className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-slate-700">
                    {notice.text}
                  </div>
                ))}
              </div>
            </Panel>
          </TabsContent>

          <TabsContent value="rules">
            <Panel title="Club Rules" icon={<ClipboardList className="h-5 w-5" />}>
              <div className="space-y-3">
                {rules.map((rule) => (
                  <div key={rule.id} className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-slate-700">
                    {rule.text}
                  </div>
                ))}
              </div>
            </Panel>
          </TabsContent>

          <TabsContent value="internal">
            <div className="grid gap-6 lg:grid-cols-2">
              <Panel title="Gents Club Championship" icon={<Trophy className="h-5 w-5" />}>
                <div className="grid gap-4 md:grid-cols-2">
                  {gentsComp.map((match) => (
                    <DrawCard key={match.id} match={match} />
                  ))}
                </div>
              </Panel>
              <Panel title="Ladies Club Championship" icon={<Trophy className="h-5 w-5" />}>
                <div className="grid gap-4 md:grid-cols-2">
                  {ladiesComp.map((match) => (
                    <DrawCard key={match.id} match={match} />
                  ))}
                </div>
              </Panel>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            {!adminAccess ? (
              <Panel title="Admin Login" icon={<Lock className="h-5 w-5" />}>
                <div className="max-w-md space-y-3">
                  <Input placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
                  <Button onClick={login} className="bg-blue-700 hover:bg-blue-800">
                    <Lock className="mr-2 h-4 w-4" />Login
                  </Button>
                </div>
              </Panel>
            ) : (
              <div className="space-y-6">
                <Panel
                  title="Admin Controls"
                  icon={<Lock className="h-5 w-5" />}
                  action={
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={resetAllData} variant="destructive">
                        Reset Data
                      </Button>
                      <Button onClick={() => setAdminAccess(false)} className="bg-white text-black hover:bg-slate-100">
                        <LogOut className="mr-2 h-4 w-4" />Logout
                      </Button>
                    </div>
                  }
                >
                  <p className="text-sm text-slate-600">
                    Changes now save automatically on this device and browser.
                  </p>
                </Panel>

                <Panel title="Edit Office Bearers" icon={<Shield className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {officeBearers.map((o) => (
                      <div key={o.id} className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                        <Input value={o.role} onChange={(e) => setOfficeBearers(officeBearers.map((x) => x.id === o.id ? { ...x, role: e.target.value } : x))} />
                        <Input value={o.name} onChange={(e) => setOfficeBearers(officeBearers.map((x) => x.id === o.id ? { ...x, name: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setOfficeBearers(officeBearers.filter((x) => x.id !== o.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
                      <Input placeholder="Role" value={newBearer.role} onChange={(e) => setNewBearer({ ...newBearer, role: e.target.value })} />
                      <Input placeholder="Name" value={newBearer.name} onChange={(e) => setNewBearer({ ...newBearer, name: e.target.value })} />
                      <Button onClick={() => {
                        if (!newBearer.role.trim() || !newBearer.name.trim()) return;
                        setOfficeBearers([...officeBearers, { id: nextId(officeBearers), ...newBearer }]);
                        setNewBearer({ role: "", name: "" });
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>

                <Panel title="Edit Diary" icon={<CalendarDays className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {diary.map((item) => (
                      <div key={item.id} className="grid gap-2 md:grid-cols-[120px_100px_1fr_100px_1fr_auto]">
                        <Input value={item.date} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, date: e.target.value } : x))} />
                        <Input value={item.section} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, section: e.target.value } : x))} />
                        <Input value={item.opponent} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, opponent: e.target.value } : x))} />
                        <Input value={item.venue} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, venue: e.target.value } : x))} />
                        <Input value={item.notes} onChange={(e) => setDiary(diary.map((x) => x.id === item.id ? { ...x, notes: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setDiary(diary.filter((x) => x.id !== item.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[120px_100px_1fr_100px_1fr_auto]">
                      <Input placeholder="Date" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
                      <Input placeholder="Section" value={newDiary.section} onChange={(e) => setNewDiary({ ...newDiary, section: e.target.value })} />
                      <Input placeholder="Opponent" value={newDiary.opponent} onChange={(e) => setNewDiary({ ...newDiary, opponent: e.target.value })} />
                      <Input placeholder="Venue" value={newDiary.venue} onChange={(e) => setNewDiary({ ...newDiary, venue: e.target.value })} />
                      <Input placeholder="Notes" value={newDiary.notes} onChange={(e) => setNewDiary({ ...newDiary, notes: e.target.value })} />
                      <Button onClick={() => {
                        if (!newDiary.date.trim() || !newDiary.opponent.trim()) return;
                        setDiary([...diary, { id: nextId(diary), ...newDiary }]);
                        setNewDiary({ date: "", section: "Gents", opponent: "", venue: "Home", notes: "" });
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>

                <Panel title="Edit Members" icon={<Users className="h-5 w-5" />}>
                  <div className="space-y-2 max-h-[500px] overflow-auto pr-1">
                    {members.map((m) => (
                      <div key={m.id} className="grid gap-2 md:grid-cols-[1fr_100px_140px_1fr_auto]">
                        <Input value={m.name} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, name: e.target.value } : x))} />
                        <Input value={m.section} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, section: e.target.value } : x))} />
                        <Input value={m.phone} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, phone: e.target.value } : x))} />
                        <Input value={m.email} onChange={(e) => setMembers(members.map((x) => x.id === m.id ? { ...x, email: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setMembers(members.filter((x) => x.id !== m.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-[1fr_100px_140px_1fr_auto]">
                    <Input placeholder="Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} />
                    <Input placeholder="Section" value={newMember.section} onChange={(e) => setNewMember({ ...newMember, section: e.target.value })} />
                    <Input placeholder="Phone" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} />
                    <Input placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} />
                    <Button onClick={() => {
                      if (!newMember.name.trim()) return;
                      setMembers([...members, { id: nextId(members), ...newMember }]);
                      setNewMember({ name: "", section: "Gents", phone: "", email: "" });
                    }}><Plus className="h-4 w-4" /></Button>
                  </div>
                </Panel>

                <Panel title="Edit Noticeboard" icon={<Info className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {notices.map((n) => (
                      <div key={n.id} className="grid gap-2 md:grid-cols-[1fr_auto]">
                        <Input value={n.text} onChange={(e) => setNotices(notices.map((x) => x.id === n.id ? { ...x, text: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setNotices(notices.filter((x) => x.id !== n.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                      <Input placeholder="New notice" value={newNotice} onChange={(e) => setNewNotice(e.target.value)} />
                      <Button onClick={() => {
                        if (!newNotice.trim()) return;
                        setNotices([...notices, { id: nextId(notices), text: newNotice }]);
                        setNewNotice("");
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>

                <Panel title="Edit Rules" icon={<ClipboardList className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {rules.map((r) => (
                      <div key={r.id} className="grid gap-2 md:grid-cols-[1fr_auto]">
                        <Textarea value={r.text} onChange={(e) => setRules(rules.map((x) => x.id === r.id ? { ...x, text: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setRules(rules.filter((x) => x.id !== r.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[1fr_auto]">
                      <Textarea placeholder="New rule" value={newRule} onChange={(e) => setNewRule(e.target.value)} />
                      <Button onClick={() => {
                        if (!newRule.trim()) return;
                        setRules([...rules, { id: nextId(rules), text: newRule }]);
                        setNewRule("");
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>

                <Panel title="Edit Gents Club Championship" icon={<Trophy className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {gentsComp.map((m) => (
                      <div key={m.id} className="grid gap-2 md:grid-cols-[140px_1fr_1fr_auto]">
                        <Input value={m.round} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, round: e.target.value } : x))} />
                        <Input value={m.player1} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, player1: e.target.value } : x))} />
                        <Input value={m.player2} onChange={(e) => setGentsComp(gentsComp.map((x) => x.id === m.id ? { ...x, player2: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setGentsComp(gentsComp.filter((x) => x.id !== m.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[140px_1fr_1fr_auto]">
                      <Input placeholder="Round" value={newGentsMatch.round} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, round: e.target.value })} />
                      <Input placeholder="Player 1" value={newGentsMatch.player1} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, player1: e.target.value })} />
                      <Input placeholder="Player 2" value={newGentsMatch.player2} onChange={(e) => setNewGentsMatch({ ...newGentsMatch, player2: e.target.value })} />
                      <Button onClick={() => {
                        if (!newGentsMatch.player1.trim() || !newGentsMatch.player2.trim()) return;
                        setGentsComp([...gentsComp, { id: nextId(gentsComp), ...newGentsMatch }]);
                        setNewGentsMatch({ round: "Quarter Final", player1: "", player2: "" });
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>

                <Panel title="Edit Ladies Club Championship" icon={<Trophy className="h-5 w-5" />}>
                  <div className="space-y-2">
                    {ladiesComp.map((m) => (
                      <div key={m.id} className="grid gap-2 md:grid-cols-[140px_1fr_1fr_auto]">
                        <Input value={m.round} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, round: e.target.value } : x))} />
                        <Input value={m.player1} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, player1: e.target.value } : x))} />
                        <Input value={m.player2} onChange={(e) => setLadiesComp(ladiesComp.map((x) => x.id === m.id ? { ...x, player2: e.target.value } : x))} />
                        <Button variant="destructive" onClick={() => setLadiesComp(ladiesComp.filter((x) => x.id !== m.id))}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <div className="grid gap-2 md:grid-cols-[140px_1fr_1fr_auto]">
                      <Input placeholder="Round" value={newLadiesMatch.round} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, round: e.target.value })} />
                      <Input placeholder="Player 1" value={newLadiesMatch.player1} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, player1: e.target.value })} />
                      <Input placeholder="Player 2" value={newLadiesMatch.player2} onChange={(e) => setNewLadiesMatch({ ...newLadiesMatch, player2: e.target.value })} />
                      <Button onClick={() => {
                        if (!newLadiesMatch.player1.trim() || !newLadiesMatch.player2.trim()) return;
                        setLadiesComp([...ladiesComp, { id: nextId(ladiesComp), ...newLadiesMatch }]);
                        setNewLadiesMatch({ round: "Quarter Final", player1: "", player2: "" });
                      }}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </Panel>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}