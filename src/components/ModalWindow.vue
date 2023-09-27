<template>
  <div class="text-center">
    <v-btn color="accent">
      {{ openButtonText }}

      <v-dialog
          v-model="dialog"
          activator="parent"
          width="auto"
      >
        <v-card>
          <v-card-text>
            <slot/>
          </v-card-text>
          <v-card-actions>
            <BaseButton
                block
                button-name=closeButtonText
                @click="dialog = false"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
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
  data: () => ({
    dialog: false,
  }),
};
</script>
