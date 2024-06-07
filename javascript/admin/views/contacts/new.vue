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
              <router-link :to="'/contacts'">{{ interfaceStrings.contact }}</router-link>
            </li>
            <li>{{ interfaceStrings.newContact }}</li>
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
import router from "../../routes";
import { ContactStore } from "../../stores/contact";
import { messages } from "../../../const/const";

const store = ContactStore();

const interfaceStrings = messages.interfaceStrings;

const create = function () {
  store.create().then(resolve => {
    router.push(`/${messages.contacts.prefix}/` + resolve.data.contact.id);
  }).catch(reject => {
    alert(messages.errorOccured);
  });
};

onMounted(() => {
  store.initContact();
});

</script>
