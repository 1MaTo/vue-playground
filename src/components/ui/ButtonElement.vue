<script setup lang="ts">
import { useCssModule, type ButtonHTMLAttributes } from "vue";
const style = useCssModule("button");

type ButtonProps = {
  disabled?: boolean;
  text?: string;
};

defineProps<ButtonProps>();
</script>

<template>
  <button
    :disabled="disabled"
    :tabindex="disabled ? '-1' : undefined"
    :class="style.wrapper"
  >
    <div :class="style['button-base']">
      <span :class="style['hidden-text']">{{ text }}</span>
      <div :class="style['text-container']">
        <span :class="style['visible-text']">{{ text }}</span>
      </div>
    </div>
  </button>
</template>

<style module="button">
.wrapper {
  cursor: pointer;
  padding: 0;
  outline: none;
  border: none;
  border-radius: 10px;
  background: none;
  font-size: 1rem;
  color: white;
}

.button-base {
  position: relative;
  transition: transform;
  background: var(--button-background);
  padding: 1em 1.6em;
  border: none;
}

.button-base::after {
  content: "";
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  box-shadow: 0px 6px 10px 3px #39a9db87;
  transition-property: opacity transform;
}

.wrapper,
.button-base,
.button-base::after {
  border-radius: 10px;
}

.hidden-text {
  pointer-events: none;
  visibility: hidden;
  color: transparent;
}

.text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visible-text {
  padding: 1em 1.6em;
}

.button-base,
.button-base::after,
.visible-text {
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 1, 1);
}

/* Hover behavior */

.wrapper:hover:not(:disabled) .button-base {
  transform: translateY(-6px);
}

.wrapper:hover:not(:disabled) .button-base::after {
  opacity: 1;
}

/* Focus behavior */

.wrapper:focus-visible:not(:disabled) .button-base {
  outline: 2px solid #5ac8ff;
}

/* Active behavior */

.wrapper:active:not(:disabled) .button-base {
  transform: translateY(-1px);
}

.wrapper:active:not(:disabled) .button-base::after {
  opacity: 0.5;
}

/* Disabled behavior */

.wrapper:disabled {
  color: #dadada;
  cursor: not-allowed;
}

.wrapper:disabled .button-base {
  background: var(--button-background-disabled);
}
</style>
