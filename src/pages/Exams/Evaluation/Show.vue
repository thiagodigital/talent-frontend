<script lang="ts" setup>
import FormStepperComponent from '@/components/FormStepperComponent2.vue'
// import NavigationComponent from '@/components/NavigationComponent.vue'
import { useExamEvaluation } from '@/services/stores/examEvaluationStore'
import { useRoute } from 'vue-router'
const route = useRoute()
import { onMounted, watch, reactive } from 'vue'
import PreloaderComponent from '@/components/PreloaderComponent.vue'
const data = useExamEvaluation();
const currentStep = reactive({ step: 1 })
const changeStep = (step: number) => {
  if (step <= (data?.examEvaluation?.length ?? 0) && step > 0) {
    currentStep.step = step
  }
}
const examEvaluationForm = reactive({
  collaborator_id: route.params.id as string | undefined,
  skills: Array<{
    id: string,
    question: string,
    value: number,
    type?: string
  }>
})
const submitExamEvaluation = (examEvaluationForm: any) => {
  data.setExamEvaluation(examEvaluationForm)
}
watch(
  () => data?.examEvaluation,
  (steps) => {
    if (steps) {
      examEvaluationForm.skills = []
      steps
        .forEach((step) => {
          examEvaluationForm.skills.push({ id: step.id, question: step.label, type: step.type, value: 0 });
      })
    }
  },
  { immediate: true },
)
onMounted(() => {
  data.getExamEvaluation();
})
</script>
<template>
  <div class="w-full p-4">
  <main v-if="data.examEvaluation.length > 0" class="w-full">
    <FormStepperComponent
      :data="data.examEvaluation"
      :steps="data.examEvaluation?.length ?? 0"
      mode="progress"
      :current-step="currentStep.step"
      :formData="examEvaluationForm"
      @step-change="changeStep($event)"
      @submitStepper="submitExamEvaluation(examEvaluationForm)"
    />
  </main>
  <PreloaderComponent v-else />
  </div>
</template>
