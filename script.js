const events = [
    {
        id: 1,
        title: "Квиз по 90-м в баре Ноухау",
        date: "Сегодня, 19:00",
        location: { lat: 43.238949, lng: 76.889709 },
        category: "развлечения",
        participants: 8,
        maxParticipants: 20,
        organizer: "Алексей ★4.8"
    },
    {
        id: 2,
        title: "Йога в парке",
        date: "Завтра, 8:00",
        location: { lat: 43.235, lng: 76.895 },
        category: "спорт",
        participants: 5,
        maxParticipants: 15,
        organizer: "Мария ★4.9"
    }
];

const rooms = [
    { id: 1, title: "Английский разговорный клуб", time: "12:00-13:00", members: 7 },
    { id: 2, title: "Обсуждение: Гарри Поттер", time: "15:00-16:00", members: 12 }
];

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.dataset.page;
        showPage(pageId);
    });
});

function showPage(pageId) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageId}-page`).classList.add('active');
    
    if (pageId === 'map') initMap();
    if (pageId === 'communities') showCommunities();
    if (pageId === 'profile') showProfile();
}

function initMap() {
    const map = L.map('map').setView([43.238, 76.889], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    events.forEach(event => {
        const marker = L.marker([event.location.lat, event.location.lng]).addTo(map);
        marker.bindPopup(`
            <b>${event.title}</b><br>
            ${event.date}<br>
            Организатор: ${event.organizer}<br>
            <button onclick="registerToEvent(${event.id})">Зарегистрироваться</button>
        `);
    });
    
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = events.map(event => `
        <div class="event-card">
            <h3 class="event-title">${event.title}</h3>
            <p>📅 ${event.date} | 👥 ${event.participants}/${event.maxParticipants}</p>
            <p>🎯 ${event.category} | Организатор: ${event.organizer}</p>
            <button onclick="registerToEvent(${event.id})">Зарегистрироваться</button>
        </div>
    `).join('');
}

function showCommunities() {
    const list = document.getElementById('rooms-list');
    list.innerHTML = rooms.map(room => `
        <div class="event-card">
            <h3>${room.title}</h3>
            <p>🕐 ${room.time} | 👥 ${room.members} участников</p>
            <button onclick="joinRoom(${room.id})">Присоединиться</button>
        </div>
    `).join('');
}

function showProfile() {
    document.getElementById('user-info').innerHTML = `
        <div class="event-card">
            <h2>Анна Петрова ★4.5</h2>
            <p>📍 Алматы</p>
            <p>🎯 Интересы: книги, йога, квизы</p>
            <h3>Мои события:</h3>
            <p>✅ Зарегистрирована на: "Квиз по 90-м"</p>
            <p>📅 Посетила: 5 событий</p>
        </div>
    `;
}

function registerToEvent(eventId) {
    alert(`Вы зарегистрированы на событие #${eventId}! Вам доступен чат события.`);
    // В реальном приложении здесь был бы запрос к API
}

function joinRoom(roomId) {
    alert(`Вы присоединились к комнате #${roomId}!`);
}

document.addEventListener('DOMContentLoaded', () => {
    showPage('map');
    initMap();
});