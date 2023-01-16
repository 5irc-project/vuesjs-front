<template>
  <span class="p-input-icon-left search-bar">
    <i class="pi pi-search" />
    <InputText type="text" :placeholder="props.placeholder" v-model="prompt"/>
  </span>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  placeholder: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const prompt = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(`update:modelValue`, value);
  },
});


</script>

<style lang="scss">
.search-bar {
  width: 100%;

  > input {
    width: 100%;
  }
}
</style>