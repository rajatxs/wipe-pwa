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
  <div class="app-switch">
    <input 
      class="app-switch-input" 
      type="checkbox" 
      :id="id"
      :checked="value"
      @change="handleChanges" />
    <label class="app-switch-label" :for="id"></label>
  </div>
</template>

<style>
.app-switch {
  display: inline-flex;
  margin: 0 10px;
}
.app-switch input[type=checkbox] {
  height: 0;
  width: 0;
  visibility: hidden;
}
.app-switch input[type=checkbox]:checked + label {
  background: var(--color);
}
.app-switch input[type=checkbox]:checked + label::after {
  left: calc(100% - 4px);
  transform: translateX(-100%);
}
.app-switch label {
  cursor: pointer;
  width: 48px;
  height: 24px;
  background: var(--accents-2);
  display: block;
  border-radius: 24px;
  position: relative;
}
.app-switch label::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
  background: var(--accents-0);
  border-radius: 16px;
  transition: 0.3s;
}
</style>
