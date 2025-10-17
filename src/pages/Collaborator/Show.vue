<script setup lang="ts">
import AccordionItem from '@/components/AccordionItem.vue'
import NavigationComponent from '@/components/NavigationComponent.vue'
import TabComponent from '@/components/TabComponent.vue'
import TabsComponent from '@/components/TabsComponent.vue'
// import router from "@/services/router";
import { useCollaborator } from '@/services/stores/collaboratorStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const data = useCollaborator()
const route = useRoute()
function handleClick() {
  console.log('Botão clicado na terceira aba')
}
onMounted(() => {
  data.getCollaborator(route.params.id as string)
})
</script>
<template>
  <div>
  <NavigationComponent title="Colaborador" />
  <div class="max-w-lg px-5 mx-auto">
    <img
      class="w-32 h-32 mx-auto rounded-full"
      :src="`https://ui-avatars.com/api/?name=${data.collaborator?.name}`"
      :alt="data.collaborator?.name"
    />
    <h2 class="mt-3 text-2xl font-semibold text-center">{{ data.collaborator?.name }}</h2>
    <p class="mb-0 text-center">{{ data.collaborator?.email }}</p>
    <p class="mb-3 font-bold text-center">{{ data.collaborator?.position }}</p>
    <div v-if="data.collaborator?.evaluations?.length > 0" class="divide-y divide-neutral/20">
      <div class="w-full border-2 stats">
        <template v-for="(category, index) in data.collaborator?.profile_category" :key="index">
          <div class="stat place-items-center" v-if="index < 2">
            <div class="stat-title">{{ category.category }}</div>
            <div class="stat-value">{{ category.media_score }}%</div>
            <div class="w-full truncate stat-desc">
              {{ category.options[0].name.join(', ', ' ') }}
            </div>
          </div>
        </template>
      </div>
      <div class="w-full mb-4 border-2 border-t-0 stats">
        <template v-for="(category, index) in data.collaborator?.profile_category" :key="index">
          <div class="stat place-items-center" v-if="index > 1">
            <div class="stat-title">{{ category.category }}</div>
            <div class="stat-value">{{ category.media_score }}%</div>
            <div class="w-full truncate stat-desc">
              {{ category.options[0].name.join(', ', ' ') }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-neutral-500">Nenhuma categoria de perfil encontrada.</p>
      <router-link
        class="text-blue-600 hover:underline"
        :to="{ name: 'collaborator-profile-evaluation', params: { id: data.collaborator?.id } }"
        >Clique aqui para criar um perfil</router-link
      >
    </div>
    <p v-html="data.collaborator?.evaluations[0].feedback"></p>
    <p>{{ data.collaborator?.evaluations[0].opinion ?? 'Nenhuma opinião fornecida.' }}</p>
    <div>
      <p>Medias</p>
      <p>Hard skills {{ data.collaborator?.evaluations[0].points[0] }}</p>
        <p>Soft skills {{ data.collaborator?.evaluations[0].points[1] }}</p>
    </div>
    <div>

    </div>
    <!-- <TabsComponent
      v-if="data.collaborator?.evaluations && data.collaborator.evaluations.length > 0"
    >
      <TabComponent name="Feedback" selected idx="1">

      </TabComponent>
      <TabComponent name="Opiniao" idx="2">

      </TabComponent>
      <TabComponent name="Perfil" idx="4">

      </TabComponent>
    </TabsComponent> -->
  </div>
  <div class="w-full h-20 mb-40"></div>
  </div>
</template>
