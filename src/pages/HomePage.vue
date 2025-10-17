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
  <div>
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
      <div class="w-full card">
        <span class="text-2xl">Colaboradores</span>
        <ul class="divide-y divide-base-content/20">
          <li v-for="value in data?.collaborators" :key="value.id" class="flex items-center justify-between p-3">
            <div>

              <p>
                {{ value.name }}
              </p>
              <p class="font-bold">{{ value.position }}</p>
            </div>
            <div>
              <a
                :href="'/collaborators/' + value.id"
                class="border-primary text-primary flex items-center justify-center rounded-full border p-0.5">
                <span class="icon-[tabler--arrow-right] size-4 rtl:rotate-180"></span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
