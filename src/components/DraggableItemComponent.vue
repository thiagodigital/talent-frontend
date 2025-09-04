<script setup lang="ts">
// Props
const props = defineProps<{
  id: number | string;
  value: string | object;
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:items', value: string[]): void
  (e: 'sendToForm', id: number | string): void
}>()



// Ação para enviar para o formulário
const sendToForm = () => {
  emit('sendToForm', props.id)
}
</script>

<template>
    <li>
        <slot />
    </li>
</template>
