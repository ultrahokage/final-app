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

      aGroup.innerText = group.name;
      span.id = group.name;
      aGroup.href = `#/${group.group_id}`;

      aGroup.appendChild(span);
      listGroup.appendChild(aGroup);
      ulGroup.appendChild(listGroup);
    });
  }
}

export default GroupList;
