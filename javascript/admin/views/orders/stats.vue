<template>
  <div class="main_container orders">
    <nav-top></nav-top>

    <div class="batches" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link :to="'/'">Admin</router-link></li>
          <li>{{ $t('batches.title') }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <ul class="nav nav-tabs" style="margin-bottom: 0px;">
          <li class="active"><router-link to="/orders/stats">Suivi</router-link></li>
          <li role="presentation"><router-link to="/orders">Commandes</router-link></li>
        </ul>

        <div class="row" style="margin: 0;background-color: #fff;border: 1px solid #ddd;border-top: 0;">
          <filters></filters>

          <div class="col-xs-24"></div>
        </div>
      </div>
    </div>
    
    <footer-custom></footer-custom>
  </div>
</template>

<script>

import Filters from "./_filters.vue"

export default {
  components: {
    "filters": Filters
  },

  data: function() {
    return this.$store.state.OrderStore;
  },

  created: function() {
    //this.index();
  },

  methods: {

  }
};
</script>
