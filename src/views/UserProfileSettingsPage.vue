<template>
  <v-container>
    <h1 class="mb-5">User settings</h1>
    <v-card max-width="600" class="elevation-0 mx-auto">
      <v-card-title class="text-left">
        Username:
        <strong>
          {{ user?.username }}
        </strong>
      </v-card-title>

      <v-form @submit.prevent="updateUserProfile">
        <v-text-field
            label="First Name"
            v-model="firstName"
        />

        <v-text-field
            label="Last Name"
            v-model="lastName"
        />

        <v-text-field
            label="Email"
            v-model="email"
        />

        <BaseButton
            type="submit"
            class="mb-5"
            button-name="Save profile"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import data from '@/data.json';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'SettingsUserProfilePage',
  components: {
    BaseButton,
  },
  data() {
    return {
      user: null,
      firstName: '',
      lastName: '',
      email: '',
    };
  },
  created() {
    this.user = data.user;
    this.firstName = this.user?.name || '';
    this.lastName = this.user?.lastname || '';
    this.email = this.user?.email || '';
  },
  methods: {
    updateUserProfile() {

    },
  },
};
</script>
