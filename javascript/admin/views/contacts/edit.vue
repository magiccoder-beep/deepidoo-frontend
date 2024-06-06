<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="clients" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link to="/">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link to="/contacts">Contacts</router-link>
          </li>
          <li>{{ contact.firstname }} {{ contact.lastname }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form">
          <contact-form></contact-form>   
          <div class="clearfix"></div>       
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import ContactForm from "./_form.vue";

export default {
  components: {
    "contact-form": ContactForm
  },

  data: function() {
    return this.$store.state.ContactStore;
  },

  mounted: function() {
    this.$store.dispatch("ContactStore/edit", this.$route.params.id);
  },

  methods: {
    update: function() {
      this.$store.dispatch("ContactStore/update", this.contact);
    }
  }
};
</script>
