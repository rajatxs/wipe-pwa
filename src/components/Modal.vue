<script>
import { defineComponent } from 'vue';
import CloseOutlineIcon from '../assets/icons/close-outline.vue';

export default defineComponent({
   name: 'Modal',
   components: { CloseOutlineIcon },
   data() {
      return {
         modalId: '',
      }
   },
   props: {
      header: {
         type: Boolean,
         default: true,
      },
      title: {
         type: String,
         default: '',
      },
      closeButton: {
         type: Boolean,
         default: true,
      },
   },
   created() {
      this.modalId = 'modal_' + Math.round(Math.random() * 10e6);
   },
   methods: {
      handleBlurEvent($event) {
         const el = $event.target;

         if (el instanceof Element && 
            el.getAttribute('data-modal-id') === this.modalId && 
            el.classList.contains('app-modal-outlayer')) {
            this.$emit('blur', this.modalId);
         }
      },
      handleCloseEvent() {
         this.$emit('close', this.modalId);
      },
   },
});
</script>

<template>
   <div class="app-modal-outlayer" :data-modal-id="modalId" @click="handleBlurEvent">
      <div class="app-modal">
         <div v-if="header" class="app-modal-header">
            <h5 class="app-modeal-title">{{ title }}</h5>
            <app-icon-button v-if="closeButton" size="small" @click="handleCloseEvent">
               <CloseOutlineIcon />
            </app-icon-button>
         </div>
         <div class="app-modal-body">
            <slot></slot>
         </div>
         <div class="app-modal-footer">
            <slot name="footer"></slot>
         </div>
      </div>
   </div>
</template>

<style>
.app-modal-outlayer {
   display: flex;
   justify-content: center;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: var(--outlayer);
   z-index: 500;
}
.app-modal {
   position: absolute;
   bottom: 12px;
   left: 12px;
   right: 12px;
   width: auto;
   max-width: auto;
   padding: 12px 1rem;
   border-radius: 12px;
   height: auto;
   background-color: var(--accents-0);
}
.app-modal-header {
   display: flex;
   height: 38px;
   align-items: center;
   justify-content: space-between;
}
.app-modeal-title {
   margin: 0;
}
.app-modal-body {
   padding-top: 8px;
   padding-bottom: 8px;
}
.app-modal-footer {
   display: flex;
   justify-content: flex-end;
   gap: 15px;
   padding-top: 8px;
   padding-bottom: 8px;
}
@media screen and (min-width: 680px) {
   .app-modal-outlayer {
      align-items: center;
   }
   .app-modal {
      width: 440px;
      position: static;
   }
}
</style>
