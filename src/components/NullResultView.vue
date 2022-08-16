<script>
export default {
   props: {
      img: {
         type: String,
         required: false,
      },
      title: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: false,
      },
      height: {
         type: String,
         default: '340px',
      },
   },
   computed: {
      nullRequestViewStyles() {
         return {
            'min-height': this.height,
         }
      }
   }
}
</script>

<template>
   <div class="app-null-result-view" :style="nullRequestViewStyles">
      <img 
         v-if="img" 
         :src="img" 
         :alt="title"
         height="110"
         class="app-null-result-view-image" />
      <br />
      <h5 class="app-null-result-view-title">{{ title }}</h5>
      <p class="app-null-result-view-desc"><small>{{ desc }}</small></p>
   </div>
</template>

<style>
.app-null-result-view {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
.app-null-result-view-title {
   color: var(--accents-4);
   font-weight: 500;
   line-height: 0.6rem;
   margin-top: 1rem;
}
.app-null-result-view-desc {
   color: var(--accents-3);
}
</style>
