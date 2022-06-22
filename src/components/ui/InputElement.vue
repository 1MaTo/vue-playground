<script setup lang="ts">
import { ref, useCssModule } from "vue";
const style = useCssModule("input");

const props = defineProps<{
  label?: string;
  modelValue?: any;
  disabled?: boolean;
}>();

const uncontrolledInput = ref(props.modelValue || "");

const emit = defineEmits(["update:modelValue"]);

//  Sort of middleware to get info about component fill state
const handleValueChange = (e: Event) => {
  const value = props.disabled
    ? uncontrolledInput.value || props.modelValue || ""
    : (e.target as any).value;
  uncontrolledInput.value = value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div
    :class="[
      style.wrapper,
      {
        [style.filled]: uncontrolledInput,
        [style.disabled]: $props.disabled,
      },
    ]"
  >
    <div :class="style['float-wrapper']">
      <input
        :value="modelValue || uncontrolledInput"
        :="$attrs"
        :disabled="$props.disabled"
        :class="[style.input, { [style['with-label']]: label }]"
        :tabindex="$props.disabled ? '-1' : ($attrs.tabindex as any)"
        @input="handleValueChange"
      />
      <fieldset :class="style.border">
        <legend v-if="label" :class="style.legend">
          <span :class="style['legend-text']">{{ label }}</span>
        </legend>
      </fieldset>
      <span v-if="label" :class="style.label">{{ label }}</span>
    </div>
  </div>
</template>

<style module="input">
.wrapper {
  display: inline-block;
}

.wrapper.disabled .input {
  cursor: not-allowed;
}

.float-wrapper {
  position: relative;
  display: inline-block;
  transition-property: transform;
}

.float-wrapper::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  left: 0;
  top: 0;
  opacity: 0;
  box-shadow: 0px 6px 10px -2px #39a9db87;
  transition-property: opacity, transform;
}

.float-wrapper,
.float-wrapper::after {
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.input {
  outline: none;
  font-size: 1rem;
  border: none;
  background-color: transparent;
  color: var(--color-font);
}

.input::placeholder {
  transition-property: opacity;
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.input.with-label::placeholder {
  opacity: 0;
}

.border {
  box-sizing: border-box;
  pointer-events: none;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  position: absolute;
  border: 1px solid var(--color-main-dark);
  border-radius: 10px;
  margin: 0px;
  padding: 0px;
  z-index: -1;
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.input,
.border {
  padding: 16px 16px;
}

.legend {
  height: 0px;
  margin-left: -6px;
  visibility: hidden;
  width: auto;
  max-width: 0.01px;
  padding: 0px;
  font-size: 0.81em;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0, 0, 0, 1.2);
}

.legend-text {
  padding: 0px 3px;
}

.label {
  position: absolute;
  left: 0px;
  right: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 32px);
  font-family: "Arial";
  pointer-events: none;
  transform: translate(16px, 16px);
  transition-property: transform, max-width, color;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.label,
.input::placeholder {
  color: #8c8c8c;
}

.legend,
.label {
  transform-origin: left top;
}

/* Disabled */

.wrapper.disabled .border {
  border-color: var(--color-disabled);
}

.input:disabled {
  color: var(--color-disabled);
}

/* Hover */
.wrapper:hover:not(.disabled) .border {
  border-color: var(--color-main-light);
}

.wrapper:hover:not(.disabled) .float-wrapper,
.wrapper:focus-within:not(.disabled) .float-wrapper {
  transform: translateY(-6px);
}

.wrapper:hover:not(.disabled) .float-wrapper::after,
.wrapper:focus-within:not(.disabled) .float-wrapper::after {
  opacity: 1;
}

/* Focus */

.wrapper:focus-within:not(.disabled) .border {
  border-color: var(--color-main-dark);
  border-width: 2px;
}

.wrapper:focus-within:not(.disabled) .label {
  color: var(--color-main-dark);
  transform: translate(16px, -7px) scale(0.8);
  max-width: 100%;
}

.wrapper:focus-within:not(.disabled) .legend,
.filled .legend {
  transition-timing-function: cubic-bezier(0, 0.25, 1, 1);
  max-width: 100%;
}

/* Active */

.wrapper:active:not(.disabled) .float-wrapper {
  transform: translateY(-2px);
}

/* Filled */

.wrapper:focus-within:not(.disabled) .input::placeholder,
.filled .input::placeholder {
  opacity: 1;
}

.filled .label {
  max-width: 100%;
  transform: translate(16px, -7px) scale(0.8);
}
</style>
