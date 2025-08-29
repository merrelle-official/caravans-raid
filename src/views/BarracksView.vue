<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import HeroesGrid from "@/components/barracks/HeroesGrid.vue";
import ReserveHeroes from "@/components/barracks/ReserveHeroes.vue";
import HeroSlot from "@/components/barracks/HeroSlot.vue";
</script>

<template>
  <div class="barracks">
    <TopBar />

    <div class="barracks__content">
      <HeroesGrid />
      <ReserveHeroes />
      <HeroSlot :hero="null" :slot="{ type: 'reserve', index: -1 }" mode="sell" />
    </div>
  </div>
</template>

<style scoped>
.barracks {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/home_background.jpeg");
  background-size: cover;
  background-position: center;
  color: #fff;
}

.barracks__content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem;
}
</style>
