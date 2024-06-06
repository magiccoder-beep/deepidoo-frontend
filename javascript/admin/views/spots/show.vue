<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="col-xs-24">
      <ul class="breadcrumb pull-left">
        <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link></li>
        <li><router-link :to="'/spots'">{{ $t('box.spots') }}</router-link></li>
        <li>
          <strong>{{ spot.id }}</strong> /
          <router-link v-if="spot.device" :to="'/devices/'+ spot.device.id + '/edit'">{{ spot.device.id }}</router-link>
          <span>{{ spot.site.name_and_address }} - {{ spot.site.organisation_name }}</span>
        </li>
      </ul>
    </div>

    <div class="right_col" role="main">       
      <div class="col-xs-24 mt-10" style="margin: 0">
        <ul class="nav nav-tabs droppable" >
          <li class="active"><router-link :to="'/spots/' + spot.id">Paramètres</router-link></li>
          <li><router-link :to="'/spots/'+ spot.id +'/history'">Historique</router-link></li>
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24">
            <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form " style="padding: 10px">
              <spot-form></spot-form>
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
import SpotForm from "./_form.vue";

export default {
  components: {
    "spot-form": SpotForm,
  },

  data: function() {
    return this.$store.state.SpotStore;
  },

  mounted: function() {
    this.$store.dispatch("SpotStore/edit", this.$route.params.id);
  },

  methods: {
    update: function(e) {
      this.$store.commit('SpotStore/addStorage');
      this.$store.dispatch("SpotStore/update", this.spot);
    }
  }
};
</script>
