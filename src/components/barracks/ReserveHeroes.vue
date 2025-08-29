<script setup lang="ts">
import { useArmyStore } from "@/stores/army";
import HeroSlot from "./HeroSlot.vue";

const armyStore = useArmyStore();
</script>

<template>
  <div class="reserve-heroes">
    <h2 class="reserve-heroes__title">Бойцы в запасе</h2>
    <div class="reserve-heroes__grid">
      <HeroSlot
        v-for="(heroId, i) in armyStore.squad.reserve"
        :key="i"
        :hero="heroId ? armyStore.heroes[heroId] : null"
        :slot="{ type: 'reserve', index: i }"
      />
    </div>
  </div>
</template>

<style scoped>
.reserve-heroes {
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reserve-heroes__title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  text-align: center;
}

.reserve-heroes__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
