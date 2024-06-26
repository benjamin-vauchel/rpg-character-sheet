<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { ref, watch, reactive, Ref } from 'vue'
import Widget from './Widget.vue'
import { supabase } from '../supabase'
import { useGlobalStore } from '../stores/global'
import { Dashboard } from '../types/dashboard'
import MiniButton from './MiniButton.vue'

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
function editWidget(rowIndex: number, colIndex: number) {
  store.widgetEdition = [rowIndex, colIndex]
}
</script>

<template>
  <template v-for="dashboard, i in dashboards">
    <div style="padding: calc(1rem - 2px); overflow: hidden;" v-if="i === store.currentDashboard">
      <splitpanes class="default-theme" :horizontal=true @resized="resizeRows($event)">
        <template v-for="(rowPane, rowIndex) in dashboard">

          <pane v-if="maximizedPane === null || (maximizedPane[0] === i && maximizedPane[1] === rowIndex)" :size="rowPane.object.size" class="pane">
            <splitpanes class="default-theme" @resized="resizeCols(rowIndex, $event)">
              <template v-for="(colPane, colIndex) in rowPane.panes">
                <pane v-if="maximizedPane === null || maximizedPane[1] === colIndex" class="pane"
                  :size="colPane.object.size">
                  <Widget :class="{'not-edited': (store.widgetEdition && (store.widgetEdition[0] !== rowIndex || store.widgetEdition[1] !== colIndex))}" />
                  <div :class="{'edit-overlay': true, 'editing-overlay' : store.widgetEdition }" v-if="store.dashboardEdition">
                    <MiniButton icon="circle-dot" big @click="editWidget(rowIndex, colIndex)" v-if="!store.widgetEdition"/>
                  </div>
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

.splitpanes.default-theme .splitpanes__pane {
  background-color: #fff;
  display: flex;
}

.edit-overlay {
  background: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: .2rem;
  left: .2rem;
  right: .2rem;
  bottom: .2rem;
  z-index: 990;
  backdrop-filter: blur(3px);
  border-radius:1rem;
}
.edit-overlay :deep(.button) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.editing-overlay {
  backdrop-filter: none;
}
:deep(.not-edited) {
  opacity: .2;
}
</style>
