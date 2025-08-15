<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  cls: {
    type: String
  },
  action: {
    type: String
  }
});
</script>
<template>
  <form :class="cls" :action="action" method="POST" @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>