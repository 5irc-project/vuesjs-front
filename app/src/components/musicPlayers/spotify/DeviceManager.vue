<template>
  <div>
    <Button
      icon="pi pi-th-large"
      class="p-button-rounded p-button-text p-button-main"
      @click="show"
    />
    <DynamicDialog />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDialog } from 'primevue/usedialog';
import DeviceList from "./DeviceList.vue";

const dialog = useDialog();
const window = ref(undefined);

function show() {
  if(window.value !== undefined) {
    window.value.close();
    window.value = undefined;
  } else {
    window.value = dialog.open(DeviceList);
  }
}
</script>

<style>
.p-dialog .p-dialog-content, .p-dialog .p-dialog-header {
  background: #ffffff;
  color: #3c3c3f;
}
</style>