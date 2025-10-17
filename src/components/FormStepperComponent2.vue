<script setup lang="ts">
import { onMounted } from 'vue'
import DraggableListComponent from './DraggableListComponent.vue'
import DraggableItemComponent from './DraggableItemComponent.vue'
import ButtonGroupComponent from './ButtonGroupComponent.vue'
onMounted(() => {
  const listExample = document.querySelector('#list-example')

  if (listExample) {
    Sortable.create(listExample as HTMLElement, {
      animation: 150,
      dragClass: '!border-0',
    })
  }
})
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  steps: {
    type: Number,
    required: true,
  },
  currentStep: {
    type: [String, Number, null],
    default: 1,
  },
  mode: {
    type: [String, null],
    default: 'steps',
  },
  formData: {
    type: Object,
    required: true,
  },
})
function updateOrder(index: string, value: number) {
  if(props.formData.skills != undefined){
    props.formData.skills
    .filter(e => e.id == index)[0].value = value;
  }
}
</script>
<template>
  <div data-stepper="" class="w-full mb-5" id="wizard-validation-horizontal">
    <pre>{{ props.formData }}</pre>
    <div class="mb-4">
      <p class="text-lg">
        Leia as frases abaixo, e avalie seu colaborador dando uma nota de 1 a 10 para cada uma delas, onde 1 é
        "Discordo totalmente" e 10 é "Concordo totalmente".
      </p>
    </div>
    <ul v-if="data && props.mode == 'steps'" class="relative flex flex-row gap-2 md:flex-row">
      <li
        v-for="(header, index) in data"
        :key="index"
        class="flex flex-col items-center flex-1 gap-2 group md:flex-row"
        :data-stepper-nav-item="`{ &quot;index&quot;: ${index + 1} } }`"
        :class="index + 1 == currentStep ? 'active' : ''"
      >
        <span
          class="min-h-7.5 min-w-7.5 inline-flex flex-col items-center gap-2 align-middle text-sm md:flex-row"
        >
          <span
            class="stepper-active:text-bg-primary stepper-active:shadow-sm shadow-base-300/20 stepper-success:text-bg-primary stepper-success:shadow-sm stepper-completed:text-bg-success stepper-error:text-bg-error text-bg-soft-neutral flex size-7.5 shrink-0 items-center justify-center rounded-full font-medium"
          >
            <span
              class="text-sm stepper-success:hidden stepper-error:hidden stepper-completed:hidden"
              >{{ header.line }}</span
            >
            <span class="icon-[tabler--check] stepper-success:block hidden size-4 shrink-0"></span>
            <span class="icon-[tabler--x] stepper-error:block hidden size-4 shrink-0"></span>
          </span>
          <span class="font-medium text-base-content text-nowrap">{{ header.name }}</span>
        </span>
      </li>
    </ul>
    <ul v-else-if="data && props.mode == 'progress'">
      <li>
        <div
          class="w-full h-3 progress"
          role="progressbar"
          :aria-label="`${currentStep}% Progressbar`"
          aria-valuenow="currentStep"
          aria-valuemin="0"
          :aria-valuemax="steps">
          <div :style="`width: calc(calc(100% / ${steps}) * ${currentStep});`" class="progress-bar"></div>
        </div>
      </li>
    </ul>

    <!-- Stepper Content -->
    <form
      id="wizard-validation-form-horizontal"
      @submit.prevent="$emit('submitStepper')"
      method="POST"
      class="mt-5 needs-validation sm:mt-8"
    >
      <!-- Account Details -->

      <div
        v-for="(body, idx) in data"
        :key="idx"
        :id="`account-details-validation-${idx}`"
        class="mb-4 space-y-5"
        :data-stepper-content-item="`{ &quot;index&quot;: ${idx + 1} } }`"
        :style="currentStep != idx + 1 ? `display: none;` : ''"
      >
      <div v-if="body">
        <span v-if="body.type == 'hard skill'" class="mb-3 badge badge-primary">{{ body.type }}</span>
        <span v-else class="mb-3 badge badge-info">{{ body.type }}</span>
        <h3 class="mb-4 text-2xl text-base-content">{{ body.label }}</h3>
        <ButtonGroupComponent
          @sendToForm="(e) => updateOrder(e[0], e[1])"
          :id="body.id"
          :type="body.type"
          :active="props.formData.skills[currentStep - 1]?.value"
          :value="props.formData.skills.find((t) => t.id === body.id)?.value ?? 0"
          :count="10" />
      </div>
      <!-- <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div v-for="(item, ix) in body.options" :key="ix">
          <p>{{ item.category }}</p> -->
          <!-- {{ item.name.join(', ') }} -->
          <!-- <p class="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              aria-label="range"
              class="range range-xl"
              :value="props.formData.traits.find(t => t.id === item.ids[0])?.score ?? 0"
              @input="updateGroupScores(item.ids, +$event.target.value)"
              />
          </p>
        </div>
      </div> -->
      </div>
      <div data-stepper-content-item='{ "isFinal": true }' style="display: none">
        <div
          class="flex items-center justify-center h-48 p-4 border border-dashed border-base-content/40 bg-base-200/50 rounded-xl"
        >
          <h3 class="text-3xl text-base-content/50">Your Form has been Submitted</h3>
        </div>
      </div>
      <!-- End Final Content -->
      <!-- Button Group -->
      <div class="flex items-center justify-between mt-5 gap-y-2">
        <button
          v-if="currentStep != 1"
          type="button"
          @click.prevent="$emit('step-change', currentStep - 1)"
          class="btn btn-primary btn-prev max-sm:btn-square"
          data-stepper-back-btn=""
        >
          <span
            class="icon-[tabler--chevron-left] text-primary-content size-5 rtl:rotate-180"
          ></span>
          <span class="max-sm:hidden">anterior </span>
        </button>
        <span v-else style="height: 38px; width: 38px"></span>
        <p>{{ currentStep }} de {{ steps }}</p>
        <template v-if="props.formData.skills.length > 0">
        <button
          v-if="currentStep <= (steps - 1)"
          :disabled="props.formData.skills[currentStep - 1]?.value == 0"
          type="button"
          @click.prevent="$emit('step-change', currentStep + 1)"
          class="btn btn-primary btn-next max-sm:btn-square"
          data-stepper-next-btn=""
          >
          <span class="max-sm:hidden">proximo</span>
          <span
          class="icon-[tabler--chevron-right] text-primary-content size-5 rtl:rotate-180"
          ></span>
        </button>
        <button v-else type="submit" :disabled="props.formData.skills[currentStep - 1]?.value == 0" class="btn btn-primary" data-stepper-finish-btn="">
          Enviar
        </button>
        </template>
      </div>
      <!-- End Button Group -->
    </form>
    <!-- End Stepper Content -->
  </div>
  <!-- End Stepper -->
</template>
