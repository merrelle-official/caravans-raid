<script setup lang="ts">
const props = defineProps<{ disabled: boolean }>();
</script>

<template>
  <button
    class="battle-view__attack-btn"
    :disabled="props.disabled"
    :class="{ 'battle-view__attack-btn--disabled': props.disabled }"
    @click="$emit('attack')"
  >
    Атаковать
  </button>
</template>

<style scoped>
.battle-view__attack-btn {
  align-self: center;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #ff4500;
  color: #fff;
  cursor: pointer;
  height: fit-content;
}

.battle-view__attack-btn--disabled {
  background-color: #888;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
