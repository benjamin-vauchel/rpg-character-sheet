<script setup lang="ts">
import Block from '../Block.vue';
defineProps<{ content: string }>()
</script>
<template>
    <Block class="header">
        <h1>{{content}}</h1>
        <h2>{{content}}</h2>
    </Block>
</template>
<style scoped>
.header {
    line-height: .8rem;
    position: relative;
    height: 2rem;
}

.header h1 {
    display: inline-block;
    font-family: 'Star Jedi';
    color: #fff;
    background: #000;
    text-transform: lowercase;
    padding: .1rem .3rem .3rem .2rem;
    line-height: .8rem;
    font-size: .8rem;
    margin: 0;
    z-index: 1;
    position: relative;
}

.header h2 {
    font-family: 'Aurebesh';
    font-size: .4rem;
    line-height: .5rem;
}

.header::before {
    content: '';
    display: block;
    border-top: dashed 1px #000;
    width: 100%;
    position: absolute;
    top: .5rem;
    z-index: 0;
}
</style>