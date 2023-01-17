<template>
  <div class="page login">
    <div class="login__main">
      <div class="login__main-title">
        <img src="images/logo/main.svg" style="height: 34px" />
        <h1>Bruitz</h1>
      </div>
      <span>Trust us to introduce you the music you'll love</span>
    </div>
    <Button
      class="spotify p-0"
      aria-label="Spotify"
      @click="login"
    >
      <img src="images/logo/spotify.svg" style="height: 34px" />
      <span class="px-3">Login with Spotify</span>
    </Button>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { musicPlayerStoreKey, authServiceKey, userStoreKey } from "@/serviceKeys";
import { useRoute } from "vue-router";

const musicPlayerStore = inject(musicPlayerStoreKey);
const userStore = inject(userStoreKey);
const authService = inject(authServiceKey);
const route = useRoute();

const spotifyTokens = {
  accessToken: route.query.accessToken,
  refreshToken: route.query.refreshToken
}
const jwtToken = route.query.jwtToken;

if(jwtToken) {
  userStore.login(jwtToken);
}
if (spotifyTokens.accessToken) {
  window.opener.spotifyCallback(spotifyTokens);
}

function login() {
  musicPlayerStore.getService.login(authService);
}
</script>

<style scoped lang="scss">
.login {
  height: 100% !important;
}
.login__main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    h1 {
      margin-left: 0.5rem;
    }
  }

  span {
    text-align: center;
  }
}

.p-button.spotify {
  background: linear-gradient(
    to left,
    var(--green-400) 50%,
    var(--green-500) 50%
  );
  background-size: 200% 100%;
  background-position: right bottom;
  transition: background-position 0.5s ease-out;
  color: #000;
  border-color: var(--green-300);
  padding: 1rem !important;
}
.p-button.spotify:hover {
  background-position: left bottom;
}
.p-button.spotify:focus {
  box-shadow: 0 0 0 1px var(--green-400);
}
</style>