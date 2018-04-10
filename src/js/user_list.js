/* eslint-disable camelcase,prefer-destructuring,no-use-before-define,no-param-reassign,eqeqeq */
import Component from './component';

class UserList extends Component {
  init() {
    this.on('renderUserList', this.render.bind(this), document);
  }

  // eslint-disable-next-line class-methods-use-this
  render(users) {
    // console.log(users);
    const table = document.querySelector('.striped');
    const list = document.querySelector('#tbodyUser');
    list.innerHTML = '';

    const docFragment = document.createDocumentFragment();
    const locationHash = document.location.hash;
    const page_title = document.querySelector('.page-title');

    users.forEach((user) => {
      const trItem = document.createElement('tr');
      const name = document.createElement('td');
      const street = document.createElement('td');
      const zip_code = document.createElement('td');
      const city = document.createElement('td');
      const phone = document.createElement('td');
      const credit = document.createElement('td');
      trItem.id = user.user_id;
      name.innerText = user.name;
      street.innerText = user.street;
      zip_code.innerText = user.zip_code;
      city.innerText = user.city;
      phone.innerText = user.phone;
      credit.innerText = user.credits;
      // location hash;
      if (locationHash === '#/admins') {
        page_title.innerText = 'Administrators';
        if (user.group_id === 1) {
          trItem.appendChild(name);
          trItem.appendChild(street);
          trItem.appendChild(zip_code);
          trItem.appendChild(city);
          trItem.appendChild(phone);
          trItem.appendChild(credit);
          list.appendChild(trItem);
        }
      } else if (locationHash === '#/merchants') {
        page_title.innerText = 'Merchants';
        if (user.group_id === 2) {
          trItem.appendChild(name);
          trItem.appendChild(street);
          trItem.appendChild(zip_code);
          trItem.appendChild(city);
          trItem.appendChild(phone);
          trItem.appendChild(credit);
          list.appendChild(trItem);
        }
      } else if (locationHash === '#/operators') {
        page_title.innerText = 'Operators';
        if (user.group_id === 3) {
          trItem.appendChild(name);
          trItem.appendChild(street);
          trItem.appendChild(zip_code);
          trItem.appendChild(city);
          trItem.appendChild(phone);
          trItem.appendChild(credit);
          list.appendChild(trItem);
        }
      } else if (locationHash === '#/clients') {
        page_title.innerText = 'Clients';
        if (user.group_id === 4) {
          trItem.appendChild(name);
          trItem.appendChild(street);
          trItem.appendChild(zip_code);
          trItem.appendChild(city);
          trItem.appendChild(phone);
          trItem.appendChild(credit);
          list.appendChild(trItem);
        }
      } else if (locationHash === '#/resellers') {
        page_title.innerText = 'Resellers';
        if (user.group_id === 5) {
          trItem.appendChild(name);
          trItem.appendChild(street);
          trItem.appendChild(zip_code);
          trItem.appendChild(city);
          trItem.appendChild(phone);
          trItem.appendChild(credit);
          list.appendChild(trItem);
        }
      } else {
        page_title.innerText = 'Select group, please!';
        list.innerHTML = '';
      }
      // location hash end;
    });
    table.appendChild(docFragment);
    countUsers();
  }
}

// location hash listener
window.addEventListener('hashchange', location);
function location(e) {
  const users = JSON.parse(localStorage.getItem('userHash'));
  const groupLength = document.querySelector('#filters');
  const newRend = new UserList();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < groupLength.children.length; i++) {
    groupLength.children[i].className = ''; // clear class active for all group list;
  }
  e.currentTarget.document.activeElement.parentElement.className = 'active';
  // this.emit('renderUserList', users);
  newRend.render(users);
  // this.emit('renderUserList', users);
}
function countUsers() {
  const users = JSON.parse(localStorage.getItem('userHash'));
  let admins = 0;
  let merch = 0;
  let operators = 0;
  let clients = 0;
  let release = 0;

  const CountMerch = document.querySelector('#merchants');
  const CountAdmin = document.querySelector('#admins');
  const CountOperator = document.querySelector('#operators');
  const CountClient = document.querySelector('#clients');
  const CountRelease = document.querySelector('#resellers');

  // eslint-disable-next-line consistent-return
  users.forEach((item) => {
    try {
      if (item.group_id === 1) {
        admins += 1;
        CountAdmin.innerText = admins;
      } else if (item.group_id === 2) {
        merch += 1;
        CountMerch.innerText = merch;
      } else if (item.group_id === 3) {
        operators += 1;
        CountOperator.innerText = operators;
      } else if (item.group_id === 4) {
        clients += 1;
        CountClient.innerText = clients;
      } else if (item.group_id === 5) {
        release += 1;
        CountRelease.innerText = release;
      }
    } catch (e) {
      return null;
    }
  });
}

export default UserList;
