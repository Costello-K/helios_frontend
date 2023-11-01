import { Store } from 'vuex';
import authUser from './modules/authUser';
import userList from './modules/userList';
import companyList from './modules/companyList';
import company from './modules/company';

export default new Store({
    modules: {
        authUser,
        userList,
        companyList,
        company,
    },
});
