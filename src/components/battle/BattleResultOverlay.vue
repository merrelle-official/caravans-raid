<script setup lang="ts">
import type { Level } from "@/types";
import router from "@/router";
import { usePlayerStore } from "@/stores/player";

const props = defineProps<{
  currentLevel: number;
  isVictory: boolean;
}>();

const playerStore = usePlayerStore();

const level: Level = {
  id: props.currentLevel,
  gold: 50 + (props.currentLevel - 1) * 20,
  xp: 100 + (props.currentLevel - 1) * 25,
};

const handleClick = () => {
  router.push("/menu");
  playerStore.addGold(level.gold);
  playerStore.addXp(level.xp);
  if (props.isVictory && playerStore.player.lastLevelPassed < level.id) {
    playerStore.player.lastLevelPassed = level.id;
  }
};
</script>

<template>
  <div class="battle-result-overlay">
    <div class="overlay-content">
      <h1 :class="props.isVictory ? 'victory' : 'defeat'">
        {{
          props.isVictory ? "Я знал, что ты сможешь! :)" : "Наверное стоит открыть ещё кейсов... :("
        }}
      </h1>

      <div class="rewards">
        <div class="level-item">
          <div class="level-item__number">Уровень {{ level.id }}</div>
          <div class="level-item__rewards">
            <span class="level-item__reward level-item__reward--gold">💰 {{ level.gold }}</span>
            <span class="level-item__reward level-item__reward--xp">⭐ {{ level.xp }} XP</span>
          </div>
        </div>
      </div>

      <button class="rpg-button" @click="handleClick">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.battle-result-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  z-index: 9999;
  font-family: "Verdana", sans-serif;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 380px;
}

h1.victory {
  color: #6af56b;
  font-size: 2.4rem;
  text-shadow: 0 0 12px #6af56b, 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
}

h1.defeat {
  color: #f55b5b;
  font-size: 2.4rem;
  text-shadow: 0 0 12px #f55b5b, 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.rewards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.level-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 10px;
  border: 2px solid #ffd700;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  cursor: default;
}

.level-item:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px #ffd700;
  background: rgba(20, 20, 20, 0.8);
}

.level-item__number {
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.level-item__rewards {
  display: flex;
  gap: 0.8rem;
}

.level-item__reward {
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.level-item__reward--gold {
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
}

.level-item__reward--xp {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffd700;
}

.rpg-button {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(145deg, #ffd700 0%, #e6c200 100%);
  border: 2px solid #ffd700;
  border-radius: 10px;
  cursor: pointer;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
}

.rpg-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ffd700;
}
</style>
