<script setup lang="ts">
import { store } from '../store'
</script>

<template>
  <nav class="navbar">
    NAV
    <button @click="store.dashboardEdition = !store.dashboardEdition">edit dashboard</button>
  </nav>
</template>

<style scoped>
.navbar {
  color: #fff;
  background-color: #000;
}
</style>
