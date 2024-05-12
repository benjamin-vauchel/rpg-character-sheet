import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharacterSheetStore = defineStore('character-sheet', () => {
    const dashboardEdition = ref(false)
    const currentDashboard = ref(0)
    const player = ref()
    const componentKey = ref(0)
  
    return { dashboardEdition, currentDashboard, player, componentKey }
  })