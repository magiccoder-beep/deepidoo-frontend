<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="col contents" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link to="/">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link to="/contents">Musique</router-link>
          </li>
          <li>{{ content.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24 mt-10 content-editor">
        <div class="row">
          <div class="col-xs-24" style="margin-bottom: 30px">
            <div class="waveform">
              <img :src="content.waveform" width="100%" />
              <br />
              <audio :src="content.src" controls />
            </div>
          </div>

          <div class="col-xs-24 col-lg-12" style="margin-bottom: 30px">
            <label>Pochette</label>
            <img :src="content.cover_art" width="100%" />
          </div>

          <div class="col-xs-24 col-lg-12">
            <form class="form" v-on:submit.prevent="update" accept-charset="UTF-8">
              <div class="form-group">
                <label>Nom</label>
                <span class="error">{{ errors.title }}</span>
                <input type="text" class="form-control" v-model="content.name" />
              </div>
              <div class="form-group">
                <label>Artiste</label>
                <search what="artists" :prompt="content.artist" @selected="selectedArtist"></search>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" v-model="content.notes"></textarea>
              </div>
              <div class="form-group">
                <label>Réference externe</label>
                <input type="text" class="form-control" v-model="content.client_reference" />
              </div>
              <div class="form-group">
                <label>Réference interne</label>
                <input disabled="true" type="text" class="form-control" :value="content.deepiref" />
              </div>

              <input type="submit" :class="'btn btn-warning pull-right ' + progress" value="Enregistrer"/>
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import SearchAutoComplete from "../shared/_artist_autocomplete.vue";

export default {
  components: {
    search: SearchAutoComplete
  },

  data: function() {
    return this.$store.state.ContentStore;
  },

  mounted: function() {
    this.$store.dispatch("ContentStore/edit", this.$route.params.id);
  },

  methods: {
    update: function() {
      this.$store.dispatch("ContentStore/update", this.$route.params.id);
    },
    selectedArtist: function(result) {
      this.$store.commit("ContentStore/setArtist", result.id);
    }
  }
};
</script>
