<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import type { Level } from "@/types";

const props = defineProps<{ level: Level }>();
const playerStore = usePlayerStore();

const lastPassed = playerStore.player.lastLevelPassed;

const isPassed = props.level.id <= lastPassed;
const isNext = props.level.id === lastPassed + 1;
const isLocked = props.level.id > lastPassed + 1;

const displayedGold = isPassed ? Math.floor(props.level.gold / 2) : props.level.gold;
const displayedXp = isPassed ? 0 : props.level.xp;
</script>

<template>
  <div
    class="level-item"
    :class="{
      'level-item--passed': isPassed,
      'level-item--locked': isLocked,
    }"
    @click="!isLocked && $emit('click')"
  >
    <div class="level-item__number">Караван {{ props.level.id }}</div>
    <div class="level-item__rewards">
      <span class="level-item__reward level-item__reward--gold">💰 {{ displayedGold }}</span>
      <span class="level-item__reward level-item__reward--xp">⭐ {{ displayedXp }} XP</span>
    </div>
  </div>
</template>

<style scoped>
.level-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 2px solid #ffd700;
  background: rgba(0, 0, 0, 0.4);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  cursor: pointer;
}

.level-item:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px #ffd700;
  background: rgba(0, 0, 0, 0.6);
}

.level-item--passed {
  opacity: 0.5;
}

.level-item--locked {
  background: #555;
  border: 2px solid #888;
  color: #aaa;
  cursor: not-allowed;
  pointer-events: none;
}

.level-item--locked .level-item__reward {
  background: #666;
  border-color: #888;
  color: #ccc;
}

.level-item__number {
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.level-item__rewards {
  display: flex;
  gap: 0.8rem;
}

.level-item__reward {
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.level-item__reward--gold {
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
}

.level-item__reward--xp {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffd700;
}
</style>
