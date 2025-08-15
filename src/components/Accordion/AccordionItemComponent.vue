<script setup lang="ts">
import { computed, inject } from 'vue';

const { title } = defineProps<{
    title: {
        type: string
        required: false
    }
}>();
const indexValue = inject<string>('accordionRowIndex', 'index');
</script>
<template>
      <button
        class="inline-flex items-center px-0 accordion-toggle gap-x-4 text-start"
        :aria-controls="`${indexValue}-collapse`"
        aria-expanded="false"
      >
        <span
          class="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0"
        ></span>
        <span
          class="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0"
        ></span>
        <slot name="title" />
      </button>
      <div
        :id="`${indexValue}-collapse`"
        class="accordion-content w-full overflow-hidden transition-[height] duration-300"
        :aria-labelledby="indexValue"
        role="region"
      >
        <div class="px-5 pb-4">
          <p class="font-normal text-base-content/80">
            <slot />
          </p>
        </div>
      </div>
</template>
