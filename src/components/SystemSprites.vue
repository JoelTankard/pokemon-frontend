<template>
    <div class="viewport animate-blink">
        <img src="@/assets/imgs/arrow-right.png" class="h-[16px] w-[16px]" />
    </div>
</template>

<script>

export default {
    name: 'SystemSprites',
    props: {
        name: {
            type: String,
            default: 'arrow-right'
        }
    },

}
</script>
