<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          <li><router-link :to="'/playlists'">Playlists</router-link></li>
          <li>{{ playlist.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" @click="$event.target.classList.toggle('dropped')">
          <li><router-link :to="'/playlists/' + playlist.id">Paramètres</router-link></li>
          <li class="active"><router-link :to="'/playlists/' + playlist.id + '/history'">Historique</router-link></li>
        </ul>

        <div class="row styled-form">
          <div class="col-xs-24">
            <table class='table table-striped table-thin'>
              <thead>
                <tr>
                  <th style="width: 100px;">Modif. le</th>
                  <th style="width: 120px;">Par</th>
                  <th style="width: 80px;text-align: center">Titres</th>
                  <th style="width: 80px;text-align: center">Ajoutés</th>
                  <th style="width: 80px;text-align: center">Supprimés</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="timepoint in playlist.history" :key="timepoint.id">
                  <td>{{ timepoint.updated_at }}</td>
                  <td><router-link :to="'/users/' + timepoint.user_id">{{ timepoint.updated_by }}</router-link></td>
                  <td style="text-align: center">
                    <span v-if="timepoint.added_ids == 0">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/all'">{{ timepoint.total_count }}</router-link>
                  </td>
                  <td style="text-align: center">
                    <span v-if="timepoint.added_count == '0'">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/added'">{{ timepoint.added_count }}</router-link>
                  </td>
                  <td style="text-align: center">
                    <span v-if="timepoint.removed_count == '0'">0</span>
                    <router-link v-else :to="'/playlists/' + playlist.id + '/history/' + timepoint.id + '/removed'">{{ timepoint.removed_count }}</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <pagination :pagination="pagination"></pagination>
    </div>    
    <footer-custom></footer-custom>
  </div>
</template>

<script>

import pagination from "../shared/_pagination.vue";

export default {
  components: {
    'pagination': pagination
  },

  data: function() {
    return this.$store.state.PlaylistStore;
  },

  mounted: function() {
    this.$store.dispatch('PlaylistStore/history', this.$route.fullPath);
  }
}
</script>
