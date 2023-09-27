<template>
  <CardList title="Users" :data=users>
    <template v-slot:default="{ item }">
      <UserCard :user="item"/>
    </template>
  </CardList>
</template>

<script>
import data from '@/data.json';
import CardList from '@/components/CardList';
import UserCard from '@/components/UserCard';

export default {
  name: 'UserListPage',
  data: () => ({
    users: data.users,
  }),
  components: {
    CardList,
    UserCard,
  },
};
</script>
