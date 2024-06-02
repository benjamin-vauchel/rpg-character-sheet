import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { Tables } from '../database.types'

export const useGlobalStore = defineStore('global', () => {
    const player: Ref<Tables<'player'> | undefined>  = ref()
    const characterSheets: Ref<Tables<'character_sheet'>[]> = ref([])
    const currentCharacterSheet: Ref<Tables<'character_sheet'> | null> = ref(null)
    const currentDashboard = ref(0)
    const dashboardEdition = ref(false)
    const widgetEdition: Ref<[number, number]|null> = ref(null)
  
    return { player, characterSheets, currentCharacterSheet, currentDashboard, dashboardEdition, widgetEdition }
  })