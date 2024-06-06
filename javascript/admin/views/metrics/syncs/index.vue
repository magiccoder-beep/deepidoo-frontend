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
          <li><router-link to="/metrics/players">Players</router-link></li>
          <li><router-link to="/metrics/users">Utilisateurs</router-link></li> 
          <li class="active"><router-link to="/metrics/syncs">Synchros</router-link></li>         
        </ul>

        <div class="row styled-form">

          <div class="sync-chart">
            <a v-for="sync in syncs" :key="sync.offset" class="sync-day" href="#" @click="showDay(sync.offset)">
              <div class="syncs-success" :style="'height: ' + sync.percents * 2 +'px'"></div>
              <p>{{ sync.date }}</p>
            </a>
          </div>
          <div class="clearfix"></div>

          <div class="sync-details">
            <h3>Synchros du {{ sync.date }}</h3>
            <p><b>Echouées: {{ sync.failed }} / Total: {{ sync.total }}</b></p>
            <ul>
              <li v-for="spot in sync.spots" :key="spot.id">
                <a :href="'/fr/fleet/spots/' + spot.id +'/syncs'" target="_blank">{{ spot.device_id }} </a>
                <span>{{ spot.site.organisation }} {{ spot.site.name }} ({{spot.kind}})</span>
              </li>
            </ul>
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
    return this.$store.state.MetricSyncStore;
  },

  mounted: function() {
    this.$store.dispatch('MetricSyncStore/index', this.$route.fullPath).then(response => {
      this.$store.dispatch('MetricSyncStore/show', 0); 
    })
  },

  methods: {
    showDay: function(offset) {
      this.$store.dispatch('MetricSyncStore/show', offset); 
    }
  }
}
</script>
