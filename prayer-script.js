const prayer = document.getElementById("prayer");
const dateContainer = document.getElementById("date-container");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

let currentDate = new Date();

function saveData() {
  const dateKey = currentDate.toDateString();
  const prayerData = Array.from(prayer.children).map((item) => ({
    text: item.textContent,
    checked: item.classList.contains("checked"),
  }));
  localStorage.setItem(dateKey, JSON.stringify(prayerData));
}

function showData() {
  const dateKey = currentDate.toDateString();
  const data = localStorage.getItem(dateKey);
  if (data) {
    const prayerData = JSON.parse(data);
    prayer.innerHTML = "";
    prayerData.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.text;
      if (item.checked) {
        li.classList.add("checked");
      }
      prayer.appendChild(li);
    });
  } else {
    // If there's no data for the current date, reset the list to default state
    prayer.innerHTML = `
      <li>Fajr</li>
      <li>Dhuhr</li>
      <li>Asr</li>
      <li>Maghrib</li>
      <li>Isha</li>
    `;
  }
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

function displayDate() {
  dateContainer.textContent = formatDate(currentDate);
  showData();
}

prayer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    }
  },
  false
);

leftButton.addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() - 1);
  displayDate();
});

rightButton.addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() + 1);
  displayDate();
});

displayDate();
