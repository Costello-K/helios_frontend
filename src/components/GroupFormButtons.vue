<template>
  <div class="button-right mt-2">
    <BaseButton
        :button-name="$t('buttons.cancel')"
        @click.prevent="cancelButtonClickFunction"
        class="mr-5"
    />
    <BaseButton
        type="submit"
        class="mb-5"
        :button-name="$t(summitButtonName)"
    />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';

export default {
  name: 'GroupFormButtons',
  components: {
    BaseButton,
  },
  props: {
    summitButtonName: String,
    cancelButtonClickFunction: Function,
  },
}
</script>
