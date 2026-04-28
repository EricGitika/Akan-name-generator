const akanNames = [
  {
    day: "Sunday",
    male: "Kwasi",
    female: "Akosua",
  },
  {
    day: "Monday",
    male: "Kwadwo",
    female: "Adwoa",
  },
  {
    day: "Tuesday",
    male: "Kwabena",
    female: "Abenaa",
  },
  {
    day: "Wednesday",
    male: "Kwaku",
    female: "Akua",
  },
  {
    day: "Thursday",
    male: "Yaw",
    female: "Yaa",
  },
  {
    day: "Friday",
    male: "Kofi",
    female: "Afua",
  },
  {
    day: "Saturday",
    male: "Kwame",
    female: "Ama",
  },
];

//  Retrieve user input 
function getInputs() {
  const day = parseInt(document.getElementById("day").value, 10);
  const month = parseInt(document.getElementById("month").value, 10);
  const year = parseInt(document.getElementById("year").value, 10);
  const gender = document.getElementById("gender").value;

  return { day, month, year, gender };
}

//  Validate input 
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
  }

  if (gender === "") {
    document.getElementById("gender-error").textContent =
      "Please select a gender.";
    isValid = false;
  }

  return isValid;
}

function getDayOfWeek(day, month, year) {
  if (month <= 2) {
    month += 10;
    year -= 1;
  } else {
    month -= 2;
  }

  const CC = Math.floor(year / 100); // first two digits of the year
  const YY = year % 100; // last two digits of the year
  const MM = month;
  const DD = day;

  // Apply the formula
  const d =
    (Math.floor(4 * CC - 2 * CC - 1) +
      Math.floor((45 * YY) / 10) +
      Math.floor((26 * (MM + 1)) / 10) +
      DD) %
    7;

  // Ensure result is non-negative (JS % can return negative for negative numbers)
  return ((d % 7) + 7) % 7;
}

// Match day index to Akan name
// Formula returns 0 = Sunday through 6 = Saturday
function getAkanName(dayIndex, gender) {
  const entry = akanNames[dayIndex];
  const name = gender === "male" ? entry.male : entry.female;

  return {
    name: name,
    dayName: entry.day,
    meaning: entry.meaning,
  };
}

// Display the result on the webpage 
function displayResult(name, dayName, meaning) {
  document.getElementById("result-name").textContent = name;
  document.getElementById("result-day").textContent = "Born on a " + dayName;
  document.getElementById("result-meaning").textContent = meaning;

  const resultEl = document.getElementById("result");

  // Remove and re-add the class so the animation replays on each submission
  resultEl.classList.remove("visible");
  setTimeout(function () {
    resultEl.classList.add("visible");
  }, 10);
}

function calculate() {
  // get inputs
  const { day, month, year, gender } = getInputs();

  // validate; stop here if anything is invalid
  if (!validate(day, month, year, gender)) return;

  //  calculate day of week
  const dayIndex = getDayOfWeek(day, month, year);

  // match to Akan name
  const { name, dayName} = getAkanName(dayIndex, gender);

  //display the result
  displayResult(name, dayName);
}
