<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

const increment = () => {
  count.value++;
};

console.log(this);
</script>

<template>
  <button @click="increment">Increment counter</button>
</template>
