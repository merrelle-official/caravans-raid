import woodenCase from "@/assets/wooden_case.png";
import ironCase from "@/assets/iron_case.png";
import goldenCase from "@/assets/golden_case.png";
import titanCase from "@/assets/titan_case.png";
import diamondCase from "@/assets/diamond_case.png";

export interface LootCase {
  name: string;
  price: number;
  img?: string;
  color: string;
  chances: {
    rarity: string;
    color: string;
    chance: string;
  }[];
}

export const lootCases: LootCase[] = [
  {
    name: "Деревянный",
    price: 50,
    color: "#32cd32",
    img: woodenCase,
    chances: [
      { rarity: "Lvl 1 - 3", color: "#aaa", chance: "80%" },
      { rarity: "Lvl 4 - 7", color: "#32cd32", chance: "15%" },
      { rarity: "Lvl 8 - 15", color: "#1e90ff", chance: "4%" },
      { rarity: "Lvl 16 - 25", color: "#8a2be2", chance: "1%" },
    ],
  },
  {
    name: "Железный",
    price: 150,
    color: "#1e90ff",
    img: ironCase,
    chances: [
      { rarity: "Lvl 1 - 3", color: "#aaa", chance: "60%" },
      { rarity: "Lvl 4 - 7", color: "#32cd32", chance: "25%" },
      { rarity: "Lvl 8 - 15", color: "#1e90ff", chance: "10%" },
      { rarity: "Lvl 16 - 25", color: "#8a2be2", chance: "5%" },
    ],
  },
  {
    name: "Золотой",
    price: 300,
    color: "#ffd700",
    img: goldenCase,
    chances: [
      { rarity: "Lvl 1 - 3", color: "#aaa", chance: "40%" },
      { rarity: "Lvl 4 - 7", color: "#32cd32", chance: "30%" },
      { rarity: "Lvl 8 - 15", color: "#1e90ff", chance: "20%" },
      { rarity: "Lvl 16 - 25", color: "#8a2be2", chance: "8%" },
      { rarity: "Lvl 26 - 35", color: "orange", chance: "2%" },
    ],
  },
  {
    name: "Титановый",
    price: 700,
    color: "#8a2be2",
    img: titanCase,
    chances: [
      { rarity: "Lvl 1 - 3", color: "#aaa", chance: "20%" },
      { rarity: "Lvl 4 - 7", color: "#32cd32", chance: "30%" },
      { rarity: "Lvl 8 - 15", color: "#1e90ff", chance: "30%" },
      { rarity: "Lvl 16 - 25", color: "#8a2be2", chance: "15%" },
      { rarity: "Lvl 26 - 35", color: "orange", chance: "5%" },
    ],
  },
  {
    name: "Алмазный",
    price: 1500,
    color: "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)",
    img: diamondCase,
    chances: [
      { rarity: "Lvl 4 - 7", color: "#32cd32", chance: "20%" },
      { rarity: "Lvl 8 - 15", color: "#1e90ff", chance: "30%" },
      { rarity: "Lvl 16 - 25", color: "#8a2be2", chance: "30%" },
      { rarity: "Lvl 26 - 35", color: "orange", chance: "20%" },
    ],
  },
];
