<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li><router-link to="/devices">{{ $t('top_nav.devices') }}</router-link></li>
          <li>{{ $t('device.new_device') }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form styled-form row">
          <device-form></device-form>
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import DeviceForm from "./_form.vue";

export default {
  components: {
    "device-form": DeviceForm
  },

  data: function() {
    return this.$store.state.DeviceStore;
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("DeviceStore/scannerStop").then(response => {
      next();
    });
  },

  mounted: function() {
    this.$store.dispatch("DeviceStore/new");
  },

  methods: {
    create: function(e) {
      this.$store.dispatch("DeviceStore/create", this.device);
    }
  },

  watch: {
    scanEvents: function() {
      this.$store.dispatch("DeviceStore/create", this.device);
    }
  }
};
</script>
