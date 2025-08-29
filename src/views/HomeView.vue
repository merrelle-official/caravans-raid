<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "@/stores/player";

const nickname = ref("");
const showError = ref(false);
const router = useRouter();
const playerStore = usePlayerStore();

watch(nickname, () => (showError.value = false));

const startRaid = () => {
  if (!nickname.value.trim()) {
    showError.value = true;
    return;
  }
  playerStore.setName(nickname.value.trim());
  showError.value = false;
  router.push("/menu");
};
</script>

<template>
  <div class="home">
    <div class="home__content">
      <h1 class="home__title">Caravan Raiders</h1>
      <p class="home__description">
        Стань лидером разбойников и ограбь караваны, чтобы собрать лучшие вещи и золото!
      </p>
      <div class="home__input-group">
        <label for="nickname" class="home__label">Введите ваш ник:</label>
        <input
          id="nickname"
          type="text"
          v-model="nickname"
          class="home__input"
          placeholder="Ваш никнейм"
          @keyup.enter="startRaid"
        />
        <p v-if="showError" class="home__error">Пожалуйста, введите никнейм</p>
      </div>
      <button class="home__button" @click="startRaid">Начать рейды</button>
    </div>
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/home_background.jpeg");
  background-size: cover;
  background-position: center;
}

.home__content {
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  color: #fff;
  max-width: 400px;
  width: 90%;
}

.home__title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.home__description {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.home__input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  text-align: left;
}

.home__input {
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.home__input:focus {
  outline: 2px solid #ffd700;
}

.home__error {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

.home__button {
  background-color: #ffd700;
  color: #000;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.home__button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px #ffd700;
}
</style>
