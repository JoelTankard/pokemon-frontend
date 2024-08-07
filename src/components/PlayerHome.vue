<template>
    <div class="flex flex-col  h-full gap-2">
      <Card v-if="!sessionId">
        <div class="flex flex-col items-center text-center">
          <player class="my-10" type="empty" />
          <h2 class="mb-4">{{ isDesktop ? 'Enter code' : 'Scan QR code' }} to join session</h2>
          <template v-if="isDesktop">
            <Input v-model="inputSessionId" placeholder="Session Code" class="mb-6" />
            <Button @click=joinSession">Join</Button>
          </template>

      </div>
      </Card>

      <template v-if="sessionId">
      <Card  >
        <div class="flex flex-col items-center text-center">
          <player class="my-10" type="default" :index="playerStore.playerIndex + 1" />
          <Input :disabled="isReady" v-model="playerStore.playerName" placeholder="Your Name" class="mb-6" @input="sendNameChange" />

        </div>
      </Card>

      <Card  >
        <p class="mb-6">Write a prompt for your trainer.</p>
        <Input :disabled="isReady" type="textarea" v-model="playerStore.playerPrompt" placeholder="Your Name" class="mb-6" />

      </Card>

        <Button v-if="!isReady" :disabled="!playerStore.playerName || !playerStore.playerPrompt" @click="onSubmit">Ready</Button>
      </template>
    </div>
  </template>
  
  <script>
  import { isDesktop } from '@/utils/detectDevice';
  import { useSocketStore } from '@/stores/socket';
  import { usePlayerStore } from '@/stores/player';
  import Player from '@/components/Player.vue';
  import Card from '@/components/Card.vue';
  import Button from '@/components/Button.vue';
  import Input from './Input.vue';
  import SystemSprites from './SystemSprites.vue';

  export default {
    name: 'PlayeHome',
    components: {
      Card,
      Button,
      Player,
      SystemSprites,
      Input
    },
    setup() {
      const socketStore = useSocketStore();
      const playerStore = usePlayerStore();
  
      return {
        isDesktop: isDesktop(),
        baseUrl: import.meta.env.VITE_DOMAIN,
        socketStore,
        playerStore
      }
    },
    data() {
      return {
        isReady: false,
        inputSessionId: '',
      };
    },
    computed: {
      sessionId() {
        return this.socketStore.sessionId;
      },
      playerId() {
        if (!this.playerStore.playerId) {
          this.playerStore.newPlayerId();
        }

        return this.playerStore.playerId;
      },
    },
    methods: {
      onSubmit() {
        this.isReady = true;
        this.socketStore.socket.emit('playerready', {
          key: this.sessionId,
          player_id: this.playerId,
          name: this.playerStore.playerName,
          prompt: this.playerStore.playerPrompt,
        });
      },
      sendNameChange() {
        this.socketStore.socket.emit('updateplayernames', {
            key: this.sessionId,
            player_id: this.playerId,
            name: this.playerStore.playerName,
          });
      },
      joinSession() {
        this.socketStore.setSessionId(this.inputSessionId);
      }
    },
    mounted() {
      let sessionId = this.$route.query.session;

      if (!sessionId) return;
       
      
      this.socketStore.setSessionId(sessionId);
      fetch(import.meta.env.VITE_API_URL + '/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: sessionId,
                host_status: 'False',
                player_id: this.playerId,
            })
        }).then(async () => {
          await this.socketStore.onConnect();

          this.socketStore.socket.emit('join', {
            key: sessionId,
            player_id: this.playerId,
          });

          this.socketStore.socket.on('join', ({
                key,
                player_id
              }) => {
                console.log('join', key, player_id);

   
          });

          this.socketStore.socket.on('playerindex', ({ key, player_id, index }) => {
            console.log('playerindex', player_id, index);
            if (player_id === this.playerId) {
              this.playerStore.setPlayerIndex(index);
            }
          });

          

        })
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