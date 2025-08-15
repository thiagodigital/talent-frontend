<script setup lang="ts">
import { useCollaborator } from "@/services/stores/collaboratorStore";
import { onMounted } from "vue";
const data = useCollaborator();
onMounted(() => {
  data.getCollaborators();
});
</script>
<template>
    <div class="p-4">
        <h1 class="mb-4 text-2xl font-bold">Collaborators</h1>
        <p>This is the Collaborator Index Page.</p>
    </div>
    <div class="card">
  <div class="px-4 py-2 text-sm font-medium text-base-content/50">CHAT LIST</div>
  <ul class="space-y-0.5">
    <li v-for="(collaborator, index) in data.collaborators" :key="index" class="flex items-center gap-2 px-4 py-2.5">
      <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="rounded-full size-10" />
      <div class="flex items-center justify-between grow gap-y-1">
        <div>
          <h6 class="text-base">{{ collaborator.name }}</h6>
          <small class="text-xs text-base-content/80">{{ collaborator.email }}</small>
        </div>
        <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
          <RouterLink :to="'/collaborators/' + collaborator.id" class="border-primary text-primary flex items-center justify-center rounded-full border p-0.5">
            <span class="icon-[tabler--arrow-right] size-4 rtl:rotate-180"></span>
          </RouterLink>
        </div>
      </div>
    </li>
    
  </ul>
</div>
</template>