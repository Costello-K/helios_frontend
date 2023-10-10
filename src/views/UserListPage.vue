<template>
  <CardList
      :title="$t('titles.users')"
      :data="users"
  >
    <template v-slot:default="{ item }">
      <UserCard :user="item"/>
    </template>
  </CardList>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usersApi } from '@/api';
import CardList from '@/components/CardList';
import UserCard from '@/components/UserCard';

export default {
  name: 'UserListPage',
  components: {
    CardList,
    UserCard,
  },
  setup() {
    const users = ref([]);

    const getUsers = async () => {
      try {
        const res = await usersApi.getListUsers();
        return res.data.results;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(async () => {
      users.value = await getUsers();
    });

    return { users }
  },
};
</script>
