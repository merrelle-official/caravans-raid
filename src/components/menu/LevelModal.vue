<script setup lang="ts">
import type { Level } from "@/types";
const props = defineProps<{ level: Level }>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "start", level: Level): void;
}>();
</script>

<template>
  <div class="level-modal-overlay" @click.self="emit('close')">
    <div class="level-modal">
      <h2>Начать уровень {{ props.level.id }}?</h2>
      <p>Награда: 💰 {{ props.level.gold }} / ⭐ {{ props.level.xp }} XP</p>
      <div class="level-modal-buttons">
        <button
          class="level-modal__btn level-modal__btn--confirm"
          @click="emit('start', props.level)"
        >
          🔥 Устроить мясо
        </button>
        <button class="level-modal__btn level-modal__btn--cancel" @click="emit('close')">
          ⛌ Я маленькая киса *мяу*
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.level-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.level-modal {
  background: rgba(0, 0, 0, 0.9);
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #ffd700;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.level-modal-buttons {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
}

.level-modal__btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #ffd700;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: #fff;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
}

.level-modal__btn--confirm {
  background: #ffd700;
  color: #000;
  border-color: #ffdd33;
}

.level-modal__btn--confirm:hover {
  background: #ffec70;
}

.level-modal__btn--cancel {
  background: #ff4d4f;
  color: #fff;
  border-color: #ff7875;
}

.level-modal__btn--cancel:hover {
  background: #ff7875;
}
</style>
