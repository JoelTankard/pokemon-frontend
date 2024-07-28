<template>
    
    <div class="flex items-center w-full h-full">
      <div  v-if="!startGame" class="flex w-full gap-2">
        <Card class="w-1/3">
            <div class="text-center">
            <h2 class="text-xl mb-6">Join Session</h2>
            <div v-if="sessionUrl" class="qr-code mb-4 text-center">
                <img :src="qrContent">
            </div>
            <p class="text-xs">{{ sessionUrl }}</p>
            </div>
        </Card>
        <Card class="w-2/3">
            <h2 class="text-xl mb-12">Players</h2>
          
            <div class="players-wrapper">
                <div class="w-1/3 mb-12 flex items-center flex-col" v-for="i in maxPlayers" :key="i">
                  <Player :index="i" :type="getPlayer(i - 1) ? 'default' : 'empty' " />
                  <p :class="`mt-4  whitespace-nowrap w-96`">{{ getPlayer(i - 1)?.name || '' }} </p>
  
                </div>
            </div>
          </Card>
      
        </div>

        
          <GameUI v-else />
        
    </div>
  </template>
  
  <script>
  import { isHost } from '@/utils/detectDevice';
//   import { useSessionStore } from '@/stores/session';
    import { usePlayerStore } from '@/stores/player';
  import { useSocketStore } from '@/stores/socket';
  import { useGamesStore } from '@/stores/games';
  import QRCode from 'qrcode';
  import Player from '@/components/Player.vue';
  import Card from '@/components/Card.vue';
  import GameUI from '@/components/GameUI.vue';
  
  export default {
    components: {
      Player,
      Card,
      GameUI
    },
    setup() {
      const playerStore = usePlayerStore();
      const socketStore = useSocketStore();
      const gamesStore = useGamesStore();
  
      return {
        isHost: isHost(),
        baseUrl: import.meta.env.VITE_DOMAIN,
        playerStore,
        socketStore,
        gamesStore
      }
    },
    data() {
      return {
        qrContent: '',
        maxPlayers: 8,
        startGame: false,
        initalRender: false
        
      };
    },
    computed: {
      hostId() {
        if (!this.playerStore.playerId) {
          this.playerStore.newPlayerId();
        }
        return this.playerStore.playerId;
      },
      sessionUrl() {
        return `${this.baseUrl}?session=${this.hostId}`;
      },
    },
    methods: {
      getPlayer(index) {
        return this.socketStore.players.find(player => player?.index === index);
      },
      async generateQRCode() {
        this.qrContent = await QRCode.toDataURL(this.sessionUrl);
      },
    },
    async created() {
      await this.generateQRCode();


    },
    mounted() {
      fetch(import.meta.env.VITE_API_URL + '/join', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  key: this.hostId,
                  host_status: 'True',
                  player_id: `${this.hostId}-player`,
              })
          }).then(async () => {


            await this.socketStore.onConnect();

            this.socketStore.socket.emit('join', {
              key: this.hostId,
              player_id: `${this.hostId}-player`,
            });

            this.socketStore.socket.on('join', ({
                key,
                player_id
              }) => {
                if (player_id === `${this.hostId}-player`) return;
                if (this.socketStore.players.find(player => player.id === player_id)) return;
                const assignedIndex = this.socketStore.players.length;
                this.socketStore.addPlayer({
                  playerId: player_id,
                  index: assignedIndex
                });

                setTimeout(() => {
                this.socketStore.socket.emit('playerindex' , {
                  key: this.hostId,
                  player_id, index: assignedIndex
                });
                }, 100);
              });


            this.socketStore.socket.on('playerready', ({ key, player_id, name, prompt }) => {
              console.log('player-ready', player_id, name, prompt);
              this.socketStore.updatePlayer({ playerId: player_id, name, prompt, isReady: true });
              

              console.log('players', this.socketStore.players);

              const startGame = this.socketStore.players.length === 4  && this.socketStore.players.every(player => player.isReady);

              console.log('startGame', startGame);
              if (!startGame) return;

              const prompts = this.socketStore.players.reduce((acc, player) => {
                acc[player.id] = { prompt: player.prompt };
                return acc;
              }, {});

              fetch(import.meta.env.VITE_API_URL + '/start', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  key: this.hostId,
                  prompts
                })
              }).then(() => {
                this.startGame = true;
              });
            });

            this.socketStore.socket.on('updateplayernames', ({ key, player_id, name }) => {             
                this.socketStore.updatePlayer({ playerId: player_id, name });
              
            });

            this.socketStore.socket.on('game_update', (data) => {
              console.log('playerindex', JSON.parse(data));

              if (!this.initalRender) {
                this.initalRender = true;
                
                fetch(import.meta.env.VITE_API_URL + '/start_progress_loop', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    key: this.hostId,
                  })
                });
              }

              const update = JSON.parse(data);

              const convertedJson = Object.keys(update).map((key) => {
                return {
                  id: key,
                  players: update[key]
                }
              });

              console.log('game_update', convertedJson);

              this.gamesStore.addStep(convertedJson)



             
            });




        // this.socketStore.socket.on('join', ({
        //   key,
        //   player_id
        // }) => {
        //   console.log('player-joined', player_id);
        //   // const assignedIndex = this.socketStore.players.length - 1;

        //   //   this.socketStore.addPlayer({
        //   //     playerId,
        //   //     index: assignedIndex
        //   //   });
    
            
        //   //   this.socketStore.socket.io.emit('player-index' , {
        //   //     playerId, index: assignedIndex
        //   //   });
        
        // });
        

      });
     

          // this.socketStore.socket.io.on('player-joined', (playerId) => {
          //   console.log('player-joined', playerId);
          //   const assignedIndex = this.socketStore.players.length - 1;

          //     this.socketStore.addPlayer({
          //       playerId,
          //       index: assignedIndex
          //     });
      
              
          //     this.socketStore.socket.io.emit('player-index' , {
          //       playerId, index: assignedIndex
          //     });
          
          // });
    },
  }
  </script>
  
  <style lang="scss">
  .home {
    @apply flex flex-col h-screen w-full;
  
    .qr-code {
      @apply text-center;
      img {
        @apply h-96 w-96 inline-block;
      }
    }
  
    .players-wrapper {
      @apply flex items-center flex-wrap;
  
      .player {
        @apply flex items-center justify-center;
      }
    }
  }
  </style>