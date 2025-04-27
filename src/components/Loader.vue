<template>
    <span class="app__loader"></span>
</template>

<style>
.app__loader {
    display: inline-block;
    border-bottom-color: transparent !important;
    border-radius: 50%;
    box-sizing: border-box;
    animation: loader-rotation 1s linear infinite;
}

@keyframes loader-rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
