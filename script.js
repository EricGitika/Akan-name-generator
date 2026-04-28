// ─── Akan name table ──────────────────────────────────────────────────────────
const akanNames = [
  { day: "Sunday", male: "Kwasi", female: "Akosua" },
  { day: "Monday", male: "Kwadwo", female: "Adwoa" },
  { day: "Tuesday", male: "Kwabena", female: "Abenaa" },
  { day: "Wednesday", male: "Kwaku", female: "Akua" },
  { day: "Thursday", male: "Yaw", female: "Yaa" },
  { day: "Friday", male: "Kofi", female: "Afua" },
  { day: "Saturday", male: "Kwame", female: "Ama" },
];

// ─── Step 1: Retrieve user input ──────────────────────────────────────────────
function getInputs() {
  const day = parseInt(document.getElementById("day").value, 10);
  const month = parseInt(document.getElementById("month").value, 10);
  const year = parseInt(document.getElementById("year").value, 10);
  const gender = document.getElementById("gender").value;

  return { day, month, year, gender };
}

// ─── Step 2: Validate input ────────────────────────────────────────────────────
function validate(day, month, year, gender) {
  // Clear any previous error messages
  document.getElementById("date-error").textContent = "";
  document.getElementById("gender-error").textContent = "";

  let isValid = true;

  if (isNaN(day) || day < 1 || day > 31) {
    document.getElementById("date-error").textContent =
      "Day must be between 1 and 31.";
    isValid = false;
  } else if (isNaN(month) || month < 1 || month > 12) {
    document.getElementById("date-error").textContent =
      "Month must be between 1 and 12.";
    isValid = false;
  } else if (isNaN(year) || year < 1) {
    document.getElementById("date-error").textContent =
      "Please enter a valid year.";
    isValid = false;
  } else {
    // Check the day is valid for the given month and year.
    // new Date(year, month, 0).getDate() returns the last valid day of that month.
    const maxDays = new Date(year, month, 0).getDate();
    if (day > maxDays) {
      document.getElementById("date-error").textContent =
        "Month " + month + "/" + year + " only has " + maxDays + " days.";
      isValid = false;
    }
  }

  if (gender === "") {
    document.getElementById("gender-error").textContent =
      "Please select a gender.";
    isValid = false;
  }

  return isValid;
}

// ─── Step 3: Calculate the day of the week ────────────────────────────────────
// Formula: d = (floor(CC/4) - 2*CC - 1) + floor(5*YY/4) + floor(26*(MM+1)/10) + DD
// January and February are treated as months 11 and 12 of the previous year.
function getDayOfWeek(day, month, year) {
  if (month <= 2) {
    month += 10;
    year -= 1;
  } else {
    month -= 2;
  }

  const CC = Math.floor(year / 100); // first two digits of the year e.g 1989 → 19
  const YY = year % 100; // last two digits of the year  e.g 1989 → 89
  const MM = month;
  const DD = day;

  const d =
    (Math.floor(CC / 4) -
      2 * CC -
      1 +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (MM + 1)) / 10) +
      DD) %
    7;

  // Ensure result is non-negative
  return ((d % 7) + 7) % 7;
}

// ─── Step 4: Match day index to Akan name ─────────────────────────────────────
function getAkanName(dayIndex, gender) {
  const entry = akanNames[dayIndex];
  const name = gender === "male" ? entry.male : entry.female;

  return {
    name: name,
    dayName: entry.day,
  };
}

// ─── Step 5: Display the result on the webpage ────────────────────────────────
function displayResult(name, dayName) {
  document.getElementById("result-name").textContent = name;
  document.getElementById("result-day").textContent = "Born on a " + dayName;

  const resultEl = document.getElementById("result");

  resultEl.classList.remove("visible");
  setTimeout(function () {
    resultEl.classList.add("visible");
  }, 10);
}

// ─── Main: called by the button ───────────────────────────────────────────────
function calculate() {
  const { day, month, year, gender } = getInputs();

  if (!validate(day, month, year, gender)) return;

  const dayIndex = getDayOfWeek(day, month, year);

  const { name, dayName } = getAkanName(dayIndex, gender);

  displayResult(name, dayName);
}
