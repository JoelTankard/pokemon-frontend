<template>
    <div class="relative">
        <img v-if="type === 'default'" src="@/assets/imgs/mini-char.png" class="h-16 w-16" />
        <img v-else-if="type === 'empty'" src="@/assets/imgs/mini-empty.png" class="h-16 w-16" />
        <div v-if="type !== 'empty'" :class="['overlayer-color']" :style="styles"></div>

    </div>
</template>


<script >
const colors = ['red', 'blue', 'lime', '#ff0092', 'orange', 'purple', 'rgb(21 128 61)', '#000000']

export default {
    props: {
        type: {
            type: String,
            default: 'default',
        },
        index: {
            type: Number,
            default: 1,
        }
    },
    computed: {
        styles() {
            return {
                backgroundColor: this.color
            }
        }
    },
    data() {
        return {
            color: colors[this.index - 1]
        }
    }
}
</script>

<style lang="scss">
.overlayer-color {
    @apply absolute inset-0 mix-blend-color;
}
</style>