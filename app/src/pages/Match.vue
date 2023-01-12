<template>
  <div class="page">
    <h1>Match</h1>
    <div class="page__match">
      <Button
        @click="redirect('discovery')"
        label="Discovery"
        class="p-button-raised p-button-secondary"
      />
      <Button
        @click="redirect('mood')"
        label="Mood"
        class="p-button-raised p-button-secondary"
      />
      <Button
        @click="redirect('surprise-me')"
        label="Surprise me !"
        class="p-button-raised p-button-secondary"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function redirect(name = "") {
  router.push({ name });
}
</script>

<style lang="scss" scoped>
.page__match {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  height: 100%;

  > Button {
    margin-bottom: 1rem;
  }
}
</style>