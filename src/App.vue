<script setup lang="ts">
import CounterItem from "./components/CounterItem.vue";
import ButtonElement from "./components/ui/ButtonElement.vue";
</script>

<template>
  <CounterItem />
  <ButtonElement text="Click me" />
</template>

<style>
:root {
  --button-background: linear-gradient(104deg, #1c77c3 0%, #39a9db 100%);
  --button-background-disabled: linear-gradient(
    104deg,
    #838383 0%,
    #acacac 100%
  );
}

html {
  font-size: 16px;
}

body {
  background: rgb(58, 58, 58);
}
</style>
