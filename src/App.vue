<template>
  <div id="app">
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

body {
  margin: 0px;
}

#app {
  font-family: "Roboto", Arial, Helvetica, sans-serif;
  background: $bg-dark;
  width: 100vw;
  height: 100vh;
  color: $main-text;
}
</style>
