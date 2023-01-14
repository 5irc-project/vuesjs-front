<template>
  <div class="player">
    <img class="player__image" :src="img" alt="" />
    <div class="player__info">
      <h2>{{ props.title }}</h2>
      <span>{{ props.artist }}</span>
    </div>
    <div class="player__time">
      <span class="player__time__current">{{ $ft(position) }}</span>
      <Slider
        class="player__time__slider"
        v-model="position"
        :step="20"
        :min="0"
        :max="props.duration"
      />
      <span class="player__time__total">{{ $ft(props.duration) }}</span>
    </div>
    <div class="player__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  title: String,
  artist: String,
  modelValue: Number,
  duration: Number,
  img: String,
});

const emit = defineEmits(["update:modelValue"]);

const position = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(`update:modelValue`, value);
  },
});
</script>

<style lang="scss">
</style>
