<template>
    <div class="battle-stats">
    
        <div>
        <h2 class="uppercase mb-2">{{ name }}</h2>

        <div>
            <div class="flex items-center gap-2">
                <h3 class="text-bold text-xs">HP:</h3>
                <div class="hp-bar bg-black w-32 h-2 mt-1 border-2 border-black">
                <div class="hp-bar-inner bg-green-500 h-full" :style="{ width: (currentHp / maxHp) * 100 + '%' }"></div>
                </div>
            
            </div>
            <p>{{ currentHp }}/{{ maxHp }}</p>
            </div>
        
        </div>
    </div>
</template>

<script>

export default {
    name: 'BattleStats',
 
    props: {
        playerId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        currentHp: {
            type: Number,
            required: true
        },
        maxHp: {
            type: Number,
            required: true
        },
    }
}
</script>