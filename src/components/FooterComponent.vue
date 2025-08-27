<template>
  <div class="static menu-footer">
    <footer class="absolute bottom-0 left-0"><div class="grid grid-cols-4 grid-rows-1 gap-4 join">
  <router-link :to="{ name: 'dashboard'}" class="btn btn-soft btn-primary btn-square join-item" aria-label="join"><span class="icon-[tabler--home]"></span></router-link>
  <router-link :to="{ name: 'collaborators'}" class="btn btn-soft btn-primary btn-square join-item" aria-label="join"><span class="icon-[tabler--users]"></span></router-link>
  <router-link :to="{ name: 'collaborators'}" class="btn btn-soft btn-primary btn-square join-item" aria-label="join"><span class="icon-[tabler--message]"></span></router-link>
  <button class="btn btn-soft btn-primary btn-square join-item" aria-label="join"><span class="icon-[tabler--star]"></span></button>
</div></footer>
  </div>
</template>
