<template>
  <ModalWindow
      :open-button-text="$t(mainButtonText)"
      :close-button-text="$t('buttons.cancel')"
  >
    <v-card-text class="mb-10">
      {{ $t(mainText) }}
    </v-card-text>
    <BaseButton
        block
        :button-name="$t('buttons.confirm')"
        @click="onClickFunction"
    />
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'CardModalWindow',
  components: {
    ModalWindow,
    BaseButton,
  },
  props: {
    mainButtonText: String,
    mainText: String,
    onClickFunction: Function,
  }
}
</script>
