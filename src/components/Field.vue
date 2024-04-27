<script setup lang="ts">
defineProps<{
    isImportant?:  boolean,
    isMultiligne?:  boolean,
    label?: string,
    data?: string,
}>()
</script>
<template>
    <div class="field" :class="{ 'important': isImportant, 'multiligne': isMultiligne }">
        <label class="label">{{ label }}</label>
        <input v-if=!isMultiligne class="user-data" type="text" :value="data" :placeholder="label + '...'">
        <textarea v-if=isMultiligne class="user-data" :placeholder="label + '...'">{{ data }}</textarea>
    </div>
</template>
<style scoped>
.field {
    display: grid;
    border-bottom: dashed 1px rgba(0, 0, 0, .4);
    line-height: 0;
    align-items: baseline;
    grid-template-columns: 2fr 1fr;
    height: 1rem;
    box-sizing: border-box;
}


.field .label {
    order: 2;
    text-align: right;
    font-size: .6rem;
    text-transform: uppercase;
    line-height: 1.8;
}

.field input,
.field textarea {
    background: none;
    border: none;
    color: #000;
    font-family: 'Barlow Condensed', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    outline: none !important;
    resize: none;
}

.field .user-data {
    color: #000;
    font-size: .65rem;
    font-weight: 500;
    order: 1;
    min-width: 0;
}

.field.important {
    border-bottom: solid 1px rgba(0, 0, 0, .4);
    position: relative;
}

.field.important .label {
    line-height: 1;
}

.field.important .user-data {
    font-size: .8rem;
    font-weight: 600;
}

.field.multiligne {
    min-height: 1rem;
    height: auto;
    grid-template-areas:
        "input label"
        "textarea textarea"
}

.field.multiligne .label {
    grid-area: label;
}

.field.multiligne input {
    grid-area: input;
}

.field.multiligne textarea {
    grid-area: textarea;
}
</style>