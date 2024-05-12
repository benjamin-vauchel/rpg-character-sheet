import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharacterSheetsStore = defineStore('character-sheets', () => {
    const characterSheets = ref([])
    const currentCharacterSheet = ref()
    const player = ref()
  
    return { characterSheets, currentCharacterSheet, player }
  })