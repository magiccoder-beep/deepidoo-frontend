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
          <li class="active"><router-link :to="'/playlists/' + playlist.id">Paramètres</router-link></li>
          <li><router-link :to="'/playlists/' + playlist.id + '/history'">Historique</router-link></li>                    
        </ul>

        <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form row">
          <div class="col-xs-24 col-md-12">

            <div class="form-group">
              <label for="">Nom</label>
              <span class='error'>{{errors.label}}</span>
              <input type="text" v-model="playlist.name" class="form-control">
            </div>
            <div class="form-group">
              <label for="">Sensation</label>
              <textarea v-model="playlist.info_sensation" class="form-control"></textarea>
            </div>

            <div>
              <a  class="btn btn-info" style="padding-top: 2px !important; height: 32px;margin-right: 20px;" :href="'/fr/api/admin/playlists/' + playlist.id + '.xlsx'"><span class="glyph-icon si-glyph-bullet-list-2"></span>Export Excel</a>
              <a  class="btn btn-warning" style="padding-top: 6px !important; height: 32px;margin-right: 20px;width: 100px" @click.prevent="duplicateModal">Copier</a>
              <a href="#" @click.prevent="destroy" style="text-decoration: none;"><i style="color: red; font-size: 18px;padding-right: 5px;">×</i>Supprimer</a>
              <br />
            </div>
          </div>

          <div class="col-xs-24 col-md-12">
            <div class="row">
              <div class="col-xs-24 col-md-12">
                <div class="form-group">
                  <label for="">Playlist locale</label>
                  <input type="radio" v-model="playlist.is_fallback" value="true"/>&nbsp;Oui
                  <input type="radio" v-model="playlist.is_fallback" value="false"  style="margin-left: 30px;"/>&nbsp;Non
                </div>
              </div>
              <div class="col-xs-24 col-md-12"> 
                <div class="form-group">
                  <label for="">Validé</label>
                  <input type="radio" v-model="playlist.is_validated" value="true"/>&nbsp;Oui
                  <input type="radio" v-model="playlist.is_validated" value="false"  style="margin-left: 30px;"/>&nbsp;Non
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="">Audience</label>
              <textarea v-model="playlist.info_audience" class="form-control"></textarea>
            </div>

            <input type="submit" :class="'btn btn-warning pull-right ' + progress" value="Enregistrer" />
          </div>          
        </form>

      </div>
      <modal-duplication ref="modalDuplication"></modal-duplication>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import ModalDuplication from './modals/duplication.vue'

export default {
  components: {
    'modal-duplication': ModalDuplication
  },

  data: function() {
    return this.$store.state.PlaylistStore;
  },

  mounted: function() {
    this.$store.dispatch('PlaylistStore/show', this.$route.fullPath);
  },

  methods: {
    update: function() {
      this.$store.dispatch('PlaylistStore/update', this.$route.params.id);
    },
    duplicateModal: function() {
      $('#modalDuplication').modal();
    },
    destroy: function() {
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch('PlaylistStore/destroy', this.$route.params.id).then(resolve => {
          this.$router.push('/playlists');
        }).catch(reject => {
          alert("An error has occured");
        });
      }
    }
  }
}
</script>
