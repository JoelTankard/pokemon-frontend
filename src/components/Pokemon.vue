<template>
    <div :class="['pokemon', {'is-back': isBack}]">
        <img :src="image" alt="pokemon" />
    </div>
</template>

<script>

export default {
    name: 'Pokemon',
    props: {
        name: {
            type: Object,
            required: true
        },
        isBack: {
            type: Boolean,
            default: false
        } 
    },
    setup(props) {
        return {
            image: new URL(`/src/assets/imgs/pokemon/${props.name}${props.isBack ? '-back' : ''}.png`, import.meta.url)
        }
    }
}
</script>

<style lang="scss">
.pokemon {
    @apply h-64 w-64 flex items-end;


}
</style>