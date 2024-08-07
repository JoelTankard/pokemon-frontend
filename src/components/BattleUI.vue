<template>
    <Card>
        <!-- {{ players }} -->
        <div class="p-4 h-full relative flex flex justify-between">
            <div class="relative h-full w-full flex flex-col justify-between">
                <div class="absolute top-0 inset-x-0 flex items-start justify-between">
                    <BattleStats :playerId="players[0].id" :name="players[0].pokemon" :currentHp="players[0].health[0]" :maxHp="players[0].health[1]" />
                    <Pokemon :key="players[0].pokemon" :name="players[0].pokemon" />
                </div>

                <div class="absolute bottom-0  inset-x-0 flex items-end justify-between">

                    <Pokemon :key="players[1].pokemon" :name="players[1].pokemon" is-back />
                    <BattleStats :playerId="players[1].id" :name="players[1].pokemon" :currentHp="players[1].health[0]" :maxHp="players[1].health[1]" />

                </div>
            </div>
            <div class="flex flex-col justify-between items-center h-full px-12">
                <PlayerStat :playerId="players[0].id" />
                <p>VS</p>
                <PlayerStat :playerId="players[1].id" />
            </div>

        </div>
    </Card>
</template>


<script>
import Card from '@/components/Card.vue';
import Pokemon from './Pokemon.vue';
import BattleStats from './BattleStats.vue';
import PlayerStat from './PlayerStat.vue';

export default {
    name: 'BattleUI',
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    components: {
        Card,
        Pokemon,
        BattleStats,
        PlayerStat
    },
    computed: {
        players() {
            return Object.keys(this.value.players).map(key => {
                return {
                    ...this.value.players[key],
                    id: key
                }
            });
        }
    }
}
</script>