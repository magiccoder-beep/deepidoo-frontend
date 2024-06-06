<template>
  <main class="responsive max">
    <nav-top></nav-top>


    <ul class="breadcrumb">
      <li>
        <router-link to="/">{{ $t('top_nav.admin_title') }}</router-link>
      </li>
      <li>
        <router-link to="/contacts">Contacts</router-link>
      </li>
      <li>{{ store.contact.firstname }} {{ store.contact.lastname }}</li>
    </ul>


    <div class="content">
      <form @submit.prevent="update" accept-charset="UTF-8" class="form" :class="store.progress">
        <ContactForm />
        <button>{{ $t('save') }}</button>
        <a class="chip round absolute bottom right" v-if="store.contact.id != null" href="#"
          @click="destroy">Supprimer</a>
      </form>
    </div>
    <footer-custom></footer-custom>
  </main>
</template>

<script setup>
import ContactForm from "./_form.vue";
import router from "../../routes";

import { ContactStore } from "../../stores/contact";


const store = ContactStore();
const location = useRoute();

const update = function () {
  store.update().then(resolve => {
    alert("Contact mis à jour");
  }).catch(reject => {
    alert("An error has occured");
  });
};

const destroy = function () {
  if (confirm("Êtes vous sur ?!")) {
    store.destroy().then(resolve => {
      router.push('/contacts');
    }).catch(reject => {
      alert("An error has occured");
    });
  }
};

onMounted(() => {
  store.edit(location.params.id);
});
</script>
