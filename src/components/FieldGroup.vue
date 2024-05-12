<script setup lang="ts">
import MiniButton from './MiniButton.vue';
defineProps<{
    allowAdd:  boolean,
    allowRemove:  boolean,
}>()
</script>
<template>
    <div class="field-group">
        <slot></slot>
        <div class="actions" v-if="allowAdd || allowRemove">
            <MiniButton v-if="allowRemove" :active=false text="-"  @click="$emit('remove')"></MiniButton>
            <MiniButton v-if="allowAdd" :active=false text="+"  @click="$emit('add')"></MiniButton>
        </div>
    </div>
</template>
<style scoped>


.field-group {
    padding: .5rem;
    border: dashed 1px rgb(0, 0, 0);
    border-radius: .5rem;
    margin-top: 1rem;
}

.field-group :deep(.field) {
    border-bottom: none;
}

.field-group :deep(.field+.field) {
    border-top: dashed 1px rgba(0, 0, 0, .4);
}

.field-group .actions {
    transform: translate(0rem, 1.1rem);
    margin-top: -.5rem;
}
</style>