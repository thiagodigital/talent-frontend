<script setup>
import { defineProps, onMounted, ref } from "vue";
defineProps({
  label: {
    type: [Boolean, String],
    default: false
  },
  cls: {
    type: String,
    default: "input"
  },
    id: {
        type: String,
        default: ""
    },
  type: {
    type: String,
    default: "text"
  },
  name: {
    type: String,
    default: "name"
  },
  placeholder: {
    type: String,
    default: "placeholder"
  },
  erro: {
    type: String,
    default: ""
  },
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

defineExpose({ focus: () => input.value.focus() });
</script>
<template>
    <div v-if="type == 'password'">
        <label v-if="label"  class="label-text">{{ label }}</label>
        <div class="input">
            <input
            :id="id ? id : `toggle-password-label`"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :name="name"
            :placeholder="placeholder"
            ref="input"
            />
            <button
            type="button"
            :data-toggle-password='`{ "target": "#${ id ? id : `toggle-password-label`}" }`'
            class="block cursor-pointer"
            aria-label="password toggle"
            >
                <span class="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 shrink-0"></span>
                <span class="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 shrink-0"></span>
            </button>
        </div>
        <div v-if="erro !== ''" class="fv-plugins-message-container invalid-feedback">{{ erro }}</div>
    </div>
    <div v-else>
        <label v-if="label" class="label-text">{{ label }}</label>
        <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="cls"
        :name="name"
        :placeholder="placeholder"
        ref="input"
        />
        <div v-if="erro !== ''" class="fv-plugins-message-container invalid-feedback">{{ erro }}</div>
    </div>
</template>