<template>
  <v-container>
    <h1 class="mb-5">{{ $t('titles.userSettings') }}</h1>
    <v-card max-width="600" class="elevation-0 mx-auto">
      <v-card-title class="text-left">
        {{ $t('placeholders.username') }}:
        <strong>
          {{ user?.username }}
        </strong>
      </v-card-title>

      <v-form @submit.prevent="updateUserProfile">
        <v-text-field
            :label="$t('placeholders.firstName')"
            v-model="firstName"
        />

        <v-text-field
            :label="$t('placeholders.lastName')"
            v-model="lastName"
        />

        <v-text-field
            :label="$t('placeholders.email')"
            v-model="email"
        />

        <BaseButton
            type="submit"
            class="mb-5"
            :button-name="$t('buttons.saveProfile')"
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
