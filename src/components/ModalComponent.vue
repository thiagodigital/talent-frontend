<script setup lang="ts">
defineEmits(['modalBtnAction']);
defineProps({
  label: String,
  modalTitle: String,
  modalBtnLabel: String,
  modalBtnClose: Boolean,
  name: String,
});
</script>
<template>
    <div class="flex justify-end mb-4 me-4">
        <button type="button" class="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="fullscreen-modal"  :data-overlay="`#${name}`">{{ label }}</button>
    </div>

    <div :id="name" class="hidden overlay modal overlay-open:opacity-100 overlay-open:duration-300" role="dialog" tabindex="-1">
        <div class="modal-dialog max-w-none">
            <div class="justify-between h-full modal-content max-h-none">
            <div class="modal-header">
                <h3 class="modal-title">{{ modalTitle ? modalTitle : 'Dialog Title' }}</h3>
                <button type="button" class="absolute btn btn-text btn-circle btn-sm end-3 top-3" aria-label="Close" :data-overlay="`#${name}`">
                    <span class="icon-[tabler--x] size-4"></span>
                </button>
            </div>
            <div class="modal-body grow">
                <slot />
            </div>
            <div class="modal-footer">
                <button v-if="modalBtnClose" type="button" class="btn btn-soft btn-secondary" aria-label="Close" :data-overlay="`#${name}`">Cancelar</button>
                <button @click.prevent="$emit('modalBtnAction')" type="button" class="btn btn-primary">{{ modalBtnLabel }}</button>
            </div>
            </div>
        </div>
    </div>
</template>
