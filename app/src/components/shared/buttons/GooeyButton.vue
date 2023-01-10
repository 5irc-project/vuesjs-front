<template>
  <div class="gooey-bubbles" id="root-gooey">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="gooey">
          <!-- in="sourceGraphic" -->
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="highContrastGraphic"
          />
          <feComposite
            in="SourceGraphic"
            in2="highContrastGraphic"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>

    <button id="gooey-button">
      <span class="bubbles">
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
      </span>
    </button>
    <slot></slot>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { onMounted } from "vue";

onMounted(() => {
  gsap.fromTo("#root-gooey",
  {
    scale: 0,
    opacity: 0,
  },  
  {
    duration: 1,
    scale: 1,
    opacity: 1,
    ease: "elastic.inOut(1, 0.3)",
  });
});
</script>


<style lang="scss">
svg {
  position: absolute !important;
  top: -4000px !important;
  left: -4000px !important;
}

.gooey-bubbles {
  width: 65px;
  height: 65px;
  position: relative;
}
.gooey-bubbles > * {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#gooey-button {
  padding: 1rem;
  border: none;
  color: #0c1016;
  filter: url("#gooey");
  position: relative;
  background-color: #ff008d;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
#gooey-button:focus {
  outline: none;
}
#gooey-button .bubbles {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; }
    #gooey-button .bubbles .bubble {
      background-color: #ff008d;
      border-radius: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      z-index: -1; }
      #gooey-button .bubbles .bubble:nth-child(1) {
        left: 16px;
        width: 35px;
        height: 35px;
        animation: move-1 1.52s infinite;
        animation-delay: 0.2s; }
      #gooey-button .bubbles .bubble:nth-child(2) {
        left: 10px;
        width: 35px;
        height: 35px;
        animation: move-2 1.54s infinite;
        animation-delay: 0.4s; }
      #gooey-button .bubbles .bubble:nth-child(3) {
        left: 4px;
        width: 35px;
        height: 35px;
        animation: move-3 1.56s infinite;
        animation-delay: 0.6s; }
      #gooey-button .bubbles .bubble:nth-child(4) {
        left: 22px;
        width: 35px;
        height: 35px;
        animation: move-4 1.58s infinite;
        animation-delay: 0.8s; }
      #gooey-button .bubbles .bubble:nth-child(5) {
        left: 26px;
        width: 35px;
        height: 35px;
        animation: move-5 1.6s infinite;
        animation-delay: 1s; }
      #gooey-button .bubbles .bubble:nth-child(6) {
        left: 9px;
        width: 35px;
        height: 35px;
        animation: move-6 1.62s infinite;
        animation-delay: 1.2s; }
      #gooey-button .bubbles .bubble:nth-child(7) {
        left: 6px;
        width: 35px;
        height: 35px;
        animation: move-7 1.64s infinite;
        animation-delay: 1.4s; }
      #gooey-button .bubbles .bubble:nth-child(8) {
        left: 25px;
        width: 35px;
        height: 35px;
        animation: move-8 1.66s infinite;
        animation-delay: 1.6s; }
      #gooey-button .bubbles .bubble:nth-child(9) {
        left: 18px;
        width: 35px;
        height: 35px;
        animation: move-9 1.68s infinite;
        animation-delay: 1.8s; }
      #gooey-button .bubbles .bubble:nth-child(10) {
        left: 18px;
        width: 35px;
        height: 35px;
        animation: move-10 1.7s infinite;
        animation-delay: 2s; }
      #gooey-button .bubbles .bubble:nth-child(11) {
        left: 30px;
        width: 35px;
        height: 35px;
        animation: move-11 1.72s infinite;
        animation-delay: 2.2s; }
      #gooey-button .bubbles .bubble:nth-child(12) {
        left: 5px;
        width: 35px;
        height: 35px;
        animation: move-12 1.74s infinite;
        animation-delay: 2.4s; }
      #gooey-button .bubbles .bubble:nth-child(13) {
        left: 25px;
        width: 35px;
        height: 35px;
        animation: move-13 1.76s infinite;
        animation-delay: 2.6s; }

@keyframes move-1 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -90px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-2 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -94px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-3 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -151px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-4 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -122px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-5 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -114px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-6 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -72px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-7 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -141px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-8 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -125px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-9 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -137px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-10 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -72px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-11 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -156px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-12 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -84px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

@keyframes move-13 {
  0% {
    transform: translate(0, 0); }
  99% {
    transform: translate(0, -130px); }
  100% {
    transform: translate(0, 0);
    opacity: 0; } }

</style>