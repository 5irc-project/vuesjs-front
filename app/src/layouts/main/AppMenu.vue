<template>
  <div class="layout-menu">
    <carousel :items-to-show="1">
      <slide :key="0">
        <div class="layout-menu__item main-menu">
          <router-link :to="{ name: 'home' }" class="main-menu_link">
            <i class="pi pi-home"></i>
            <span>{{ $t('shared.home') }}</span>
          </router-link>

          <router-link :to="{ name: 'search' }" class="main-menu_link">
            <i class="pi pi-search"></i>
            <span>{{ $t('shared.search') }}</span>
          </router-link>

          <GooeyButton>
            <router-link :to="{ name: 'match' }" class="main-menu_link">
              <i class="pi pi-bolt" style="font-size: 1.75rem;"></i>
              <span></span>
            </router-link>
          </GooeyButton>

          <router-link :to="{ name: 'playlists' }" class="main-menu_link">
            <i class="pi pi-bookmark" v-badge.danger></i>
            <span>{{ $t('shared.playlists') }}</span>
          </router-link>

          <router-link :to="{ name: 'profil' }" class="main-menu_link">
            <i class="pi pi-user"></i>
            <span>{{ $t('shared.profil') }}</span>
          </router-link>
        </div>
      </slide>
      <slide :key="1">
        <div class="layout-menu__item minified-player-menu">
          <SpotifyMinifiedPlayer />
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import GooeyButton from '@/components/shared/buttons/GooeyButton.vue';
import SpotifyMinifiedPlayer from "@/components/musicPlayers/spotify/SpotifyMinifiedPlayer";

import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.fromTo(".main-menu_link",
  {
    opacity: 0,
  },  
  {
    duration: 1,
    opacity: 1,
    ease: "easeOut",
  });
});
</script>

<style>
.carousel__viewport {
  overflow: initial !important;
}
</style>