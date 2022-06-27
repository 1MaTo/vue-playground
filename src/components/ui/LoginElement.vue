<script setup lang="ts">
import { ref, useCssModule, watch } from "vue";
import Input from "./InputElement.vue";
const style = useCssModule("login");

const login = ref("");
const password = ref("");

const isLoginComplete = ref(false);
const isPasswordComplete = ref(false);

const completeLogin = ref("");

const passwordRef = ref<any>(null);
const inputRef = ref<any>(null);

const handleCompleteLogin = () => {
  completeLogin.value = login.value;
  login.value = "";
  isLoginComplete.value = true;
};

const handleCompletePassword = () => {
  isPasswordComplete.value = true;
};

const handleEditLogin = () => {
  if (isPasswordComplete.value) return;
  isLoginComplete.value = false;
  setTimeout(() => {
    login.value = completeLogin.value;
    completeLogin.value = "";
    inputRef.value.inputRef.focus();
  }, 500);
};

watch(completeLogin, () => {
  if (completeLogin.value) {
    setTimeout(() => {
      passwordRef.value.inputRef.focus();
    }, 0);
  }
});

/* const handleLoginComplete = (e: KeyboardEvent) => {}; */
</script>

<template>
  <div :class="style.form">
    <div
      :class="[
        style['input-wrapper'],
        style['login-wrapper'],
        {
          [style['complete-login']]: isLoginComplete,
          [style['complete-password']]: isPasswordComplete,
        },
      ]"
    >
      <div :class="style['input-preview-wrapper']">
        <span @click="handleEditLogin" :class="style['input-preview']">{{
          completeLogin
        }}</span>
      </div>
      <Input
        ref="inputRef"
        :disabled="isLoginComplete"
        @keydown.enter.prevent.stop="handleCompleteLogin"
        v-model="login"
        autofocus
        :class="style.login"
        label="Login"
        type="login"
        autocomplete="off"
      />
    </div>

    <div
      :class="[
        style['input-wrapper'],
        style['password-wrapper'],
        { [style['complete-login']]: isLoginComplete },
        { [style['complete-password']]: isPasswordComplete },
      ]"
    >
      <Input
        ref="passwordRef"
        :disabled="!isLoginComplete"
        @keydown.enter.prevent.stop="handleCompletePassword"
        v-model="password"
        :class="style.password"
        label="Password"
        type="password"
        autocomplete="current-password"
      />
    </div>
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

.login-wrapper.complete-login {
  transform: translateY(calc(-12 * (1vw + 1vh)));
}

.login-wrapper.complete-login.complete-password {
  transform: translateY(0);
}

.password {
  pointer-events: none;
  opacity: 0;
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
  cursor: pointer;
}

.complete-password .input-preview {
  cursor: default;
}

.complete-login.login-wrapper .input-preview {
  opacity: 1;
  left: 50%;
  transform: translate(-50%, 0px);
}

.input-preview,
.login,
.input-wrapper,
.password {
  transition: all 0.5s;
}

.complete-login .login {
  opacity: 0;
  pointer-events: none;
}

.complete-login .password {
  pointer-events: unset;
  opacity: 1;
}

.complete-password .password {
  pointer-events: none;
  opacity: 0;
}
</style>
