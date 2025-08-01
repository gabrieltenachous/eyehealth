<template>
  <input
    v-bind="$attrs"
    :value="value"
    @input="onInput"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onInput(e: Event) {
      const target = e.target as HTMLInputElement | null
      this.$emit('input', target?.value ?? '')
    }
  }
})
</script>
