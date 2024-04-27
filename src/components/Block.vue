<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
<template>
    <div class="block">
        <div class="header" v-if="title">
            <h3>{{ title }}</h3>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
.block>.header {
    border-bottom: solid 1px #000;
    position: relative
}

.block>.header h3 {
    text-transform: uppercase;
    font-size: .8rem;
    margin: 0;
    height: calc(1rem - 1px);
    font-weight: 600;
    position: relative;
    display: inline-block;
}

.block>.header::after {
    content: '';
    display: block;
    transform: rotate(45deg);
    height: .2rem;
    width: .2rem;
    background: #000;
    right: 0.03rem;
    bottom: -.12rem;
    position: absolute;
}
</style>