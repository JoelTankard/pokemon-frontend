<template>
  <div class="home">
      <div>
        <h1 class="text-lg md:text-3xl mb-12">Pokeprompts</h1>
      </div>
      <Card>
        <h2 class="mb-6">Host or join a game?</h2>
        <div class="flex items-center gap-4">
          <Button>Host game</Button>
          <Button>Join game</Button>
        </div>
      </Card>
  </div>
</template>

<script>
import { isHost } from '@/utils/detectDevice';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    Card,
    Button
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