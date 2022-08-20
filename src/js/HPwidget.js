/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import createRequest from './createRequests.js';
import TicketsUnit from './Tikets.js';

// const name = document.querySelector('.input-short')
// const description = document.querySelector('.input-short')
// const container = document.querySelector('.addContainer')
const ticketsUnit = new TicketsUnit();
// const popUpForm = document.getElementById('pop-up')
// const deletedTicket = document.querySelector('.unit')

export default async function init() {
  const tickets = await createRequest({
    url: 'alltickets',
  });
  ticketsUnit.render(tickets);
  addPopup();
}
function addPopup() {
  const containerMain = document.querySelector('#container');
  containerMain.addEventListener('click', (event) => {
    event.preventDefault();

    //добавление тикета

    if (event.target.matches('.add-ticket')) {
      document.getElementById('pop-up').classList.toggle('none');
      document.querySelector('.title-popup').textContent = "Добавить тикет";
    }
    if (event.target.matches('.btn-off')) {
      document.getElementById('pop-up').classList.add('none');
    }
    if (event.target.matches('.btn-on')) {
      addTicketHandler();
      document.getElementById('pop-up').classList.add('none');
      document.querySelector('.no-jobs').classList.add('none');
      document.querySelector('.input-short').value = '';
      document.querySelector('.input-long').value = '';
    };
    //галочка тикета
    if (event.target.matches('.status')) {
      event.target.closest('.status').classList.toggle('check');
    }
    //открытие описания тикета
    if (event.target.closest('.unit-one')) {
      console.log(document.querySelector('.description'));
      event.target.closest('.unit').querySelector('.unit-two').classList.toggle('none');
    }
    //редактирование тикета
    if (event.target.matches('.edit')) {
      document.getElementById('pop-up').classList.toggle('none');
      document.querySelector('.title-popup').textContent = "Изменить тикет";
      const newText = document.querySelector('.input-short').value = event.target.closest('.unit').querySelector('.name').textContent;
      document.querySelector('.input-long').value = event.target.closest('.unit').querySelector('.description').textContent;
    }
    if (event.target.matches('.btn-on')) {
      editTicket();
      // const editUnit = event.target.closest('.unit');
      // document.querySelector('.input-short').value = document.querySelector('.name').innerText;
    }
    //удаление тикета
    if (event.target.matches('.delete')) {
      document.getElementById('pop-up-delete').classList.remove('none');
    }
    if (event.target.matches('.btn-delete')) {
      document.getElementById('pop-up-delete').classList.add('none');
    }
    if (event.target.matches('.btn-ok')) {
      deleteTickets();
      document.getElementById('pop-up-delete').classList.add('none');
    }
  });
};

async function addTicketHandler() {
  // const formElem = document.getElementById('formElem');
  const formData = new FormData();
  const inputShot = document.querySelector('.input-short').value;
  const inputLong = document.querySelector('.input-long').value;
  formData.append('name', inputShot);
  formData.append('description', inputLong);

  const tickets = await createRequest({
    url: 'createTicket/',
    method: 'POST',
    body: formData,
  });
  tickets[0].name = inputShot;
  tickets[0].description = inputLong;
  ticketsUnit.render(tickets);
}

async function editTicket() {
  const ticketId = document.querySelector('.unit').dataset.id;
  console.log(ticketId);
  const formData = new FormData();
  const inputShot = document.querySelector('.input-short').value;
  const inputLong = document.querySelector('.input-long').value;
  formData.append("name", inputShot);
  formData.append('description', inputLong);
  const updateTickets = await createRequest({
    url: `editTicket/`,
    method: 'PUT',
    body: formData,
  });
  ticketsUnit.render(updateTickets);
  // if (updateTickets) {
  //   document.getElementById('formElem').reset();
  // }
};

async function deleteTickets() {
  const deletedTicket = document.querySelector('.unit');
  // const ticketId = deletedTicket.dataset.id;
  const response = await createRequest({
    url: `deleteById/`,
    method: 'DELETE',
  });
  if (response.success) {
    deletedTicket.remove();
    deletedTicket = null;
  }
  // console.log(ticketId)
};
