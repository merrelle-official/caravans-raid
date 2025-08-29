<script setup lang="ts">
import { ref, computed } from "vue";
import type { Hero, SlotInfo } from "@/types";
import { useArmyStore } from "@/stores/army";

interface HeroSlotProps {
  hero: Hero | null;
  slot: SlotInfo;
  mode?: "normal" | "sell";
}

const props = defineProps<HeroSlotProps>();
const armyStore = useArmyStore();

const showTooltip = ref(false);
const isDragging = ref(false);
const isDragOver = ref(false);

const statsMap = computed(() => {
  if (!props.hero) return {};
  return {
    HP: props.hero.stats.hp,
    Урон: props.hero.stats.damage,
    Броня: props.hero.stats.armor + "%",
    Радиус: props.hero.stats.attackRange,
    Скорость: props.hero.stats.attackSpeed,
  };
});

const iconsMap: Record<string, string> = {
  HP: "❤️",
  Урон: "⚔",
  Броня: "🛡",
  Радиус: "🎯",
  Скорость: "⏱",
};

const canShowTooltip = computed(() => !!props.hero && showTooltip.value && !isDragging.value);

const onDragStart = (event: DragEvent) => {
  if (!props.hero) return;
  isDragging.value = true;
  showTooltip.value = false;
  event.dataTransfer?.setData(
    "application/json",
    JSON.stringify({
      heroId: props.hero.id,
      from: props.slot,
    })
  );
};

const onDragEnd = () => {
  isDragging.value = false;
  showTooltip.value = false;
  isDragOver.value = false;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const onDragLeave = () => {
  isDragOver.value = false;
};

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
  showTooltip.value = false;

  const data = JSON.parse(event.dataTransfer?.getData("application/json")!);

  if (props.mode === "sell") {
    armyStore.sellHero(data.heroId);
  } else {
    armyStore.moveHero(data.heroId, data.from, props.slot);
  }
};
</script>

<template>
  <div
    class="hero-slot-wrapper"
    @mouseenter="showTooltip = true"
    @mouseleave="showTooltip = false"
    :draggable="!!props.hero"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <div class="hero-slot" :class="[props.hero?.class, { 'hero-slot--highlight': isDragOver }]">
      <img
        v-if="props.hero"
        :src="props.hero.icon"
        :alt="props.hero.name"
        class="hero-slot__icon"
      />
      <span v-else>
        {{ props.mode === "sell" ? "🗑️" : "➖" }}
      </span>

      <div v-if="props.hero" class="hero-slot__level">Lvl {{ props.hero.level }}</div>
    </div>

    <transition name="tooltip-fade">
      <div v-if="canShowTooltip" class="hero-tooltip" :class="props.hero?.class">
        <p class="hero-tooltip__name">
          {{ props.hero ? props.hero.name : "" }}
          <span v-if="props.hero"> (Ур. {{ props.hero.level }})</span>
        </p>
        <div class="hero-tooltip__stats">
          <div class="hero-tooltip__stat" v-for="(value, key) in statsMap" :key="key">
            <span class="hero-tooltip__icon">{{ iconsMap[key] }}</span>
            <span class="hero-tooltip__label">{{ key }}</span>
            <span class="hero-tooltip__value">{{ value }}</span>
          </div>
        </div>
        <div class="hero-tooltip__arrow" :class="props.hero?.class"></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.hero-slot-wrapper {
  position: relative;
}

.hero-slot {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(30, 30, 30, 0.8));
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
  border: 2px solid #ffd700;
  position: relative;
}

.hero-slot__level {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 0 2px;
  border-radius: 4px;
  background-color: #ffd700;
  color: #000;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-slot-wrapper:hover .hero-slot {
  transform: scale(1.05);
  box-shadow: 0 0 12px #ffd700;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(0, 0, 0, 0.8));
}

.hero-slot--highlight {
  transform: scale(1.1) !important;
  box-shadow: 0 0 15px #ffd700 !important;
}

.hero-slot__icon {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}

.hero-slot.warrior {
  border-color: #ff6b3c;
}
.hero-slot.archer {
  border-color: #32cd32;
}
.hero-slot.mage {
  border-color: #1e90ff;
}

.hero-tooltip {
  position: absolute;
  top: 110%;
  left: 50%;
  transform: translateX(-50%) translateY(0.5rem);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: max-content;
  min-width: 180px;
  color: #fff;
  z-index: 10;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hero-tooltip.warrior {
  background: linear-gradient(135deg, #ff6b3c, #ffb366);
}
.hero-tooltip.archer {
  background: linear-gradient(135deg, #32cd32, #9fff9f);
}
.hero-tooltip.mage {
  background: linear-gradient(135deg, #1e90ff, #87cefa);
}

.hero-tooltip__name {
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.25rem;
}

.hero-tooltip__stats {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.hero-tooltip__stat {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.2rem;
}

.hero-tooltip__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}

.hero-tooltip__label {
  font-weight: 500;
}
.hero-tooltip__value {
  font-weight: bold;
  color: #ffd700;
}

.hero-tooltip__arrow {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 12px;
  height: 12px;
  transform: translateX(-50%) rotate(45deg);
  z-index: -1;
}

.hero-tooltip__arrow.warrior {
  background: linear-gradient(135deg, #ff6b3c, #ffb366);
}
.hero-tooltip__arrow.archer {
  background: linear-gradient(135deg, #32cd32, #9fff9f);
}
.hero-tooltip__arrow.mage {
  background: linear-gradient(135deg, #1e90ff, #87cefa);
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(0.8rem);
}

.tooltip-fade-enter-to,
.tooltip-fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0.5rem);
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
</style>
