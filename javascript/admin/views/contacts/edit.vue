<template>
  <main class="responsive max">
    <nav-top></nav-top>

    <ul class="breadcrumb">
      <li>
        <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
      </li>
      <li>
        <router-link :to="'/contacts'">{{ $t('Contacts') }}</router-link>
      </li>
      <li>{{ store.contact.firstname }} {{ store.contact.lastname }}</li>
    </ul>

    <div class="s12 l6">
      <form @submit.prevent="update" accept-charset="UTF-8" class="form styled-form" :class="store.progress">
        <ContactForm /> 
        <div class="grid">
          <button class="btn">{{ $t('save') }}</button>
          <a class="chip round absolute bottom right" v-if="store.contact.id" href="#" @click="destroy">
            {{ messages.delete }}
          </a>
        </div>
      </form>
    </div>
    <footer-custom></footer-custom>
  </main>
</template>

<script setup>
import ContactForm from "./_form.vue";
import router from "../../routes";
import { ContactStore } from "../../stores/contact";
import { messages, urls } from "../../../const/const";

const store = ContactStore();
const location = useRoute();

const update = function () {
  store.update().then(resolve => {
    alert(messages.contacts.update.success);
  }).catch(reject => {
    alert(messages.errorOccured);
  });
};

const destroy = function () {
  if (confirm(messages.contacts.destroy.confirm)) {
    store.destroy().then(resolve => {
      router.push(`/${urls.contacts.prefix}`);
    }).catch(reject => {
      alert(messages.errorOccured);
    });
  }
};

onMounted(() => {
  store.edit(location.params.id);
});
</script>
