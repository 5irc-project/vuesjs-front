<template>
  <div class="b-list__item">
    <img class="b-list__item__image" :src="imageSrc" alt="" />
    <div class="b-list__item__info" @click="emit('clickItem')">
      <h4>{{ title }}</h4>
      <span>{{ description }}</span>
    </div>
    <slot></slot>
    <i
      class="b-list__item__action pi pi-ellipsis-v"
      @click="emit('clickAction')"
    />
  </div>
</template>

<script setup>
defineProps({
  imageSrc: String,
  title: String,
  description: String,
});

const emit = defineEmits(["clickAction", "clickItem"]);
</script>

<style lang="scss">
.b-list__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  &__image {
    height: 100%;
    border-radius: $border-radius;
    margin-right: $content-padding;
  }

  &__info {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    h4 {
      margin: 0;
    }
  }

  &__action {
    margin-left: $content-padding;
    height: auto;
    font-size: 1.25rem;
  }
}
</style>