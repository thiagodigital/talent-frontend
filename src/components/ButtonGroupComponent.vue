<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
  count: Number,
  id: String,
  type: String,
  value: string | number | object,
  active: string | number
}>();

// Apenas se você realmente precisar enviar algo manualmente
const emit = defineEmits<{
  (e: 'sendToForm', id: number | string): void
}>()

const sendToForm = (e: any) => {
  emit('sendToForm', [ props.id, e, props.type] )
}
</script>
<template>
  <div class="flex justify-center w-full join" v-if="props.count > 0">
    <button
      v-for="(item, index) in props.count"
      :key="index"
      :id="item.id"
      @click="sendToForm(item)"
      type="button"
      :class="props.active == (index + 1) ? `btn-primary text-white` : 'btn-soft btn-primary join-item'"
      class="btn ">{{ item }}</button>
  </div>
</template>
<style lang="css" scoped>
button.btn.btn-soft.btn-primary.join-item {
    border: 1px solid;
}
</style>
