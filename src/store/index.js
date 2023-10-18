import { Store } from 'vuex'
import authUser from './modules/authUser';
import userList from './modules/userList';

export default new Store({
    modules: {
        authUser,
        userList,
    },
});
