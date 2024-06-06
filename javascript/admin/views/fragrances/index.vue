<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="col contents" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li>Senteurs</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <div class="row">
          <filters :pagination="pagination"></filters>

          <div class="col-xs-24 overflowable">
            <table class="table table-striped table-thin">
              <thead>
                <tr>
                  <th style="width: 40px">ID</th>
                  <th style="width: 60px;">Vignette</th>
                  <th style="width: 200px;">Reference</th>                  
                  <th>Nom FR</th>
                  <th style="width: 80px;">Appros</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in contents" :key="content.id">
                  <td><router-link :to="'/fragrances/' + content.id">{{ content.id }}</router-link></td>
                  <td><img :src="content.cover_art" width="50" /></td>
                  <td>{{ content.name }}</td>
                  <td>{{ content.name_translations['fr'] }}</td>
                  <td style="text-align: right">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <pagination :pagination="pagination"></pagination>
    </div>
    <footer-custom></footer-custom>
  </div>
</template>

<script>
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";

export default {
  components: {
    pagination: pagination,
    filters: filters,
  },

  data: function() {
    return this.$store.state.FragranceStore;
  },

  mounted: function() {
    this.$store.dispatch("FragranceStore/index", this.$route.fullPath);
  },

  methods: {

  }
};
</script>
