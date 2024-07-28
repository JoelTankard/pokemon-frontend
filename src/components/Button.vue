<template>
    <button :class="['button', {'is-disabled': disabled}]" @click="$emit('click')">
            <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
}
</script>

<style lang="scss">
.button {
    @apply relative w-full px-4 py-2 bg-black text-white border-2 border-black;

    &.is-disabled {
        @apply bg-white border-gray-300 text-gray-300;
    }
}
</style>
