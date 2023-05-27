<template>
  <button
    type="submit"
    v-on="$listeners"
    v-bind="$attrs"
    class="button"
    :class="buttonClass"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/components/baseButton/baseButton";
</style>
