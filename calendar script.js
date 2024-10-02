document.addEventListener("DOMContentLoaded", function() {
    const eventForm = document.getElementById('eventForm');
    const eventList = [];
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const toggleFormButton = document.getElementById('addEvent');
    const eventFormContainer = document.getElementById('eventFormContainer');
    const cancelEventButton = document.getElementById('cancelEvent');

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    // Generate calendar for a specific month and year
    const generateCalendar = (year, month) => {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let date = 1;
        calendarBody.innerHTML = '';

        currentMonthYear.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.appendChild(document.createTextNode(''));
                } else if (date > daysInMonth) {
                    break;
                } else {
                    // Add the date to the cell
                    const dateText = document.createTextNode(date);
                    cell.appendChild(dateText);
                    const cellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`; // Ensure proper formatting
                    cell.setAttribute('data-date', cellDate);
                    addEventToCell(cell, cellDate); // Show events for this date
                    cell.addEventListener('click', () => selectDate(cell));
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    };

    // Add event to a specific date cell
    const addEventToCell = (cell, date) => {
        const eventsForDate = eventList.filter(event => event.date === date);
        eventsForDate.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = event.title;
            cell.appendChild(eventElement); // Append event element without clearing the date
        });
    };

    const selectDate = (cell) => {
        const selectedDate = cell.getAttribute('data-date');
        document.getElementById('eventDate').value = selectedDate;
        eventFormContainer.style.display = 'block'; // Show the form when a date is selected
    };

    const addEvent = (event) => {
        event.preventDefault();
        const eventDate = document.getElementById('eventDate').value;
        const eventTitle = document.getElementById('eventTitle').value;

        if (eventDate && eventTitle) {
            const eventObj = { date: eventDate, title: eventTitle };
            eventList.push(eventObj);
            generateCalendar(currentYear, currentMonth); // Re-render the calendar to show the new event
            eventForm.reset();
            eventFormContainer.style.display = 'none'; // Hide the form after adding
        } else {
            alert('Please fill in all fields');
        }
    };

    // Toggle event form visibility
    toggleFormButton.addEventListener('click', () => {
        eventFormContainer.style.display = eventFormContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Cancel event form
    cancelEventButton.addEventListener('click', () => {
        eventFormContainer.style.display = 'none';
    });

    // Handle previous and next month navigation
    prevMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        generateCalendar(currentYear, currentMonth);
    });

    // Add event listener for form submission
    eventForm.addEventListener('submit', addEvent);

    // Initialize the calendar with the current month and year
    generateCalendar(currentYear, currentMonth);

    // Initially hide the event form
    eventFormContainer.style.display = 'none';
});
