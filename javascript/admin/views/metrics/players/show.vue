<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          <li>Statistiques</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" >
          <li class="active"><router-link to="/metrics/players">Players</router-link></li>
          <li><router-link to="/metrics/users">Utilisateurs</router-link></li>          
          <li><router-link to="/metrics/syncs">Synchros</router-link></li>  
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24 overflowable">
            <router-link to="/metrics/players">&laquo;&nbsp;Retour à la liste</router-link>
            <br /><br />
            <p>{{ interaction.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

export default {

  data: function() {
    return this.$store.state.MetricPlayerStore;
  },

  mounted: function() {
    this.$store.dispatch('MetricPlayerStore/show', this.$route.fullPath);
  }

}
</script>
