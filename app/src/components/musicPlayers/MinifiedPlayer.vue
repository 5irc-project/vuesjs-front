<template>
  <div v-if="isLoaded" class="minified-player">
    <div class="minified-player__recap">
      <img :src="img" alt="" />
      <div class="minified-player__recap__informations">
        <div class="minified-player__recap__informations-text">
          <h5>{{ title }}</h5>
          <span> - {{ artists }}</span>
        </div>
        <slot></slot>
      </div>
      <div class="minified-player__recap__actions">
        <slot name="actions"></slot>
        <Button
          @click="togglePlay"
          :icon="`pi ${playIcon}`"
          class="p-button-rounded p-button-text p-button-main"
        />
      </div>
    </div>
    <Slider
      class="player__time__slider"
      v-model="position"
      :step="20"
      :min="0"
      :max="duration"
    />
  </div>
</template>

<script setup>
import usePlayer from "@/composables/musicPlayers/playerComposable";

const {
  isLoaded,
  artists,
  title,
  img,
  position,
  duration,
  playIcon,
  togglePlay,
} = usePlayer();
</script>

<style scoped lang="scss">
.minified-player {
  height: 50px;

  &__recap {
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 0.5rem;

    img {
      height: 100%;
      border-radius: $border-radius;
      background-size: cover;
    }

    &__informations {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0 0.25rem 0;

      &-text {
        display: flex;
        flex-direction: row;
        align-items: center;

        h5 {
          margin: 0;
          margin-right: 0.25rem;
          text-align: left !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 90px;
        }
      }

      span {
        text-align: left !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 90px;
      }
    }

    &__actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
}
</style>