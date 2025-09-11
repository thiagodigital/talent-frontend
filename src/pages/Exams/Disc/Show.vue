<script setup lang="ts">
import FormStepperComponent from '@/components/FormStepperComponent.vue'
import NavigationComponent from '@/components/NavigationComponent.vue'
import { useExamDisk } from '@/services/stores/examDiskStore'
import { onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const data = useExamDisk()
const currentStep = reactive({ step: 1 })
const changeStep = (step: number) => {
  if (step <= (data?.examDisk?.data?.length ?? 0) && step > 0) {
    currentStep.step = step
  }
}
const examDiskForm = reactive({
  collaborator_id: route.params.id as string | undefined,
  traits: [] as Array<{ score: number; id: string }>,
})
const submitExamDisk = (examDiskForm: any) => {
  console.log(examDiskForm)
  data.setExamDisk(examDiskForm)
}
watch(
  () => data?.examDisk.data,
  (steps) => {
    if (steps) {
      examDiskForm.traits = []

      steps.forEach((step) => {
        step.options.forEach((option) => {
          option.ids.forEach((id: string) => {
            examDiskForm.traits.push({ id, score: 0 })
          })
        })
      })
    }
  },
  { immediate: true },
)
onMounted(() => {
  data.getExamDisk()
})
</script>
<template>
  <NavigationComponent title="Perfil" />
  <div class="p-4" v-if="data?.examDisk.data">
    <FormStepperComponent
      :data="data?.examDisk.data"
      :steps="data?.examDisk?.data?.length ?? 0"
      :current-step="currentStep.step"
      :formData="examDiskForm"
      @step-change="changeStep"
      @submitStepper="submitExamDisk(examDiskForm)"
    />
    <!-- <div class="flex items-center gap-4 mb-4">
        <img :src="`https://ui-avatars.com/api/?name=${data.collaborator?.name}`" alt="Avatar" class="rounded-full size-16" />
        <h1 class="text-2xl font-bold">{{ data.collaborator?.name }}</h1>
        </div>
        <AccordionItem title="Informações Pessoais">
        <p>Email: {{ data.collaborator?.email }}</p>
        <p>Telefone: {{ data.collaborator?.phone }}</p>
        </AccordionItem>
        <AccordionItem title="Perfil de Colaborador">
        <p v-if="data.collaboratorProfile">Perfil: {{ data.collaboratorProfile.name }}</p>
        <p v-else>Nenhum perfil de colaborador encontrado.</p>
        </AccordionItem> -->
  </div>
</template>
