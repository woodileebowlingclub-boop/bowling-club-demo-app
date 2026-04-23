import React, { useMemo, useState } from "react";

const CLUB_NAME = "Rockview Bowling Club";
const CLUB_SUBTITLE = "Demo club app with fictitious members, fixtures, notices and club information";

const tabs = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "diary", label: "Diary", icon: "📅" },
  { key: "members", label: "Members", icon: "👥" },
  { key: "noticeboard", label: "Noticeboard", icon: "📌" },
  { key: "competitions", label: "Competitions", icon: "🏆" },
  { key: "office", label: "Office Bearers", icon: "🧾" },
  { key: "coaches", label: "Coaches", icon: "🎯" },
  { key: "documents", label: "Documents", icon: "📄" },
];

const diaryEvents = [
  {
    id: 1,
    title: "Opening Day",
    date: "Saturday 2 May 2026",
    time: "2:00 pm",
    location: "Main Green",
    description: "Members, guests and visitors welcome. Light refreshments in the clubhouse after play.",
  },
  {
    id: 2,
    title: "Tuesday Practice Evening",
    date: "Tuesday 5 May 2026",
    time: "6:30 pm",
    location: "Club Green",
    description: "Friendly roll-up for all members. New bowlers welcome to come along and try the game.",
  },
  {
    id: 3,
    title: "Committee Meeting",
    date: "Wednesday 13 May 2026",
    time: "7:00 pm",
    location: "Clubhouse Lounge",
    description: "Monthly committee meeting. Office bearers and committee members only.",
  },
  {
    id: 4,
    title: "Ladies Friendly v Meadowbank",
    date: "Sunday 17 May 2026",
    time: "2:00 pm",
    location: "Away Match",
    description: "Transport leaves club at 1:00 pm. Smart club tops requested.",
  },
  {
    id: 5,
    title: "Try Bowls Open Session",
    date: "Saturday 23 May 2026",
    time: "11:00 am",
    location: "Main Green",
    description: "Open to the local community. Flat shoes only. Bowls can be provided by the club.",
  },
];

const notices = [
  {
    id: 1,
    title: "Membership Offer",
    body: "New members joining this season receive a reduced introductory subscription for their first year.",
    date: "Posted 20 April 2026",
  },
  {
    id: 2,
    title: "Green Maintenance",
    body: "The green will be closed on Monday morning for cutting and seasonal maintenance. Please avoid practice until 1:00 pm.",
    date: "Posted 18 April 2026",
  },
  {
    id: 3,
    title: "Volunteers Required",
    body: "We are looking for helpers for teas, raffle sales and match-day setup throughout the season.",
    date: "Posted 16 April 2026",
  },
];

const members = [
  { id: 1, name: "James McLaren", section: "Gents", phone: "07700 900101" },
  { id: 2, name: "Margaret Boyd", section: "Ladies", phone: "07700 900102" },
  { id: 3, name: "Alan Fraser", section: "Gents", phone: "07700 900103" },
  { id: 4, name: "Jean Robertson", section: "Ladies", phone: "07700 900104" },
  { id: 5, name: "Robert Sinclair", section: "Associate", phone: "07700 900105" },
  { id: 6, name: "Fiona Kerr", section: "Ladies", phone: "07700 900106" },
  { id: 7, name: "David Thomson", section: "Gents", phone: "07700 900107" },
  { id: 8, name: "Moira Campbell", section: "Associate", phone: "07700 900108" },
];

const competitions = [
  {
    id: 1,
    name: "Club Singles Championship",
    entryCloses: "31 May 2026",
    startDate: "6 June 2026",
    details: "Open to all full members. Draw will be posted in the clubhouse and app.",
  },
  {
    id: 2,
    name: "Pairs Knockout",
    entryCloses: "14 June 2026",
    startDate: "20 June 2026",
    details: "Choose your own partner. First round to be completed within two weeks.",
  },
  {
    id: 3,
    name: "Mixed Triples Day",
    entryCloses: "1 July 2026",
    startDate: "11 July 2026",
    details: "Friendly one-day competition with lunch included in the entry fee.",
  },
];

const officeBearers = [
  {
    role: "President",
    name: "William Hart",
    phone: "07700 900201",
    email: "president@rockviewbowlingclub.co.uk",
  },
  {
    role: "Secretary",
    name: "Elaine Morton",
    phone: "07700 900202",
    email: "secretary@rockviewbowlingclub.co.uk",
  },
  {
    role: "Treasurer",
    name: "Gordon McBride",
    phone: "07700 900203",
    email: "treasurer@rockviewbowlingclub.co.uk",
  },
  {
    role: "Match Secretary",
    name: "Sandra Allan",
    phone: "07700 900204",
    email: "matches@rockviewbowlingclub.co.uk",
  },
];

const coaches = [
  {
    id: 1,
    name: "Peter Lawson",
    qualification: "Club Coach",
    phone: "07700 900301",
    email: "coach1@rockviewbowlingclub.co.uk",
  },
  {
    id: 2,
    name: "Linda Ferguson",
    qualification: "Volunteer Coach",
    phone: "07700 900302",
    email: "coach2@rockviewbowlingclub.co.uk",
  },
];

const documents = [
  { id: 1, name: "Membership Form 2026", category: "Forms" },
  { id: 2, name: "Club Constitution", category: "Rules" },
  { id: 3, name: "Competition Entry Sheet", category: "Competitions" },
  { id: 4, name: "Fixture List", category: "Fixtures" },
];

function DemoLogo() {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/70 bg-white text-2xl font-bold text-sky-800 shadow-md md:h-20 md:w-20">
      RB
    </div>
  );
}

function SectionCard({ title, children, actionText }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm md:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-sky-900">{title}</h2>
        {actionText ? (
          <button className="inline-flex items-center gap-1 rounded-full border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-800 hover:bg-sky-50">
            {actionText}
            <span>→</span>
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function EventCard({ item }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:p-5">
      <h3 className="text-xl font-bold text-sky-900">{item.title}</h3>
      <div className="mt-2 space-y-1 text-slate-700">
        <div className="flex items-center gap-2"><span>📅</span> {item.date}</div>
        <div className="flex items-center gap-2"><span>🕒</span> {item.time}</div>
        <div className="flex items-center gap-2"><span>📍</span> {item.location}</div>
      </div>
      <p className="mt-3 text-base text-slate-800">{item.description}</p>
    </div>
  );
}

function ContactCard({ title, name, phone, email }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-slate-900">{name}</h3>
      <div className="mt-3 space-y-2 text-slate-700">
        <div className="flex items-center gap-2"><span>📞</span> {phone}</div>
        <div className="flex items-center gap-2 break-all"><span>✉️</span> {email}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const q = memberSearch.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.section.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q)
    );
  }, [memberSearch]);

  const renderHome = () => (
    <div className="space-y-6">
      <SectionCard title="Welcome" actionText="View diary">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-lg leading-8 text-slate-800">
              Welcome to the demo version of a modern bowling club app. This sample uses fictional names,
              fictional events and example club information so you can show other clubs how a members app
              could look before using real data.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-700">Members</p>
                <p className="mt-1 text-3xl font-bold text-sky-900">82</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-700">Events this month</p>
                <p className="mt-1 text-3xl font-bold text-sky-900">9</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-700">Competitions open</p>
                <p className="mt-1 text-3xl font-bold text-sky-900">3</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-sm font-semibold text-sky-700">Coaches</p>
                <p className="mt-1 text-3xl font-bold text-sky-900">2</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-sky-700 to-cyan-700 p-5 text-white shadow-lg">
            <h3 className="text-xl font-bold">Quick Information</h3>
            <div className="mt-4 space-y-3 text-sm md:text-base">
              <p><span className="font-semibold">Club Night:</span> Tuesday at 6:30 pm</p>
              <p><span className="font-semibold">Address:</span> 18 Riverside Avenue, Glasgow</p>
              <p><span className="font-semibold">Visitors:</span> Always welcome</p>
              <p><span className="font-semibold">Dress:</span> Smart casual for social events</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Next Events" actionText="Open diary">
          <div className="space-y-4">
            {diaryEvents.slice(0, 3).map((event) => (
              <EventCard key={event.id} item={event} />
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Latest Notices" actionText="Open noticeboard">
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xl font-bold text-sky-900">{notice.title}</h3>
                <p className="mt-2 text-slate-800">{notice.body}</p>
                <p className="mt-3 text-sm text-slate-500">{notice.date}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );

  const renderDiary = () => (
    <SectionCard title="Diary">
      <div className="space-y-4">
        {diaryEvents.map((event) => (
          <EventCard key={event.id} item={event} />
        ))}
      </div>
    </SectionCard>
  );

  const renderMembers = () => (
    <SectionCard title="Members Directory">
      <div className="mb-5">
        <input
          type="text"
          value={memberSearch}
          onChange={(e) => setMemberSearch(e.target.value)}
          placeholder="Search members by name, section or phone"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base outline-none ring-0 transition focus:border-sky-500"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredMembers.map((member) => (
          <div key={member.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-sky-700">{member.section}</p>
            <p className="mt-3 flex items-center gap-2 text-slate-700"><span>📞</span> {member.phone}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderNoticeboard = () => (
    <SectionCard title="Noticeboard">
      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold text-sky-900">{notice.title}</h3>
            <p className="mt-2 text-slate-800">{notice.body}</p>
            <p className="mt-3 text-sm text-slate-500">{notice.date}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderCompetitions = () => (
    <SectionCard title="Competitions">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {competitions.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-bold text-sky-900">{item.name}</h3>
            <p className="mt-3 text-slate-700"><span className="font-semibold">Entry closes:</span> {item.entryCloses}</p>
            <p className="mt-1 text-slate-700"><span className="font-semibold">Starts:</span> {item.startDate}</p>
            <p className="mt-3 text-slate-800">{item.details}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderOffice = () => (
    <SectionCard title="Office Bearers">
      <div className="grid gap-4 lg:grid-cols-2">
        {officeBearers.map((person) => (
          <ContactCard
            key={person.role}
            title={person.role}
            name={person.name}
            phone={person.phone}
            email={person.email}
          />
        ))}
      </div>
    </SectionCard>
  );

  const renderCoaches = () => (
    <SectionCard title="Club Coaches">
      <div className="grid gap-4 lg:grid-cols-2">
        {coaches.map((coach) => (
          <ContactCard
            key={coach.id}
            title={coach.qualification}
            name={coach.name}
            phone={coach.phone}
            email={coach.email}
          />
        ))}
      </div>
    </SectionCard>
  );

  const renderDocuments = () => (
    <SectionCard title="Documents">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mb-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sky-800">
              {doc.category}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
              View document
              <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "diary":
        return renderDiary();
      case "members":
        return renderMembers();
      case "noticeboard":
        return renderNoticeboard();
      case "competitions":
        return renderCompetitions();
      case "office":
        return renderOffice();
      case "coaches":
        return renderCoaches();
      case "documents":
        return renderDocuments();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-cyan-800 to-sky-700 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] bg-white/90 p-5 shadow-xl backdrop-blur md:p-7">
          <div className="flex items-center gap-4 md:gap-6">
            <DemoLogo />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">{CLUB_NAME}</h1>
              <p className="mt-2 text-sm text-slate-600 md:text-xl">{CLUB_SUBTITLE}</p>
            </div>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex rounded-2xl border border-slate-200 p-3 text-slate-700 md:hidden"
            >
              {mobileOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
            </button>
          </div>
        </header>

        <nav className="rounded-[2rem] bg-sky-100/55 p-3 shadow-lg backdrop-blur">
          <div className="hidden flex-wrap gap-3 md:flex">
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition md:text-base ${
                    active
                      ? "bg-white text-sky-900 shadow"
                      : "bg-transparent text-sky-950 hover:bg-white/60"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              );
            })}
          </div>

          {mobileOpen ? (
            <div className="grid gap-2 md:hidden">
              {tabs.map((tab) => {
                const active = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setMobileOpen(false);
                    }}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                      active ? "bg-white text-sky-900 shadow" : "text-sky-950 hover:bg-white/60"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </nav>

        <main>{renderContent()}</main>
      </div>
    </div>
  );
}
