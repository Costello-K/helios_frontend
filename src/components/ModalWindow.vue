<template>
  <div class="text-center">
    <v-btn
        :block="true"
        color="accent"
    >
      {{ openButtonText }}

      <v-dialog
          v-model="dialog"
          activator="parent"
          width="auto"
      >
        <v-card>
          <v-card-text>
            <slot :closeModalWindow="closeModalWindow"/>
          </v-card-text>
          <v-card-actions v-if="showCloseButton">
            <BaseButton
                block
                :button-name="closeButtonText"
                @click="closeModalWindow"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'ModalWindow',
  components: {
    BaseButton,
  },
  props: {
    openButtonText: String,
    closeButtonText: String,
  },
  setup(props) {
    const dialog = ref(false);
    const showCloseButton = ref(!!props.closeButtonText);
    const closeModalWindow = () => dialog.value = false;

    return {
      dialog,
      closeModalWindow,
      showCloseButton,
    };
  },
};
</script>
