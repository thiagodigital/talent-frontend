<script setup lang="ts">
import { provide } from 'vue';

const {index} = defineProps<{
  index: string;
}>();
provide('accordionRowIndex', index);
</script>
<template>
    <div class="accordion-item "  :id="index">
        <slot />
    </div>
</template>