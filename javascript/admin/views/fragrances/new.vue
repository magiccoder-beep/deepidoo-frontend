<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="col contents" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li><router-link to="/fragrances">Senteurs</router-link></li>
          <li>Nouvelle senteur</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <div class="row">
          
          <div class="col-xs-24">
            <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form styled-form">
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
    this.$store.dispatch("FragranceStore/new");
  },

  methods: {
    create: function() {
      this.$store.dispatch("FragranceStore/create").then(response => {
        this.$router.push("/fragrances/" + response.content.id);
      })
    }
  }
};
</script>
