<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import Sortable from 'sortablejs'

// Props
const props = defineProps<{
  id: number | string
  title?: string
  items: string[]
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:items', value: string[]): void
  (e: 'sendToForm', id: number | string): void
}>()

// Ref da lista
const listRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()
  if (listRef.value) {
    Sortable.create(listRef.value, {
      animation: 150,
      dragClass: '!border-0',
      onEnd: (evt) => {
        const updated = [...props.items]
        const movedItem = updated.splice(evt.oldIndex!, 1)[0]
        updated.splice(evt.newIndex!, 0, movedItem)
        emit('update:items', updated)
      }
    })
  }
})
</script>

<template>
  <div class="mb-6">
    <ul ref="listRef" class="border-base-content/25 divide-base-content/25 rounded-md max-w-sm divide-y border *:cursor-move *:p-3 *:flex *:items-center *:gap-3">
      <slot />
    </ul>
  </div>
</template>
