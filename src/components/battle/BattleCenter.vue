<script setup lang="ts">
import type { BattleHero } from "@/types";
import { computed } from "vue";
import BattleSlot from "./BattleSlot.vue";

const { hero, isEnemy, row, col } = defineProps<{
  hero: BattleHero | null;
  isEnemy?: boolean;
  row?: number;
  col?: number;
}>();

const heroStats = computed(() => {
  if (!hero) return {};
  return {
    HP: hero.stats.hp,
    Урон: hero.stats.damage,
    Броня: hero.stats.armor + "%",
    Радиус: hero.stats.attackRange,
    Скорость: hero.stats.attackSpeed,
  };
});

const icons: Record<string, string> = {
  HP: "❤️",
  Урон: "⚔",
  Броня: "🛡",
  Радиус: "🎯",
  Скорость: "⏱",
};
</script>

<template>
  <div class="battle-view__hero-center">
    <BattleSlot
      :hero="hero"
      :isPlayer="!isEnemy"
      :row="row ?? 0"
      :col="col ?? 0"
      :canAttack="true"
    />
    <div v-if="hero" class="hero-tooltip-center">
      <div v-for="(value, key) in heroStats" :key="key" class="hero-tooltip__stat">
        <span class="hero-tooltip__icon">{{ icons[key] }}</span>
        <span class="hero-tooltip__label">{{ key }}</span>
        <span class="hero-tooltip__value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.battle-view__hero-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.hero-tooltip-center {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  width: 140px;
}

.hero-tooltip__stat {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.2rem;
}

.hero-tooltip__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.hero-tooltip__label {
  font-weight: 500;
  color: #fff;
}

.hero-tooltip__value {
  font-weight: bold;
  color: #ffd700;
}
</style>
