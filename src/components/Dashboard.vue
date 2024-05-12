<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { ref, watch, reactive, Ref } from 'vue'
import Widget from './Widget.vue'
import { supabase } from '../supabase'
import { useGlobalStore } from '../stores/global'
import { Dashboard } from '../types/dashboard'

const store = useGlobalStore()
if(store.currentCharacterSheet === null) {
throw new Error();
}

const dashboards = reactive(store.currentCharacterSheet.dashboards)

watch(
  dashboards,
  async (newDashboards: Dashboard[]) => {

if(store.currentCharacterSheet === null) {
throw new Error();
}
    await supabase.from('character_sheet').update({ dashboards: newDashboards }).eq('id', store.currentCharacterSheet.id);
  },
  { deep: true }
)

const maximizedPane: Ref<[number, number, number]|null> = ref(null);

function resizeRows(event: any) {
  for (var index in event) {
    dashboards[store.currentDashboard][parseInt(index)].object = event[index];
  }
}
function resizeCols(row: any, event: any) {
  for (var index in event) {
    dashboards[store.currentDashboard][row]['panes'][parseInt(index)]['object'] = event[index];
  }
}
function addRowPane() {
  dashboards[store.currentDashboard].push({ 'object': {}, 'panes': [{ 'object': {} }] });
}
function removeRowPane(rowIndex: any) {
  dashboards[store.currentDashboard].splice(rowIndex, 1);
}
function addColPane(rowIndex: any) {
  dashboards[store.currentDashboard][rowIndex]['panes'].push({ 'object': { size: null } });
}
function removeColPane(rowIndex: any, colIndex: any) {
  dashboards[store.currentDashboard][rowIndex]['panes'].splice(colIndex, 1);
}
</script>

<template>
  <template v-for="dashboard, i in dashboards">
    <div style="padding: calc(1rem - 2px); overflow: hidden;" v-if="i === store.currentDashboard">
      <splitpanes class="default-theme" :horizontal=true @resized="resizeRows($event)">
        <template v-for="(rowPane, rowIndex) in dashboard">

          <pane v-if="maximizedPane === null || (maximizedPane[0] === i && maximizedPane[1] === rowIndex)" :size="rowPane.object.size" class="pane">
            <nav v-if="store.dashboardEdition" class="rowNav">
              <button @click="addRowPane()">add row</button>
              <button @click="removeRowPane(rowIndex)">remove row</button>
            </nav>
            <splitpanes class="default-theme" @resized="resizeCols(rowIndex, $event)">
              <template v-for="(colPane, colIndex) in rowPane.panes">
                <pane v-if="maximizedPane === null || maximizedPane[1] === colIndex" class="pane"
                  :size="colPane.object.size">
                  <nav v-if="store.dashboardEdition" class="colNav">
                    <button @click="addColPane(rowIndex)">add col</button>
                    <button @click="removeColPane(rowIndex, colIndex)">remove col</button>
                  <button @click="maximizedPane === null ? maximizedPane = [i, rowIndex, colIndex] : maximizedPane = null">maximize</button>

                  </nav>
                
                  <Widget />
                </pane>
              </template>
            </splitpanes>
          </pane>
        </template>
      </splitpanes>
    </div>
  </template>
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
