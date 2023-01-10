<template>
  <div class="player">
    <img class="player__image" src="/images/image.PNG" alt="">
    <div class="player__info">
      <h2>{{ $t('shared.title') }}</h2>
      <span>{{ $t('shared.artist') }}</span>
    </div>
    <div class="player__time">
      <span class="player__time__current">1:04</span>
      <Slider class="player__time__slider" v-model="time" />
      <span class="player__time__total">2:52</span>
    </div>
    <div class="player__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const time = ref(10);
</script>

<style lang="scss">
</style>
