<script setup>
import AddOutlineIcon from '../assets/icons/add-outline.vue';
import SearchOutlineIcon from '../assets/icons/search-outline.vue';
import NavigationTab from '../components/NavigationTab.vue';
</script>

<template>
   <header class="app-header">
      <app-icon-button>
         <SearchOutlineIcon />
      </app-icon-button>

      <NavigationTab />

      <app-icon-button>
         <AddOutlineIcon />
      </app-icon-button>
   </header>
</template>

<style scoped>
.app-header {
   position: fixed;
   top: 0;
   left: auto;
   right: auto;
   width: calc(var(--scale-x) - 42px);
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 10px 14px;
}
</style>
