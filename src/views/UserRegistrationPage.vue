<template>
  <v-sheet width="400" class="mx-auto mt-15">
    <v-form @submit.prevent>
      <v-text-field
          label="Username"
          :rules="usernameRules"
      />

      <v-text-field
          label="First name"
          :rules="firstNameRules"
      />

      <v-text-field
          label="Last name"
      />

      <v-text-field
          label="E-mail"
          :rules="emailRules"
      />

      <v-text-field
          v-model="password"
          label="Password"
          type="password"
          :rules="passwordRules"
      />

      <v-text-field
          v-model="confirmPassword"
          label="Confirm password"
          type="password"
          :rules="confirmPasswordRules"
      />

      <BaseButton
          type="submit"
          class="mt-2"
          block
          button-name="Registration"
      />
    </v-form>
  </v-sheet>
</template>

<script>
import BaseButton from '@/components/BaseButton';

export default {
  name: 'UserRegistrationPage',
  components: {
    BaseButton,
  },
  data: function () {
    return {
      usernameRules: [val => !!val || 'Username is required'],
      firstNameRules: [val => !!val || 'First name is required'],
      emailRules: [
        val => !!val || 'E-mail is required',
        val => /.+@.+\..+/.test(val) || 'E-mail must be valid',
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [val => !!val || 'Password is required'],
      confirmPasswordRules: [val => (val === this.password) || 'Passwords must match'],
    }
  },
  methods: {
    registration() {

    },
  },
};
</script>
