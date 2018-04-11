import Component from './component';

const sidenav = document.querySelector('.sidenav');
M.Sidenav.init(sidenav, {});

class GroupList extends Component {
  init() {
    this.on('renderGroups', this.render.bind(this), document);
  }
  // eslint-disable-next-line class-methods-use-this
  render(groups) {
    const ulGroup = document.querySelector('#filters');
    ulGroup.innerHTML = '';

    groups.forEach((group) => {
      const listGroup = document.createElement('li');
      const aGroup = document.createElement('a');
      const span = document.createElement('span');

      span.setAttribute('data-badge-caption', ' ');
      span.className = 'badge';

      if (group.group_id === 1) {
        aGroup.innerText = group.name;
        span.id = 'admins';
        aGroup.href = '#/admins';
      } else if (group.group_id === 2) {
        aGroup.innerText = group.name;
        span.id = 'merchants';
        aGroup.href = '#/merchants';
      } else if (group.group_id === 3) {
        aGroup.innerText = group.name;
        span.id = 'operators';
        aGroup.href = '#/operators';
      } else if (group.group_id === 4) {
        aGroup.innerText = group.name;
        span.id = 'clients';
        aGroup.href = '#/clients';
      } else if (group.group_id === 5) {
        aGroup.innerText = group.name;
        span.id = 'resellers';
        aGroup.href = '#/resellers';
      }
      aGroup.appendChild(span);
      listGroup.appendChild(aGroup);
      ulGroup.appendChild(listGroup);
    });
  }
}

export default GroupList;
