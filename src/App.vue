<script setup>
import { useAuth } from "@/services/stores/authStore";
// import { tagStore } from "@/services/stores/tagStore";
// import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import FooterComponent from "./components/FooterComponent.vue";
import GuestLayout from "./components/layouts/GuestLayout.vue";
import MasterLayout from "./components/layouts/MasterLayout.vue";
const auth = useAuth();
// const { getTags } = tagStore();
// function loadData() {
//   if (auth.isAuth) {
//     getTags();
//   }
// }
// onMounted(() => {
//   loadData();
// });
const route = useRoute();
</script>

<template>
  <template v-if="auth.isAuth">
    <MasterLayout :recording="true">
      <RouterView />
      <!-- <RouterView v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="route.path"></component>
        </transition>
      </RouterView> -->
      <FooterComponent />
    </MasterLayout>
  </template>
  <template v-else>
    <GuestLayout>
      <RouterView v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </RouterView>
    </GuestLayout>
  </template>
</template>
<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.1s, transform 0.2s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}
</style>