<script setup lang="ts">
import Block from '../Block.vue';
defineProps<{ imageUrl?: string }>()
</script>
<template>
    <Block class="image">
        <img :src="imageUrl" alt="" v-if="imageUrl" />
        <span v-else>?</span>
    </Block>
</template>
<style scoped>
.image {
    border-radius: 100%;
    aspect-ratio: 1;
    border: solid 1px #000;
    padding: .1rem;
    display: inline-block;
    line-height: 0;
    max-height: 3rem;
    margin: 0 auto;
}

.image img {
    display: inline-block;
    max-width: 100%;
    border-radius: 100%;
    aspect-ratio: 1;
}

.image span {
    display: inline-block;
    max-width: 100%;
    border-radius: 100%;
    aspect-ratio: 1;
    width: 3rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 100;
    color: #333;
    line-height: 1.4;
}
</style>