<script setup lang="ts">
import AccordionContainerComponent from "@/components/Accordion/AccordionContainerComponent.vue";
import AccordionItemComponent from "@/components/Accordion/AccordionItemComponent.vue";
import AccordionRowComponent from "@/components/Accordion/AccordionRowComponent.vue";
import { useCollaborator } from "@/services/stores/collaboratorStore";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const data = useCollaborator();
const route = useRoute();
const countMediaScore = (categoria: ProfileCategoryType): number =>{
  if (!categoria.traits.length) return 0;

  const soma = categoria.traits.reduce((total, trait) => total + trait.score, 0);
  const media = soma / categoria.traits.length;

  return parseFloat(media.toFixed(2)); // arredonda para 2 casas decimais
}
onMounted(() => {
  data.getCollaborator(route.params.id as string);
});
</script>
<template>
    <!-- component -->
  <div class="max-w-lg p-5 mx-auto my-10">
    <img class="w-32 h-32 mx-auto rounded-full" :src="`https://ui-avatars.com/api/?name=${data.collaborator?.name}`"  :alt="data.collaborator?.name">
    <h2 class="mt-3 text-2xl font-semibold text-center">{{ data.collaborator?.name }}</h2>
    <p class="mt-1 text-center">{{ data.collaborator?.email }}</p>
    
    <AccordionContainerComponent>
        <AccordionRowComponent  
            v-for="(category, index) in data.collaborator?.profile_category" 
            :key="index" 
            :index="`profile-category-${category.id}`">
            <AccordionItemComponent class="mt-5">
                <template #title>
                    {{ category.name }}
                </template>
                <template #default>
                    <ul>
                        <li v-for="(trait, tIndex) in category.traits" :key="tIndex" class="flex justify-between py-1 border-b last:border-b-0">
                            <span>{{ trait.name }}</span>
                            <span class="font-medium">{{ trait.score }}</span>
                        </li>
                    </ul>
                </template>
            </AccordionItemComponent>
        </AccordionRowComponent>
    </AccordionContainerComponent>
    <div>
        <div v-for="(category, index) in data.collaborator?.profile_category" :key="index" class="flex justify-between mt-5">
            <span class="text-blue-500 hover:text-blue-700">{{ category.name }}</span>
            <p class="text-center">{{ countMediaScore(category) }}</p>
        </div>
    </div>
    <!-- <div class="mt-5">
      <h3 class="text-xl font-semibold">Bio</h3>
      <p class="mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
    </div> -->
  </div>
    <div class="p-4">
        <h1 class="mb-4 text-2xl font-bold">Collaborator Details</h1>
        <p>This is the Collaborator Show Page.</p>
        <pre>{{ data.collaborator }}</pre>
    </div>
</template>