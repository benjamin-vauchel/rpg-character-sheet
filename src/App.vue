<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Dashboard from './components/Dashboard.vue'
import CharacterSheetList from './components/CharacterSheetList.vue'
import NavBar from './components/NavBar.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import { useGlobalStore } from './stores/global'

const session = ref()
const store = useGlobalStore()

onMounted(async () => {
  const {data} = await supabase.auth.getSession();
  session.value = data.session
  if (session) {
    const { data: playerData } = await
      supabase
        .from('player')
        .select()
        .limit(1)
        .single()
    if (playerData) {
      store.player = playerData;

      const { data: characterSheetsData } = await
        supabase
          .from('character_sheet')
          .select('*, character(*)')
          .eq('player_id', playerData.id)
      store.characterSheets = characterSheetsData || [];
    }
  }

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })

})
</script>

<template>
  <template v-if="session && store.currentCharacterSheet">
    <Dashboard />
    <NavBar />
  </template>
  <template v-else-if="session && store.player && store.characterSheets">
    <CharacterSheetList />
  </template>
  <Auth v-else />
</template>

<style scoped></style>
