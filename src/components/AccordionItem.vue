<script setup lang="ts">
defineProps({
  title: String,
  content: String,
  isActive: Boolean,
  subtitle: String,
});
</script>

<template>
  <div class="accordion-item" :class="isActive ? 'active' : ''">
    <button
      class="inline-flex items-center justify-between px-0 py-2 accordion-toggle gap-x-2 text-start"
      aria-expanded="true"
    >
      {{ title }}
      <div class="inline-flex items-center">
        <p v-if="subtitle">{{ subtitle }}</p>
        <span class="icon-[tabler--chevron-left] accordion-item-active:-rotate-90 size-5 shrink-0 transition-transform duration-300 rtl:-rotate-180" ></span>
      </div>
    </button>
    <div
      :class="isActive ? '' : 'hidden'"
      class="accordion-content w-full overflow-hidden transition-[height] duration-300"
      role="region"
    >
      <div class="px-5 pb-4">
        <p class="font-normal text-base-content/80">
          <template v-if="content">
            {{ content }}
          </template>
          <template v-else>
            <slot />
          </template>
        </p>
      </div>
    </div>
  </div>
</template>