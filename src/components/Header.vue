<script setup>
import PlusCircleIcon from '../assets/icons/plus-circle.vue';
import WhatsappIcon from '../assets/icons/whatsapp.vue';
import NavigationTab from '../components/NavigationTab.vue';
import IconButton from '../components/IconButton.vue';
</script>

<template>
   <header class="app-header">
      <div class="app-header__container">
         <IconButton @click="$router.push('/wa')">
            <WhatsappIcon />
         </IconButton>

         <NavigationTab />

         <IconButton @click="$router.push('/add')">
            <PlusCircleIcon />
         </IconButton>
      </div>
   </header>
</template>

<style>
.app-header {
   @apply fixed flex justify-center items-center top-0 left-0 right-0 w-full h-16 border-b z-10 border-neutral-200 bg-white;
}
.app-header__container {
   @apply w-full flex justify-between items-center max-w-[1080px] md:w-1/2 h-full px-3;
}
</style>
