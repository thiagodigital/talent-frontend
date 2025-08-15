<script setup lang="ts">
import { useAuth } from '@/services/stores/authStore';
const { user, clear } = useAuth();
</script>

<template>
  <nav class="justify-between gap-4 shadow-sm navbar shadow-base-300/20">
  <div class="navbar-start">
    <div class="flex items-center navbar-center">
    <img src="@/assets/logomarca.svg" alt="Logo" class="w-32" />
  </div>
  </div>
  
  <div class="items-center gap-4 navbar-end">
    <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
      <button id="dropdown-scrollable" type="button" class="flex items-center dropdown-toggle" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
        <div class="avatar">
          <div class="size-9.5 rounded-full">
            <img :src="`https://ui-avatars.com/api/?name=${user.name}`"  :alt="user.name" />
          </div>
        </div>
      </button>
      <ul class="hidden dropdown-menu dropdown-open:opacity-100 min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
        <li class="gap-2 dropdown-header">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img :src="`https://ui-avatars.com/api/?name=${user.name}`"  :alt="user.name" />
            </div>
          </div>
          <div>
            <h6 class="text-base font-semibold text-base-content">{{ user.name }}</h6>
            <small class="text-base-content/50">{{ user.email }}</small>
          </div>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <span class="icon-[tabler--user]"></span>
            My Profile
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <span class="icon-[tabler--settings]"></span>
            Settings
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <span class="icon-[tabler--receipt-rupee]"></span>
            Billing
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <span class="icon-[tabler--help-triangle]"></span>
            FAQs
          </a>
        </li>
        <li class="gap-2 dropdown-footer">
          <a @click.prevent="clear" class="btn btn-error btn-soft btn-block" href="#">
            <span class="icon-[tabler--logout]"></span>
            Sign out
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<!-- 
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style> -->
