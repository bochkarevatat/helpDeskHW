/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */

import formatDate from './formatDate.js';

export default class TicketsUnit {
  constructor() {
    this.addUnits = document.querySelector('.containers');
  }

  render(tickets) {
    if (tickets.length > 1) {
      this.addUnits.textContent = '';
      tickets.forEach((el) => {
        this.addUnits.insertAdjacentHTML('beforeend', this.renderTicket(el));
        // console.log(this.renderTicket(el))
      });
      return;
    }
    this.addUnits.insertAdjacentHTML('beforeend', this.renderTicket(tickets[0]));
  }

  renderTicket({
    id,
    name,
    status,
    description,
  }) {
    const date = formatDate(new Date());
    return `
    <div class='unit' data-id='${id}' data-status='true'>
      <div class='unit-one' data-id='${id}' data-status='true'>
      <div class='status status-${status}'></div>
      <div class='name'>${name}</div>
      <div class='date'>${date}</div>
      <div class='edit'></div>
      <div class='delete'></div>
    </div>
    <div class='unit-two none'>
      <div class='description'>${description}</div>
    </div>
  </div>
    `;
  }
}
