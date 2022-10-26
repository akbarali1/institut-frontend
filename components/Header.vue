<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <nuxt-link :to="`/`" class="navbar-brand">
        Xarajat
      </nuxt-link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse" id="navbarCollapse" style="">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <nuxt-link :to="`/home`" class="nav-link p-2">
              Hamma xarajatlar
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link :to="`/new/`" class="nav-link p-2">
              Yangi Xarajat
            </nuxt-link>
          </li>
          <li class="nav-item">
            <a @click="$auth.logout();$router.push('/auth/login')" class="nav-link p-2">
              Tizimdan chiqish
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
