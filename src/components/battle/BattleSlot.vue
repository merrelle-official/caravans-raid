<script setup lang="ts">
import type { BattleHero } from "@/types";

const props = defineProps<{
  hero: BattleHero | null;
  row: number;
  col: number;
  isPlayer: boolean;
  canAttack?: boolean;
  highlighted?: boolean;
  damageEffects?: { r: number; c: number; amount: number }[];
}>();

const emit = defineEmits<{
  (e: "selectHero", hero: BattleHero): void;
}>();

const handleClick = () => {
  if (!props.hero) return;
  if (!props.isPlayer && props.canAttack === false) return;
  if (props.hero.currentHp <= 0) return;
  emit("selectHero", props.hero);
};

const getHpColor = (hero: BattleHero) => {
  const ratio = hero.currentHp / hero.stats.hp;
  if (ratio >= 0.75) return "#4caf50";
  if (ratio >= 0.25) return "#ff9800";
  return "#f44336";
};
</script>

<template>
  <div
    class="battle-view__slot"
    :class="[
      hero?.class,
      !hero && 'battle-view__slot--empty',
      !isPlayer && !canAttack && 'battle-view__slot--disabled',
      hero?.currentHp === 0 && 'battle-view__slot--faint',
      highlighted && 'battle-view__slot--highlighted',
      damageEffects?.some((e) => e.r === row && e.c === col) && 'battle-view__slot--hit',
    ]"
    @click="handleClick"
  >
    <img v-if="hero" :src="hero.icon" :alt="hero.name" class="battle-view__icon" />
    <div v-if="hero" class="battle-view__level">Lvl {{ hero.level }}</div>
    <div v-if="hero" class="battle-view__hp-bar">
      <div
        class="battle-view__hp-fill"
        :style="{
          width: (hero.currentHp / hero.stats.hp) * 100 + '%',
          backgroundColor: getHpColor(hero),
        }"
      ></div>
      <span class="battle-view__hp-text">{{ hero.currentHp }} / {{ hero.stats.hp }}</span>
    </div>
    <template v-for="effect in damageEffects">
      <div v-if="effect.r === row && effect.c === col" class="damage-number">
        -{{ effect.amount }}
      </div>
    </template>
  </div>
</template>

<style scoped>
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
