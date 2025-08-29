<script setup lang="ts">
import type { BattleHero } from "@/types";
import BattleSlot from "./BattleSlot.vue";

const props = defineProps<{
  grid: (BattleHero | null)[][];
  isPlayer: boolean;
  canAttack?: (r: number, c: number) => boolean;
  highlightedPositions?: [number, number][];
  damageEffects?: { r: number; c: number; amount: number }[];
}>();

const emit = defineEmits<{
  (e: "selectHero", hero: BattleHero): void;
}>();

const selectHero = (hero: BattleHero) => emit("selectHero", hero);
</script>

<template>
  <div
    :class="[
      'battle-view__side',
      isPlayer ? 'battle-view__side--player' : 'battle-view__side--enemy',
    ]"
  >
    <h2 class="battle-view__title">{{ isPlayer ? "Ваша команда" : "Противник" }}</h2>
    <div class="battle-view__grid">
      <div class="battle-view__row" v-for="(row, rIndex) in grid" :key="rIndex">
        <BattleSlot
          v-for="(hero, cIndex) in row"
          :key="cIndex"
          :hero="hero"
          :row="rIndex"
          :col="cIndex"
          :isPlayer="isPlayer"
          :canAttack="canAttack?.(rIndex, cIndex)"
          :highlighted="highlightedPositions?.some(([hr, hc]) => hr === rIndex && hc === cIndex)"
          :damageEffects="damageEffects"
          @selectHero="selectHero"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-view__side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 12px;
}

.battle-view__title {
  font-size: 1.8rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 0.5rem;
}

.battle-view__grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.battle-view__row {
  display: flex;
  gap: 2rem;
}

.battle-view__slot {
  width: 125px;
  height: 125px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 30, 30, 0.8));
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid #ffd700;
  font-size: 1.2rem;
  flex-direction: column;
  cursor: pointer;
  transition: 0.3s;
}

.battle-view__slot--empty {
  background: #444;
  border-color: #666;
  cursor: default;
}

.battle-view__icon {
  max-width: 100%;
  max-height: 70%;
  object-fit: contain;
}

.battle-view__level {
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 0 4px;
  background: #ffd700;
  color: #000;
  font-size: 0.7rem;
  border-radius: 4px;
}

.battle-view__hp-bar {
  width: 90%;
  height: 20px;
  background: #222;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.battle-view__hp-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 4px;
}

.battle-view__hp-text {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  text-shadow: 0 0 2px #000;
  pointer-events: none;
}

.battle-view__slot--disabled {
  filter: grayscale(80%);
  pointer-events: none;
  opacity: 0.6;
}

.battle-view__slot--faint {
  opacity: 0.3;
  pointer-events: none;
}

.battle-view__slot--highlighted {
  box-shadow: 0 0 12px 3px #ffd700 inset;
  transition: 0.3s;
}

.battle-view__slot--hit {
  animation: hitFlash 0.6s ease;
}

@keyframes hitFlash {
  0%,
  100% {
    background-color: #fff;
  }
  50% {
    background-color: #f44336;
  }
}

.damage-number {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: #ff0000;
  font-weight: bold;
  font-size: 1.2rem;
  animation: floatUp 0.6s ease forwards;
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-40px);
  }
}

.battle-view__slot.warrior {
  border-color: #ff6b3c;
}
.battle-view__slot.archer {
  border-color: #32cd32;
}
.battle-view__slot.mage {
  border-color: #1e90ff;
}
</style>
