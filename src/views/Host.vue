<template>
  <div class="home">
      <div>
        <h1 class="text-lg md:text-3xl mb-12">Pokeprompts</h1>
      </div>
      <host-home />
  </div>
</template>

<script>
import { isHost } from '@/utils/detectDevice';
import HostHome from '@/components/HostHome.vue';
import PlayerHome from '@/components/PlayerHome.vue';

export default {
  components: {
    HostHome,
    PlayerHome
  },
  setup() {
    return {
      isHost: isHost()
    }
  }
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