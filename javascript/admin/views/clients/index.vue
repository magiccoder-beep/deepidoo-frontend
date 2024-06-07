<template>
  <main class="responsive max">
    <nav-top></nav-top>

    <div class="grid">
      <div class="s12">
        <div class="w-full">
          <ul class="breadcrumb pull-left">
            <li>
              <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
            </li>
            <li>{{ $t('top_nav.clients') }}</li>
          </ul>
          <div class="pull-right">
            <router-link :to="'/clients/new'" class="add-link">+ {{ $t('clients.new') }}</router-link>
          </div>
        </div>

        <ClientFilters :pagination="store.pagination"></ClientFilters>

        <table class="stripes table table-striped">
          <thead>
            <tr>
              <th>{{ $t('ref') }}</th>
              <th>{{ $t('created_at') }}</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('Marque') }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in store.clients" :key="client.id">
              <td>
                <router-link :to="'/clients/' + client.id" class="link">{{ client.id }}</router-link>
              </td>
              <td>{{ client.created_at }}</td>
              <td>
                <router-link :to="'/clients/' + client.id" class="link">{{ client.name }}</router-link>
              </td>
              <td>
                {{ client.brand }}
              </td>
              <td>
                <span class="glyph-icon si-glyph-bullet-list-2"></span>{{ messages.interfaceStrings.generateReport }}
              </td>
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

import ClientFilters from "./_filters.vue";
import SharedPagination from "../shared/_pagination.vue";
import { ClientStore } from "../../stores/client";
import { messages } from "../../../const/const";

const store = ClientStore();
const location = useRoute();

const load = function () {
  store.index(location.fullPath);
};

onMounted(() => {
  load();
});

</script>
