<template>
  <div class="layout-menu">
    <router-link :to="{ name: 'home' }" class="layout-menu_link">
      <i class="pi pi-home"></i>
      <span>{{ $t('shared.home') }}</span>
    </router-link>

    <router-link :to="{ name: 'home' }" class="layout-menu_link">
      <i class="pi pi-search"></i>
      <span>{{ $t('shared.search') }}</span>
    </router-link>

    <GooeyButton>
      <router-link :to="{ name: 'home' }" class="layout-menu_link">
        <i class="pi pi-bolt" style="font-size: 1.75rem;"></i>
        <span></span>
      </router-link>
    </GooeyButton>

    <router-link :to="{ name: 'home' }" class="layout-menu_link">
      <i class="pi pi-bookmark"></i>
      <span>{{ $t('shared.playlists') }}</span>
    </router-link>

    <router-link :to="{ name: 'home' }" class="layout-menu_link">
      <i class="pi pi-user"></i>
      <span>{{ $t('shared.profil') }}</span>
    </router-link>
  </div>
</template>

<script setup>
import GooeyButton from '@/components/shared/buttons/GooeyButton.vue';
</script>