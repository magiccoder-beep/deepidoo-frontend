<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li><router-link to="/devices">{{ $t('top_nav.devices') }}</router-link></li>
          <li><router-link to="/addons"> Addons </router-link></li>
          <li>Nouvel Addon</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" >
          <li><router-link to="/devices">Devices</router-link></li>         
          <li class="active"><router-link to="/addons">Addons</router-link></li>
          <li><router-link to="/shapes">Modèles</router-link></li>
        </ul>
        <div class="row styled-form">
          <div class="col-xs-24">
            <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form">
              <device-addon-form></device-addon-form>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <footer-custom></footer-custom>
  </div>
</template>

<script>
import Form from "./_form.vue";

export default {
  components: {
    "device-addon-form": Form
  },

  data: function() {
    return this.$store.state.AddonStore;
  },

  mounted: function() {
    this.$store.commit("AddonStore/one", {addon: {
      name: '',
      ref: '',
      price: 0
    }});
  },

  methods: {
    create: function() {
      this.$store.commit("AddonStore/setPrice");
      this.$store.dispatch("AddonStore/create", this.addon).then(()=> {
        this.$router.push(`/addons`)
      })
    }
  }
};
</script>
