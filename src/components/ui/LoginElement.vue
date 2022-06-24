<script setup lang="ts">
import { ref, useCssModule } from "vue";
import Input from "./InputElement.vue";
const style = useCssModule("login");

const login = ref("");
const isLoginComplete = ref(false);
const completeLogin = ref("");

const handleCompleteLogin = () => {
  completeLogin.value = login.value;
  login.value = "";
  isLoginComplete.value = true;
};

/* const handleLoginComplete = (e: KeyboardEvent) => {}; */
</script>

<template>
  <div :class="style.form">
    <div
      :class="[
        style['input-wrapper'],
        { [style['complete']]: isLoginComplete },
      ]"
    >
      <div :class="style['input-preview-wrapper']">
        <span :class="style['input-preview']">{{ completeLogin }}</span>
      </div>
      <Input
        :disabled="Boolean(completeLogin)"
        @keydown.enter.prevent.stop="handleCompleteLogin"
        v-model="login"
        autofocus
        :class="style.login"
        label="Login"
        type="login"
        autocomplete="off"
      />
    </div>

    <Input
      type="password"
      autocomplete="current-password"
      v-model="login"
      autofocus
      :class="style.password"
      label="Password"
    />
  </div>
</template>

<style module="login">
.form {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
}

.input-wrapper {
  margin-top: calc(-9.5 * (1vw + 1vh));
}

.input-wrapper.complete {
  transform: translateY(calc(-10 * (1vw + 1vh)));
}

.password {
  display: none;
}

.input-wrapper,
.login,
.password {
  position: absolute;
  font-size: calc(3 * (1vw + 1vh));
  width: 80vw;
  min-width: 280px;
}

.input-preview-wrapper {
  position: absolute;
  width: 80vw;
  box-sizing: border-box;
}

.input-preview {
  position: absolute;
  left: 0;
  transform: translate(0%, -8%);
  padding: 1em 1em 1em 1em;
}

.complete .input-preview {
  opacity: 1;
  left: 50%;
  transform: translate(-50%, 0px);
}

.input-preview,
.login,
.input-wrapper {
  transition: all 0.5s;
}

.complete .login {
  opacity: 0;
  pointer-events: none;
}
</style>
