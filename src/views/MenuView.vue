<script setup lang="ts">
import TopBar from "@/components/TopBar.vue";
import LevelList from "@/components/menu/LevelList.vue";
import LevelModal from "@/components/menu/LevelModal.vue";
import { ref } from "vue";
import type { Level } from "@/types";
import router from "@/router";

const levels: Level[] = Array.from({ length: 80 }, (_, i) => ({
  id: i + 1,
  gold: 50 + i * 20,
  xp: 100 + i * 25,
}));

const activeLevel = ref<Level | null>(null);

const openModal = (level: Level) => (activeLevel.value = level);
const closeModal = () => (activeLevel.value = null);
const startLevel = (level: Level) => {
  router.push(`/battle/${level.id}`);
  closeModal();
};
</script>

<template>
  <div class="levels-page">
    <TopBar />
    <div class="levels-page__content">
      <h1 class="levels-page__title">Уровни</h1>
      <LevelList :levels="levels" @level-click="openModal" />
    </div>

    <LevelModal v-if="activeLevel" :level="activeLevel" @close="closeModal" @start="startLevel" />
  </div>
</template>

<style scoped>
.levels-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/home_background.jpeg");
  background-size: cover;
  background-position: center;
  color: #fff;
}

.levels-page__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.levels-page__title {
  font-size: 2rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  text-align: center;
}
</style>
