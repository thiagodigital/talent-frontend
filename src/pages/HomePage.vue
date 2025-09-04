<script setup lang="ts">
import AccordionItem from '@/components/AccordionItem.vue';
import { useAuth } from '@/services/stores/authStore';
import { useCollaborator } from '@/services/stores/collaboratorStore';
import { onMounted } from 'vue';
const auth = useAuth();
const name = auth.isAuthenticated.name.split(' ')[0].length <= 5 ? auth.isAuthenticated.name.split(' ')[0] + ' ' + auth.isAuthenticated.name.split(' ')[1] : auth.isAuthenticated.name.split(' ')[0];
const data = useCollaborator();
onMounted(() => {
  data.getCollaborators();
});
</script>

<template>
  <div class="flex items-end w-full p-4 h-50">
      <p class="text-1xl">
        <span class="font-bold ">
          Olá, 
        </span>
        <span class="text-2xl font-bold">
          {{ name }}!
        </span>
        <br />
        Seja bem-vindo ao Leader Skill.
      </p>
    </div>
    <hr class="mb-4 border-neutral/20" />
    <div class="w-full p-4">
      <!-- <pre>
        {{ data }}
      </pre> -->
    <div class="w-full card">
      <span class="text-2xl">Colaboradores</span>
      <ul class="divide-y divide-base-content/20">
        <li v-for="value in data?.collaborators" :key="value.id" class="p-3">
          <p>
            {{ value.name }}
          </p>
          <p class="font-bold">{{ value.position }}</p>
        </li>
      </ul>
    </div>
  </div>

  <!-- <div class="w-full border-2 stats">
        <template
          v-for="(category, index) in data.collaborator?.profile_category"
          :key="index">
          <div class="stat place-items-center" v-if="index < 2">
            <div class="stat-title">{{ category.category }}</div>
            <div class="stat-value">{{ category.media_score }}%</div>
            <div class="w-full truncate stat-desc">{{ category.options[0].name.join(', ', ' ') }}</div>
          </div>
        </template>
      </div> -->
</template>
