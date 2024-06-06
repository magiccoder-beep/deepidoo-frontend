<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="clients" role="main">
      <div class="col-xs-24">
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

      <filters :pagination="pagination"></filters>

      <div class="col-xs-24 overflowable">
        <table class="table table-striped table-thin">
          <thead>
            <tr>
              <th style="width: 70px;">{{ $t('ref') }}</th>
              <th style="width: 110px;">{{ $t('created_at') }}</th>
              <th>{{ $t('name') }}</th>
              <th style="width: 200px">Marque</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clients" :key="client.id">
              <td>
                <router-link :to="'/clients/' + client.id ">{{ client.id }}</router-link>
              </td>
              <td>{{ client.created_at }}</td>
              <td>
                <router-link :to="'/clients/' + client.id ">{{ client.name }}</router-link>
              </td>
              <td>
                {{ client.brand }}
              </td>
              <td>
                <span class="glyph-icon si-glyph-bullet-list-2"></span>Générer un rapport
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :pagination="pagination"></pagination>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import Pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";

export default {
  components: {
    Pagination,
    filters
  },

  data: function() {
    return this.$store.state.ClientStore;
  },

  mounted: function() {
    this.$store.dispatch("ClientStore/index", this.$route.fullPath);
  }
};
</script>
