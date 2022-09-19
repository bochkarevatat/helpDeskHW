// import createRequest from './createRequests.js';
// import TicketsUnit from './Tikets.js';

// const ticketsUnit = new TicketsUnit();

// async function addTicketHandler() {
//   // const formElem = document.getElementById('formElem');
//   const formData = new FormData();
//   const inputShot = document.querySelector('.input-short').value;
//   const inputLong = document.querySelector('.input-long').value;
//   formData.append('name', inputShot);
//   formData.append('description', inputLong);
//   const tickets = await createRequest({
//     url: 'createTicket',
//     method: 'POST',
//     body: formData,
//   });
//   tickets[0].name = inputShot;
//   tickets[0].description = inputLong;
//   ticketsUnit.render(tickets);

//   console.log(tickets);
// }

// async function editTicket() {
//   // const ticketId = document.querySelector('.unit').dataset.id;
//   // console.log(ticketId);
//   const formData = new FormData();
//   const inputShot = document.querySelector('.input-short').value;
//   const inputLong = document.querySelector('.input-long').value;
//   formData.append('name', inputShot);
//   formData.append('description', inputLong);
//   const updateTickets = await createRequest({
//     url: 'editTicket',
//     method: 'PUT',
//     body: formData,
//   });
//   ticketsUnit.render(updateTickets);
// }
// // редактирование  тикета второй вариант
// // function editTicketForm() {
// //   // const titleEdit = document.querySelector('.title-popup');
// //   // const inputShort = document.querySelector('.input-short');
// //   // const inputLong = document.querySelector('.input-long');
// //   const popup = document.getElementById('pop-up');
// //   let id;
// //   const offBtn = () => {
// //     popup.classList.add('none');
// //   };
// //   const confirm = () => {
// //     editTicket(id);
// //   };
// //   popup.querySelector('.btn-off').addEventListener('click', offBtn);

// //   popup.querySelector('.btn-on').addEventListener('click', confirm);
// // }

// async function deleteTickets(id) {
//   // let deletedTicket = [...document.querySelectorAll('.unit')];
//   let deletedTicket = document.querySelector('.unit');
//   // let id = deletedTicket.dataset.id;
//   // console.log(document.querySelector(`div[data-id=${id}]`));
//   console.log(id);
//   // console.log(deletedTicket)
//   const response = await createRequest({
//     url: `deleteById/:${id}`,
//     method: 'DELETE',
//   });
//   if (response.success) {
//     deletedTicket.remove();
//     deletedTicket = null;
//   }
// }

// const ModalDelete = () => {
//   let id;
//   const rootEl = document.getElementById('pop-up-delete');
//   const close = () => {
//     rootEl.classList.add('none');
//   };
//   const cansel = () => {
//     close();
//   };
//   const confirm = () => {
//     deleteTickets(id);
//     close();
//   };
//   rootEl.querySelector('.btn-delete').addEventListener('click', cansel);
//   rootEl.querySelector('.btn-ok').addEventListener('click', confirm);

//   const open = (newId) => {
//     id = newId;
//     rootEl.classList.remove('none');
//   };
//   return {
//     open,
//   };
// };

// function addPopup() {
//   const containerMain = document.querySelector('#container');
//   containerMain.addEventListener('click', (event) => {
//     event.preventDefault();

//     // добавление тикета

//     if (event.target.matches('.add-ticket')) {
//       document.getElementById('pop-up').classList.toggle('none');
//       document.querySelector('.title-popup').textContent = 'Добавить тикет';
//     }
//     if (event.target.matches('.btn-off')) {
//       document.getElementById('pop-up').classList.add('none');
//     }
//     if (event.target.matches('.btn-on')) {
//       addTicketHandler();
//       document.getElementById('pop-up').classList.add('none');
//       document.querySelector('.no-jobs').classList.add('none');
//       document.querySelector('.input-short').value = '';
//       document.querySelector('.input-long').value = '';
//     }

//     // галочка тикета
//     if (event.target.matches('.status')) {
//       event.target.closest('.status').classList.toggle('check');
//     }
//     // открытие описания тикета
//     if (event.target.closest('.unit-one')) {
//       // console.log(document.querySelector('.description'));
//       event.target.closest('.unit').querySelector('.unit-two').classList.toggle('none');
//     }
//     // редактирование  тикета первый вариант
//     if (event.target.closest('.edit')) {
//       document.getElementById('pop-up').classList.toggle('none');
//       document.querySelector('.title-popup').textContent = 'Изменить тикет';
//       document.querySelector('.input-short').value =
//  event.target.closest('.unit').querySelector('.name').textContent;
//       document.querySelector('.input-long').value =
//  event.target.closest('.unit').querySelector('.description').textContent;
//     }
//     if (event.target.matches('.btn-on')) {
//       editTicket();
//     }
//   });
// }

// const modalDelete = ModalDelete();

// export default async function init() {
//   const tickets = await createRequest({
//     url: 'alltickets',
//   });
//   ticketsUnit.render(tickets);
//   addPopup();
//   // editTicketForm();
//   const deleteBtns = document.querySelectorAll('.delete');
//   for (const deleteBtn of deleteBtns) {
//     deleteBtn.addEventListener('click', (event) => {
//       const {
//         id,
//       } = event.target.closest('.unit').dataset;
//       modalDelete.open(id);
//     });
//   }
// }
