<template>
  <v-container class="d-flex">
    <v-img
        :src="`${BASE_URL}${userData.avatar}`"
        class="avatar"
    />
    <div class="text-user-info">
      <h2 class="mb-5">
        {{ myProfile ?  $t('titles.myProfile') : $t('titles.userProfile') }}
      </h2>
      <v-card className="text-left elevation-0">
        <InfoLine
            v-for="(field, i) in infoFields"
            :key="i"
            :label="$t(field.label)"
            :value="userData[field.name]"
        />
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { usersApi } from '@/api';
import { BASE_URL, MY_USER_INFO_FIELDS, USER_INFO_FIELDS } from '@/constants';
import InfoLine from '@/components/InfoLine';

export default {
  name: 'UserProfilePage',
  components: {
    InfoLine,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const myProfile = ref(false);
    const userData = ref({});
    const infoFields = ref([]);
    const authUserId = ref(computed(()=> store.getters['authUser/getUserId']));

    const getUserData = async (userId) => {
      const res = await usersApi.getUserProfile(userId);
      return res.data;
    };

    const getUsers = async (userId) => {
      myProfile.value = parseInt(userId) === authUserId.value;
      if (userId && myProfile.value) {
        infoFields.value = MY_USER_INFO_FIELDS;
        userData.value = store.state.authUser.user;
      } else if (userId) {
        infoFields.value = USER_INFO_FIELDS;
        userData.value = await getUserData(userId);
      }
    };

    onMounted(async () => {
      const { id } = router.currentRoute.value.params;
      await getUsers(id);
    });

    watch(() => router.currentRoute.value.params.id, async (newId, oldId) => {
      if (newId !== oldId) {
        await getUsers(newId);
      }
    });

    return { myProfile, userData, infoFields, BASE_URL }
  }
};
</script>

<style scoped>
.avatar {
  max-width: 200px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
}
.text-user-info {
  padding-left: 30px;
}
</style>
