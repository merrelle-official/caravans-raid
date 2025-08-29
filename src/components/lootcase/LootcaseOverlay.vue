<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, computed } from "vue";
import type { Hero } from "@/types";

const props = defineProps<{ hero: Hero }>();
const emit = defineEmits<{ (e: "close"): void }>();

const shaking = ref(false);
const flipping = ref(false);
const flipped = ref(false);
const showInfo = ref(false);
const showButton = ref(false);
const showStat = ref([false, false, false, false, false]);

const closeOverlay = () => emit("close");

const statsMap = computed(() => [
  { icon: "❤️", label: "HP", value: () => props.hero.stats.hp },
  { icon: "⚔", label: "Урон", value: () => props.hero.stats.damage },
  { icon: "🛡", label: "Броня", value: () => props.hero.stats.armor + "%" },
  { icon: "🎯", label: "Радиус", value: () => props.hero.stats.attackRange },
  { icon: "⏱", label: "Скорость", value: () => props.hero.stats.attackSpeed },
]);

onMounted(async () => {
  shaking.value = true;
  await new Promise((r) => setTimeout(r, 500));
  shaking.value = false;
  flipping.value = true;
});

const onFlipEnd = () => {
  flipping.value = false;
  flipped.value = true;

  setTimeout(() => {
    showInfo.value = true;
    const delay = 150;
    statsMap.value.forEach((_, i) => {
      setTimeout(() => (showStat.value[i] = true), i * delay);
    });
    setTimeout(() => (showButton.value = true), statsMap.value.length * delay + 200);
  }, 100);
};
</script>

<template>
  <div class="overlay">
    <div class="card-shake" :class="{ shaking }">
      <div
        class="card"
        :class="{ flipBounce: flipping, flipped: flipped }"
        @animationend="onFlipEnd"
      >
        <div class="front">
          <img src="@/assets/question_mark.png" alt="?" />
        </div>
        <div class="back">
          <img :src="props.hero.icon" :alt="props.hero.name" />
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showInfo" class="hero-info">
        <h2>{{ props.hero.name }} (Ур. {{ props.hero.level }})</h2>

        <transition-group name="fade-stats" tag="ul" class="hero-stats">
          <li
            v-for="(stat, i) in statsMap"
            :key="stat.label"
            v-show="showStat[i]"
            class="hero-stat"
          >
            <span class="hero-stat__icon">{{ stat.icon }}</span>
            <span class="hero-stat__label">{{ stat.label }}</span>
            <span class="hero-stat__value">{{ stat.value() }}</span>
          </li>
        </transition-group>

        <transition name="fade-scale">
          <button v-if="showButton" @click="closeOverlay">Далее</button>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card-shake {
  perspective: 1000px;
}

.card-shake.shaking {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-5px) translateY(-2px);
  }
  40% {
    transform: translateX(5px) translateY(2px);
  }
  60% {
    transform: translateX(-3px) translateY(-1px);
  }
  80% {
    transform: translateX(3px) translateY(1px);
  }
}

.card {
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  position: relative;
  transition: transform 0.8s;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card.flipBounce {
  animation: flip-bounce 0.8s forwards;
}

@keyframes flip-bounce {
  0% {
    transform: rotateY(0deg) translateY(0);
  }
  50% {
    transform: rotateY(90deg) translateY(-20px);
  }
  100% {
    transform: rotateY(180deg) translateY(0);
  }
}

.front,
.back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background: #222;
  overflow: hidden;
}

.front img,
.back img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.back {
  transform: rotateY(180deg);
}

.hero-info {
  margin-top: 1rem;
  text-align: center;
  color: #fff;
}

.hero-info button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #ffd700;
  cursor: pointer;
  font-weight: bold;
}

.hero-stats {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.hero-stat {
  display: grid;
  grid-template-columns: 24px 1fr auto;
  align-items: center;
  gap: 0.5rem;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.25rem;
}

.hero-stat__icon {
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-stat__label {
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
}

.hero-stat__value {
  font-weight: bold;
  color: #ffd700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.fade-stats-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-stats-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-stats-enter-active {
  transition: all 0.25s ease;
}
</style>
