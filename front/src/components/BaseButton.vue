<template>
  <button
    :class="[
      'px-4 py-2 rounded text-white font-medium transition',
      variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700' : '',
      variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    variant: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
  },
}
</script>
