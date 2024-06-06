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
          <li><router-link :to="'/spots/' + spot.id">Paramètres</router-link></li>
          <li class="active"><router-link :to="'/spots/'+ spot.id +'/history'">Historique</router-link></li>
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24">
            <table class="table table-striped table-thin table-hover">
              <thead>
                <tr>
                  <th style="width: 120px;">Device</th>
                  <th style="width: 120px">Affectation</th>
                  <th style="width: 120px">Séparation</th>
                  <th>Position</th>                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in history" :key="event.id">
                  <td><router-link :to="'/devices/' + event.device_id + '/edit'">{{ event.device_id }}</router-link></td>
                  <td>{{ event.created_at }}</td>
                  <td>{{ event.released_at }}</td>
                  <td>{{ event.location }}</td>
                </tr>
              </tbody>
            </table>
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
    return this.$store.state.SpotStore;
  },

  mounted: function() {
    this.$store.dispatch("SpotStore/history", this.$route.params.id);
  }
};
</script>
