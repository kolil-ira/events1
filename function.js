const events = [ 
    {
        title: "lunch date", 
        date: new Date("2024-09-25"),
        location: "Conference Room",
        attendees: new Set(["lavendar", "Bob"])
    },
    {
        title: "Project entry",
        date: new Date("2024-09-30"),
        location: "Office",
        attendees: new Set(["mustafa"])
    },
    {
        title: "Workshop",
        date: new Date("2024-09-28"),
        location: "Online",
        attendees: new Set(["lavendar", "Bob", "mustafa"])
    },
    {
        title: "Company Outing",
        date: new Date("2024-10-05"),
        location: "Park",
        attendees: new Set([])
    }
];

const organizers = new WeakMap();

organizers.set(events[0], "David");
organizers.set(events[1], "Emma");
organizers.set(events[2], "Fiona");
organizers.set(events[3], "George");

function displayUpcomingEvents() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const upcomingEvents = events.filter(event => {
        return event.date >= today && event.date <= nextWeek;
    });

    const tableBody = document.querySelector('#eventTable tbody');
    tableBody.innerHTML = '';

    upcomingEvents.forEach(({ title, date, location, attendees }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${title}</td>
            <td>${date.toLocaleDateString()}</td>
            <td>${location}</td>
            <td>${Array.from(attendees).join(', ')}</td>
        `;
        tableBody.appendChild(row);
    });
}
function addAttendee(eventTitle,attendeeName){
    const event = events.find(e=> e.title=== eventTitle);
    if(event){
        event.attendees.add(attendeeName);
        alert(`${attendeeName} added to ${eventTitle}`);
        displayUpcomingEvents();
    }else{
        alert("event not found");
    }
    }


function deleteEvent(eventTitle) {
    if (!eventTitle) {
        alert("Please provide an event title to delete.");
        return;
    }
    const eventIndex = events.findIndex(e => e.title === eventTitle);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        displayUpcomingEvents();
    }
}

function eventToJSON() {
    return JSON.stringify(events.map(event => ({
        ...event,
        formattedDate: event.date.toLocaleDateString()
    })));
}

function showEventSummary() {
    const firstEvent = events[0];
    if (firstEvent) {
        const keys = Object.keys(firstEvent);
        const values = Object.values(firstEvent);
        const entries = Object.entries(firstEvent);
        const summary = { keys, values, entries };
        document.getElementById('eventSummary').textContent = JSON.stringify(summary, null, 2);
    }
}

document.getElementById('addAttendeeButton').addEventListener('click', () => {
    const eventTitle = document.getElementById('eventTitle').value;
    const attendeeName = document.getElementById('attendeeName').value;
    addAttendee(eventTitle, attendeeName);
});

document.getElementById('deleteEventButton').addEventListener('click', () => {
    const eventTitle = document.getElementById('deleteEventTitle').value;
    deleteEvent(eventTitle);
});

displayUpcomingEvents();
showEventSummary();
