 // Sample meetings data (date format: YYYY-MM-DD)
        const meetingsData = {
            '2025-06-02': [
                { title: 'Client Meeting', time: '10:00 AM' },
                { title: 'Team Sync', time: '2:00 PM' }
            ],
            '2025-06-02': [
                { title: 'Project Review', time: '11:00 AM' },
                { title: 'Workshop', time: '3:30 PM' }
            ],
            '2025-06-02': [
                { title: 'HiR Interview', time: '4:00 PM' }
            ]
        };

        const datePicker = document.getElementById('meeting-date');
        const meetingsList = document.getElementById('meetings-list');

        datePicker.addEventListener('change', updateMeetings);

        function updateMeetings() {
            const selectedDate = datePicker.value;
            meetingsList.innerHTML = '';

            if (meetingsData[selectedDate]) {
                const dateHeader = document.createElement('h2');
                dateHeader.className = 'date-header';
                dateHeader.textContent = new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });
                meetingsList.appendChild(dateHeader);

                meetingsData[selectedDate].forEach(meeting => {
                    const meetingDiv = document.createElement('div');
                    meetingDiv.className = 'meeting-item';
                    meetingDiv.innerHTML = `
                        <span class="meeting-title">${meeting.title}</span>
                        <span class="meeting-time">${meeting.time}</span>
                    `;
                    meetingsList.appendChild(meetingDiv);
                });
            } else {
                meetingsList.innerHTML = `<div class="no-meetings">No meetings scheduled for this date</div>`;
            }
        }

        // Show today's meetings by default
        datePicker.value = new Date().toISOString().split('T')[0];
        updateMeetings();