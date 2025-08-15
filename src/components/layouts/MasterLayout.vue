<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
defineProps({
  recording: {
    type: Boolean
  }
});
</script>
<template>
  <HeaderComponent />
  <main class="" :class="recording ? 'recording' : ''">
    <slot />
    <div class="uk-margin-xlarge-bottom"></div>
  </main>
</template>