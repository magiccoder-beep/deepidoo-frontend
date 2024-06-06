<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="clients" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>Contacts</li>
        </ul>
        <div class="pull-right">
          <router-link :to="'/contacts/new'" class="add-link">+ Nouveau contact</router-link>
        </div>
      </div>

      <filters :pagination="pagination"></filters>

      <div class="col-xs-24 overflowable">
        <table class="table table-striped table-thin">
          <thead>
            <tr>
              <th>Nom</th>
              <th style="width: 350px;">Entité</th>
              <th style="width: 220px;">Email</th>
              <th style="width: 220px;">Téléphone</th>  
              <th style="width: 110px;">{{ $t('created_at') }}</th>
              <th style="width: 110px;">{{ $t('updated_at') }}</th>            
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id">
              <td><router-link :to="'/contacts/' + contact.id ">{{ contact.firstname }} {{ contact.lastname }}</router-link></td>
              <td>{{ contact.entity }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
              <td><router-link :to="'/contacts/' + contact.id ">{{ contact.created_at }}</router-link></td>
              <td><router-link :to="'/contacts/' + contact.id ">{{ contact.updated_at }}</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :pagination="pagination"></pagination>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import Pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";

export default {
  components: {
    Pagination,
    filters
  },

  data: function() {
    return this.$store.state.ContactStore;
  },

  mounted: function() {
    this.$store.dispatch("ContactStore/index", this.$route.fullPath);
  }
};
</script>
