import React, { useState } from "react";
import "./App.css";
import logo from "./assets/lenzie-logo.png";

const DEFAULT_ADMIN_PIN = "1234";
const DEFAULT_MEMBER_PIN = "2026";

export default function App() {
  const [enteredPin, setEnteredPin] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  const [adminPin, setAdminPin] = useState(
    localStorage.getItem("lenzieAdminPin") || DEFAULT_ADMIN_PIN
  );

  const [memberPin, setMemberPin] = useState(
    localStorage.getItem("lenzieMemberPin") || DEFAULT_MEMBER_PIN
  );

  const [newAdminPin, setNewAdminPin] = useState("");
  const [newMemberPin, setNewMemberPin] = useState("");

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Welcome to Lenzie Bowling Club",
      text: "Welcome to our new club app.",
    },
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Opening Day",
      date: "Saturday 2nd May 2026",
      time: "2:00pm",
    },
  ]);

  const [newNotice, setNewNotice] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");

  function login() {
    if (enteredPin === adminPin) {
      setLoggedIn(true);
      setAdminMode(true);
      return;
    }

    if (enteredPin === memberPin) {
      setLoggedIn(true);
      setAdminMode(false);
      return;
    }

    alert("Incorrect PIN");
  }

  function logout() {
    setLoggedIn(false);
    setAdminMode(false);
    setEnteredPin("");
  }

  function saveAdminPin() {
    localStorage.setItem("lenzieAdminPin", newAdminPin);
    setAdminPin(newAdminPin);
    setNewAdminPin("");
    alert("Admin PIN changed");
  }

  function saveMemberPin() {
    localStorage.setItem("lenzieMemberPin", newMemberPin);
    setMemberPin(newMemberPin);
    setNewMemberPin("");
    alert("Member PIN changed");
  }

  function addNotice() {
    if (!newNotice) return;

    setNotices([
      {
        id: Date.now(),
        title: "Club Notice",
        text: newNotice,
      },
      ...notices,
    ]);

    setNewNotice("");
  }

  function addEvent() {
    if (!newEvent) return;

    setEvents([
      {
        id: Date.now(),
        title: newEvent,
        date: newEventDate,
        time: newEventTime,
      },
      ...events,
    ]);

    setNewEvent("");
    setNewEventDate("");
    setNewEventTime("");
  }

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-box">
          <img src={logo} alt="Lenzie Bowling Club" className="logo" />

          <h1>Lenzie Bowling Club</h1>

          <p>Members diary, notices and club information</p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
          />

          <button onClick={login}>Enter App</button>

          <div className="pin-info">
            <p>Admin PIN: 1234</p>
            <p>Member PIN: 2026</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Lenzie Bowling Club" className="small-logo" />

          <div>
            <h1>Lenzie Bowling Club</h1>
            <p>Club App</p>
          </div>
        </div>

        <button onClick={logout}>Logout</button>
      </header>

      <div className="content">
        <div className="section">
          <h2>Diary Events</h2>

          {events.map((event) => (
            <div className="card" key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
          ))}

          {adminMode && (
            <div className="admin-box">
              <h3>Add Event</h3>

              <input
                placeholder="Event title"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
              />

              <input
                placeholder="Date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
              />

              <input
                placeholder="Time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
              />

              <button onClick={addEvent}>Add Event</button>
            </div>
          )}
        </div>

        <div className="section">
          <h2>Club Notices</h2>

          {notices.map((notice) => (
            <div className="card" key={notice.id}>
              <h3>{notice.title}</h3>
              <p>{notice.text}</p>
            </div>
          ))}

          {adminMode && (
            <div className="admin-box">
              <h3>Add Notice</h3>

              <textarea
                placeholder="Notice text"
                value={newNotice}
                onChange={(e) => setNewNotice(e.target.value)}
              />

              <button onClick={addNotice}>Add Notice</button>
            </div>
          )}
        </div>

        {adminMode && (
          <div className="section">
            <h2>Admin Settings</h2>

            <div className="admin-box">
              <h3>Change Admin PIN</h3>

              <input
                placeholder="New admin PIN"
                value={newAdminPin}
                onChange={(e) => setNewAdminPin(e.target.value)}
              />

              <button onClick={saveAdminPin}>
                Save Admin PIN
              </button>
            </div>

            <div className="admin-box">
              <h3>Change Member PIN</h3>

              <input
                placeholder="New member PIN"
                value={newMemberPin}
                onChange={(e) => setNewMemberPin(e.target.value)}
              />

              <button onClick={saveMemberPin}>
                Save Member PIN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
