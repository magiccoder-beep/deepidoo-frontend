<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li>Playlists</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <div class="row">
          <filters :pagination="pagination"></filters>

          <div class="col-xs-24 overflowable">
            <table class="table table-striped table-thin table-hover">
              <thead>
                <tr>
                  <th style="width: 80px">ID</th>
                  <th style="width: 120px;">Créée le<a href="#" @click="orderBy($event, 'created_at|asc')" class="order-column" :class="arrowKlass('created_at')"></a></th>
                  <th style="width: 120px;">Modifié le<a href="#" @click="orderBy($event, 'updated_at|asc')" class="order-column" :class="arrowKlass('updated_at')"></a></th>
                  <th style="width: 200px;">Organisation</th>
                  <th>Nom</th>
                  <th style="width: 100px;" title="Nombre de plages programmées dans les calendriers">Utilisé</th>
                  <th style="width: 120px;" title="Nombre de titres">Titres</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="playlist in playlists" :key="playlist.id">
                  <td>
                    <a href="#" @click.prevent="editPlaylist(playlist)">{{ playlist.id }}</a>
                  </td>
                  <td>{{ playlist.created_at }}</td>
                  <td>
                    <router-link :to="'/playlists/' + playlist.id + '/history'">{{ playlist.updated_at }}</router-link>
                  </td>
                  <td>{{ playlist.organisation }}</td>
                  <td>
                    <a href="#" @click.prevent="editPlaylist(playlist)">{{ playlist.name }}</a>
                  </td>
                  <td>
                    <a href="#" @click.prevent="showOrganisation(playlist)">{{ playlist.plannings_count }}</a>
                  </td>
                  <td title="Nombre de titre"> {{ playlist.total_count }} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <modal-organisation ref="modalOrganisation"></modal-organisation>
      <pagination :pagination="pagination"></pagination>
    </div>
    <footer-custom></footer-custom>
  </div>
</template>

<script>
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";
import modalOrganisation from './modals/organisation.vue'

export default {
  components: {
    'pagination': pagination,
    'filters': filters,
    'modal-organisation': modalOrganisation
  },

  data: function() {
    return this.$store.state.PlaylistStore;
  },

  mounted: function() {
    this.$store.dispatch("PlaylistStore/index", this.$route.fullPath);
  },

  methods: {
    showOrganisation: function(playlist){
      this.$store.dispatch("PlaylistStore/showOrganisation", playlist.id).then(response => {
        $('#modalOrganisation').modal();
      }); 
    },
    editPlaylist: function(playlist) {
      this.$store.dispatch("UserStore/loginAs", playlist.guest.id).then(response => {
        window.location.href = '/fr/admin/playlists/' + playlist.id;
      });
    },
    arrowKlass: function(column) {
      if(typeof this.$route.query.order != 'undefined') {
        const order = this.$route.query.order.split('|');
        if(order[0] == column) {
          if(order[1] == 'asc') {
            return "icon-up-open";
          } else {
            return "icon-down-open";
          }
        } else {
          return "icon-down-open";
        }
      } else {
        return "icon-down-open";
      }      
    }
  }
};
</script>
