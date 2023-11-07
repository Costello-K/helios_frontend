import { Store } from 'vuex';
import authUser from './modules/authUser';
import userList from './modules/userList';
import companyList from './modules/companyList';
import company from './modules/company';
import invitationList from './modules/invitationList';
import requestList from './modules/requestList';
import quizList from './modules/quizList';
import quizResultsList from './modules/quizResultsList';

export default new Store({
    modules: {
        authUser,
        userList,
        companyList,
        company,
        invitationList,
        requestList,
        quizList,
        quizResultsList,
    },
});
