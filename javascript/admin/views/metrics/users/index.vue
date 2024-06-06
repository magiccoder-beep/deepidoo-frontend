<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          <li>Statistiques</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable">
          <li><router-link to="/metrics/players">Players</router-link></li>
          <li class="active"><router-link to="/metrics/users">Utilisateurs</router-link></li>
          <li><router-link to="/metrics/syncs">Synchros</router-link></li>
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24 overflowable">
            <filters></filters>

            <table class='table table-striped table-thin'>
              <thead>
                <tr>
                  <th style="width: 140px;">Date</th>
                  <th style="width: 60px;">Langue</th>
                  <th>User</th>              
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="interaction in interactions" :key="interaction.id">
                  <td>{{ interaction.created_at }}</td>
                  <td>{{ interaction.locale }}</td>
                  <td>{{ interaction.user_name }}</td>              
                  <td>{{ interaction.verb }} {{ interaction.url }}</td>              
                </tr>
               </tbody>
             </table>
          </div>         
        </div>

        <div class="row">
          <div class="col-xs-12"><a href="#" v-if="page > 1" @click="goPage(page - 1)">&laquo;&nbsp;Plus tard</a></div>
          <div class="col-xs-12" style="text-align: right"><a href="#" @click="goPage(page + 1)">Plus tôt&nbsp;&raquo;</a></div>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

import filters from './_filters.vue'

export default {

  components: {
    filters
  },

  data: function() {
    return this.$store.state.MetricUserStore;
  },

  mounted: function() {
    this.$store.dispatch('MetricUserStore/index', this.$route.fullPath);
  },

  methods: {
    goPage: function(page) {
      if(page > 0) {
        let query = {};
        for(let q in this.$route.query) {
          query[q] = this.$route.query[q];
        }
        query['page'] = page;

        this.$router.push({query: query})
      }
    } 
  }

}
</script>
