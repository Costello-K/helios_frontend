<template>
  <div class="header">
    <v-container class="header-container pa-0">
      <v-toolbar color="transparent" title="HELIOS">

        <v-toolbar-items>
          <v-btn @click="$router.push('/')">Home</v-btn>
          <v-btn @click="$router.push('/users')">Users</v-btn>
          <v-btn @click="$router.push('/companies')">Companies</v-btn>
          <v-btn @click="$router.push('/about')">About</v-btn>
          <router-link to="/companies/:id"/>
          <router-link to="/users/:id"/>
        </v-toolbar-items>

        <v-card color="transparent" class="elevation-0">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-btn block class="elevation-0" @click="$router.push(item.path)">{{ item.title }}</v-btn>
                </v-list-item>
              </v-list>

            </v-menu>
          </v-card-title>
        </v-card>

      </v-toolbar>
    </v-container>
  </div>

  <v-container class="main pv-0">
    <router-view/>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      { path: '/registration', title: 'Registration' },
      { path: '/authorization', title: 'Login' },
      { path: '/settings', title: 'Settings' },
      { path: '/user/:id', title: 'My profile' },
      { path: '', title: 'Logout' },
    ],
  }),
};
</script>

<style scoped>
.header {
  background-color: #ededed;
  width: 100%;
}
.header-container {
  min-width: 480px;
  max-width: 1200px;
  width: 100%;
}
.main {
  min-width: 480px;
  max-width: 1200px;
  text-align: center;
}
</style>
