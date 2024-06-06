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
          <li>{{ store.client.name }}</li>
        </ul>
      </div>

      <div class="s12 l6">
        <form @submit.prevent="update" accept-charset="UTF-8" class="form styled-form" :class="store.progress">
          <ClientForm />
          <button>{{ $t('save') }}</button>
          <a class="chip round absolute bottom right" v-if="store.client.id" href="#" @click="destroy">Supprimer</a>
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script setup>
import DestroyModal from "./modals/destroy.vue";
import ClientForm from "./_form.vue";
import router from "../../routes";
import { ClientStore } from "../../stores/client";

const store = ClientStore();
const location = useRoute();

const update = function () {
  store.update().then(resolve => {
    alert("Client mis à jour");
  }).catch(reject => {
    alert("An error has occured");
  });
};


const destroy = function () {
  if (confirm("Êtes vous sur ?!")) {
    store.destroy(store.client.name).then(resolve => {
      router.push('/clients');
    }).catch(reject => {
      alert("An error has occured");
    });
  }
};

onMounted(() => {
  store.edit(location.params.id);
});

</script>
