<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ active?: boolean, text?: string, icon?:string, inversed?: boolean, big?: boolean }>()

const modules:any = import.meta.glob('../assets/icons/*.svg', {
    query: '?raw',
    eager: true,
});
const svg = computed(() => {
    const path = '../assets/icons/'+props.icon+'.svg';
    return (path in modules ? modules[path].default : modules[ '../assets/icons/circle-dot.svg'].default);
});
</script>

<template>
    <button :class="[{ active: active, inversed: inversed, big: big }, 'button']">
        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.0933 5.53867L9.5 0.57735L0.906734 5.53867L0.906734 15.4613L9.5 20.4227L18.0933 15.4613L18.0933 5.53867Z"
                :fill="(inversed && !active) || (!inversed && active) ? 'black' : 'white'" :stroke="inversed ? 'white' : 'black'" />
        </svg>
        <span v-if=icon v-html="svg" class="icon"></span>
        <span v-else>{{ text }}</span>
    </button>
</template>

<style scoped>
.button {
    background: none;
    border: none;
    display: inline-block;
    height: 1rem;
    position: relative;
    text-align: center;
    width: 1rem;
    cursor: pointer
}

.button span {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    line-height: 0;
    font-size: .6rem;
    /* display: inline-block; */
    /* margin: 0 auto; */
    line-height: 2;
}

.button svg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: visible;
}

.button.active span {
    color: #fff;
}

.button.inversed span {
    color: #fff;
}
.button.active.inversed span {
    color: black;
}

.button.big {
    height: 2.5rem;
    width: 2.5rem;
}
.button.big svg {
    height: 2.5rem;
    width: 2.5rem;
}
.button.big span {
    font-size: calc(.6rem * 2.5);
}
.button.inversed span.icon::v-deep svg {  
    width: 1rem;
    height: 1em;
  fill: #fff;
}
.button span.icon::v-deep svg {  
    width: 1rem;
    height: 1em;
  fill: #000;
}
.button span.icon {  
    top: 55%
}
</style>