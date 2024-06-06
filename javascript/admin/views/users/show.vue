<template>
  <main class="responsive max">
    <ul class="breadcrumb">
      <li><router-link :to="{name: 'users'}">{{ $t('top_nav.users') }}</router-link></li>
      <li>{{ store.user.full_name }}</li>
    </ul>

    <div class="content">
      <form @submit.prevent="update" accept-charset="UTF-8" class="form" :class="store.progress">
        <UsersForm />
        <button class="btn">{{ $t('save') }}</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import UsersForm from './_form.vue';

import { UserStore } from "../../stores/user.js";
const store = UserStore();

const location = useRoute();

const update = function() {
  store.update(location.params.id); 
}

onMounted(() => {
  store.show(location.params.id); 
})
</script>
