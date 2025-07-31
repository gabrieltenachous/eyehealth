<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</template>

<script lang="ts">
export default {
  name: 'BaseInput',
  props: {
    modelValue: String,
  },
}
</script>
