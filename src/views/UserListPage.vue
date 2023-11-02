<template>
  <CardList
    :title="title"
    :data="users"
  >
    <template v-slot:default="{ item }">
      <UserCard :user="item.member || item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { usersApi, companiesApi } from '@/api';
import CardList from '@/components/CardList';
import UserCard from '@/components/UserCard';
import PaginationComponent from '@/components/PaginationComponent';

export default {
  name: 'UserListPage',
  components: {
    CardList,
    UserCard,
    PaginationComponent,
  },
  props: {
    tab: {
      type: String,
      require: false,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const totalPages = ref(1);
    const title = ref('');
    const tab = ref(props.tab);
    const { t } = useI18n({ useScope: 'global' });
    const { id } = router.currentRoute.value.params;
    const users = computed(() => store.state.userList.users);

    const userRequests = {
      'all-users': {
        request: async page => await usersApi.getListUsers(page, id),
        listTitle: 'titles.users',
      },
      'admins': {
        request: async page => await companiesApi.getCompanyAdminsList(id, page),
        listTitle: 'titles.admins',
      },
      'members': {
        request: async page => await companiesApi.getCompanyMembersList(id, page),
        listTitle: 'titles.members',
      }
    };

    const getUsers = async (page) => {
      try {
        if (!props.tab) {
          tab.value = 'all-users';
        }
        const {
          data: {
            total_pages,
            results,
          },
        } = await userRequests[tab.value].request(page);
        totalPages.value = total_pages;
        return results;
      } catch (err) {
        console.error(err);
      }
    };

    const handlePageChange = async (newPage) => {
      const newUsersData = await getUsers(newPage);
      store.commit('userList/setUserListData', newUsersData);
    };

    onMounted(async () => {
      const newUsersData = await getUsers(1);
      title.value = t(userRequests[tab.value].listTitle);
      store.commit('userList/setUserListData', newUsersData);
    });

    return { users, title, totalPages, handlePageChange }
  },
};
</script>
