<script>
import { defineComponent } from 'vue';
import PlusCircleIcon from '../assets/icons/plus-circle.vue';
import WhatsappIcon from '../assets/icons/whatsapp.vue';
import NavigationTab from '../components/NavigationTab.vue';

export default defineComponent({
   name: 'Header',
   components: {
      PlusCircleIcon,
      WhatsappIcon,
      NavigationTab,
   },
});
</script>

<template>
   <header class="app-header">
      <div class="app-header-actions-group">
         <app-icon-button @click="$router.push('/wa')">
            <WhatsappIcon />
         </app-icon-button>

         <NavigationTab />

         <app-icon-button @click="$router.push('/add')">
            <PlusCircleIcon />
         </app-icon-button>
      </div>
   </header>
</template>

<style scoped>
.app-header {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   width: 100%;
   height: 64px;
   border-bottom: 1px solid var(--accents-2);
}
.app-header-actions-group {
   position: absolute;
   display: flex;
   left: 50%;
   top: 50%;
   width: calc(var(--scale-x) - 42px);
   padding: 10px 14px;
   justify-content: space-between;
   transform: translate(-50%, -50%);
}
</style>
