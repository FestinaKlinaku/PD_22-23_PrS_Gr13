<template>
  <div>
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <input
      :id="id"
      :value="value"
      @input="updateValue"
      @focus="toggleFocus"
      @blur="toggleFocus"
      v-bind="$attrs"
      v-on="listeners"
      class="input"
      :class="[
        { custom: customClass },
        { error: applyErrorClass },
        { focused: isFocused },
      ]"
    />
    <span :class="{ 'input-icon': customClass }"></span>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      isFocused: false,
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    value: [String, Number],
    customClass: {
      type: String,
      default: "",
    },
    applyErrorClass: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
    toggleFocus() {
      this.isFocused = !this.isFocused;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/components/baseInput/baseInput";
</style>
