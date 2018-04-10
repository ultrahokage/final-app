/* eslint-disable no-unused-vars */
import UserData from './js/user_data';
import GroupList from './js/group_list';
import UserList from './js/user_list';
import UserAdd from './js/user_add';
import UserEdit from './js/user_edit';
import UserStore from './js/user_store';

UserList.bindTo('#tbodyUser');
UserStore.bindTo(document);
UserData.bindTo(document);
GroupList.bindTo('#filters');
