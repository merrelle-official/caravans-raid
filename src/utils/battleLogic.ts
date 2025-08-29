import { generateHero } from "./heroGen";
import type { BattleHero, Hero, HeroClass } from "@/types";

export function generateEnemyGridSmartRandom(
  progressLevel: number,
  ROWS = 4,
  COLS = 2
): (BattleHero | null)[][] {
  const grid: (BattleHero | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  const classes: HeroClass[] = ["warrior", "archer", "mage"];

  const totalEnemies = Math.min(
    ROWS * COLS,
    Math.max(2, Math.ceil(2 + (progressLevel / 40) ** 0.7 * 6))
  );
  const baseLevel = Math.min(40, Math.max(1, Math.floor(1 + progressLevel * 0.5)));

  const enemies: { cls: HeroClass; level: number }[] = [];
  for (let i = 0; i < totalEnemies; i++) {
    const cls = classes[Math.floor(Math.random() * classes.length)];
    let level = baseLevel + Math.floor(Math.random() * 11) - 5;
    level = Math.min(40, Math.max(1, level));
    enemies.push({ cls, level });
  }

  const tanks = enemies.filter((e) => e.cls === "warrior");
  const dmgers = enemies.filter((e) => e.cls !== "warrior");

  const shuffle = (arr: number[]) => arr.sort(() => Math.random() - 0.5);

  let tankIdx = 0;
  const firstRowCols = shuffle([...Array(COLS).keys()]);
  for (const c of firstRowCols) {
    if (tankIdx >= tanks.length) break;
    const tank = tanks[tankIdx];
    const hero = generateHero(tank.cls, tank.level);
    grid[0][c] = { ...hero, currentHp: hero.stats.hp };
    tankIdx++;
  }

  const secondRowCols = shuffle([...Array(COLS).keys()]);
  for (const c of secondRowCols) {
    if (tankIdx >= tanks.length) break;
    if (!grid[1][c]) {
      const tank = tanks[tankIdx];
      const hero = generateHero(tank.cls, tank.level);
      grid[1][c] = { ...hero, currentHp: hero.stats.hp };
      tankIdx++;
    }
  }

  let dmgIdx = 0;
  for (let row = ROWS - 1; row >= 0 && dmgIdx < dmgers.length; row--) {
    const colsShuffled = shuffle([...Array(COLS).keys()]);
    for (const col of colsShuffled) {
      if (!grid[row][col] && dmgIdx < dmgers.length) {
        const dmg = dmgers[dmgIdx];
        const hero = generateHero(dmg.cls, dmg.level);
        grid[row][col] = { ...hero, currentHp: hero.stats.hp };
        dmgIdx++;
      }
    }
  }

  return grid;
}

export function generatePlayerGrid(
  squadIds: (string | null)[],
  heroes: Record<string, Hero>,
  ROWS = 4,
  COLS = 2
): (BattleHero | null)[][] {
  const grid: (BattleHero | null)[][] = [];
  for (let row = 0; row < ROWS; row++) {
    const rowArr: (BattleHero | null)[] = [];
    for (let col = 0; col < COLS; col++) {
      const idx = row * COLS + col;
      const heroId = squadIds[idx];
      rowArr.push(heroId ? { ...heroes[heroId], currentHp: heroes[heroId].stats.hp } : null);
    }
    grid.push(rowArr);
  }
  return grid;
}

export function findHeroPosition(
  hero: BattleHero,
  grid: (BattleHero | null)[][]
): [number, number] | null {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col]?.id === hero.id) return [row, col];
    }
  }
  return null;
}

export function canAttackHero(
  attacker: BattleHero | null,
  enemyGrid: (BattleHero | null)[][],
  row: number,
  col: number,
  COLS = 2
): boolean {
  if (!attacker) return false;
  if (attacker.stats.attackRange === 2) return true;
  const heroRow = enemyGrid[row];
  if (!heroRow) return false;
  for (let c = 0; c < COLS; c++) {
    const hero = heroRow[c];
    if (hero && hero.currentHp > 0) return c === col;
  }
  return false;
}

export function getHighlightedPositions(
  attacker: BattleHero | null,
  defender: BattleHero | null,
  enemyGrid: (BattleHero | null)[][],
  isAttackerTurn: boolean
): [number, number][] {
  if (!defender) return [];
  const pos = findHeroPosition(defender, enemyGrid);
  if (!pos) return [];
  const row = pos[0];
  const col = pos[1];
  const positions: [number, number][] = [[row, col]];
  if (attacker?.class === "mage" && !isAttackerTurn) {
    const neighbors: [number, number][] = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    neighbors.forEach(([nr, nc]) => {
      if (enemyGrid[nr]?.[nc]) positions.push([nr, nc]);
    });
  }
  return positions;
}

export function attackHero(
  attacker: BattleHero,
  defender: BattleHero,
  enemyGrid: (BattleHero | null)[][],
  damageEffects: { r: number; c: number; amount: number }[]
) {
  const triggerDamageEffect = (r: number, c: number, amount: number) => {
    damageEffects.push({ r, c, amount });
    setTimeout(() => {
      const idx = damageEffects.findIndex((e) => e.r === r && e.c === c && e.amount === amount);
      if (idx !== -1) damageEffects.splice(idx, 1);
    }, 600);
  };

  const dealDamage = (target: BattleHero, dmg: number, pos: [number, number]) => {
    target.currentHp -= dmg;
    if (target.currentHp < 0) target.currentHp = 0;
    triggerDamageEffect(pos[0], pos[1], dmg);
  };

  const pos = findHeroPosition(defender, enemyGrid);
  if (!pos) return;

  const baseDamage = Math.round(attacker.stats.damage * (1 - defender.stats.armor / 100));
  if (attacker.class === "mage") {
    dealDamage(defender, baseDamage, pos);

    const row = pos[0];
    const col = pos[1];
    const neighbors: [number, number][] = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    neighbors.forEach(([nr, nc]) => {
      const neighbor = enemyGrid[nr]?.[nc];
      if (neighbor && neighbor.currentHp > 0) {
        const aoeDamage = Math.round(
          attacker.stats.damage * 0.4 * (1 - neighbor.stats.armor / 100)
        );
        dealDamage(neighbor, aoeDamage, [nr, nc]);
      }
    });
  } else {
    dealDamage(defender, baseDamage, pos);
  }
}

export function chooseRandomEnemy(enemyGrid: (BattleHero | null)[][]): BattleHero | null {
  const livingEnemies: BattleHero[] = [];
  enemyGrid.forEach((row) =>
    row.forEach((hero) => {
      if (hero && hero.currentHp > 0) livingEnemies.push(hero);
    })
  );
  if (!livingEnemies.length) return null;
  return livingEnemies[Math.floor(Math.random() * livingEnemies.length)];
}

export function chooseRandomPlayer(
  playerGrid: (BattleHero | null)[][],
  attacker: BattleHero
): BattleHero | null {
  const ROWS = playerGrid.length;
  const COLS = playerGrid[0].length;

  if (attacker.stats.attackRange === 1) {
    const possibleTargets: BattleHero[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = COLS - 1; col >= 0; col--) {
        const hero = playerGrid[row][col];
        if (hero && hero.currentHp > 0) {
          possibleTargets.push(hero);
          break;
        }
      }
    }
    if (!possibleTargets.length) return null;
    return possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
  }

  const livingPlayers: BattleHero[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const hero = playerGrid[row][col];
      if (hero && hero.currentHp > 0) livingPlayers.push(hero);
    }
  }
  if (!livingPlayers.length) return null;
  return livingPlayers[Math.floor(Math.random() * livingPlayers.length)];
}
