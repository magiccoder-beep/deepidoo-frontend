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
            <p style="text-align: right">
              <router-link :to="'/playlists/' + playlist.id + '/history'" style="float: left;">&laquo;&nbsp;Historique des modifications</router-link>
              <b v-if="tracks_mode.name == 'all'">Etat de la playlist au {{ tracks_mode.edited_at}}</b>
              <b v-if="tracks_mode.name == 'added'">Titres ajoutés à la playlist le {{ tracks_mode.edited_at}} par {{tracks_mode.edited_by }}</b>
              <b v-if="tracks_mode.name == 'removed'">Titres retirés de la playlist le {{ tracks_mode.edited_at}} par {{tracks_mode.edited_by }}</b>
            </p>

            <table class='table table-striped table-thin'>
              <thead>
                <tr>
                  <th style="width: 50px;">&nbsp;</th>
                  <th style="width: 120px;">Artiste</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in contents" :key="content.id">
                  <td><img :src="content.thumbnail" width="50"/></td>
                  <td>{{ content.artist }}</td>
                  <td>
                    {{ content.name }}<br />
                    <a href="#" v-for="tag in content.tags" :key="tag.id" class="tagged" :style="'background-color: ' + tag.color">{{ tag.name }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <pagination :pagination="tracks_pagination"></pagination>
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
    this.$store.dispatch('PlaylistStore/snapshot', this.$route.fullPath);
  }
}
</script>
