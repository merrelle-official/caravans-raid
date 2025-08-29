<script setup lang="ts">
import LevelItem from "@/components/menu/LevelItem.vue";
import type { Level } from "@/types";

const props = defineProps<{ levels: Level[] }>();
const emit = defineEmits<{ (e: "level-click", level: Level): void }>();
</script>

<template>
  <div class="levels-list">
    <LevelItem
      v-for="level in props.levels"
      :key="level.id"
      :level="level"
      @click="() => emit('level-click', level)"
    />
  </div>
</template>

<style scoped>
.levels-list {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 50vh;
  overflow-y: auto;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.levels-list::-webkit-scrollbar {
  width: 8px;
}

.levels-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.levels-list::-webkit-scrollbar-thumb {
  background: #ffd700;
  border-radius: 4px;
}

.levels-list::-webkit-scrollbar-thumb:hover {
  background: #ffec70;
}

.levels-list {
  scrollbar-width: thin;
  scrollbar-color: #ffd700 rgba(255, 255, 255, 0.05);
}
</style>
