<template>
  <div class="col-xs-24 filters">
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count)}}</span>
    <ul class="spot-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>Filtrer
        </a>
      </li>
      <li>
        <a @click.prevent="exportXls" href="#">
          <span class="glyph-icon si-glyph-bullet-list-2"></span>Export Excel
        </a>
      </li>
      <li>
        <a href="#" @click="toggleManager" class="toggle">
          <span class="glyph-icon si-glyph-spanner"></span>Piloter
        </a>
      </li>
    </ul>
    
    <div class="row manager hidden">
      <div class="col-xs-24">
        <div class="well">
          <h4>Action en masse sur les {{ pagination.count }} players</h4>
          <a href="#" @click.prevent="playerManage('player_reload')" class="btn btn-danger">Reload</a>
          <a href="#" @click.prevent="playerManage('player_sync')" class="btn btn-danger">Synchronize</a>

          <router-link to="/metrics" style="float: right;">&raquo;&nbsp;Voir toutes les opérations en cours</router-link>
        </div>
      </div>
    </div>

    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 filters wellv2">
      <div class="form-group-v2 col-md-4">
        <label for>Connexion</label>
        <div class="switch">
          <input type="radio" id="alive-all" class="switch-input" v-model="form.alive" value="" checked="checked"/>
          <label for="alive-all" class="switch-label switch-label-on">Tous</label>
          <input type="radio" id="alive-true" class="switch-input" v-model="form.alive" value="ok" />
          <label for="alive-true" class="switch-label switch-label-off">Connecté</label>
          <input type="radio" id="alive-false" class="switch-input" v-model="form.alive" value="ko"/>
          <label for="alive-false" class="switch-label switch-label-off">Déconnecté</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label for>Désactivé</label>
        <div class="switch">
          <input type="radio" id="active-all" class="switch-input" v-model="form.active_eq" value="" checked/>
          <label for="active-all" class="switch-label switch-label-on">Tous</label>
          <input type="radio" id="active-true" class="switch-input" v-model="form.active_eq" value="true" />
          <label for="active-true" class="switch-label switch-label-off">Non</label>
          <input type="radio" id="active-false" class="switch-input" v-model="form.active_eq" value="false" />
          <label for="active-false" class="switch-label switch-label-off">Oui</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label for>Synchro</label>
        <div class="switch">
          <input type="radio" id="with_sync_status-all" class="switch-input" v-model="form.with_sync_status" value="" checked/>
          <label for="with_sync_status-all" class="switch-label switch-label-on">Tous</label>
          <input type="radio" id="with_sync_status-true" class="switch-input" v-model="form.with_sync_status" value="ok" />
          <label for="with_sync_status-true" class="switch-label switch-label-off">Ok</label>
          <input type="radio" id="with_sync_status-false" class="switch-input" v-model="form.with_sync_status" value="ko" />
          <label for="with_sync_status-false" class="switch-label switch-label-off">Erreur</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label for>Type</label>
        <div class="switch">
          <input type="radio" id="soc_eq-all" class="switch-input" v-model="form.soc_eq" value="" checked/>
          <label for="soc_eq-all" class="switch-label">Tous</label>
          <input type="radio" id="soc_eq-deepibox" class="switch-input" v-model="form.soc_eq" value="false" />
          <label for="soc_eq-deepibox" class="switch-label">DeepiBox</label>
          <input type="radio" id="soc_eq-screen" class="switch-input" v-model="form.soc_eq" value="true" />
          <label for="soc_eq-screen" class="switch-label">Ecran</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label for>Genre</label>
        <div class="switch">
          <input type="radio" id="type-all" class="switch-input" v-model="form.type_eq" value="" checked/>
          <label for="type-all" class="switch-label switch-label-on">Tous</label>
          <input type="radio" id="type-audio" class="switch-input" v-model="form.type_eq" value="Spots::Audio" />
          <label for="type-audio" class="switch-label switch-label-off">{{ $t('audio')}}</label>
          <input type="radio" id="type-video" class="switch-input" v-model="form.type_eq" value="Spots::Video" />
          <label for="type-video" class="switch-label switch-label-off">{{ $t('video')}}</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label for>Streaming</label>
        <div class="switch">
          <input type="radio" id="streaming-all" class="switch-input" v-model="form.streaming_eq" value="" checked/>
          <label for="streaming-all" class="switch-label switch-label-on">Tous</label>
          <input type="radio" id="streaming-true" class="switch-input" v-model="form.streaming_eq" value="true" />
          <label for="streaming-true" class="switch-label switch-label-off">Oui</label>
          <input type="radio" id="streaming-false" class="switch-input" v-model="form.streaming_eq" value="false" />
          <label for="streaming-false" class="switch-label switch-label-off">Non</label>
        </div>
      </div>
      <div class="form-group-v2 col-md-4">
        <label>Spot</label>
        <input type="text" v-model="form.id_eq" class="form-control-v2" />
      </div>
      <div class="form-group-v2 col-md-4">
        <label>Device</label>
        <input type="text" v-model="form.device_id_eq" class="form-control-v2" />
      </div>
      
      <div class="form-group-v2 col-md-8">
        <label>Client</label>
        <input type="text" v-model="form.site_organisation_client_name_cont" class="form-control-v2" />
      </div>
      <div class="form-group-v2 col-md-8">
        <label>Site</label>
        <input type="text" v-model="form.siteref_cont" class="form-control-v2" />
      </div>
      <span class="advanced hidden">

        <div class="form-group-v2 col-md-6">
          <label>OS</label>
            <input type="text" v-model="form.device_data_os" class="form-control-v2" placeholder="Ex: Tizen / Tizen 4 / Webos / Linux" />
        </div>

        <div class="form-group-v2 col-md-6">
          <label>Model</label>
          <input type="text" v-model="form.device_data_model" class="form-control-v2" placeholder="Ex: OM55N" />
        </div>

        <div class="form-group-v2 col-md-4">
          <label>Player version</label>
          <input type="text" v-model="form.device_data_player_version" class="form-control-v2" placeholder="Ex: 1.4.7" />
        </div>

        <div class="form-group-v2 col-md-4">
          <label>Firmware</label>
          <input type="text" v-model="form.device_data_firmware" class="form-control-v2" placeholder="Ex: T-MSMLWWC" />
        </div>
        
        <div class="form-group-v2 col-md-4">
          <label>Network type</label>
          <input type="text" v-model="form.device_data_network_type" placeholder="Ex: WIFI / ETH" class="form-control-v2" />
        </div>
      </span>
      
      <div class="form-group-v2 col-xs-18">
        <label>Tag</label>
        <input type="hidden" v-model="form.device_taggings_tag_id_in"> 
        <tag-selector context="device" :selection="[]" @selected="tagSelected" placeholder="Tags"></tag-selector>    
      </div>
      <div class="form-group-v2 col-md-6" style="margin-top: 28px">
        <a class="btn btn-default" @click="toggleAdvanced()">Advanced</a>
        <a href="/fr/admin/spots" class="btn btn-default">Reset filters</a>
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>

    </form>
  </div>
</template>

<script>
import tagSelector from '../shared/_tag_selector.vue';
export default {
  props: ["pagination", "available_versions"],

  data: function() {
    return {
      player_version: null,
      form: {
        alive: "",
        type_eq: "",
        with_sync_status: "",
        soc_eq: "",
        active_eq: "",
        streaming_eq: "",
        id_eq: "",
        siteref_cont: "",
        device_id_eq: "",
        device_taggings_tag_id_in: [],
        device_data_os: "",
        device_data_model: "",
        device_data_player_version: "",
        device_data_firmware: "",
        device_data_network_type: "",
      }
    };
  },

  components: {
    'tag-selector': tagSelector
  },

  methods: {
    toggleAdvanced: function(){
      $(".advanced").toggleClass("hidden");
    },
    toggleFilters: function() {
      $(".filters.wellv2").toggleClass("hidden");
      $(".manager").addClass("hidden");
    },
    toggleManager: function() {
      $(".filters.wellv2").addClass("hidden");
      $(".manager").toggleClass("hidden");
    },
    filter: function() {
      let query = {};
      for (let el in this.form) {
        if(el === "device_taggings_tag_id_in"){
        query["q[" + el + "][]"] = this.form[el];
        }
        else{
          query["q[" + el + "]"] = this.form[el];
        }        
      }
      this.$router.push({ query: query });
    },
    tagSelected: function(tags) {
      let ids = tags.selection.map((tag) => {
        return tag.id;
      });
      this.form.device_taggings_tag_id_in = ids;
    },
    playerManage: function(action) {
      this.$store.dispatch("SpotStore/manage", {
        query: this.$route.query,
        do: action,
        player_version: this.player_version
      }).then(response => {
        alert("OK: Opération en cours...");
      }).catch(response => {
        alert("ERREUR: Opération refusée, un process du même type est déjà dans la queue depuis moins de 2 heures.\n\nCliquez sur \"Voir toutes les opérations en cours\" pour plus de détails")
      })
    },
    exportXls: function() {
      this.$store.dispatch("XlsxStore/create", {klass: 'Spot', query: this.$route.query}).then(response => {
        alert("Demande transmise, l'export sera envoyé sur votre boite Email\n(cela peut prendre longtemps !)");
      })
    }
  }
};
</script>
