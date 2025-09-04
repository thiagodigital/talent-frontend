<script setup lang="ts">
import { provide, ref, type Ref } from "vue";

type TabInfo = { name: string; href: string };

const tabs = ref<TabInfo[]>([]);
const activeHref = ref<string | null>(null);

function registerTab(tab: TabInfo, selected?: boolean) {
  tabs.value.push(tab);

  // Se a aba vier com "selected", torna-se ativa.
  if (selected) {
    activeHref.value = tab.href;
  } else if (activeHref.value === null && tabs.value.length === 1) {
    // Se nenhuma ativa ainda, define a primeira registrada como ativa.
    activeHref.value = tab.href;
  }
}

function selectTab(href: string) {
  activeHref.value = href;
}

provide("registerTab", registerTab);
provide("activeHref", activeHref as Ref<string | null>);

// opcional: expor "tabs" caso queira usar fora
provide("tabs", tabs);
</script>
<template>
  <nav class="tabs tabs-bordered" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button
    v-for="(tab, idx) in tabs"
    :key="idx"
    :class="{ 'active': activeHref === tab.href }"
    type="button"
    class="w-full tab active-tab:tab-active"
    :id="'tabs-basic-item-' + (idx + 1)"
    :data-tab="'#tabs-basic-' + (idx + 1)"
    :aria-controls="'tabs-basic-' + (idx + 1)"
    role="tab"
    aria-selected="true" >
    {{ tab.name }}
  </button>
</nav>
<div class="mt-3">
  <slot />
</div>
</template>