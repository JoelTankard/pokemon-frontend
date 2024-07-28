import { io } from "socket.io-client";
import { defineStore } from "pinia";

export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null,
        sessionId: null,
        players:[
        ],
    }),
    actions: {
        async onConnect(playerId) {
            this.socket = await io(`${import.meta.env.VITE_API_URL}`);

            console.log('socket', this.socket);

           
    
            // , {
            //     session: playerId || this.sessionId
            // });

         
        },
        addPlayer({
            playerId,
            index
        }) {
            this.players.push({
                id: playerId,
                name: '',
                index,
                isReady: false,
            });
        },
        setSessionId(sessionId) {
            this.sessionId = sessionId;
        },
        updatePlayer({
            playerId,
            name,
            prompt,
            isReady
        }) {
            const playerIndex = this.players.findIndex(player => player.id === playerId);
            console.log('playerIndex', playerIndex);
            console.log('player', this.players[playerIndex]);

            let toUpdate = this.players[playerIndex];

            if (name) toUpdate['name'] = name;
            if (prompt) toUpdate['prompt'] = prompt;
            if (isReady !== undefined) toUpdate['isReady'] = isReady;
            
            this.players[playerIndex] = toUpdate;

        }
    },
});