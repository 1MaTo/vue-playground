<script setup lang="ts">
import { onMounted, ref, useCssModule } from "vue";
const style = useCssModule("input");

const props = defineProps<{
  label?: string;
  modelValue?: any;
  disabled?: boolean;
  class?: string;
}>();

const inputRef = ref(null);

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

const isPressed = ref(false);

const handlePressChange = (e: KeyboardEvent) => {
  if (e.key === "Tab") return;
  const pressed = e.type === "keydown";
  isPressed.value = pressed;
};

defineExpose({ inputRef });
</script>

<template>
  <div
    :class="[
      style.wrapper,
      $props.class,
      {
        [style.filled]: uncontrolledInput || $props.modelValue,
        [style.disabled]: $props.disabled,
        [style.pressed]: isPressed,
      },
    ]"
  >
    <div :class="style['float-wrapper']">
      <input
        ref="inputRef"
        @keydown="handlePressChange"
        @keyup="handlePressChange"
        :value="modelValue === undefined ? uncontrolledInput : modelValue"
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
      <label v-if="label" :class="style.label">{{ label }}</label>
    </div>
  </div>
</template>

<style module="input">
.wrapper {
  display: inline-block;
  font-size: 1rem;
  min-width: 200px;
}

.wrapper.disabled .input {
  cursor: not-allowed;
}

.float-wrapper {
  width: 100%;
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
  left: 0;
  top: 0;
  opacity: 0;
  box-shadow: 0px 34px 70px -30px #39a9db87;
  transition-property: opacity, transform;
}

.float-wrapper,
.float-wrapper::after {
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.input {
  width: 100%;
  box-sizing: border-box;
  outline: none;
  font-size: 1em;
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
  border: 0.063em solid var(--color-main-dark);
  margin: 0px;
  padding: 0px;
  z-index: -1;
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

.float-wrapper::after,
.border {
  border-radius: 0.625em;
}

.input,
.border {
  padding: 1em;
}

.legend {
  height: 0.3em;
  margin-left: -0.385em;
  visibility: hidden;
  width: auto;
  max-width: 0.01px;
  padding: 0px;
  font-size: 0.787em;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0, 0, 0, 1.2);
}

.legend-text {
  padding: 0px 0.3875em;
}

.label {
  position: absolute;
  left: 0px;
  right: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 2em);
  font-family: "Arial";
  pointer-events: none;
  transform: translate(1em, 1em);
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

.wrapper:hover:not(.disabled) .label {
  color: var(--color-main-light);
}

.wrapper:hover:not(.disabled) .float-wrapper,
.wrapper:focus-within:not(.disabled) .float-wrapper {
  transform: translateY(-0.375em);
}

.wrapper:hover:not(.disabled) .float-wrapper::after,
.wrapper:focus-within:not(.disabled) .float-wrapper::after {
  opacity: 1;
}

/* Focus */

.wrapper:focus-within:not(.disabled) .border {
  border-color: var(--color-main-dark);
  border-width: 0.125em;
}

.wrapper:focus-within:not(.disabled) .label {
  color: var(--color-main-dark);
}

/* Active */

.wrapper:active:not(.disabled) .float-wrapper {
  transform: translateY(-0.125em);
}

.wrapper:active:not(.disabled) .float-wrapper::after {
  opacity: 0.5;
}

/* Filled */

.wrapper:focus-within:not(.disabled) .input::placeholder,
.filled .input::placeholder {
  opacity: 1;
}

/* Filled or Focus */

.filled .label,
.wrapper:focus-within:not(.disabled) .label {
  width: calc((100% * 1.21) - 2em);
  max-width: unset;
  transform: translate(1.06em, -0.3675em) scale(0.79);
}

.wrapper:focus-within:not(.disabled) .legend,
.filled .legend {
  transition-timing-function: cubic-bezier(0, 0.25, 1, 1);
  max-width: 100%;
}

/* Pressed */

.wrapper:not(.disabled).pressed .float-wrapper {
  transform: translateY(-0.25em);
}
</style>
