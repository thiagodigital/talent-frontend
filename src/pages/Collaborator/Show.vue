<script setup lang="ts">
import AccordionItem from "@/components/AccordionItem.vue";
import NavigationComponent from "@/components/NavigationComponent.vue";
import router from "@/services/router";
import { useCollaborator } from "@/services/stores/collaboratorStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const data = useCollaborator();
const route = useRoute();
onMounted(() => {
  data.getCollaborator(route.params.id as string);
});
</script>
<template>
    <NavigationComponent title="Colaborador" />
  <div class="max-w-lg px-5 mx-auto">
    <img class="w-32 h-32 mx-auto rounded-full" :src="`https://ui-avatars.com/api/?name=${data.collaborator?.name}`"  :alt="data.collaborator?.name">
    <h2 class="mt-3 text-2xl font-semibold text-center">{{ data.collaborator?.name }}</h2>
    <p class="mb-3 text-center">{{ data.collaborator?.email }}</p>
    <div v-if="data.collaborator?.profile_category" class="divide-y divide-neutral/20">

      <AccordionItem
      v-for="(category, index) in data.collaborator?.profile_category" 
      :key="index" 
      :title="category.name"
      :subtitle="category.media_score + '%'"
      :isActive="false"
      >
      <ul>
        <li v-for="(trait, tIndex) in category.traits" :key="tIndex" class="flex justify-between py-1 border-b last:border-b-0">
          <span>{{ trait.name }}</span>
          <span class="font-medium">{{ trait.score }}</span>
        </li>
      </ul>
    </AccordionItem>
  </div>
    <div v-else class="text-center">
      <p class="text-neutral-500">Nenhuma categoria de perfil encontrada.</p>
      <router-link class="text-blue-600 hover:underline" :to="{ name: 'collaborator-profile', params: { id: data.collaborator?.id } }">Clique aqui para criar um perfil</router-link>
    </div>
  </div>
</template>