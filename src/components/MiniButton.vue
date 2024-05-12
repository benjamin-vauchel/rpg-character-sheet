<script setup lang="ts">
defineProps<{ active: boolean, text: string }>()
</script>

<template>
    <button :class="active ? 'button active' : 'button'">
        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.0933 5.53867L9.5 0.57735L0.906734 5.53867L0.906734 15.4613L9.5 20.4227L18.0933 15.4613L18.0933 5.53867Z"
                :fill="active ? 'black' : 'white'" stroke="black" />
        </svg>
        <span>{{ text }}</span>
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
</style>