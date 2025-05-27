const calendarDays = document.getElementById("calendarDays");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function populateMonthSelect() {
    monthNames.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = month;
      monthSelect.appendChild(option);
    });
    monthSelect.value = currentMonth;
  }

  function populateYearSelect() {
    const startYear = currentYear - 20;
    const endYear = currentYear + 20;
    for (let y = startYear; y <= endYear; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.text = y;
      yearSelect.appendChild(option);
    }
    yearSelect.value = currentYear;
  }

  function renderCalendar(month, year) {
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    calendarDays.innerHTML += `
      <div class="${isToday ? "today" : ""}">${day}</div>
    `;
  }

  // Set dropdowns
  monthSelect.value = month;
  yearSelect.value = year;

  // ✅ THIS IS CRITICAL
  enableEventClick(month, year);
}

  function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    renderCalendar(currentMonth, currentYear);
  }

  // Event Listeners
  monthSelect.addEventListener("change", () => {
    currentMonth = parseInt(monthSelect.value);
    renderCalendar(currentMonth, currentYear);
  });

  yearSelect.addEventListener("change", () => {
    currentYear = parseInt(yearSelect.value);
    renderCalendar(currentMonth, currentYear);
  });

  prevMonthBtn.addEventListener("click", () => changeMonth(-1));
  nextMonthBtn.addEventListener("click", () => changeMonth(1));

  // Init
  populateMonthSelect();
  populateYearSelect();
  renderCalendar(currentMonth, currentYear);



// --------------------------------Upcoming Events--------------------------------------



const eventModal = new bootstrap.Modal(document.getElementById("eventModal"));
  const eventForm = document.getElementById("eventForm");
  const eventTitle = document.getElementById("eventTitle");
  const eventTime = document.getElementById("eventTime");
  const eventDate = document.getElementById("eventDate");
  const eventIndex = document.getElementById("eventIndex");
  const eventList = document.getElementById("eventList");
  const modalTitle = document.getElementById("modalTitle");
  const deleteBtn = document.getElementById("deleteEventBtn");

  let events = JSON.parse(localStorage.getItem("calendarEvents")) || [];

  function showUpcomingEvents() {
    const sortedEvents = [...events].sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    eventList.innerHTML = "";

    sortedEvents.forEach((evt, idx) => {
      const dateObj = new Date(evt.date);
      const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const timeStr = formatTime(evt.time);

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <strong>${evt.title}</strong> - ${timeStr} on ${dateStr}
        </div>
        <button class="btn btn-sm btn-outline-secondary" onclick="editEvent(${idx})">Edit</button>
      `;
      eventList.appendChild(li);
    });
  }

  function formatTime(timeStr) {
    const [hour, min] = timeStr.split(":");
    const h = parseInt(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${min} ${suffix}`;
  }

  function enableEventClick(month, year) {
    const dayCells = calendarDays.querySelectorAll("div");
    let offset = new Date(year, month, 1).getDay();

    dayCells.forEach((cell, i) => {
      const day = i - offset + 1;
      const isValidDay = day > 0 && day <= new Date(year, month + 1, 0).getDate();

      if (isValidDay) {
        const selectedDate = new Date(year, month, day);
        const dateStr = selectedDate.toISOString().split("T")[0];

        cell.style.cursor = "pointer";
        cell.onclick = () => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);

          if (selectedDate < now) {
            alert("Cannot add events to past dates.");
            return;
          }

          modalTitle.textContent = "Add Event";
          deleteBtn.classList.add("d-none");

          eventDate.value = dateStr;
          eventForm.reset();
          eventIndex.value = "";
          eventModal.show();
        };
      }
    });
  }

  // Submit Add/Edit
  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newEvent = {
      date: eventDate.value,
      title: eventTitle.value,
      time: eventTime.value
    };

    const index = eventIndex.value;
    if (index) {
      events[parseInt(index)] = newEvent;
    } else {
      events.push(newEvent);
    }

    localStorage.setItem("calendarEvents", JSON.stringify(events));
    showUpcomingEvents();
    eventModal.hide();
  });

  // Edit Event
  window.editEvent = function (index) {
    const evt = events[index];
    modalTitle.textContent = "Edit Event";
    eventDate.value = evt.date;
    eventTitle.value = evt.title;
    eventTime.value = evt.time;
    eventIndex.value = index;

    deleteBtn.classList.remove("d-none");
    eventModal.show();
  };

  // Delete Event
  deleteBtn.addEventListener("click", () => {
    const index = parseInt(eventIndex.value);
    if (!isNaN(index)) {
      events.splice(index, 1);
      localStorage.setItem("calendarEvents", JSON.stringify(events));
      showUpcomingEvents();
      eventModal.hide();
    }
  });

  // Initial
  showUpcomingEvents();

