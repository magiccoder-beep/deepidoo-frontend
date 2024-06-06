<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li><router-link to="/shapes">Modèles</router-link></li>
          <li>Modifier le Modèle</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" >
          <li><router-link to="/devices">Devices</router-link></li>         
          <li><router-link to="/addons">Addons</router-link></li>
          <li class="active"><router-link to="/shapes">Modèles</router-link></li>
        </ul>
        <div class="row styled-form">
          <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form">
            <shape-form></shape-form>
          </form>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

import ShapeForm from './_form.vue'

export default {

  components: {
    'shape-form': ShapeForm
  },

  data: function() {
    return this.$store.state.ShapeStore;
  },

  mounted: function() {
    this.$store.dispatch('ShapeStore/edit', this.$route.params.id)
  },

  methods: {
    create: function() {
      this.$store.commit('ShapeStore/setPrice');
      this.$store.dispatch('ShapeStore/update', this.$route.params.id);
    }
  }
}
</script>
