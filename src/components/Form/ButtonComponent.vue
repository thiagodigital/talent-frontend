<script setup>
import { defineProps } from "vue";
defineProps({
  label: {
    type: [Boolean, String],
    default: false
  },
  cls: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "submit"
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <button :type="type" :class="cls" class="w-full btn btn-primary">
    <span class="indicator-label" v-if="loading"
      >Carregando... <span class="align-middle spinner-border spinner-border-sm ms-2"></span
    ></span>
    <span class="indicator-label" v-else>{{ label }}</span>
  </button>
</template>