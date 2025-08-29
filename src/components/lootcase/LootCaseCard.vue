<script setup lang="ts">
import type { LootCase } from "@/data/lootCases";

const props = defineProps<{
  lootCase: LootCase;
  onOpen: (lootCase: LootCase) => void;
}>();
</script>

<template>
  <div
    class="lootcase-card"
    :class="lootCase.name === 'Алмазный' ? 'lootcase-diamond' : ''"
    :style="lootCase.name !== 'Алмазный' ? { border: '2px solid ' + lootCase.color } : {}"
  >
    <div class="lootcase-img">
      <img :src="lootCase.img || ''" :alt="lootCase.name" />
    </div>
    <div class="lootcase-name">{{ lootCase.name }}</div>
    <div class="lootcase-price">💰 {{ lootCase.price }}</div>

    <div class="btn-wrapper">
      <button class="lootcase-btn" @click="onOpen(lootCase)">Открыть</button>

      <div class="lootcase-chances-popup">
        <span
          v-for="(chance, idx) in lootCase.chances"
          :key="idx"
          class="chance-tag"
          :style="{
            backgroundColor: chance.color + '22',
            border: '1px solid ' + chance.color,
            color: chance.color,
          }"
        >
          {{ chance.rarity }} — {{ chance.chance }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lootcase-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 24px;
  padding: 2rem;
  width: 240px;
}

.lootcase-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.lootcase-diamond::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  border-radius: 24px;
  background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.btn-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.lootcase-chances-popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 0.6rem 1rem;
  border-radius: 8px;
  opacity: 0;
  pointer-events: none;
  width: max-content;
  min-width: 200px;
  transition: opacity 0.3s, transform 0.3s;
  z-index: 10;
}

.btn-wrapper:hover .lootcase-chances-popup {
  opacity: 1;
  transform: translateX(-50%) translateY(5px);
  pointer-events: auto;
}

.chance-tag {
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
  border-radius: 0.4rem;
  font-weight: 500;
  text-align: center;
}

.lootcase-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ffd700;
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, transform 0.2s;
}

.lootcase-btn:hover {
  background: rgba(255, 215, 0, 0.35);
  transform: scale(1.05);
}
</style>
