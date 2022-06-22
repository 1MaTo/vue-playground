<script setup lang="ts">
import ButtonElement from "./components/ui/ButtonElement.vue";
import InputElement from "./components/ui/InputElement.vue";
</script>

<template>
  <InputElement
    label="Label sooooo loong"
    placeholder="Enter some text here"
  />
  <ButtonElement text="Click me" />
</template>

<style>
:root {
  --color-main-light: #39a9db;
  --color-main-dark: #1c77c3;
  --button-background: linear-gradient(104deg, #1c77c3 0%, #39a9db 100%);
  --button-background-disabled: linear-gradient(
    104deg,
    #838383 0%,
    #acacac 100%
  );
  --color-disabled: #8c8c8c;
  --color-font: #474448;
}

html {
  font-size: 16px;
  font-family: "Arial";
  color: var(--color-font);
}

body {
  background: #f1f0ea;
}
</style>
