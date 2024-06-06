<template>
  <main class="responsive max">
    <nav-top></nav-top>
    <div class="main_container">
      <div class="clients" role="main">
        <div class="s12 l6">
          <ul class="breadcrumb pull-left">
            <li>
              <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
            </li>
            <li>
              <router-link :to="'/contacts'">Contacts</router-link>
            </li>
            <li>Nouveau contact</li>
          </ul>
        </div>
        <div class="s12 l6">
          <form @submit.prevent="create" accept-charset="UTF-8" class="form styled-form">
            <ContactForm />
            <button>{{ $t('create') }}</button>
          </form>
        </div>
      </div>
    </div>
    <footer-custom></footer-custom>
  </main>
</template>

<script setup>
import ContactForm from "./_form.vue";
import { ContactStore } from "../../stores/contact";
import router from "../../routes";

const store = ContactStore();

const create = function () {
  store.create().then(resolve => {
    router.push('/contacts')
  }).catch(reject => {
    alert("An error has occured");
  });
};

onMounted(() => {
  store.initContact();
});

</script>
