<script setup lang="ts">
import { useCssModule } from "vue";
import Input from "./InputElement.vue";
const style = useCssModule("login");
</script>

<template>
  <div :class="style.form">
    <Input autofocus :class="style.login" label="Your login" type="login" />
  </div>
</template>

<style module="login">
.form {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login {
  font-size: calc(3 * (1vw + 1vh));
  width: 80vw;
  min-width: 280px;
}
</style>
