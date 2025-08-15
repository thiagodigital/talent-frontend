<script setup  lang="ts">
import { defineProps } from "vue";
defineProps({
  cls: {
    type: String,
    default: ""
  },
  data: {
    type: [Array, Object],
    default: () => []
  }
});
</script>
<template>
    <div :class="cls">
        <div v-if="data?.status === 'error'" class="flex items-center gap-4 alert alert-outline alert-warning" role="alert">
            <span class="icon-[tabler--alert-triangle] shrink-0 size-6"></span>
            <div>
                <p v-for="(erro, ind) in data.data" :key="ind">
                    {{ erro.value }}
                </p>
            </div>
        </div>

        <div v-else-if="data?.status === 'success'"  class="flex items-center gap-4 alert alert-outline alert-success" role="alert">
            <span class="icon-[tabler--circle-check] shrink-0 size-6"></span>
            <div>
                <p v-for="(erro, ind) in data.data" :key="ind">
                    {{ erro.value }}
                </p>
            </div>
        </div>
    </div>
</template>