<template>
  <div class="responsive max">
    <nav-top></nav-top>

    <div class="main_container">
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

      <form @submit.prevent="create" accept-charset="UTF-8" class="form styled-form" :class="store.progress">
      <div class="s12 l6">
          <ClientForm />
          <button class="btn bottom new-btn">{{ $t('save') }}</button>
          </div>
        </form>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script setup>
import ClientForm from "./_form.vue";
import router from "../../routes";
import { ClientStore } from "../../stores/client";
import { messages, urls } from "../../../const/const";

const store = ClientStore();

const create = function () {
  store.create().then(response => {
    router.push(`/${urls.clients.prefix}/` + response.data.client.id);
  }).catch(reject => {
    alert(messages.errorOccured);
  });
};

onMounted(() => {
  store.new();
});

</script>
