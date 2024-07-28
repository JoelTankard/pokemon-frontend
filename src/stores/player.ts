import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const usePlayerStore = defineStore('player', {
    state: () => ({
        playerId: '',
        playerName: '',
        playerIndex: 1,
    }),
    getters: {
        getPlayerName() {
            return this.playerName;
        },
        getPlayerId() {
            return this.playerId;
        }
    },
    actions: {
        newPlayerId() {
            this.playerId = uuidv4();
        },
        setPlayerName(name) {
            this.playerName = name;
        },
        setPlayerIndex(index) {
            this.playerIndex = index;
        }
    },
   persist: true,
})