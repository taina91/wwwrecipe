<template lang="">
  <div class="my-multiselect" @click="focused = !focused" ref="parent">
    <div
      class="my-multiselect__selected"
      v-for="option in formattedOptions"
      :key="option.id"
      v-show="option.checked"
    >
      {{ option.title }}
      <span
        class="my-multiselect__remove"
        @click="
          preventClose($event);
          handlerOptionClick(option.id);
        "
        >&times;</span
      >
    </div>
    <div
      class="my-multiselect__options"
      v-show="focused"
      :style="{ top: optionsTop }"
      @click="preventClose"
    >
      <div
        class="my-multiselect__option"
        :class="{ 'my-multiselect__option--checked': option.checked }"
        v-for="option in seartch"
        :key="option.id"
        @click="handlerOptionClick(option.id)"
      >
        <div class="my-multiselect__checkbox"></div>
        <div class="my-multiselect__text">
          {{ option.title }}
        </div>
      </div>
    </div>
    <input
      v-bind:value="src"
      @input="src = $event.target.value"
      @click="focused = false"
      aria-label="Select more"
    />
  </div>
</template>
<script>
export default {
  name: "my-multiselect",
  data() {
    return {
      focused: false,
      optionsTop: "55px",
      src: "",
    };
  },
  computed: {
    formattedOptions() {
      let fo = this.options.map((option) => {
        let checked = this.modelValue.some(
          (v) => v === option[this.valueProperty]
        );
        return { ...option, checked };
      });
      return fo;
    },
    seartch() {
      return this.formattedOptions.filter((v) =>
        v.title.toLowerCase().includes(this.src.toLowerCase())
      );
    },
  },
  mounted() {
    this.fixTop();
  },
  methods: {
    fixTop() {
      this.optionsTop = this.$refs.parent.clientHeight + 2 + "px";
    },
    preventClose(e) {
      e.stopPropagation();
    },
    handlerOptionClick(i) {
      let clickedValue = i;
      let newValue = [...this.modelValue];

      let existInd = this.modelValue.findIndex((v) => v === clickedValue);

      if (existInd === -1) {
        newValue.push(clickedValue);
      } else {
        newValue.splice(existInd, 1);
      }
      this.src = "";
      this.$emit("update:modelValue", newValue);
      setTimeout(this.fixTop, 10);
    },
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Select more",
    },
    displayProperty: {
      type: String,
      default: "name",
    },
    valueProperty: {
      type: String,
      default: "id",
    },
  },
};
</script>
<style lang="css" scoped>
input {
  border: none;
  border: 2px solid transparent;
  width: 90%;
  /* border-radius: 100px 0px; */
  padding: 5px 20px;
  color: #2b2c2e;
  font-size: 24px;
}
input:focus {
  outline: none;
  border: 2px solid transparent;
}
.my-multiselect {
  background-color: white;
  color: #2b2c2e;
  border-radius: 50px 0px;
  padding: 10px 30px;
  display: inline-block;
  min-height: 54px;
  /* max-height: content; */
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.my-multiselect:focus {
  outline: none;
}
.my-multiselect__selected {
  border: 1px solid #ff5800;
  padding: 4px 8px;
  padding-right: 0;
  margin: 3px 3px;
}
.my-multiselect__remove {
  cursor: pointer;
  padding-right: 7px;
  font-size: 24px;
}
.my-multiselect__remove:hover {
  color: #ff5800;
  font-weight: bold;
}
.my-multiselect__options {
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  background-color: white;
  flex-direction: column;
  padding: 5px 0;
  min-height: 50px;
  max-height: 188px;
  overflow-y: auto;
  z-index: 11;
}
.my-multiselect__option {
  padding: 6px 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.my-multiselect__option--checked {
  color: #209b90;
  font-weight: bold;
}
.my-multiselect__checkbox {
  width: 22px;
  height: 22px;
  border: 1px solid #209b90;
  margin-right: 7px;
  position: relative;
}
.my-multiselect__option--checked .my-multiselect__checkbox {
  border: 1px solid #209b90;
  background-color: #209b90;
}
.my-multiselect__option--checked .my-multiselect__checkbox::after {
  width: 11px;
  height: 6px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  content: "";
  z-index: 11;
  position: absolute;
  transform: rotate(-45deg);
  left: 3px;
  top: 4px;
}
</style>
