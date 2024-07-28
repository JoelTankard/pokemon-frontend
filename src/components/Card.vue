<template>
    <div class="card">
        <img src="@/assets/imgs/card-t.png" class="card-border top-0 left-0 w-full h-12" />
        <img src="@/assets/imgs/card-b.png" class="card-border bottom-0 left-0 w-full h-12" />
        <img src="@/assets/imgs/card-l.png" class="card-border top-0 left-0 h-full w-12" />
        <img src="@/assets/imgs/card-r.png" class="card-border top-0 right-0 h-full w-12" />

        <img src="@/assets/imgs/card-t-l.png" class="card-border top-0 left-0 h-12" />
        <img src="@/assets/imgs/card-t-r.png" class="card-border top-0 right-0 h-12" />
        <img src="@/assets/imgs/card-b-l.png" class="card-border bottom-0 left-0 h-12" />
        <img src="@/assets/imgs/card-b-r.png" class="card-border bottom-0 right-0 h-12" />
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
.card {
    @apply relative;

    .card-border {
        @apply absolute ;
    }

    .card-content {
        @apply px-8 py-10 h-full;
    }
}
</style>