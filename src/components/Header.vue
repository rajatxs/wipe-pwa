<script>
import { defineComponent } from 'vue';
import AddOutlineIcon from '../assets/icons/add-outline.vue';
import SearchOutlineIcon from '../assets/icons/search-outline.vue';
import NavigationTab from '../components/NavigationTab.vue';

export default defineComponent({
   name: 'Header',
   components: {
      AddOutlineIcon,
      SearchOutlineIcon,
      NavigationTab,
   },
   methods: {
      handleAddSubscription() {
         this.$router.push('/add');
      }
   }
});
</script>

<template>
   <header class="app-header">
      <div class="app-header-actions-group">
         <app-icon-button>
            <SearchOutlineIcon />
         </app-icon-button>

         <NavigationTab />

         <app-icon-button @click="handleAddSubscription">
            <AddOutlineIcon />
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
