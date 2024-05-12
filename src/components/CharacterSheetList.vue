<script setup lang="ts">
import { onMounted } from 'vue'
import { supabase } from '../supabase'
import { useGlobalStore } from '../stores/global'
import Avatar from './Blocks/Avatar.vue'
import Button from './Button.vue'
import { Tables } from '../database.types'

const store = useGlobalStore()

onMounted(async () => {
    const { data: characterSheetsData } = await
        supabase
            .from('character_sheet')
            .select('*, character(*)')
            .order('opened_at', { ascending: false })
    store.characterSheets = characterSheetsData || [];
})

async function openCharacterSheet(characterSheet: Tables<'character_sheet'>) {
    store.currentCharacterSheet = characterSheet
    await
        supabase
            .from('character_sheet')
            .update({ opened_at: (new Date()).toISOString() })
            .eq('id', characterSheet.id)
}

function signOut() {
    supabase.auth.signOut();
}

function getImageUrl() {

    const { data } = supabase.storage.from('files').getPublicUrl('assets/avatar.jpg')

    return data.publicUrl;
}

</script>

<template>
    <a @click="signOut()" id="logout-button">Se déconnecter</a>
    <div class="profile">
        <div class="welcome">
            <header>
                <h1>Welcome <span v-if="store.player">{{ store.player.name }}</span></h1>
            </header>
            <p>
                Choose a character or create a new one.
            </p>
        </div>
        <ul class="character-sheets">
            <li v-for="characterSheet in store.characterSheets">
                <Button @click="openCharacterSheet(characterSheet)">
                    <Avatar :image-url="getImageUrl()" />
                    <div class="infos">
                        <span class="character-name">{{ characterSheet.character[0].name }}</span>
                        <span class="rpg-name eote">Star Wars : Edge Of The Empire</span>
                    </div>
                </Button>
            </li>
            <li>
                <Button>
                    <Avatar />
                    <span>Create new character</span>
                </Button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.welcome {
    text-align: right;
    border-right: solid 1px #000;
    padding: 3rem;
}
header {
    margin-bottom: 2rem;
}

h1 {
    font-weight: 300;
    font-size: 3rem;
}

h1 span {
    background-color: #000;
    color: #fff;
    font-weight: 400;
    padding: 0 .5rem;
}

p {
    color: #333;
}

.profile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0rem;
    align-items: center;
}

.character-sheets {
    padding: 3rem;
    max-width: 15rem;
}

.character-sheets li {
    list-style-type: none;
}

.character-sheets li:last-child {
    opacity: .5;
}

.character-sheets li:last-child:hover {
    opacity: 1;
}

.character-sheets li:last-child:hover::before {
    opacity: .5;
}

.character-sheets li:last-child::before {
    content: '';
    display: block;
    border-top :solid 1px #000;
    margin: auto;
    margin-bottom: 1rem;
    width:50%
}

.character-sheets li+li {
    margin-top: 1rem;
}

.character-name {
    font-size: 1.5rem;
    display: block;
    line-height: 1;
}

.rpg-name.eote {
    font-family: 'Star Jedi';
    font-size: .8rem;
    text-transform: lowercase;
    display:inline-block;
    line-height: .9;
}

#logout-button {
    position: absolute;
    color: #333;
    text-decoration: underline;
    cursor: pointer;
    right: 1rem;
    top: 1rem;
}
</style>