<template>
  <CardList
    :title="$t('titles.users')"
    :data="users"
  >
    <template v-slot:default="{ item }">
      <UserCard :user="item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { usersApi } from '@/api';
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
  setup() {
    const store = useStore();
    const totalPages = ref(1);
    const users = computed(() => store.state.userList.users);

    const getUsers = async (page) => {
      try {
        const { data: { total_pages, results } } = await usersApi.getListUsers(page);
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
      store.commit('userList/setUserListData', newUsersData);
    });

    return { users, totalPages, handlePageChange }
  },
};
</script>
