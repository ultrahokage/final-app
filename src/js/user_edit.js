/* eslint-disable camelcase,no-undef,prefer-destructuring */
import Component from './component';

const editButton = document.querySelector('#tbodyUser');
class UserEdit extends Component {
  init() {
    editButton.addEventListener('dblclick', this.openEditModal.bind(this));
    // this.on('click', this.editUser.bind(this));
  }

  editUser() {
    let group_id = 0;
    const user_id = document.querySelector('#user_edit_id');
    const edit_name = document.querySelector('#first_name_edit').value;
    const edit_last_name = document.querySelector('#last_name_edit').value;
    const edit_street = document.querySelector('#street_edit').value;
    const edit_zip_code = document.querySelector('#zip_code_edit').value;
    const edit_city = document.querySelector('#city_edit').value;
    const edit_phone = document.querySelector('#phone_edit').value;
    const credit_input = document.querySelector('#range_credit_edit').value;

    const group = document.querySelector('.selected');

    if (group.innerText === 'Administrators') {
      group_id = 1;
    } else if (group.innerText === 'Merchants') {
      group_id = 2;
    } else if (group.innerText === 'Operators') {
      group_id = 3;
    } else if (group.innerText === 'Clients') {
      group_id = 4;
    } else if (group.innerText === 'Resellers') {
      group_id = 5;
    }

    const data = {
      user_id: user_id.innerText,
      group_id,
      name: `${edit_name} ${edit_last_name}`,
      street: edit_street,
      zip_code: edit_zip_code,
      city: edit_city,
      phone: edit_phone,
      credits: credit_input,
    };
    this.emit('editUser', data, document);
  }
  openEditModal(e) {
    const modalEdit = document.querySelector('#modalEdit');
    modalEdit.innerHTML +=
      '<div class="modal-content">\n' +
      '    <div id="user_edit_id" hidden></div>\n' +
      '    <h4>Edit user info</h4>\n' +
      '    <div class="row">\n' +
      '      <form class="col s12">\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="first_name_edit" type="text" class="validate" pattern="(?=.*[A-Z]).{2,14}">\n' +
      '            <label for="first_name">First Name</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="last_name_edit" type="text" class="validate" pattern="(?=.*[A-Z]).{2,14}">\n' +
      '            <label for="last_name">Last Name</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="street_edit" type="text" class="validate">\n' +
      '            <label for="street">Street</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="zip_code_edit" type="number" max="99999" class="validate">\n' +
      '            <label for="zip_code">Zip code</label>\n' +
      '          </div>\n' +
      '          <div class="input-field col s6">\n' +
      '            <input id="city_edit" type="text" class="validate">\n' +
      '            <label for="city">City</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="phone_edit" type="text" class="validate">\n' +
      '            <label for="phone">Phone number</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row" id="block_group">\n' +
      '          <div class="input-field col s12">\n' +
      '            <select id="group_select_edit">\n' +
      '              <option value="" disabled selected>Choose group</option>\n' +
      '              <option value="1">Administrators</option>\n' +
      '              <option value="2">Merchants</option>\n' +
      '              <option value="3">Operators</option>\n' +
      '              <option value="4">Clients</option>\n' +
      '              <option value="5">Resellers</option>\n' +
      '            </select>\n' +
      '            <label>Group</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <label for="range_credit">Credit</label>\n' +
      '          </div>\n' +
      '        </div>\n' +
      '        <div class="row">\n' +
      '          <div class="input-field col s12">\n' +
      '            <input id="range_credit_edit" type="range" min="0" max="1000" />\n' +
      '          </div>\n' +
      '        </div>\n' +
      '      </form>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '  <div class="modal-footer">\n' +
      '    <a class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>\n' +
      '    <a id="EditUser" class="modal-action modal-close waves-effect waves-green btn-flat">Update</a>\n' +
      '  </div>';
    const updateBtn = document.querySelector('#EditUser');
    const user_edit_id = document.querySelector('#user_edit_id');
    const edit_name = document.querySelector('#first_name_edit');
    const edit_last_name = document.querySelector('#last_name_edit');
    const edit_street = document.querySelector('#street_edit');
    const edit_zip_code = document.querySelector('#zip_code_edit');
    const edit_city = document.querySelector('#city_edit');
    const edit_phone = document.querySelector('#phone_edit');
    const credit_input = document.querySelector('#range_credit_edit');
    const users = JSON.parse(localStorage.getItem('userHash'));
    const groups = JSON.parse(localStorage.getItem('groupList'));
    // modal open
    const modal_edit = document.querySelector('#modalEdit');
    const select_group_edit = document.querySelector('#group_select_edit');
    const instance = M.Modal.init(modal_edit, {});
    M.FormSelect.init(select_group_edit, {});
    M.Range.init(credit_input, {});
    instance.open();
    const group_disable = document.querySelector('.select-wrapper').children[0];
    // eslint-disable-next-line eqeqeq
    const obj = users.find(user => e.target.parentElement.id == user.user_id);
    const splitName = obj.name.split(' '); // split name for 2 values (name is splitName[0] and surname is splitName[1]);
    // console.log(splitName);

    edit_name.classList.add('valid');
    edit_name.nextElementSibling.className = 'active';

    edit_last_name.classList.add('valid');
    edit_last_name.nextElementSibling.className = 'active';

    edit_street.classList.add('valid');
    edit_street.nextElementSibling.className = 'active';

    edit_zip_code.classList.add('valid');
    edit_zip_code.nextElementSibling.className = 'active';

    edit_city.classList.add('valid');
    edit_city.nextElementSibling.className = 'active';

    edit_phone.classList.add('valid');
    edit_phone.nextElementSibling.className = 'active';

    user_edit_id.innerText = obj.user_id;
    edit_name.value = splitName[0];
    edit_last_name.value = splitName[1];
    edit_street.value = obj.street;
    edit_zip_code.value = obj.zip_code;
    edit_city.value = obj.city;
    edit_phone.value = obj.phone;

    const admin_check = groups.find(group => group.group_id === obj.group_id);
    if (admin_check.is_admin) {
      credit_input.disabled = true;
    }
    credit_input.value = obj.credits;
    if (obj.credits === 0) {
      edit_name.disabled = true;
      edit_last_name.disabled = true;
      edit_street.disabled = true;
      edit_zip_code.disabled = true;
      edit_city.disabled = true;
      edit_phone.disabled = true;
      group_disable.disabled = true;
      credit_input.disabled = true;
      updateBtn.setAttribute('disabled', '');
    }

    const clearOnOverlay = document.querySelector('.modal-overlay');
    const clearOnButton = document.querySelector('#modalEdit').querySelector('.modal-close');
    clearOnOverlay.addEventListener('click', this.clearModal);
    clearOnButton.addEventListener('click', this.clearModal);
    // UserEdit.bindTo('#EditUser');
    updateBtn.addEventListener('click', this.editUser.bind(this));
  }
  clearModal() {
    const modalEdit = document.querySelector('#modalEdit');
    modalEdit.innerHTML = null;
  }
}
export default UserEdit;
