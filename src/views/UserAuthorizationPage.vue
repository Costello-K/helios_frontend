<template>
  <v-sheet width="350" class="mx-auto mt-15">
    <v-form @submit.prevent>
      <v-text-field
          label="Username"
          :rules="usernameRules"
      ></v-text-field>

      <v-text-field
          label="Password"
          :rules="passwordRules"
          type="password"
      ></v-text-field>

      <BaseButton
          type="submit"
          class="mt-2"
          block
          button-name="Login"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import BaseButton from '@/components/BaseButton';

export default {
  name: 'UserAuthorizationPage',
  components: {
    BaseButton,
  },
  data: () => ({
    usernameRules: [val => !!val || 'Username is required'],
    passwordRules: [val => !!val || 'Password is required'],
  }),
  methods: {
    login() {

    },
  },
};
</script>
