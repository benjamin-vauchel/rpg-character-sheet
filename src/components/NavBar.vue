<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue';
import { useGlobalStore } from '../stores/global'
import { Dashboard } from '../types/dashboard';
import MiniButton from './MiniButton.vue';

let menu = ref('');
const store = useGlobalStore()
if (store.currentCharacterSheet === null) {
  throw new Error();
}
const defaultDashboard: Dashboard = [{ 'object': {}, 'panes': [{ 'object': {} }] }];
const dashboards = reactive(store.currentCharacterSheet.dashboards)


function setCurrentDashboard(i: number) {
  store.currentDashboard = i
}

function removeCurrentDashboard() {
  store.currentCharacterSheet?.dashboards.splice(store.currentDashboard, 1);
  if (store.currentCharacterSheet?.dashboards.length == 0) {
    store.currentCharacterSheet?.dashboards.push(defaultDashboard);
  }

  store.currentDashboard = Math.max(0, store.currentDashboard - 1);
}

function toggleMenu(menuName: string) {
  menu.value = menu.value === menuName ? '' : menuName
}

function addWidgetBefore() {
  if (store.widgetEdition) {
    insertWidgetAt(store.widgetEdition[0], store.widgetEdition[1] - 1);
    store.widgetEdition[1] += 1;
  }
}
function addWidgetAfter() {
  if (store.widgetEdition) {
    insertWidgetAt(store.widgetEdition[0], store.widgetEdition[1] + 1);
  }
}
function addWidgetAbove() {
  if (store.widgetEdition) {
    insertWidgetAt(store.widgetEdition[0] - 1);
    store.widgetEdition[0] += 1;
  }
}
function addWidgetBelow() {
  if (store.widgetEdition) {
    insertWidgetAt(store.widgetEdition[0] + 1);
  }
}
function removeWidget() {
  if (store.widgetEdition) {
    if (dashboards[store.currentDashboard][store.widgetEdition[0]]['panes'].length === 1) {
      dashboards[store.currentDashboard].splice(store.widgetEdition[0], 1);
    } else {
      dashboards[store.currentDashboard][store.widgetEdition[0]]['panes'].splice(store.widgetEdition[1], 1);
    }
    store.widgetEdition = null;
  }
}
function setWidget(id: string = 'default') {
  console.log(id)
}

function insertWidgetAt(rowIndex: number, colIndex: number | null = null) {
  let oldDashbboard = toRaw(dashboards[store.currentDashboard]);
  let newDashboard: any = [];

  if (rowIndex < 0) {
    newDashboard.push({ 'object': {}, 'panes': [{ 'object': {} }] });
  }

  const imax = oldDashbboard.length;
  for (let i = 0; i < imax; i++) {
    if (i === rowIndex && colIndex === null) {
      if (store.widgetEdition && rowIndex < store.widgetEdition[0]) {
        newDashboard.push(Object.assign({}, oldDashbboard[i]));
        newDashboard.push({ 'object': {}, 'panes': [{ 'object': {} }] });
      } else {
        newDashboard.push({ 'object': {}, 'panes': [{ 'object': {} }] });
        newDashboard.push(Object.assign({}, oldDashbboard[i]));
      }
    } else {
      newDashboard.push(Object.assign({}, oldDashbboard[i]));
      let k = newDashboard.length - 1;
      if (i === rowIndex && colIndex !== null) {
        newDashboard[k]['panes'] = [];
        if (colIndex < 0) {
          newDashboard[k]['panes'].push({ 'object': { size: null } });
        }
        const jmax = oldDashbboard[k]['panes'].length;
        for (let j = 0; j < jmax; j++) {
          if (j === colIndex) {
            newDashboard[k]['panes'].push({ 'object': { size: null } });
          }
          newDashboard[k]['panes'].push(Object.assign({}, oldDashbboard[i]['panes'][j]));
        }

        if (colIndex >= jmax) {
          newDashboard[k]['panes'].push({ 'object': { size: null } });
        }
      }
    }
  }

  if (rowIndex >= imax) {
    newDashboard.push({ 'object': {}, 'panes': [{ 'object': {} }] });
  }

  dashboards[store.currentDashboard] = newDashboard;
}

</script>
<template>
  <nav class="navbar">
    <template v-if="store.currentCharacterSheet">
      <div class="dashboards" v-if="Array.isArray(store.currentCharacterSheet.dashboards)">
        <template v-for="(, i) in store.currentCharacterSheet.dashboards.length">
          <MiniButton :text='"" + (i + 1)' :active='i === store.currentDashboard' inversed
            @click="setCurrentDashboard(i)" />
        </template>
      </div>
      <div class="menu">

        <div :class="{ 'dashboard-menu': true, 'open': menu === 'dashboard-menu' }" v-if="!store.dashboardEdition">
          <MiniButton icon="pencil" inversed big
            @click="(store.dashboardEdition = !store.dashboardEdition) && (store.widgetEdition = null)"
            :style="{ 'grid-area': 'a', '--i': 1 }" />
          <MiniButton icon="trash" inversed big @click="removeCurrentDashboard()"
            :style="{ 'grid-area': 'b', '--i': 3 }" />
          <MiniButton icon="house" inversed big @click="store.currentCharacterSheet = null"
            :style="{ 'grid-area': 'c', '--i': 0 }" />
          <MiniButton icon="circle-dot" inversed big @click="toggleMenu('dashboard-menu');"
            :style="{ 'grid-area': 'd' }" class="toggle" />
          <MiniButton icon="plus" inversed big @click="store.currentCharacterSheet.dashboards.push(defaultDashboard)"
            :style="{ 'grid-area': 'e', '--i': 2 }" />
        </div>
        <div :class="{ 'dashboard-edition-menu': true, 'open': store.widgetEdition }" v-if="store.dashboardEdition">
          <MiniButton icon="layer-group" inversed big @click="toggleMenu('dashboard-edit-widget-menu')"
            :style="{ 'grid-area': 'a', '--i': 3 }" />
          <MiniButton icon="square-plus" inversed big @click="toggleMenu('dashboard-add-widget-menu')"
            :style="{ 'grid-area': 'b', '--i': 2 }" />
          <MiniButton icon="square-minus" inversed big @click="removeWidget()"
            :style="{ 'grid-area': 'c', '--i': 1 }" />
          <MiniButton icon="pencil" inversed big @click="store.dashboardEdition = false; store.widgetEdition = null"
            :style="{ 'grid-area': 'd' }" class="toggle" />

          <MiniButton icon="caret-left" inversed big @click="addWidgetBefore()"
            :class="{ 'hidden': menu !== 'dashboard-add-widget-menu' }" :style="{ 'grid-area': 'b1', '--i': 4 }" />
          <MiniButton icon="caret-up" inversed big @click="addWidgetAbove()"
            :class="{ 'hidden': menu !== 'dashboard-add-widget-menu' }" :style="{ 'grid-area': 'b2', '--i': 2 }" />
          <MiniButton icon="caret-down" inversed big @click="addWidgetBelow()"
            :class="{ 'hidden': menu !== 'dashboard-add-widget-menu' }" :style="{ 'grid-area': 'b3', '--i': 3 }" />
          <MiniButton icon="caret-right" inversed big @click="addWidgetAfter()"
            :class="{ 'hidden': menu !== 'dashboard-add-widget-menu' }" :style="{ 'grid-area': 'b4', '--i': 1 }" />

          <MiniButton icon="scroll" inversed big @click="setWidget('log')"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a1', '--i': 4 }" />
          <MiniButton icon="chart-simple" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a2', '--i': 3 }" />
          <MiniButton icon="shield" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a3', '--i': 2 }" />
          <MiniButton icon="sack-dollar" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a4', '--i': 1 }" />
          <MiniButton text="XP" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a5', '--i': 4 }" />
          <MiniButton icon="list-check" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a6', '--i': 3 }" />
          <MiniButton icon="user" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a7', '--i': 2 }" />
          <MiniButton icon="people-group" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a8', '--i': 1 }" />
          <MiniButton icon="stethoscope" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a9', '--i': 4 }" />
          <MiniButton icon="weight-hanging" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a10', '--i': 3 }" />
          <MiniButton icon="sitemap" inversed big @click="setWidget()"
            :class="{ 'hidden': menu !== 'dashboard-edit-widget-menu' }" :style="{ 'grid-area': 'a11', '--i': 2 }" />

          <div :style="{ 'grid-area': 'fill', 'width': '10rem' }"></div>
        </div>

      </div>
      <div class="title">
        Star Wars<br />
        Edge Of The Empire
      </div>
    </template>


  </nav>
</template>

<style scoped>
.navbar {
  color: #fff;
  background-color: #000;
  display: grid;
  grid-gap: 1rem;
  padding: .5rem;
  align-content: center;
  grid-template-columns: 1fr 4rem 1fr;
}

.title {
  font-family: 'Star Jedi';
  text-align: right;
  text-transform: lowercase;
  font-size: .5rem;
}

.menu {
  position: relative
}

.menu .button:not(.toggle),
.menu :deep(.hidden) {
  opacity: 0;
  pointer-events: none;
}

.menu :deep(.open .button:not(.toggle):not(.hidden)) {
  animation: .1s calc(.1s * var(--i)) grow both ease-out;
  pointer-events: auto;
}

.dashboard-menu {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -.3rem;
  display: grid;
  grid-template:
    ". a a b b ."
    "c c d d e e";
  grid-template-rows: 2rem;
}

.dashboard-edition-menu {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -.3rem;
  display: grid;
  grid-template:
    ". . . . . a1 a1 a2 a2 a3 a3 a4 a4 a5 a5 . . . . ."
    ". . . . . . a6 a6 a7 a7 a8 a8 a9 a9 . . . . . ."
    ". . . . . . . a10 a10 a a a11 a11 . . . . . . ."
    "b1 b1 b2 b2 b3 b3 b4 b4 b b c c fill fill fill fill fill fill fill fill"
    ". . . . . . . . . d d . . . . . . . . .";
  grid-template-rows: repeat(4, 2rem);
}

@keyframes grow {
  from {
    transform: scale(.1);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
