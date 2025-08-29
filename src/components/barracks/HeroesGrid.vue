<script setup lang="ts">
import { useArmyStore } from "@/stores/army";
import HeroSlot from "./HeroSlot.vue";

const armyStore = useArmyStore();
</script>

<template>
  <div class="heroes-grid-wrapper">
    <h2 class="heroes-grid__title">Бойцы на фронте</h2>
    <div class="heroes-grid">
      <HeroSlot
        v-for="(heroId, i) in armyStore.squad.frontline"
        :key="heroId ?? i"
        :hero="heroId ? armyStore.heroes[heroId] : null"
        :slot="{ type: 'frontline', index: i }"
      />
    </div>
  </div>
</template>

<style scoped>
.heroes-grid-wrapper {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 12px;
}

.heroes-grid__title {
  color: #ffd700;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
}
</style>
