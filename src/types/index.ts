export type HeroClass = "warrior" | "archer" | "mage";

export interface HeroStats {
  hp: number;
  damage: number;
  armor: number;
  attackRange: number;
  attackSpeed: number;
}

export interface Hero {
  id: string;
  name: string;
  class: HeroClass;
  level: number;
  stats: HeroStats;
  icon: string;
}

export interface Squad {
  frontline: (string | null)[];
  reserve: (string | null)[];
}

export interface SlotInfo {
  type: "frontline" | "reserve";
  index: number;
}

export interface Player {
  name: string;
  gold: number;
  lvl: number;
  xp: number;
  expToNext: number;
  lastLevelPassed: number;
}

export interface Level {
  id: number;
  gold: number;
  xp: number;
}

export interface BattleSlot {
  heroId: string | null;
  isDisabled?: boolean;
  isFaint?: boolean;
  isHighlighted?: boolean;
}

export interface DamageEvent {
  id: string;
  amount: number;
  targetSlot: number;
  timestamp: number;
}

export interface HpBar {
  current: number;
  max: number;
}

export interface BattleHero extends Hero {
  currentHp: number;
}

export interface BattleAction {
  type: "attack" | "heal" | "buff";
  attackerId?: string;
  targetId?: string;
  damage?: number;
}

export interface BattleState {
  playerSquad: Squad;
  enemySquad: Squad;
  playerHeroes: Hero[];
  enemyHeroes: Hero[];
  activeTurn: "player" | "enemy";
  isPlayerTurn: boolean;
}
