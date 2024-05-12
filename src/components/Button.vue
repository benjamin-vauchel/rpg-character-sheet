<script setup lang="ts">
</script>

<template>
    <button class="button">
        <div class="content">
            <slot></slot>
        </div>
        <div class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </button>
</template>

<style scoped>
.button {
    display: block;
    border: solid 1px #000;
    border-radius: 1rem;
    padding: 1rem;
    cursor: pointer;
    position: relative;  
    width: 100%;

}

.button .content {
    display: grid;
    grid-template-columns: 3rem auto;
    grid-gap: 1rem;
    align-items: center;
}

.button .dots-container {
    position: absolute;
    opacity: 0;
    animation: intro 1.6s;
    animation-fill-mode: forwards;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

}

.button .dot {
    width: 8px;
    height: 8px;
    display: block;
    background-color: #000;
    border-radius: 100%;
    position: absolute;
    transition: all .85s cubic-bezier(0.25, 1, 0.33, 1);
}

.button .dot:nth-child(1) {
    top: -.5rem;
    left: -.5rem;
    transform: rotate(-140deg);
    animation: swag1-out 0.3s;
    animation-fill-mode: forwards;
    opacity: 0;
}

.button .dot:nth-child(2) {
    top: 50px;
    right: 50px;
    transform: rotate(140deg);
    animation: swag2-out 0.3s;
    animation-fill-mode: forwards;
    opacity: 0;
}

.button .dot:nth-child(3) {
    bottom: 50px;
    left: 50px;
    transform: rotate(140deg);
    animation: swag3-out 0.3s;
    animation-fill-mode: forwards;
    opacity: 0;
}

.button .dot:nth-child(4) {
    bottom: 50px;
    right: 50px;
    transform: rotate(-140deg);
    animation: swag4-out 0.3s;
    animation-fill-mode: forwards;
    opacity: 0;
}

.button:hover .dot:nth-child(1) {
    animation: swag1 0.3s;
    animation-fill-mode: forwards;
}

.button:hover .dot:nth-child(2) {
    animation: swag2 0.3s;
    animation-fill-mode: forwards;
}

.button:hover .dot:nth-child(3) {
    animation: swag3 0.3s;
    animation-fill-mode: forwards;
}

.button:hover .dot:nth-child(4) {
    animation: swag4 0.3s;
    animation-fill-mode: forwards;
}

@keyframes intro {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes swag1 {
    0% {
        top: -.5rem;
        left: -.5rem;
    }

    50% {
        opacity: 1;
    }

    100% {
        top: .5rem;
        left: .5rem;
        opacity: 1;
    }
}

@keyframes swag1-out {
    0% {
        top: .5rem;
        left: .5rem;
        opacity: 1;
    }

    100% {
        top: -.5rem;
        left: -.5rem;
        opacity: 0;
    }
}

@keyframes swag2 {
    0% {
        top: -.5rem;
        right: -.5rem;
    }

    100% {
        top: .5rem;
        right: .5rem;
        opacity: 1;
    }
}

@keyframes swag2-out {
    0% {
        top: .5rem;
        right: .5rem;
        opacity: 1;
    }

    100% {
        top: -.5rem;
        right: -.5rem;
        opacity: 0;
    }
}

@keyframes swag3 {
    0% {
        bottom: -.5rem;
        left: -.5rem;
        opacity: 1;
    }

    100% {
        bottom: .5rem;
        left:  .5rem;
        opacity: 1;
    }
}

@keyframes swag3-out {
    0% {
        bottom:  .5rem;
        left:  .5rem;
        opacity: 1;
    }

    100% {
        bottom:  -.5rem;
        left: -.5rem;
        opacity: 0;
    }
}

@keyframes swag4 {
    0% {
        bottom: -.5rem;
        right: -.5rem;
        opacity: 1;
    }

    100% {
        bottom: .5rem;
        right: .5rem;
        opacity: 1;
    }
}

@keyframes swag4-out {
    0% {
        bottom: .5rem;
        right: .5rem;
        opacity: 1;
    }

    100% {
        bottom: -.5rem;
        right: -.5rem;
        opacity: 0;
    }
}

.button + .button {
    margin-top: 1rem;
}
</style>