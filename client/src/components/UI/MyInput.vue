<template lang="">
  <input :value="modelValue" @input="updateInput" class="input" :type="type" />
</template>
<script>
export default {
  name: "my-input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    srcImg: {
      type: String,
      default: "",
    },
    modelValue: [String, Number],
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style lang="css" scoped>
.input {
  border-radius: 100px 0px;
  border: none;
  border: 2px solid transparent;
  width: 100%;
  padding: 5px 35px;
  color: #2b2c2e;
}
.input:focus {
  outline: none;
  border: 2px solid #ff5800;
}
input::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
