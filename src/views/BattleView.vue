<script setup lang="ts">
import { computed, ref } from "vue";
import { useArmyStore } from "@/stores/army";
import type { BattleHero } from "@/types";
import BattleGrid from "@/components/battle/BattleGrid.vue";
import HeroCenter from "@/components/battle/BattleCenter.vue";
import AttackButton from "@/components/battle/AttackButton.vue";
import BattleResultOverlay from "@/components/battle/BattleResultOverlay.vue";
import {
  generatePlayerGrid,
  generateEnemyGridSmartRandom,
  attackHero,
  canAttackHero,
  getHighlightedPositions,
  chooseRandomEnemy,
  chooseRandomPlayer,
} from "@/utils/battleLogic";
import { useRoute } from "vue-router";

const armyStore = useArmyStore();
const route = useRoute();
const ROWS = 4;
const COLS = 2;

const playerGrid = ref(generatePlayerGrid(armyStore.squad.frontline, armyStore.heroes, ROWS, COLS));
const enemyGrid = ref(generateEnemyGridSmartRandom(Number(route.params.id), ROWS, COLS));

const selectedPlayerHero = ref<BattleHero | null>(null);
const selectedEnemyHero = ref<BattleHero | null>(null);
const enemyDamageEffects = ref<{ r: number; c: number; amount: number }[]>([]);
const playerDamageEffects = ref<{ r: number; c: number; amount: number }[]>([]);

const isPlayerTurn = ref(true);
const showResultOverlay = ref(false);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const attack = async () => {
  if (!selectedPlayerHero.value || !selectedEnemyHero.value) return;

  attackHero(
    selectedPlayerHero.value,
    selectedEnemyHero.value,
    enemyGrid.value,
    enemyDamageEffects.value
  );
  selectedPlayerHero.value = null;
  selectedEnemyHero.value = null;
  isPlayerTurn.value = false;

  if (enemyGrid.value.flat().every((h) => !h || h.currentHp <= 0)) {
    showResultOverlay.value = true;
    return;
  }

  await delay(2000);
  selectedEnemyHero.value = chooseRandomEnemy(enemyGrid.value);

  await delay(2000);
  selectedPlayerHero.value = chooseRandomPlayer(playerGrid.value, selectedEnemyHero.value!);

  await delay(2000);
  if (!selectedEnemyHero.value || !selectedPlayerHero.value) return;

  attackHero(
    selectedEnemyHero.value,
    selectedPlayerHero.value,
    playerGrid.value,
    playerDamageEffects.value
  );
  selectedEnemyHero.value = null;
  selectedPlayerHero.value = null;
  isPlayerTurn.value = true;

  if (playerGrid.value.flat().every((h) => !h || h.currentHp <= 0)) {
    showResultOverlay.value = true;
  }
};

const enemyHighlightedPositions = computed(() =>
  getHighlightedPositions(
    selectedPlayerHero.value,
    selectedEnemyHero.value,
    enemyGrid.value,
    !isPlayerTurn.value
  )
);
const playerHighlightedPositions = computed(() =>
  getHighlightedPositions(
    selectedEnemyHero.value,
    selectedPlayerHero.value,
    playerGrid.value,
    isPlayerTurn.value
  )
);
const canAttack = (r: number, c: number) =>
  isPlayerTurn.value && canAttackHero(selectedPlayerHero.value, enemyGrid.value, r, c);

const isVictory = computed(() => enemyGrid.value.flat().every((h) => !h || h.currentHp <= 0));
</script>

<template>
  <div class="battle-view">
    <BattleGrid
      :grid="playerGrid"
      :isPlayer="true"
      @selectHero="selectedPlayerHero = $event"
      :highlightedPositions="playerHighlightedPositions"
      :damageEffects="playerDamageEffects"
    />
    <div class="battle-view__center">
      <HeroCenter :hero="selectedPlayerHero" />
      <AttackButton
        :disabled="!isPlayerTurn || !selectedPlayerHero || !selectedEnemyHero"
        @attack="attack"
      />
      <HeroCenter :hero="selectedEnemyHero" :isEnemy="true" />
    </div>
    <BattleGrid
      :grid="enemyGrid"
      :isPlayer="false"
      :canAttack="canAttack"
      :highlightedPositions="enemyHighlightedPositions"
      :damageEffects="enemyDamageEffects"
      @selectHero="selectedEnemyHero = $event"
    />

    <BattleResultOverlay
      v-if="showResultOverlay"
      :currentLevel="Number(route.params.id)"
      :isVictory="isVictory"
      @close="showResultOverlay = false"
    />
  </div>
</template>

<style scoped>
.battle-view {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
  color: #fff;
  background: #000;
  justify-content: space-between;
  align-items: center;
  background-image: url("@/assets/battle_background.jpg");
}

.battle-view__center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
}
</style>
