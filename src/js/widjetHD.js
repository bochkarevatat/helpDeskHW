import createRequest from './createRequests.js';
import TicketsUnit from './Tikets.js';

const ticketsUnit = new TicketsUnit();

// добавление тикета
async function addTicket(ticket) {
  const response = await fetch('http://localhost:7080/createTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(ticket),
  });
  const result = await response.json();
  ticketsUnit.render(result);
}
//         //     // добавление тикета
function addTicketAll() {
  const ticketAdd = document.querySelector('.add-ticket');
  ticketAdd.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.matches('.add-ticket')) {
      document.getElementById('pop-up').classList.toggle('none');
      document.querySelector('.title-popup').textContent = 'Добавить тикет';
    }
    const btnOff = document.querySelector('.btn-off');
    btnOff.addEventListener('click', () => {
      document.getElementById('pop-up').classList.add('none');
    });

    const btnOn = document.querySelector('.btn-on');
    btnOn.addEventListener('click', () => {
      const ticket = {};
      const inputShot = document.querySelector('.input-short').value;
      const inputLong = document.querySelector('.input-long').value;
      ticket.name = inputShot;
      ticket.description = inputLong;
      addTicket(ticket);
      document.getElementById('pop-up').classList.add('none');
      document.querySelector('.no-jobs').classList.add('none');
      document.querySelector('.input-short').value = '';
      document.querySelector('.input-long').value = '';
    });
  });
}
//         //     // редактирование тикета
async function editTicket(ticket) {
  const response = await fetch('http://localhost:7080/editTicket', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(ticket),
  });
  const result = await response.json();
  ticketsUnit.render(result);
}

function editTicketAll() {
  const addContainer = document.querySelector('.addContainer');
  addContainer.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.edit')) {
      document.getElementById('pop-up').classList.toggle('none');
      document.querySelector('.title-popup').textContent = 'Изменить тикет';
      document.querySelector('.input-short').value = event.target.closest('.unit').querySelector('.name').textContent;
      document.querySelector('.input-long').value = event.target.closest('.unit').querySelector('.description').textContent;
    }
    if (event.target.matches('.btn-on')) {
      const inputId = document.querySelector('.unit-one').dataset;
      console.log(inputId.id);
      const inputShot = document.querySelector('.input-short').value;
      const inputLong = document.querySelector('.input-long').value;
      // let ticket = {};
      const ticket = {
        id: inputId.id,
        name: inputShot,
        description: inputLong,
      };
      // ticket.name = inputShot;
      // ticket.description = inputLong;
      editTicket(ticket);
      document.getElementById('pop-up').classList.add('none');
    }
    const btnOff = document.querySelector('.btn-off');
    btnOff.addEventListener('click', () => {
      document.getElementById('pop-up').classList.add('none');
    });
  });
}

function openCheck() {
  const addContainer = document.querySelector('.addContainer');
  addContainer.addEventListener('click', (event) => {
    if (event.target.matches('.status')) {
      event.target.closest('.status').classList.toggle('check');
    }
    // открытие описания тикета
    if (event.target.closest('.unit-one')) {
      // console.log(document.querySelector('.description'));
      event.target.closest('.unit').querySelector('.unit-two').classList.toggle('none');
    }
  });
}

//         //     // удаление тикета
async function deleteTicket(id) {
  const res = await fetch(`http://localhost:7080/deleteById/:${id}`, {
    method: 'DELETE',
  });
  ticketsUnit();
}
// удаление тикета
function deleteTicketAll() {
  const addContainer = document.querySelector('.addContainer');
  addContainer.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.delete')) {
      document.getElementById('pop-up-delete').classList.toggle('none');
    }
    if (event.target.closest('.btn-ok')) {
      const id = '9b1c9908-621c-4ec5-a5b4-b9ecc27a2938';
      deleteTicket(id);
      document.getElementById('pop-up-delete').classList.add('none');
    }
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', () => {
      document.getElementById('pop-up-delete').classList.add('none');
    });
  });
}
// стартер
export default async function init() {
  const tickets = await createRequest({
    url: 'alltickets',
  });
  ticketsUnit.render(tickets);
  addTicketAll();
  editTicketAll();
  openCheck();
  deleteTicketAll();
}
