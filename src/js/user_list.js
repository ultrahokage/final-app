/* eslint-disable camelcase,class-methods-use-this */
import Component from './component';

class UserList extends Component {
  init() {
    this.on('renderUserList', this.render.bind(this), document);
    this.on('count', this.countUsers.bind(this), document);
    window.addEventListener('hashchange', this.location.bind(this));
  }
  render(users) {
    // console.log(users);
    const table = document.querySelector('.striped');
    const list = document.querySelector('#tbodyUser');
    const page_title = document.querySelector('.page-title');
    const docFragment = document.createDocumentFragment();
    const locationHash = document.location.hash;
    const groups = JSON.parse(localStorage.getItem('groupList'));

    list.innerHTML = '';
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
      const ourLocation = locationHash.slice(2);
      const find_id = groups.find(item => item.name === ourLocation);
      // console.log(find_id);
      try {
        if (ourLocation === find_id.name) {
          page_title.innerText = find_id.name;
          if (user.group_id === find_id.group_id) {
            trItem.appendChild(name);
            trItem.appendChild(street);
            trItem.appendChild(zip_code);
            trItem.appendChild(city);
            trItem.appendChild(phone);
            trItem.appendChild(credit);
            list.appendChild(trItem);
          }
        }
      } catch (e) {
        page_title.innerText = 'Select group, please!';
        list.innerHTML = '';
      }
      // location hash end;
    });
    table.appendChild(docFragment);
    this.countUsers(users);
  }
  countUsers(users) {
    let admins = 0;
    let merch = 0;
    let operators = 0;
    let clients = 0;
    let release = 0;

    const CountMerch = document.querySelector('#Merchants');
    const CountAdmin = document.querySelector('#Administrators');
    const CountOperator = document.querySelector('#Operators');
    const CountClient = document.querySelector('#Clients');
    const CountRelease = document.querySelector('#Resellers');

    users.forEach((item) => {
      if (item.group_id === 1) {
        admins += 1;
      } else if (item.group_id === 2) {
        merch += 1;
      } else if (item.group_id === 3) {
        operators += 1;
      } else if (item.group_id === 4) {
        clients += 1;
      } else if (item.group_id === 5) {
        release += 1;
      }
      try {
        CountAdmin.innerText = admins;
        CountMerch.innerText = merch;
        CountOperator.innerText = operators;
        CountClient.innerText = clients;
        CountRelease.innerText = release;
      } catch (e) {
        return null;
      }
      return item;
    });
  }
  location(e) {
    const users = JSON.parse(localStorage.getItem('userHash'));
    const groupLength = document.querySelector('#filters');
    for (let i = 0; i < groupLength.children.length; i += 1) {
      groupLength.children[i].className = ''; // clear class active for all group list;
    }
    e.currentTarget.document.activeElement.parentElement.className = 'active';
    this.emit('renderUserList', users, document);
  }
}

export default UserList;
