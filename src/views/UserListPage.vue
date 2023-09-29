<template>
  <CardList :title="$t('titles.users')" :data=users>
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
  components: {
    CardList,
    UserCard,
  },
  setup() {
    const users = data.users;

    return { users }
  },
};
</script>
