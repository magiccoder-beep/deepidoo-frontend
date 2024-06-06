<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="col contents" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li><router-link to="/fragrances">Senteurs</router-link></li>
          <li>{{ content.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <div class="row">
          
          <div class="col-xs-24">
            <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form">
              <fragrance-form></fragrance-form>
              <div class="clearfix"></div>
            </form>
          </div>
          
        </div>
      </div>

    </div>
    <footer-custom></footer-custom>
  </div>
</template>

<script>
import FragranceForm from "./_form.vue";

export default {
  components: {
    'fragrance-form': FragranceForm
  },

  data: function() {
    return this.$store.state.FragranceStore;
  },

  mounted: function() {
    this.$store.commit("FragranceStore/reset");
    this.$store.dispatch("FragranceStore/show", this.$route.params.id);
  },

  methods: {
    update: function() {
      this.$store.dispatch("FragranceStore/update", this.$route.params.id);
    }
  }
};
</script>
