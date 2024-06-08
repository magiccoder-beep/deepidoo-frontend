<template>
  <main class="responsive max">
    <nav-top></nav-top>

    <div class="grid">
      <div class="s12">
        <ul class="breadcrumb flex justify-start">
          <li class="mr-2">
            <router-link :to="'/'" class="link">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li class="text-gray-600">Contacts</li>
        </ul>
        <div class="flex justify-end">
          <router-link :to="'/contacts/new'" class="link">
            {{ interfaceStrings.newContact }}
          </router-link>
        </div>
      </div>
      <div class="s12">
        <ContactsFilters :pagination="store.pagination"></ContactsFilters>
        <table class="stripes table table-stripped">
          <thead>
            <tr>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('Entity') }}</th>
              <th>{{ $t('users.email') }}</th>
              <th>{{ $t('users.phone') }}</th>
              <th>{{ $t('created_at') }}</th>
              <th>{{ $t('updated_at') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in store.contacts" :key="contact.id">
              <td><router-link :to="'/contacts/' + contact.id" class="link">{{ contact.firstname }} {{ contact.lastname
                  }}</router-link></td>
              <td>{{ contact.entity }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
              <td><router-link :to="'/contacts/' + contact.id" class="link">{{ contact.created_at }}</router-link></td>
              <td><router-link :to="'/contacts/' + contact.id" class="link">{{ contact.updated_at }}</router-link></td>
            </tr>
          </tbody>
        </table>
        <SharedPagination v-if="store.pagination" :store="store" @clicked="load" />
      </div>
    </div>
    <footer-custom></footer-custom>
  </main>
</template>

<script setup>
import ContactsFilters from "./_filters.vue";
import SharedPagination from "../shared/_pagination.vue";
import { ContactStore } from "../../stores/contact";
import { messages } from "../../../const/const";

const interfaceStrings = messages.interfaceStrings;
const store = ContactStore();
const location = useRoute();

const load = function () {
  store.index(location.fullPath);
}

onMounted(() => {
  load();
}
);
</script>
