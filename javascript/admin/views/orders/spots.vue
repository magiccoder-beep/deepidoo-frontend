<template>
  <div class="main_container orders">
    <nav-top></nav-top>

    <div class="batches" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">Admin</router-link></li>
          <li><router-link to="/orders">{{ $t('batches.title') }}</router-link></li>
          <li>{{ order.full_name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <ul class="nav nav-tabs" style="margin-bottom: 0px;">
          <li><router-link :to="'/orders/' + order.id">Suivi</router-link></li>
          <li class="active"><router-link :to="'/orders/' + order.id + '/spots'">Produits</router-link></li>
          <li v-if="order.has_shipping"><router-link :to="'/orders/' + order.id + '/shipping'">Livraison</router-link></li>
        </ul>

        <div class="row" style="margin: 0;background-color: #fff;border: 1px solid #ddd;border-top: 0;padding-top: 20px;min-height: 300px">
          <div class="col-xs-24 col-md-4" style="min-height: 600px">
            <ul class="spots-list">
              <li v-for="(spot, index) in order.spots" :key="index" :class="{'active': index == spot_index}">
                <router-link :to="'/orders/' + order.id + '/spots/' + index" class="player-pack"><i :class="spot.icon"></i>{{ spot.device_id }}<span :class="'player-status ' + spot.status"></span></router-link>
              </li>
            </ul>
          </div>

          <div v-if="current_spot.type != 'misc'">
            <div class="col-xs-24 col-md-20" style="padding-top: 10px">
              <a v-if="current_spot.soc != true" href="#" class="btn btn-danger" style="float: right" @click.prevent="printSticker(current_spot.device_id)">Impression étiquette</a>   
              <div v-if="current_spot.tags.length > 0">
                <label>Tags: </label> <span v-for="tag in current_spot.tags" :key="tag.id" class="tagged" :style="'background-color: ' + tag.color">{{ tag.name }}</span>
                <br /><br />
              </div>
              <div v-if="current_spot.type == 'audio' || current_spot.type == 'video'  || current_spot.type == 'soc'">
                <div v-if="current_spot.confirmed_at != null">
                  <label style="color: green">Installation confirmée: </label>
                  <span>{{ current_spot.confirmed_at }}</span>
                  <br /><br />
                </div>
                <label>Planning: </label> {{ current_spot.planning_name }}
                <br /><br />
                <div v-if="current_spot.type == 'audio' || current_spot.type == 'video'">
                  <div v-if="current_spot.status == 'none'">
                    <label>Device assigné: </label> 
                    <span v-if="current_spot.device_id == '----'" style="color: #ddd">----</span>
                    <span v-else>{{ current_spot.device_id }}</span>
                    <a @click.prevent="allocateDeviceModal(current_spot.uid)" href="#"><i class="glyph-icon si-glyph-arrow-left-right"></i></a>
                  </div>
                  <div v-else>
                    <label>Device assigné: </label> 
                    <router-link :to="'/devices/' + current_spot.device_id + '/edit/'" target="_blank">{{current_spot.device_id}}</router-link>
                    <a v-if="current_spot.status == 'unconfigured'" @click.prevent="replaceDeviceModal(current_spot)" href="#"><i class="glyph-icon si-glyph-arrow-left-right"></i></a>
                    <br /><br />
                    <div v-if="current_spot.soc == false && current_spot.status == 'unconfigured'">
                      <label>Matériel: </label><br />
                      <form v-on:submit.prevent="updateShape" accept-charset="UTF-8" class="form">
                        <select class="form-control" style="float: left;width: 300px;height: 34px;" v-model="current_shape_id">
                          <option v-for="shape in available_shapes" :key="shape.id" :value="shape.id">{{ shape.name }}</option>
                        </select>   
                        <input type="submit" value="Enregistrer" class="btn btn-warning" style="float: left; margin-left: 10px;" />  
                      </form>
                    </div>
                  </div>           
                  <div class="clearfix"></div>  
                  <br />          
                </div> 
                <label>Configuration</label>
                <div class="well">
                  <table class="table table-thin">
                    <tr v-if="current_spot.dhcp == true">
                      <td style="width: 200px"><b>Type d'adressage</b></td>
                      <td>DHCP</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td style="width: 200px"><b>Type d'adressage</b></td>
                      <td>FIXE</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>IP</b></td>
                      <td>{{ current_spot.network_json.network_ip }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>Masque</b></td>
                      <td>{{ current_spot.network_json.network_mask }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>Passerelle</b></td>
                      <td>{{ current_spot.network_json.network_gateway }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>DNS1</b></td>
                      <td>{{ current_spot.network_json.network_dns1 }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>DNS2</b></td>
                      <td>{{ current_spot.network_json.network_dns2 }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>Proxy</b></td>
                      <td>{{ current_spot.network_json.network_proxy }}</td>
                    </tr>
                    <tr v-if="current_spot.dhcp == false">
                      <td><b>Proxy port</b></td>
                      <td>{{ current_spot.network_json.network_proxy_port }}</td>
                    </tr>
                  </table>
                </div>

                <div v-if="current_spot.device_comment != null">
                  <label>Commentaire du préparateur</label>
                  <div class="well">
                    Tout OK
                  </div>
                </div>
              </div>

              <div v-if="current_spot.type == 'scent'">
                <label>Type de diffuseur</label>
                <div class="well" style="width: 50%">
                  <router-link :to="'/shapes/' + current_spot.shape_id + '/edit'" target="_blank">
                    {{ current_spot.description }}
                  </router-link>
                </div>
              </div>
            </div>

            <div v-if="order.status != '1_new'" class="col-xs-24 col-md-20" style="padding-top: 10px">
              <label>Accessoires</label>
              <div class="well">
                <ul style="margin: 0; padding: 0; list-style-type: none">
                  <li v-for="addon in order.all_addons" :key="addon.id" style="padding: 10px; border-bottom: 1px solid #ddd">
                    <input @change="toggleAddon(addon.id)" type="checkbox" style="margin-right: 10px" :checked="current_spot.addons_ids.includes(addon.id)" :disabled="order.status != '2_confirmed'">{{ addon.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="current_spot.type == 'misc'">
            <div class="col-xs-24 col-md-20" style="padding-top: 10px">
              <label>Accessoires demandés</label>
              <div class="well">
                {{ current_spot.description }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="col-xs-24 col-md-20" style="padding: 10px; float: right;">
              <button @click="setActive()" style="color: white; background-color: red;">Passer en actif</button>
            </div>
          </div>
        </div> 
      </div>
    </div>

    <modal-replace ref="modalReplace"></modal-replace>
    <modal-allocate ref="modalAllocate"></modal-allocate>
  </div>
</template>

<script>
import ModalReplace from "./modals/replace.vue";
import ModalAllocate from "./modals/allocate.vue";

export default {
  components: {
    "modal-replace": ModalReplace,
    "modal-allocate": ModalAllocate
  },

  data: function() {
    return this.$store.state.OrderStore;
  },

  mounted: function() {
    this.$store.dispatch('OrderStore/show', this.$route.params.id).then(response => {
      this.$store.commit('OrderStore/setSpotIndex', this.$route.params.index);
      this.$store.commit('OrderStore/setCurrentSpot', response.order.spots[this.spot_index]);
    })
  },

  methods: {
    setActive: function(){
      if(confirm('Ce device va basculer en actif')){
        this.$store.dispatch('OrderStore/setActive').then(()=> {
          window.location.reload();
        })
      }
    },
    loadAvailableDevices: function() {
      this.$store.dispatch('OrderStore/getAvailableDevices');
    },
    replaceDeviceModal: function(spot) {
      this.$refs.modalReplace.load(spot);
    },
    allocateDeviceModal: function(uid) {
      this.$refs.modalAllocate.load(this.order, uid);
    },
    updateShape: function() {
      this.$store.dispatch('OrderStore/updateShape').then(()=> {
        window.location.reload();
      })
    },
    toggleAddon: function(addon_id) {
      this.$store.dispatch('OrderStore/updateSpot', addon_id);
    },
    printSticker: function(device_id) {
      window.open(location.protocol + '//' + location.host + '/fr/print/stickers/' + this.order.id + '/' + device_id, "Impression","menubar=no, status=no, scrollbars=no, menubar=no, width=270, height=140");
    }
  },

}
</script>
