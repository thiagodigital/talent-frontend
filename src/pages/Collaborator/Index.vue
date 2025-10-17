<script setup lang="ts">
import AlertComponent from "@/components/Form/AlertComponent.vue";
import FormComponent from "@/components/Form/FormComponent.vue";
import InputTextComponent from "@/components/Form/InputTextComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import NavigationComponent from "@/components/NavigationComponent.vue";
import { useCollaborator } from "@/services/stores/collaboratorStore";
import { onMounted, reactive} from "vue";
const data = useCollaborator();
const collaborator = reactive<CollaboratorFormType>({
  name: "",
  email: "",
  phone: "",
  position: "",
  role_id: 4,
});
onMounted(() => {
  data.getCollaborators();
});
</script>
<template>
    <NavigationComponent title="Colaboradores" />
      <ModalComponent
        label="Novo Colaborador"
        name="create-collaborator-modal"
        modal-title="Criar Colaborador"
        modal-btn-label="Criar"
        :modal-btn-close="true"
        @modal-btn-action="data.setCollaborator(collaborator)"
      >
        <FormComponent  class="gap-4">
          <InputTextComponent
            label="Nome"
            v-model="collaborator.name"
            type="text"
            name="name"
            placeholder="nome do colaborador"
          />
          <InputTextComponent
            label="Email"
            v-model="collaborator.email"
            type="text"
            name="email"
            placeholder="email do colaborador"
          />
          <InputTextComponent
            label="Cargo"
            v-model="collaborator.position"
            type="text"
            name="position"
            placeholder="cargo do colaborador"
          />
          <InputTextComponent
            label="Telefone"
            v-model="collaborator.phone"
            type="text"
            name="phone"
            placeholder="telefone do colaborador"
          />
        </FormComponent>
      </ModalComponent>
    <div class="">
  <ul class="space-y-0.5">
    <li v-for="(collaborator, index) in data.collaborators" :key="index" class="flex items-center gap-2 px-4 py-2.5">
      <img :src="`https://ui-avatars.com/api/?name=${collaborator?.name}`"  :alt="collaborator?.name" class="rounded-full size-10" />
      <div class="flex items-center justify-between grow gap-y-1">
        <div>
          <h6 class="text-base">{{ collaborator.name }}</h6>
          <small class="text-xs font-bold text-base-content/80">{{ collaborator.position }}</small>
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
