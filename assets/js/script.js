// DOM Elements
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const iconEl = document.getElementById("icon");
const greetingEl = document.getElementById("greeting");
const ampmBadge = document.getElementById("ampmBadge");
const tzEl = document.getElementById("tz");
const formatToggle = document.getElementById("formatToggle");

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const stars = document.getElementById("stars");

let is24Hour = false;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  let seconds = now.getSeconds().toString().padStart(2, "0");

  let ampm = hours >= 12 ? "PM" : "AM";

  let displayHours = hours % 12 || 12;
  const finalHours = is24Hour
    ? hours.toString().padStart(2, "0")
    : displayHours;
  const finalFormat = is24Hour ? "" : ` ${ampm}`;

  if (timeEl)
    timeEl.innerText = `${finalHours}:${minutes}:${seconds}${finalFormat}`;
  if (dateEl) dateEl.innerText = now.toDateString();
  if (ampmBadge) ampmBadge.innerText = is24Hour ? "24H" : ampm;

  if (tzEl) tzEl.innerText = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (greetingEl) {
    if (hours < 12) greetingEl.innerText = "Good Morning 🌤️";
    else if (hours < 17) greetingEl.innerText = "Good Afternoon ☀️";
    else if (hours < 20) greetingEl.innerText = "Good Evening 🌇";
    else greetingEl.innerText = "Good Night 🌙";
  }

  updateVisuals(ampm);
}

function updateVisuals(ampm) {
  if (ampm === "AM") {
    document.body.style.background =
      "linear-gradient(120deg, #6dd5fa, #ffffff)";
    if (iconEl) iconEl.innerText = "☀️";

    if (sun) sun.style.opacity = 1;
    if (moon) moon.style.opacity = 0;
    if (stars) stars.style.opacity = 0;
  } else {
    document.body.style.background =
      "linear-gradient(120deg, #000428, #004e92)";
    if (iconEl) iconEl.innerText = "🌙";

    if (sun) sun.style.opacity = 0;
    if (moon) moon.style.opacity = 1;
    if (stars) stars.style.opacity = 1;
  }
}

// Safe event listener
if (formatToggle) {
  formatToggle.addEventListener("change", () => {
    is24Hour = formatToggle.checked;
    updateClock();
  });
}

updateClock();
setInterval(updateClock, 1000);
