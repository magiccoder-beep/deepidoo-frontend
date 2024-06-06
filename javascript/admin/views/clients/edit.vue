<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="clients" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link :to="'/clients'">{{ $t('top_nav.clients') }}</router-link>
          </li>
          <li>{{ client.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form">
          <client-form></client-form>   
          <div class="clearfix"></div>       
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import ClientForm from "./_form.vue";

export default {
  components: {
    "client-form": ClientForm
  },

  data: function() {
    return this.$store.state.ClientStore;
  },

  mounted: function() {
    this.$store.dispatch("ClientStore/edit", this.$route.params.id);
  },

  methods: {
    update: function(e) {
      this.$store.dispatch("ClientStore/update", this.client);
    }
  }
};
</script>
