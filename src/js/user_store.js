/* eslint-disable camelcase,class-methods-use-this */
import Component from './component';

function handleErrors(response) {
  if (!response.ok) {
  // eslint-disable-next-line prefer-template
    throw new Error('Oops error:' + response.statusText + ' ' + response.status);
  }
  return response;
}

class UserStore extends Component {
  init() {
    this.on('addUser', this.addUser.bind(this), document);
    this.on('editUser', this.editUser.bind(this), document);
  }

  addUser(user) {
    function clearOnCreate() {
      const modalAdd = document.querySelector('#modalAdd');
      modalAdd.innerHTML = null;
    }

    fetch(
      'https://ums-honeybadger.herokuapp.com/user',
      {
        method: 'POST',
        body: JSON.stringify(user),
      },
    )
      .then(handleErrors)
      .then(response => response.json())
      .then((response) => {
        // console.log('New user is added!');
        clearOnCreate();
        console.log(response);
      })
      .catch((error) => {
        clearOnCreate();
        console.log(error);
      });
  }

  editUser(user) {
    const user_id = document.querySelector('#user_edit_id');

    function clearOnUpdate() {
      const modalEdit = document.querySelector('#modalEdit');
      modalEdit.innerHTML = '';
    }

    fetch(
      `https://ums-honeybadger.herokuapp.com/user/${user_id.innerText}`,
      {
        method: 'PUT',
        body: JSON.stringify(user),
      },
    )
      .then(handleErrors)
      .then(response => response.json())// console.log('Success update'))
      // .then(res => res.json())
      .then((response) => {
        // console.log('Old user is updated!');
        clearOnUpdate();
        console.log(response);
      })
      .catch((error) => {
        clearOnUpdate();
        console.log(error);
      });
  }
}

export default UserStore;
