<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>{{ $t('box.spots') }}</li>
        </ul>
      </div>
      <filters :spot_store="this.$store" :pagination="pagination" :available_versions="available_versions"></filters>
      <div class="col-xs-24 overflowable">
        <table class="table table-striped table-thin">
          <thead>
            <tr>
              <th style="width: 90px;">{{ $t('box.device') | capitalize }}</th>
              <th style="width: 140px;">{{ $t('box.last_response') }}</th>
              <th>{{ $t('a_shop') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="spot in spots" :key="spot.id">
              <td>
                <spot v-bind:spot="spot"></spot>
              </td>
              <td>
                <span :class="'label ' + spot.klass">
                  <router-link :to="'/spots/' + spot.id" style="color: #fff;text-decoration: none;display: inline-block; width: 100%" title="Statut de connection du Player">{{ spot.last_response }}</router-link>
                </span>
              </td>
              <td>
                <p v-if="spot.site.site_ref">{{ spot.site.organisation_name }} {{ spot.site.site_name }} </p>
                <p v-else>{{ spot.site.organisation_name }} {{ spot.site.site_name }}</p>
                <span @click.prevent="showTags({spot: spot})" v-for="tag in spot.tags" :key="tag.id" class="tagged" :style="'padding: 0 4px !important;background-color: ' + tag.color">{{ tag.name }}</span>
              </td>
              <td>
                <a :href="'/fr/fleet/spots/'+spot.id+'/controls'">Logs</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <pagination :pagination="pagination"></pagination>
      <modal-tags ref="modalTags" @changed="reload"></modal-tags>
    </div>
    <footer-custom></footer-custom>
  </div>
</template>

<script>

import Spot from "../shared/_spot.vue";
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";
import modalSpotTags from "./modals/tags.vue"

export default {
  components: {
    pagination,
    'spot': Spot,
    'modal-tags': modalSpotTags,
    filters
  },

  data: function() {
    return this.$store.state.SpotStore;
  },

  mounted: function() {
    this.$store.dispatch("SpotStore/index", this.$route.fullPath);
  },

  methods: {
    reload: function() {
      this.$store.dispatch('SpotStore/index', this.$route.fullPath).then(response => {
        response.spots.map((updated_spot) => {
          if(updated_spot.id == this.spot.id) {
            this.$refs.modalTags.load({spot: updated_spot}); 
          }
        })
      })
    },
    toggleSync: function(spot) {
      const this_spot = spot.has_sync
        ? Object.assign(spot, { has_sync: false })
        : Object.assign(spot, { has_sync: true });

      this.$store.dispatch("SpotStore/update", this_spot);
    },
    showTags: function(spot) {
      this.$store.commit('SpotStore/one', spot); 
      this.$refs.modalTags.show(spot);
    }
  }
};
</script>
