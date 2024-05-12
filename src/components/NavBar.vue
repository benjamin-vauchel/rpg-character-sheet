<script setup lang="ts">
import { useGlobalStore } from '../stores/global'
import { Dashboard } from '../types/dashboard';
const store = useGlobalStore()
const defaultDashboard:Dashboard = [{ 'object': {}, 'panes': [{ 'object': {} }] }];
function setCurrentDashboard(i: number) {
  store.currentDashboard = i
}
</script>
<template>
  <nav class="navbar">
    NAV
    <button @click="store.dashboardEdition = !store.dashboardEdition">edit dashboard</button>
    <template v-if="store.currentCharacterSheet">
      <template v-if="Array.isArray(store.currentCharacterSheet.dashboards)">
        <template v-for="(, i) in store.currentCharacterSheet.dashboards.length">
        <button v-if="i" @click="setCurrentDashboard(i)">{{ i }}</button>
        </template>
        <button @click="store.currentCharacterSheet.dashboards.push(defaultDashboard)">+</button>
      </template>
      <button @click="store.currentCharacterSheet = null">close</button>
    </template>
  </nav>
</template>

<style scoped>
.navbar {
  color: #fff;
  background-color: #000;
}
</style>
