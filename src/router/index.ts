import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import MenuView from "@/views/MenuView.vue";
import BarracksView from "@/views/BarracksView.vue";
import BattleView from "@/views/BattleView.vue";
import HomeView from "@/views/HomeView.vue";
import LootcaseView from "@/views/LootcaseView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  { path: "/menu", name: "menu", component: MenuView },
  { path: "/barracks", name: "barracks", component: BarracksView },
  { path: "/battle/:id", name: "battle", component: BattleView },
  { path: "/lootcase", name: "lootcase", component: LootcaseView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
