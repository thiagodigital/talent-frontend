<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps({
  title: {
    type: String,
    default: 'Default Title'
  }
});
const router = useRouter();
</script>
<template>
    <ol class="flex items-center p-2 mb-3">
  <li class="inline-flex items-center">
    <a @click="router.back()" class="flex items-center hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="#">
      <span class="text-3xl icon-[tabler--arrow-back-up-double]"></span>
      
    </a>
  </li>
  <li class="inline-flex items-center ml-4 truncate " aria-current="page">
    <h1 class="mb-0 text-2xl font-bold">{{ title }}</h1>
  </li>
</ol>
</template>
