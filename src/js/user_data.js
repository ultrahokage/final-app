import Component from './component';

const socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');

class UserData extends Component {
  init() {
    this.on('DOMContentLoaded', this.webSocket.bind(this));
  }
  webSocket() {
    const users = [];
    const groups = [];
    let index;
    socket.onopen = function onOpen() {
      // console.log('Connected');
    };
    // eslint-disable-next-line no-use-before-define
    socket.onmessage = onMessageFun.bind(this);
    function onMessageFun(event) {
      // console.log(event.data);
      const parseData = JSON.parse(event.data);
      // console.log(parseData);
      if (parseData.action === 'user:updated') {
        fetch(`https://ums-honeybadger.herokuapp.com/user/${parseData.id}`)
          .then(response => response.json())
          .then((user) => {
            if (users.find(item => item.user_id === user.user_id)) {
              index = users.indexOf(users.find(item => item.user_id === user.user_id));
              users.splice(index, 1);
            }
            users.push(user);
            users.sort((a, b) => a.user_id - b.user_id);
            localStorage.setItem('userHash', JSON.stringify(users));
            this.emit('renderUserList', users, document);
          });
      }
      if (parseData.action === 'user:removed') {
        fetch(`https://ums-honeybadger.herokuapp.com/user/${parseData.id}`)
          .then(response => response.json())
          .then((user) => {
            index = users.indexOf(users.find(item => item.user_id === user.user_id));
            users.splice(index, 1);
            localStorage.setItem('userHash', JSON.stringify(users));
            this.emit('renderUserList', users, document);
          });
      }
      if (parseData.action === 'group:updated') {
        fetch(`https://ums-honeybadger.herokuapp.com/group/${parseData.id}`)
          .then(response => response.json())
          .then((group) => {
            // console.log(group);
            groups.push(group);
            groups.sort((a, b) => a.group_id - b.group_id);
            localStorage.setItem('groupList', JSON.stringify(groups));
            this.emit('renderGroups', groups, document);
            this.emit('count', users, document);
          });
      }
      if (parseData.action === 'group:removed') {
        fetch(`https://ums-honeybadger.herokuapp.com/group/${parseData.id}`)
          .then(response => response.json())
          .then((group) => {
            index = groups.indexOf(groups.find(item => item.group_id === group.group_id));
            groups.splice(index, 1);
            localStorage.setItem('groupList', JSON.stringify(groups));
            this.emit('renderGroups', groups, document);
          });
      }
    }
  }
}

export default UserData;
