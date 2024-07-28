<template>
    <div  class="h-full w-full grid grid-rows-2 grid-flow-col gap-2">
        <!-- {{ this.gamesStore.steps }} -->
        <BattleUI v-if="!winner" :key="battle.id" v-for="battle in lastStep" :value="battle" />
        
        <Card>
            <Player :index="winnerPlayer.index" />
            <h1>{{ winnerPlayer.name }}</h1>
            <h2>Is the winner!</h2>
        </Card>
    </div>
</template>

<script>
import BattleUI from '@/components/BattleUI.vue';
import { useGamesStore } from '@/stores/games';
import Card from '@/components/Card.vue';
import Player from './Player.vue';

export default {
    setup() {
        const gamesStore = useGamesStore();

        return {
            gamesStore
        }
    },
    components: {
        BattleUI,
        Player,
        Card
    },
    data() {
        return {
            winner: null
        }
    },
    computed: {
        winnerPlayer() {
            return this.gamesStore.players[this.winner];
        },
        lastStep( ) {
            const step = this.gamesStore.steps[this.gamesStore.steps.length - 1];
            if (step.players.winner) {
                this.winner = step.players.winner;
            }

            return step;
        },
    }
}
</script>