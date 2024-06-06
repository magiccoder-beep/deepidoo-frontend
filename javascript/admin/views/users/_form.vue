<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="store.user.kind" class='form-control'>
          <option value="User::Basic">User</option>
          <option value="User::Admin">Admin</option>
        </select>
        <label for="">Type</label>
        <i>arrow_drop_down</i>        
      </div>
      <div class="field label border">        
        <input type="text" v-model="store.user.firstname">
        <label>{{ $t('users.first_name') }}*</label>
        <SharedErrors attr="firstname" :messages="store.errors" />
      </div>
      <div class="field label border">
        <input type="text" v-model="store.user.lastname">
        <label>{{ $t('users.last_name') }}*</label>
        <span class="error">{{ store.errors.lastname }}</span>
      </div>
      <div class="field label border">        
        <select v-model="store.user.language">
          <option v-for="locale in store.user.available_locales" :key="locale.name" :value="locale.name">{{ locale.name }}</option>
        </select>
        <label>Langue</label>
      </div>
      <div class="field label border">        
        <input type="text" v-model="store.user.email" disabled>
        <label>Email</label>
      </div>
    </div>
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="store.user.brand_id">
          <option value="">Non reseller</option>
          <option v-for="brand in store.user.available_brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>
        <label for="">Revendeur pour la marque</label>
        <i>arrow_drop_down</i> 
      </div>
      <div class="field label border">        
        <select v-model="store.user.manufacturer_id">
          <option value="">Non assembleur</option>
          <option v-for="manufacturer in store.user.available_manufacturers" :key="manufacturer.id" :value="manufacturer.id">{{ manufacturer.name }}</option>
        </select>
        <label for="disk_space">Assembleur pour</label>
        <i>arrow_drop_down</i> 
      </div>
      <div class="field middle-align">
        <label class="switch">
          <input type="checkbox" v-model="store.user.hq_videos"/>
          <span></span>
        </label>
        <span>Upload Videos HD</span>
      </div>
      <div class="field label border">        
        <input type="text" class="form-control" v-model="store.user.api_token" disabled="true"/>
        <label for="disk_space">Token API courant</label>
      </div>
      <div class="field label border">        
        <input type="text" v-model="store.user.organisation_name" disabled>
        <label>Organisation</label>
      </div>
      <article class="transparent no-border">   
        <b>Options</b>     
        <ul class="list">
          <li v-for="option in store.user.options" :key="option.id">{{ option.name }}<a href="#" class="cross" style="float: right; margin-right: 10px;" @click.prevent="destroyOption(option)"></a></li>
        </ul>
      </article>
      <div class="field"> 
        <a href="#" class="button small-round border" data-ui="#modal-options">Ajouter une option</a>
      </div>
    </div>
    <!-- <div class='col-xs-24 col-md-12'>
      <div class="form-group">
        <label>Notification</label>
        <input @click.prevent="sendNotification()" style="float: left; width: 100%" class="btn btn-warning pull-left" value="Notifier playlist mise à jour"/>
      </div>
      <div class="form-group">
        <label>Widgets dédiés</label>
        <ul>
          <li v-for="tile in user.tiles" :key="tile.id" style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 5px;"><a href="#" @click.prevent="editTile(tile)">{{ tile.name }}</a><a href="#" style="color: red; float: right; margin-right: 10px;text-decoration: none !important" @click.prevent="destroyTile(tile)">×</a></li>
        </ul>
        <a class="btn btn-default" @click.prevent="editTile({id: null, name: '', url: '', settings: '', client_id: '', type: '', expiration: 1})">+ Ajouter un Widget dédié</a>
      </div>
    </div>

    <div class='col-xs-24 col-md-12'>
      <div class="form-group">
        <label for="disk_space">Options</label>
        <ul>
          <li v-for="option in user.options" :key="option.id" style="border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 5px;">{{ option.name }}<a href="#" style="color: red; float: right; margin-right: 10px;text-decoration: none !important" @click.prevent="destroyOption(option)">×</a></li>
        </ul>
        <a class="btn btn-default" @click.prevent="editOption()">+ Ajouter une option</a>
      </div>

      <input type="submit" style="float: right; margin-left: 20px" :class="'btn btn-warning pull-right ' + progress" value="Enregistrer" />
      <a @click.prevent="reactivate" href="#" v-if="user.deleted" class="btn btn-danger" style="float: right;">Ressusciter</a>
    </div>

    <tile-modal ref="tileForm" name="" url="" user_id="" settings="{}"></tile-modal>
    <option-modal ref="optionForm"></option-modal> -->
    <ModalsOptions></ModalsOptions>
  </div>
</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import ModalsOptions from "./modals/options.vue";

import { UserStore } from "../../stores/user.js";
const store = UserStore();

// import TileModal from "./modals/tile.vue";
// import OptionModal from "./modals/option.vue";

// export default {
//   components: {
//     'tile-modal': TileModal,
//     'option-modal': OptionModal
//   },

//   methods: {
//     sendNotification(){
//       if(confirm('Un email va être envoyé à : ' + this.user.email)){
//         this.$store.dispatch('UserStore/sendNotification', this.user.id).then(() => {
//           window.location.reload();
//         }).catch(() => {
//           alert("Une erreur est survenue");
//         });
//       }
//     },
//     editTile: function(tile) {
//       this.$refs.tileForm.show(tile);
//     },
//     destroyTile: function(tile) {
//       this.$refs.tileForm.destroy(tile);
//     },
//     editOption: function() {
//       this.$refs.optionForm.show();
//     },
//     destroyOption: function(option) {
//       if(confirm("Êtes vous sur ?!")) {
//         this.$store.dispatch('UserStore/removeOption', option.id).then(() => {
//           window.location.reload();
//         }).catch(() => {
//           alert("Une erreur est survenue");
//         });
//       }
//     },
//     reactivate: function() {
//       if(confirm("Êtes vous sur ?!")) {
//         this.$store.dispatch('UserStore/reactivate', this.$route.params.id).then(() => {
//           window.location.reload();
//         }).catch(() => {
//           alert("Reactivation du User impossible: peut-être que cet Email a été re-utilisé entre temps ?!");
//         });
//       }
//     },
//   }
// }
</script>
