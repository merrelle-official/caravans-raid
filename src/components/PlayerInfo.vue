<script setup lang="ts">
import { ref } from "vue";
import type { Player } from "@/types";

const props = defineProps<{
  player: Player;
}>();

const showTooltip = ref(false);
</script>

<template>
  <div class="player-info" @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
    <div class="player-info__icon">🧑</div>
    <div class="player-info__text">
      <p class="player-info__name">{{ props.player.name }}</p>
      <p class="player-info__level">Ур. {{ props.player.lvl }}</p>
    </div>
    <div v-if="showTooltip" class="player-info__tooltip">
      Опыт: {{ props.player.xp }}/{{ props.player.expToNext }}
    </div>
  </div>
</template>

<style scoped>
.player-info {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.player-info__icon {
  font-size: 1.8rem;
}

.player-info__text {
  display: flex;
  flex-direction: column;
  color: #fff;
}

.player-info__name {
  font-weight: bold;
}
.player-info__level {
  font-size: 0.9rem;
  color: #ffd700;
}

.player-info__tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0.5rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #fff;
  white-space: nowrap;
  z-index: 10;
}
</style>
