<template>
  <div 
    v-touch:swipe.left="like" 
    v-touch:swipe.right="dontLike"
  >
    <h1>Discovery</h1>
    <Player>
      <template v-slot:actions>
        <Button
          icon="pi pi-times"
          class="p-button-rounded p-button-action p-button-danger"
          @click="dontLike"
        />
        <Button
          icon="pi pi-caret-right"
          class="p-button-rounded p-button-action p-button-main"
        />
        <Button
          icon="pi pi-heart"
          class="p-button-rounded p-button-action p-button-success"
          @click="like"
        />
      </template>
    </Player>
  </div>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";

function like() {
  console.log("like ❤️");
}

function dontLike() {
  console.log("don't like 💩")
}
</script>