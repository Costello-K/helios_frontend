<!--  TestCounter will be used only for the FE-5 branch  -->
<template>
  <div>
    <v-card>
      <v-card-title>
        Counter
      </v-card-title>
      <v-card-text>
        <div>Count: {{ count }}</div>
        <div>Double Count: {{ doubleCount }}</div>
        <div>{{ strCount }}</div>
      </v-card-text>
      <v-btn-group>
        <v-btn @click="increment">+</v-btn>
        <v-btn @click="decrement">-</v-btn>
        <v-text-field v-model="setValue"></v-text-field>
        <v-btn @click="setCount">Set</v-btn>
        <v-btn @click="incrementAsync">Async +</v-btn>
        <v-btn @click="decrementAsync">Async -</v-btn>
        <v-text-field v-model="asyncValue"></v-text-field>
        <v-btn @click="setCountAsync">Set Async</v-btn>
        <v-btn @click="reset">Reset</v-btn>
      </v-btn-group>
    </v-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const setValue = ref(0);
    const asyncValue = ref(0);

    return {
      count: computed(() => store.state.testCount.testCount),
      doubleCount: computed(() => store.getters['testCount/doubleTestCount']),
      strCount: computed(() => store.getters['testCount/strTestCount']),
      increment: () => store.commit('testCount/incrementTestCount'),
      decrement: () => store.commit('testCount/decrementTestCount'),
      incrementAsync: () => store.dispatch('testCount/incrementAsyncTestCount'),
      decrementAsync: () => store.dispatch('testCount/decrementAsyncTestCount'),
      reset: () => store.commit('testCount/removeTestCount'),
      setValue,
      asyncValue,
      setCount: () => {
        const value = parseInt(setValue.value)
        if (!isNaN(value)) {
          store.commit('testCount/setTestCount', value)
          setValue.value = 0
        }
      },
      setCountAsync: () => {
        const value = parseInt(asyncValue.value)
        if (!isNaN(value)) {
          store.dispatch('testCount/setAsyncTestCount', value)
          asyncValue.value = 0
        }
      },

    }
  },
};
</script>
