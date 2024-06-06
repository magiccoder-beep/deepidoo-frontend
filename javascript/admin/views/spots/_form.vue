<template>
  <div>
    <div class="col-xs-24 col-md-11">
      <h4>{{ $t('box.spot_params') }}</h4>
      <br />
      <div class="form-group">
        <label for>{{ $t('shop.title') }}</label>
        <span class="error">{{ errors.site }}</span>
        <autocomplete-site :prompt="spot.site.name_and_address" what="sites_in_organisation" v-on:picked="setSiteId"></autocomplete-site>
      </div>
      <div class="form-group">
        <div class="row">
          <div class="col-xs-8">
            <label for>{{ $t('box.box_type') }}</label>
            <div class="switch">
              <input type="radio" class="switch-input" v-model="spot.type" value="Spots::Audio" id="spot-audio" checked/>
              <label for="spot-audio" class="switch-label switch-label-off">{{ $t('audio') }}</label>
              <input type="radio" class="switch-input" v-model="spot.type" value="Spots::Video" id="spot-video"/>
              <label for="spot-video" class="switch-label switch-label-on">{{ $t('video') }}</label>
            </div>
          </div>
          <div class="col-xs-8" v-if="spot.type == 'Spots::Video'" style="text-align: right;">
            <label>Affichage coordonné</label>
            <div class="switch" style="float: right;">
              <input type="radio" class="switch-input" v-model="spot.coordinated" value="true" id="coord" checked />
              <label for="coord" class="switch-label switch-label-off">{{ $t('true') }}</label>
              <input type="radio" class="switch-input" v-model="spot.coordinated" value="false" id="no-coord"/>
              <label for="no-coord" class="switch-label switch-label-on">{{ $t('false') }}</label>
            </div> 
          </div>
          <div class="col-xs-8" v-if="spot.type == 'Spots::Video'" style="text-align: right;"> 
            <label>{{ $t('box.portrait') }}</label>
            <div class="switch" style="float: right;">
              <input type="radio" class="switch-input" v-model="spot.orientation" value="vertical" id="ssh" checked />
              <label for="ssh" class="switch-label switch-label-off">{{ $t('true') }}</label>
              <input type="radio" class="switch-input" v-model="spot.orientation" value="horizontal" id="no-ssh"/>
              <label for="no-ssh" class="switch-label switch-label-on">{{ $t('false') }}</label>
            </div> 
          </div>
          <div class="col-xs-16" v-if="spot.type == 'Spots::Audio'" style="text-align: right;">
            <label style="text-align: right">{{ spot.history_delay }} minutes avant répétition</label>
            <input type="range" min="1" max="1000" v-model="spot.history_delay" style="float: right; width: 180px">     
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="row">
          <div class="col-xs-8">
            <label for>{{ $t('box.real_time') }}</label>
            <div class="switch">
              <input type="radio" class="switch-input" v-model="spot.real_time_usage" value="true" id="realtime" checked/>
              <label for="realtime" class="switch-label switch-label-off">{{ $t('true') }}</label>
              <input type="radio" class="switch-input" v-model="spot.real_time_usage" value="false" id="no-realtime"/>
              <label for="no-realtime" class="switch-label switch-label-on">{{ $t('false') }}</label>
            </div>
          </div>

          <div class="col-xs-8" style="text-align: right;">
            <label v-if="spot.is_screen == true">Native portrait</label>
            <div v-if="spot.is_screen == true" class="switch" style="float: right;">
              <input type="radio" class="switch-input" v-model="spot.native_portrait" value="true" id="native" checked />
              <label for="native" class="switch-label switch-label-off">{{ $t('true') }}</label>
              <input type="radio" class="switch-input" v-model="spot.native_portrait" value="false" id="no-native"/>
              <label for="no-native" class="switch-label switch-label-on">{{ $t('false') }}</label>
            </div> 
          </div>

          <div class="col-xs-8" style="text-align: right;">
            <label for>{{ $t('box.streaming') }}</label>
            <div class="switch" style="float: right;">
              <input type="radio" class="switch-input" v-model="spot.streaming" value="true" id="spot-stream" checked/>
              <label for="spot-stream" class="switch-label switch-label-off">{{ $t('true') }}</label>
              <input type="radio" class="switch-input" v-model="spot.streaming" value="false" id="spot-no-stream"/>
              <label for="spot-no-stream" class="switch-label switch-label-on">{{ $t('false') }}</label>
            </div>       
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="">{{ $t('box.ip_addresses') }}</label>
        <input type="radio" name='dhcp' @change="togglePhysicalData(false)" :checked="!spot.network_json"> {{ $t('box.dhcp') }}
        <input type="radio" name='dhcp' @change="togglePhysicalData(true)" :checked="spot.network_json"> {{ $t('box.fixed_ips') }}
        &nbsp;
        <input type="checkbox" v-model='spot.autoconf' :checked="spot.autoconf"> Configuration Auto. avec ces paramètres
        <div v-if="spot.network_json">
          <br />
          <div class="well">
            <label for="">{{ $t('box.network_ip') }}</label>
            <input type="text" name="network_json"  v-model="spot.network_json.network_ip" class="form-control">
            <label for="">{{ $t('box.network_gateway') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_gateway" class="form-control">
            <label for="">{{ $t('box.network_mask') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_mask" class="form-control">
            <label for="">{{ $t('box.network_dns1') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_dns1" class="form-control">
            <label for="">{{ $t('box.network_dns2') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_dns2" class="form-control">
            <label for="">{{ $t('box.network_proxy') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_proxy" class="form-control">
            <label for="">{{ $t('box.network_proxy_port') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_master_port" class="form-control">
            <label for="">{{ $t('box.network_proxy_login') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_proxy_login" class="form-control">
            <label for="">{{ $t('box.network_proxy_password') }}</label>
            <input type="text" name="network_json" v-model="spot.network_json.network_proxy_password" class="form-control">
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Forcer l'usage des médias originaux (murs LED)</label>
        <div class="switch">
          <input type="radio" class="switch-input" v-model="spot.force_original" value="true" id="spot-original" checked/>
          <label for="spot-original" class="switch-label switch-label-off">{{ $t('true') }}</label>
          <input type="radio" class="switch-input" v-model="spot.force_original" value="false" id="spot-no-original"/>
          <label for="spot-no-original" class="switch-label switch-label-on">{{ $t('false') }}</label>
        </div>        
      </div>

      <div class="form-group">
        <label for="">{{ $t('box.geometry.label') }}</label>
        <div class="clearfix" style="height: 10px;"></div>
        <input type="radio" name="geometry" @change="toggleGeometryData(false)" :checked="!spot.geometry_json"> {{ $t('box.geometry.auto') }}
        <input type="radio" name="geometry" @change="toggleGeometryData(true)" :checked="spot.geometry_json" style="margin-left: 20px;"> {{ $t('box.geometry.custom') }}

        <div v-if="spot.geometry_json">
          <br />
          <div class="well">
            <label>{{ $t('box.geometry.width') }}</label>
            <input type="text"  v-model="spot.geometry_json.width" class="form-control">
            <label>{{ $t('box.geometry.height') }}</label>
            <input type="text" v-model="spot.geometry_json.height" class="form-control">
            <label>{{ $t('box.geometry.offset_x') }}</label>
            <input type="text" v-model="spot.geometry_json.offset_x" class="form-control">
            <label>{{ $t('box.geometry.offset_y') }}</label>
            <input type="text" v-model="spot.geometry_json.offset_y" class="form-control">
          </div>
        </div>
      </div>
     
      <div class="form-group">
        <label for="">Stockage max: </label>
        <input type="radio" name='storage_kind' v-model="storage_kind" value="false" style="margin-bottom: 10px" checked> 
        Non renseigné
        <br>
        <input type="radio" name='storage_kind' v-model="storage_kind"  value="percent"> 
        <input type="number" name="storage" min="0" max="100" style="margin-bottom: 10px" v-model="storage_value_percent">
         %
        <br>
        <input type="radio" name='storage_kind' v-model="storage_kind" value="go">
        <input  name="storage"  v-model="storage_value_go" style="width: 50px"> 
         Go
      </div>
      <div class="form-group">
        <label for="">Comportement: </label>
        <input type="radio" name='behavior' v-model="spot.behavior" value="signage" style="margin-bottom: 10px" checked> 
          Signage
        <br>
        <input type="radio" name='behavior' v-model="spot.behavior"  value="kiosk"> 
          Kiosque  
        <br>
        <input type="radio" name='behavior' v-model="spot.behavior" value="radio">
          Radio
        <br>
      </div>  
    </div>

    <div class="col-xs-24 col-md-11 pull-right">
      <h4>{{ $t('box.device_params') }}</h4>
      <br />
      <div class="form-group">
        <label for>Référence</label>
        <span class="error">{{ errors.device }}</span>
        <div v-if="spot.device.id" class="row">
          <div class="col-sm-18">
            <input v-if="spot.device.id" type="text" readonly v-model="spot.device.id"  class="form-control"/>
          </div>
          <div class="col-sm-6">
            <a href="#" @click="modalSav" class="btn btn-warning" style="height: 40px; padding-top: 10px" >{{ $t('device.reallocate') }}</a>
            <modal-sav ref="modalSav"></modal-sav>
          </div>
        </div>
        <div v-else>
          <select v-model="spot.device_id" class="form-control col-sm-8" @change="showDeviceDetails">
            <option v-for="device in spot.devices" :key="device.id" :value="device.id">{{ device.id }} - {{ device.serial }}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>{{ $t('box.model') }}</label>
        <input type="text" readonly v-model="spot.device.shape_name" class="form-control" />
      </div>
      <div class="form-group">
        <label>{{ $t('box.serial') }}</label>
        <input type="text" readonly v-model="spot.device.serial" class="form-control" />
      </div>
      <div class="form-group">
        <input type="checkbox" value="true" @change="setNtp" :checked="spot.ntp_server != ''" style="float: left; margin: 4px 10px auto auto;"><b>Forcer l'usage du NTP</b>
        <input v-if="spot.ntp_server != ''" type="text" class="form-control" v-model="spot.ntp_server" />
      </div>
      <div class="form-group">
        <label>Commentaires</label>
        <textarea v-model="spot.description" class="form-control" style="min-height: 120px" />
      </div>
      <div class="form-group" v-if="spot.soc">
        <label v-if="spot.pairing_code">Code d'appairage: <br/><span style="font-size: 30px">{{spot.pairing_code}}</span></label>
        <label v-else>Pas de code d'appairage . <a style="cursor: pointer;" @click="setPairingCode()">Générer</a></label>
      </div>

      <div class="form-group" style="background-color: #ffccc7; padding: 10px">
        <p style="opacity: 0.5"><b>Danger zone</b></p>
        <br />
        <div style="width: 50%;float: left;">
          <label>Firmware</label>
          <a href="#" @click.prevent="firmwareUpdate" class="btn btn-danger">UPDATE NOW</a>
        </div>
        <div style="width: 50%;float: right;">
          <label>Player actif</label>
          <div class="switch">
            <input type="radio" class="switch-input" v-model="spot.active" value="true" id="spot-active" checked/>
            <label for="spot-active" class="switch-label switch-label-off">{{ $t('true') }}</label>
            <input type="radio" class="switch-input" v-model="spot.active" value="false" id="spot-inactive" />
            <label for="spot-inactive" class="switch-label switch-label-on">{{ $t('false') }}</label>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>

      <br /><br />
      <input type="submit" :class="'btn btn-warning pull-right ' + progress" value="Enregistrer" />
      <a v-if="spot.id != null && spot.active" href="#" class="btn btn-danger" @click.prevent="destroy">{{ $t('delete') }}</a>
      <a v-if="spot.id != null" href="#" @click="forceSync" class="btn btn-danger pull-right" style="margin-right: 10px;">Générer le catalogue</a>
      <a class="btn btn-danger pull-right" v-if="cache_btn" @click="generateCache" style="cursor: pointer; margin-right: 10px">Générer le cache</a>
    </div>
    
  <modal-destroy ref="modalDestroy"></modal-destroy>
  </div>
</template>

<script>
import ModalSav from "./modals/sav.vue";
import ModalDestroy from "./modals/destroy.vue";
import AutocompleteSite from "../shared/_autocomplete.vue";

export default {
  components: {
    "modal-destroy": ModalDestroy,
    "modal-sav": ModalSav,
    "autocomplete-site": AutocompleteSite
  },
  data: function() {
    return this.$store.state.SpotStore;
  },

  methods: {
    setPairingCode: function(){
      this.$store.dispatch("SpotStore/setPairingCode", this.spot.id); 
    },
    modalSav: function() {
      if(this.spot.replaceable) {
        this.$refs.modalSav.load(this.spot);
      } else {
        alert("Une commande est actuellement en cours sur ce Spot, remplacement impossible");
      }
    },
    setNtp: function(e) {
      if($(e.target).is(':checked')) {
        this.$store.commit("SpotStore/setNtp", "pool.ntp.org");
      } else {
        this.$store.commit("SpotStore/setNtp", "");
      }
    },
    firmwareUpdate: function() {
      if(confirm("Mettre à jour ?!")) {
        this.$store.dispatch("SpotStore/playerDo", {
          action: 'player_firmware_update',
          spot: {
            id: this.spot.id
          }          
        });
      };
    },
    destroy: function() {
      $('#modalDestroy').modal();
    },
    togglePhysicalData: function(value) {
      this.$store.dispatch("SpotStore/addNetworkData", value);
    },
    toggleGeometryData: function(value) {
      this.$store.dispatch("SpotStore/addGeometryData", value);
    },
    setSiteId: function(value) {
      this.$store.commit("SpotStore/setSiteId", value);
    },
    showDeviceDetails: function() {
      this.$store.commit("SpotStore/setDeviceId");
    },
    forceSync: function() {
      this.$store.dispatch("SpotStore/forceSync", this.$route.params.id);
    },
    generateCache: function() {
      this.$store.dispatch("SpotStore/generateCache", this.$route.params.id);
    }
  }
};
</script>
