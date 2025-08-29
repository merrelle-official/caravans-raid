import warriorIcon from "@/assets/warrior_icon.png";
import archerIcon from "@/assets/archer_icon.png";
import mageIcon from "@/assets/mage_icon.png";
import type { Hero, HeroClass, HeroStats } from "@/types";

const heroIcons: Record<HeroClass, string> = {
  warrior: warriorIcon,
  archer: archerIcon,
  mage: mageIcon,
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStats(heroClass: HeroClass, level: number): HeroStats {
  switch (heroClass) {
    case "warrior":
      return {
        hp: getRandomInt(90, 120) + level * 14,
        damage: getRandomInt(12, 18) + level * 3,
        armor: getRandomInt(25, 50),
        attackRange: 1,
        attackSpeed: 1,
      };
    case "archer":
      return {
        hp: getRandomInt(70, 100) + level * 10,
        damage: getRandomInt(14, 22) + level * 3,
        armor: getRandomInt(8, 20),
        attackRange: 2,
        attackSpeed: 1,
      };
    case "mage":
      return {
        hp: getRandomInt(40, 60) + level * 6,
        damage: getRandomInt(28, 40) + level * 7,
        armor: getRandomInt(0, 10),
        attackRange: 2,
        attackSpeed: 2,
      };
  }
}

export function generateHero(heroClass: HeroClass, level: number): Hero {
  return {
    id: crypto.randomUUID(),
    name: `${heroClass[0].toUpperCase()}${heroClass.slice(1)}`,
    class: heroClass,
    level,
    stats: generateStats(heroClass, level),
    icon: heroIcons[heroClass],
  };
}
