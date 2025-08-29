<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import PlayerInfo from "./PlayerInfo.vue";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();
const router = useRouter();
const route = useRoute();

const toBarracks = () => router.push({ name: "barracks" });
const toMenu = () => router.push({ name: "menu" });
const toLootcase = () => router.push({ name: "lootcase" }); // новая кнопка
</script>

<template>
  <div class="topbar">
    <div class="topbar__actions">
      <button
        class="topbar__btn"
        :class="{ 'topbar__btn--active': route.name === 'menu' }"
        @click="toMenu"
      >
        ⚔ В бой
      </button>
      <button
        class="topbar__btn"
        :class="{ 'topbar__btn--active': route.name === 'barracks' }"
        @click="toBarracks"
      >
        🏰 Казарма
      </button>
      <button
        class="topbar__btn"
        :class="{ 'topbar__btn--active': route.name === 'lootcase' }"
        @click="toLootcase"
      >
        🤝 Вербовка
      </button>
    </div>

    <div class="topbar__player-wrapper">
      <div class="topbar__gold">💰 {{ playerStore.player.gold }}</div>
      <PlayerInfo :player="playerStore.player" />
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between; /* кнопки слева, игрок с золотом справа */
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  gap: 1rem;
}

.topbar__actions {
  display: flex;
  gap: 0.5rem;
}

.topbar__btn {
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
  color: #ffd700;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, transform 0.2s;
}

.topbar__btn:hover {
  background: rgba(255, 215, 0, 0.35);
  transform: scale(1.05);
}

.topbar__btn--active {
  background: rgba(255, 215, 0, 0.7);
  color: #000;
  font-weight: bold;
}

.topbar__player-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.topbar__gold {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
