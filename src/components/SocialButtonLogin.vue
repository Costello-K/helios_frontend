<template>
  <div
      class="social-login-button"
      v-on:click="setTypeSocialAuth(socialData.name)"
  >
    <div class="button-content">
      <slot/>
      <span class="social-login-text">
        {{ `${$t('buttons.continueWith')} ${socialData.title}` }}
      </span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { socialAuthUserApi, usersApi } from '@/api';
import { auth, queryParamUtils } from '@/utils';
import { TYPE_SOCIAL_AUTH, SOCIAL_AUTH_DATA } from '@/constants';

export default {
  name: 'SocialButtonLogin',
  props: {
    social: Object
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const authCode = ref(null);
    const authState = ref(null);
    const socialData = ref(props.social);
    const getAuthUrl = async (typeSocialAuth) => {
      const { data } = await socialAuthUserApi.getAuthUrl(typeSocialAuth);
      return data.authorization_url;
    };

    const setTypeSocialAuth = async (typeSocialAuth) => {
      localStorage.setItem(TYPE_SOCIAL_AUTH, typeSocialAuth);
      const a = document.createElement('a');
      a.href = await getAuthUrl(typeSocialAuth);
      a.click();
    }

    onMounted(async () => {
      authCode.value = queryParamUtils.getAndRemoveQueryParam('code');
      authState.value = queryParamUtils.getAndRemoveQueryParam('state');

      if (authCode.value && authState.value) {
        const nameSocialAuth = localStorage.getItem(TYPE_SOCIAL_AUTH);
        try {
          const response = await socialAuthUserApi.getTokens(
              nameSocialAuth,
              authCode.value,
              authState.value
          );
          auth.setTokens(response.data);
        } catch (err) {
          console.error(err)
          localStorage.removeItem(TYPE_SOCIAL_AUTH);
        }
        const { data } = await usersApi.getMyUser();
        store.commit('authUser/setUserData', data);

        localStorage.removeItem(TYPE_SOCIAL_AUTH);
        store.dispatch('webSocketService/connectWebSocket');
        router.push(`/users/${data.id}`);
      }
    });

    return {
      socialData,
      setTypeSocialAuth,
      SOCIAL_AUTH_DATA,
    };
  },
};
</script>

<style scoped>
.social-login-button {
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  text-decoration: none;
  border: 1px solid #b9b8b8;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  color: #333;
}
.social-login-button:hover {
  transform: scale(1.012);
  transition: transform 0.2s ease-in-out;
}
.button-content {
  display: inline-flex;
  align-items: center;
  margin: auto;
}
.social-login-text {
  font-weight: bold;
}
</style>
