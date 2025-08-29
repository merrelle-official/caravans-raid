import { defineStore } from "pinia";
import { ref } from "vue";
import type { Hero, HeroClass, SlotInfo, Squad } from "@/types";
import { generateHero } from "@/utils/heroGen";
import { usePlayerStore } from "@/stores/player";

const heroClasses: HeroClass[] = ["warrior", "archer", "mage"];

export const useArmyStore = defineStore(
  "army",
  () => {
    const playerStore = usePlayerStore();
    const heroes = ref<Record<string, Hero>>({});
    const squad = ref<Squad>({
      frontline: Array(8).fill(null),
      reserve: Array(20).fill(null),
    });

    const createNewHero = (level: number) => {
      const heroClass = heroClasses[Math.floor(Math.random() * heroClasses.length)];
      const hero = generateHero(heroClass, level);
      heroes.value[hero.id] = hero;

      const emptySlotIndex = squad.value.reserve.findIndex((id) => id === null);
      if (emptySlotIndex !== -1) {
        squad.value.reserve[emptySlotIndex] = hero.id;
      }

      return hero.id;
    };

    const mergeHeroes = (heroId1: string, heroId2: string, targetSlot: SlotInfo) => {
      const hero1 = heroes.value[heroId1];
      const hero2 = heroes.value[heroId2];

      if (!hero1 || !hero2) return null;
      if (hero1.class !== hero2.class || hero1.level !== hero2.level) return null;

      const mergedLevel = hero1.level + 1;
      const mergedHero = generateHero(hero1.class, mergedLevel);

      const mergeStat = (a: number, b: number) => Math.max(a, b) + Math.floor(Math.min(a, b) * 0.1);

      mergedHero.stats.hp = mergeStat(hero1.stats.hp, hero2.stats.hp);
      mergedHero.stats.damage = mergeStat(hero1.stats.damage, hero2.stats.damage);
      mergedHero.stats.armor = Math.max(hero1.stats.armor, hero2.stats.armor);

      for (const type of ["frontline", "reserve"] as const) {
        squad.value[type] = squad.value[type].map((id) =>
          id === heroId1 || id === heroId2 ? null : id
        );
      }

      delete heroes.value[heroId1];
      delete heroes.value[heroId2];

      squad.value[targetSlot.type][targetSlot.index] = mergedHero.id;
      heroes.value[mergedHero.id] = mergedHero;

      return mergedHero.id;
    };

    const moveHero = (heroId: string, from: SlotInfo, to: SlotInfo) => {
      const fromArray = squad.value[from.type];
      const toArray = squad.value[to.type];
      const fromIndex = from.index;
      const toIndex = to.index;
      const targetHeroId = toArray[toIndex];

      if (targetHeroId && heroes.value[targetHeroId]) {
        const mergedId = mergeHeroes(heroId, targetHeroId, to);
        if (mergedId) {
          fromArray[fromIndex] = null;
          return;
        }
      }

      if (!toArray[toIndex]) {
        toArray[toIndex] = heroId;
        fromArray[fromIndex] = null;
      } else {
        const temp = toArray[toIndex];
        toArray[toIndex] = heroId;
        fromArray[fromIndex] = temp;
      }
    };

    const sellHero = (heroId: string) => {
      const hero = heroes.value[heroId];
      if (!hero) return;

      const sellPrice = hero.level * 5;
      playerStore.addGold(sellPrice);

      for (const type of ["frontline", "reserve"] as const) {
        squad.value[type] = squad.value[type].map((id) => (id === heroId ? null : id));
      }

      delete heroes.value[heroId];
    };

    return {
      heroes,
      squad,
      createNewHero,
      moveHero,
      mergeHeroes,
      sellHero,
    };
  },
  {
    persist: true,
  }
);
