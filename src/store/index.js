import { Store } from 'vuex'
import authUser from './modules/authUser';

export default new Store({
    modules: {
        authUser,
    },
});
