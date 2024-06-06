<template>
  <div class="responsive max">
    <nav-top></nav-top>

    <div class="clients">
      <div class="s12 l6">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link :to="'/clients'">{{ $t('top_nav.clients') }}</router-link>
          </li>
          <li>{{ $t('clients.new') }}</li>
        </ul>
      </div>

      <div class="s12 l6">
        <form @submit.prevent="create" accept-charset="UTF-8" class="form styled-form" :class="store.progress">
          <ClientForm />
          <button>{{ $t('save') }}</button>
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script setup>
import ClientForm from "./_form.vue";
import { ClientStore } from "../../stores/client";
import router from "../../routes";

const store = ClientStore();

const create = function () {
  store.create().then(response => {
    alert("Client created");
    router.push('/clients/' + response.data.client.id);
  }).catch(reject => {
    alert("An error has occured");
  });
};

onMounted(() => {
  store.new();
});

</script>
