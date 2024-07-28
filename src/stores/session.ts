import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useSessionStore = defineStore('session', {
    state: () => ({
        maxPlayers: 8,
        playerId: '',
        playerName: '',
    }),
    getters: {
        getMaxPlayers() {
            return this.maxPlayers;
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
        }
    },
   persist: true,
})