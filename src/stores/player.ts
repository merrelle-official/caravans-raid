import { defineStore } from "pinia";
import { ref } from "vue";
import type { Player } from "@/types";

export const usePlayerStore = defineStore(
  "player",
  () => {
    const player = ref<Player>({
      name: "Разбойник",
      gold: 100,
      lvl: 1,
      xp: 0,
      expToNext: 100,
      lastLevelPassed: 0,
    });

    const setName = (name: string): void => {
      player.value.name = name;
    };

    const addGold = (amount: number): void => {
      player.value.gold += amount;
    };

    const addXp = (amount: number): void => {
      player.value.xp += amount;
      if (player.value.xp >= player.value.expToNext) {
        levelUp();
      }
    };

    const levelUp = (): void => {
      player.value.lvl += 1;
      player.value.expToNext = Math.floor(player.value.expToNext * 2.1);
    };

    return {
      player,
      setName,
      addGold,
      addXp,
    };
  },
  {
    persist: true,
  }
);
