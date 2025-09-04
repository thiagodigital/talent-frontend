<template>
  <div class="static menu-footer">
    <footer class="absolute bottom-0 left-0 w-full"><div class="grid grid-cols-4 grid-rows-1 gap-1 join">
  <router-link :to="{ name: 'dashboard'}" class="border-2 btn btn-soft btn-primary " aria-label="join"><span class="icon-[tabler--home] size-5"></span></router-link>
  <router-link :to="{ name: 'collaborators'}" class="border-2 btn btn-soft btn-primary join-item" aria-label="join"><span class="icon-[tabler--users] size-5"></span></router-link>
  <button class="btn btn-soft btn-primary join-item" aria-label="join"><span class="icon-[tabler--message] size-5"></span></button>
  <button class="btn btn-soft btn-primary join-item" aria-label="join"><span class="icon-[tabler--star] size-5"></span></button>
</div></footer>
  </div>
</template>
