<template>
  <div class="page">
    <h1>Mood</h1>
    <div class="page__match">
      <Button
        :label="$t('mood.chill')"
        icon="pi pi-moon"
        class="p-button-raised p-button-secondary"
      />
      <Button
        :label="$t('mood.dynamic')"
        icon="pi pi-bolt"
        class="p-button-raised p-button-secondary"
      />
      <Button
        :label="$t('mood.melancholic')"
        icon="pi pi-image"
        class="p-button-raised p-button-secondary"
      />
      <Button
        :label="$t('mood.instrumental')"
        icon="pi pi-bell"
        class="p-button-raised p-button-secondary"
      />
      <Button
        :label="$t('mood.lyrical')"
        icon="pi pi-tags"
        class="p-button-raised p-button-secondary"
      />
    </div>
  </div>
</template>

<script setup>
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