<template>
    <div v-if="player" class="flex items-start gap-4">
        <Player :index="player.index" />
        <h2 class="mt-2 whitespace-nowrap">{{ player.name }}</h2>
    </div>
</template>

<script>
import Player from './Player.vue';
import { useSocketStore } from '@/stores/socket';
export default {
    name: 'PlayerStats',
    props: {
        playerId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const socketStore = useSocketStore();
        const player = socketStore.players.find(player => player.id === props.playerId);
        return {
            player
        };
    },
    components: {
        Player
    }
}
</script>