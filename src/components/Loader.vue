<script>
import { defineComponent } from "vue";

export default defineComponent({
   name: "AppLoader",
   props: {
      color: {
         type: String,
         default: "foreground",
      },
      size: {
         type: String,
         default: '18px'
      }
   },
   computed: {
      loaderStyles() {
         return {
            width: this.size,
            height: this.size
         }
      },
      loaderClasses() {
         const list = ["app-loader"];

         list.push("use-" + this.color);

         return list;
      },
   },
});
</script>

<template>
   <div :class="loaderClasses" :style="loaderStyles">
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
      <div class="app-loader-dot"></div>
   </div>
</template>

<style>
@keyframes app-loader {
   100% {
      transform: rotate(360deg);
   }
}
@keyframes app-loader-dot {
   80%,
   100% {
      transform: rotate(360deg);
   }
}
@keyframes app-loader-dot-before {
   50% {
      transform: scale(0.4);
   }
   100%,
   0% {
      transform: scale(1);
   }
}
.app-loader {
   position: relative;
   animation: app-loader 2.5s infinite linear both;
}
.app-loader-dot {
   width: 100%;
   height: 100%;
   position: absolute;
   left: 0;
   top: 0;
   animation: app-loader-dot 2s infinite ease-in-out both;
}
.app-loader-dot:before {
   content: "";
   display: block;
   width: 25%;
   height: 25%;
   background-color: var(--color);
   border-radius: 100%;
   animation: app-loader-dot-before 2s infinite ease-in-out both;
}
.app-loader-dot:nth-child(1) {
   animation-delay: -1.1s;
}
.app-loader-dot:nth-child(2) {
   animation-delay: -1s;
}
.app-loader-dot:nth-child(3) {
   animation-delay: -0.9s;
}
.app-loader-dot:nth-child(4) {
   animation-delay: -0.8s;
}
.app-loader-dot:nth-child(5) {
   animation-delay: -0.7s;
}
.app-loader-dot:nth-child(6) {
   animation-delay: -0.6s;
}
.app-loader-dot:nth-child(1):before {
   animation-delay: -1.1s;
}
.app-loader-dot:nth-child(2):before {
   animation-delay: -1s;
}
.app-loader-dot:nth-child(3):before {
   animation-delay: -0.9s;
}
.app-loader-dot:nth-child(4):before {
   animation-delay: -0.8s;
}
.app-loader-dot:nth-child(5):before {
   animation-delay: -0.7s;
}
.app-loader-dot:nth-child(6):before {
   animation-delay: -0.6s;
}
</style>
