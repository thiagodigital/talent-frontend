<template>
  <div
    :id="'tabs-basic-' + props.idx"
    role="tabpanel"
    :aria-labelledby="'tabs-basic-item-' + props.idx">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, type Ref } from "vue";

const props = defineProps<{
  name: string;
  selected?: boolean;
  idx?: number | string;
}>();

const href = computed(
  () => "#" + props.name.toLowerCase().replace(/ /g, "-")
);

// Injeta estado e registrador vindos do Tabs
const registerTab = inject<
  (tab: { name: string }, selected?: boolean) => void
>("registerTab");

onMounted(() => {
  registerTab?.({ name: props.name, href: href.value }, props.selected);
});
</script>
