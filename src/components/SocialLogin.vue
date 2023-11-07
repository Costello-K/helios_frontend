<template>
  <h4 class="mt-15">
    {{ $t('titles.socialLogin') }}
  </h4>
  <SocialButtonLogin :social="SOCIAL_AUTH_DATA.google">
    <v-img
      alt="google"
      src="@/assets/google.png"
      class="social-login-icon"
    />
  </SocialButtonLogin>
  <SocialButtonLogin
      :social="SOCIAL_AUTH_DATA.facebook"
      class="a-facebook"
  >
    <svg
      class="social-login-icon"
      width="24"
      height="24"
      viewBox="0 0 18 18"
    >
      <path fill="#FFFFFF"
         d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z"/>
    </svg>
  </SocialButtonLogin>
</template>

<script>
import { SOCIAL_AUTH_DATA } from '@/constants';
import SocialButtonLogin from '@/components/SocialButtonLogin';

export default {
  name: 'SocialLogin',
  components: {
    SocialButtonLogin,
  },
  setup() {
    return {
      SOCIAL_AUTH_DATA,
    };
  },
};
</script>

<style scoped>
.social-login-icon {
  height: 24px;
  width: 24px;
  margin-right: 20px;
}
.a-facebook {
  background-color: #3b5998;
  border: 0;
  color: white;
}
</style>
