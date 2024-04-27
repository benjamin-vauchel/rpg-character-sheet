<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { ref } from 'vue'
import { store } from '../store'

const count = ref(2)
import Widget from './Widget.vue'

const dashboard = ref(JSON.parse(localStorage.getItem('dashboard') || '[{"object":{}, "panes":[{"object":{}}]}]'));

/*const dashboard = ref(
[
  {
    object: {
      size: 10
    },
    panes: [
      {
        object: {
          size: 20
        },
      },
      {
        object: {
          size: 80
        },
      }
    ]
  },
  {
    object: {
      size: 90
    },
    panes: [
      {
        object: {
          size: 10
        },
      },
      {
        object: {
          size: 40
        },
      },
      {
        object: {
          size: 50
        },
      }
    ]
  },
])*/

const maximizedPane = ref(null);

function resizeRows(event: any) {
  for (var index in event) {
    dashboard.value[index]['object'] = event[index];
  }
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
function resizeCols(row: any, event: any) {
  for (var index in event) {
    dashboard.value[row]['panes'][index]['object'] = event[index];
  }
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
function addRowPane() {
  dashboard.value.push({ 'object': {}, 'panes': [{ 'object': {} }] });
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
function removeRowPane(rowIndex: any) {
  dashboard.value.splice(rowIndex, 1);
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
function addColPane(rowIndex: any) {
  /*const lastColIndex = dashboard.value[rowIndex]['panes'].length - 1
  const size = dashboard.value[rowIndex]['panes'][lastColIndex].size / 2
  dashboard.value[rowIndex]['panes'][lastColIndex].size = size*/
  dashboard.value[rowIndex]['panes'].push({ 'object': { size: null } });
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
function removeColPane(rowIndex: any, colIndex: any) {
  dashboard.value[rowIndex]['panes'].splice(colIndex, 1);
  localStorage.setItem('dashboard', JSON.stringify(dashboard.value))
}
</script>

<template>
  <div style="padding: calc(1rem - 2px); overflow: hidden;">
    <splitpanes class="default-theme" :horizontal=true @resized="resizeRows($event)">
      <template v-for="(rowPane, rowIndex) in dashboard">

        <pane v-if="maximizedPane === null || maximizedPane[0] === rowIndex" :size="rowPane.object.size" class="pane">
          <nav v-if="store.dashboardEdition" class="rowNav">
            <button @click="addRowPane()">add row</button>
            <button @click="removeRowPane(rowIndex)">remove row</button>
          </nav>
          <splitpanes class="default-theme" @splitter-click="count++" @resized="resizeCols(rowIndex, $event)">
            <template v-for="(colPane, colIndex) in rowPane.panes">
              <pane v-if="maximizedPane === null || maximizedPane[1] === colIndex" class="pane"
                :size="colPane.object.size">
                <nav v-if="store.dashboardEdition" class="colNav">
                  <button @click="addColPane(rowIndex)">add col</button>
                  <button @click="removeColPane(rowIndex, colIndex)">remove col</button>
                </nav>
                <!--<button
                  @click="maximizedPane === null ? maximizedPane = [rowIndex, colIndex] : maximizedPane = null">maximize</button>
                --><Widget />
              </pane>
            </template>
          </splitpanes>

        </pane>
      </template>
    </splitpanes>
  </div>
</template>

<style scoped>
.pane {
  container-type: size;
  container-name: pane;
}

.pane nav.colNav {
  margin-top: 1rem;
}

.pane nav.colNav button {
  background-color: #aaa;
}

.splitpanes.default-theme .splitpanes__pane {
  background-color: #fff;
  display: flex;
}
</style>
