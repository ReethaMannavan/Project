 document.addEventListener('DOMContentLoaded', function() {
            const calendarBody = document.getElementById('calendar-body');
            const monthSelector = document.getElementById('month-selector');
            const yearSelector = document.getElementById('year-selector');
            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');
            const todayBtn = document.getElementById('today-btn');
            const processPayrollBtn = document.getElementById('process-payroll');
            
            let selectedDates = new Set();
            let currentDate = new Date();

            // Initialize year dropdown
            const currentYear = currentDate.getFullYear();
            for (let year = currentYear - 10; year <= currentYear + 10; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                if (year === currentYear) option.selected = true;
                yearSelector.appendChild(option);
            }

        function generateCalendar() {
            calendarBody.innerHTML = '';
            const month = parseInt(monthSelector.value);
            const year = parseInt(yearSelector.value);
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const today = new Date();

            let dateCounter = 1;
            for (let week = 0; week < 5; week++) {
                const row = document.createElement('tr');
                
                for (let day = 0; day < 7; day++) {
                    const cell = document.createElement('td');
                    if (week === 0 && day === 0) {
                        cell.classList.add('empty');
                    } else if (dateCounter <= daysInMonth) {
                        const cellDate = new Date(year, month, dateCounter);
                        cell.innerHTML = `<div class="date-number">${dateCounter}</div>`;
                        cell.dataset.date = cellDate.toISOString().split('T')[0];

                        // Highlight today
                        if (cellDate.toDateString() === today.toDateString()) {
                            cell.classList.add('today');
                        }

                        // Handle selection
                        if (selectedDates.has(cell.dataset.date)) {
                            cell.classList.add('selected');
                        }

                        cell.addEventListener('click', function() {
                            this.classList.toggle('selected');
                            selectedDates[this.classList.contains('selected') ? 
                                'add' : 'delete'](this.dataset.date);
                        });

                        dateCounter++;
                    } else {
                        cell.classList.add('empty');
                    }
                    row.appendChild(cell);
                }
                calendarBody.appendChild(row);
            }
        }

        // Event listeners
        monthSelector.addEventListener('change', generateCalendar);
        yearSelector.addEventListener('change', generateCalendar);
        
        prevMonthBtn.addEventListener('click', () => {
            if (monthSelector.value > 0) {
                monthSelector.value--;
            } else {
                monthSelector.value = 11;
                yearSelector.value--;
            }
            generateCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            if (monthSelector.value < 11) {
                monthSelector.value++;
            } else {
                monthSelector.value = 0;
                yearSelector.value++;
            }
            generateCalendar();
        });

        todayBtn.addEventListener('click', () => {
            const today = new Date();
            monthSelector.value = today.getMonth();
            yearSelector.value = today.getFullYear();
            generateCalendar();
        });

        processPayrollBtn.addEventListener('click', () => {
            const dates = Array.from(selectedDates).sort();
            if (dates.length === 0) {
                alert('Please select at least one date');
                return;
            }
            alert(`Processing payroll for:\n${dates.join('\n')}`);
        });

        // Initial generation
        generateCalendar();
        });
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    

        function showEventForm(date) {
            document.getElementById('eventForm').style.display = 'block';
            document.getElementById('eventDate').value = 
                `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        }

        function closeForm() {
            document.getElementById('eventForm').style.display = 'none';
        }

        function saveEvent() {
            const newEvent = {
                title: document.getElementById('eventTitle').value,
                time: document.getElementById('eventTime').value,
                date: document.getElementById('eventDate').value,
                id: Date.now()
            };

            events.push(newEvent);
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            renderEvents();
            closeForm();
        }

        function renderEvents() {
            const container = document.getElementById('eventsContainer');
            container.innerHTML = '';

            events.sort((a, b) => new Date(a.date) - new Date(b.date));

            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.innerHTML = `
                    <div>
                        <h1>${event.title}</h1>
                        <p>Date: ${new Date(event.date).toDateString()}</p>
                        <p>Time: ${event.time}</p>
                    </div>
                    <button onclick="deleteEvent(${event.id})">Delete</button>
                `;
                container.appendChild(eventElement);
            });
        }

        function deleteEvent(id) {
            events = events.filter(event => event.id !== id);
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            renderEvents();
        }

        // Modify calendar day creation to include click handler
        function generateCalendar(month, year) {
            // ... (previous calendar generation code) ...
            
            // Inside the day creation loop:
            dayElement.addEventListener('click', () => {
                const selectedDate = new Date(year, month, day);
                showEventForm(selectedDate);
            });
            
            // ... (rest of calendar generation code) ...
        }

        // Initial render
        renderEvents();