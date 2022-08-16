<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
    value: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleChanges($event) {
      this.$emit('value', $event.target.checked);
    }
  }
}
</script>

<template>
   <label class="app-switch">
      <input 
        type="checkbox" 
        :id="id" 
        :checked="value"
        @change="handleChanges" />
      <span class="app-switch-slider round"></span>
   </label>
</template>

<style>
.app-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.app-switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.app-switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: -4px;
  bottom: 0;
  background-color: var(--accents-2);
  -webkit-transition: 230ms;
  transition: 230ms;
}

.app-switch-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: var(--accents-0);
  -webkit-transition: 230ms;
  transition: 230ms;
}

input:checked + .app-switch-slider {
  background-color: var(--color);
}

input:focus + .app-switch-slider {
  box-shadow: 0 0 1px var(--color);
}

input:checked + .app-switch-slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.app-switch-slider.round {
  border-radius: 34px;
}

.app-switch-slider.round:before {
  border-radius: 50%;
}
</style>
