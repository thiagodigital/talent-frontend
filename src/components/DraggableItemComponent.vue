<script setup lang="ts">
// Props
const props = defineProps<{
  id: number | string
  value: string | number | object
}>()

// Apenas se você realmente precisar enviar algo manualmente
const emit = defineEmits<{
  (e: 'sendToForm', id: number | string): void
}>()

const sendToForm = () => {
  emit('sendToForm', props.id)
}
</script>

<template>
  <li>
    <slot />
  </li>
</template>
