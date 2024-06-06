<template>    
  <nav-bar />
  <main class="responsive max">
    <router-view />
  </main>  
</template>

<script setup>
import NavBar from './shared/_nav.vue';
</script>