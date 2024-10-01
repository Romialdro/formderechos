// Variable para controlar si se está en modo administración no se modifica
const isAdminPage = window.location.pathname.includes('admin.html');

// Cargar los eventos guardados en Local Storage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => {
        addEventToDOM(event);
    });
}

// Agregar un nuevo evento
function addEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const date = document.getElementById('eventDate').value;
    const place = document.getElementById('eventPlace').value.trim();
    const description = document.getElementById('eventDescription').value.trim();

    if (title && date && place && description) {
        const event = { title, date, place, description };
        addEventToDOM(event);
        saveEvent(event);

        // Limpiar los campos del formulario
        document.getElementById('eventForm').reset();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Añadir el evento al DOM
function addEventToDOM(event) {
    const ul = document.getElementById('eventList');
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'mb-2');
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = event.title;
    titleInput.classList.add('form-control', 'mb-2');
    titleInput.readOnly = true;

    const dateInput = document.createElement('input');
    dateInput.type = 'datetime-local';
    dateInput.value = event.date;
    dateInput.classList.add('form-control', 'mb-2');
    dateInput.readOnly = true;

    const placeInput = document.createElement('input');
    placeInput.type = 'text';
    placeInput.value = event.place;
    placeInput.classList.add('form-control', 'mb-2');
    placeInput.readOnly = true;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = event.description;
    descriptionInput.classList.add('form-control', 'mb-2');
    descriptionInput.readOnly = true;

    li.appendChild(titleInput);
    li.appendChild(dateInput);
    li.appendChild(placeInput);
    li.appendChild(descriptionInput);

    // Si es la página de admin, añadir el botón de eliminar para que no esté accesible a cualquier usuario o visitante
    if (isAdminPage) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('btn', 'btn-danger', 'mt-2', 'delete-btn');
        deleteBtn.onclick = () => {
            ul.removeChild(li);
            removeEvent(event);
        };
        li.appendChild(deleteBtn);
    }

    ul.appendChild(li);
}

// Guardar el evento en Local Storage
function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

// Eliminar el evento del Local Storage
function removeEvent(eventToRemove) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(event => 
        event.title !== eventToRemove.title || 
        event.date !== eventToRemove.date ||
        event.place !== eventToRemove.place ||
        event.description !== eventToRemove.description
    );
    localStorage.setItem('events', JSON.stringify(events));
}

// Cargar los eventos al iniciar
document.addEventListener('DOMContentLoaded', loadEvents);
