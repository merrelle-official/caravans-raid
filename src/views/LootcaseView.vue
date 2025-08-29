<script setup lang="ts">
import { ref } from "vue";
import TopBar from "@/components/TopBar.vue";
import LootCaseCard from "@/components/lootcase/LootCaseCard.vue";
import LootcaseOverlay from "@/components/lootcase/LootcaseOverlay.vue";
import { lootCases, type LootCase } from "@/data/lootCases";
import { useArmyStore } from "@/stores/army";
import { usePlayerStore } from "@/stores/player";

const armyStore = useArmyStore();
const playerStore = usePlayerStore();
const revealHero = ref<null | any>(null);

const openCase = (lootCase: LootCase) => {
  if (playerStore.player.gold < lootCase.price) return;
  playerStore.addGold(-lootCase.price);
  const rand = Math.random() * 100;
  let cumulative = 0;
  let selectedLevel = 1;

  for (const chance of lootCase.chances) {
    const chanceValue = parseFloat(chance.chance.replace("%", ""));
    cumulative += chanceValue;
    if (rand <= cumulative) {
      const match = chance.rarity.match(/Lvl (\d+)\s*-\s*(\d+)/);
      if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        selectedLevel = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      break;
    }
  }

  const heroId = armyStore.createNewHero(selectedLevel);
  revealHero.value = armyStore.heroes[heroId];
};
</script>

<template>
  <div class="lootcase-page">
    <TopBar />
    <div class="lootcase-content">
      <h1 class="lootcase-page__title-bg">Вербовка</h1>
      <div class="lootcase-grid">
        <LootCaseCard
          v-for="(lootCase, i) in lootCases"
          :key="i"
          :lootCase="lootCase"
          :onOpen="openCase"
        />
      </div>
    </div>

    <LootcaseOverlay v-if="revealHero" :hero="revealHero" @close="revealHero = null" />
  </div>
</template>

<style scoped>
.lootcase-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/home_background.jpeg");
  background-size: cover;
  background-position: center;
  color: #fff;
}

.lootcase-page__title-bg {
  font-size: 2rem;
  text-align: center;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  display: inline-block;
  color: #fff;
}

.lootcase-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.lootcase-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
