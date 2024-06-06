<template>
  <div class="row">
    <div class="col-xs-24">
      <div class="col-xs-24 col-md-12">
        <div class="form-group">
          <label>Nom*</label>
          <span class="error">{{ errors.name }}</span>
          <input type="text" v-if="client" v-model="client.name" class="form-control" />
          <input type="text" v-if="!client" class="form-control" />
        </div>
        <div class="form-group">
          <label>Organisation parente</label>
          <select  v-if="client.id == null" class="form-control" v-model="client.organisation_id">
            <option v-for="organisation in organisations" :key="organisation.id" :value="organisation.id">{{ organisation.name }}</option>
          </select>
          <input v-else type="text" class="form-control" v-model="client.parent_organisation_name" disabled="true"/>
        </div>
        <div class="form-group" v-if="client.id != null">
          <label>
            API UID
            <a style="float: right; cursor: pointer" @click="initApi()">Générer</a>
          </label>
          <input type="text" class="form-control" v-model="client.api_uid" disabled="true" />
        </div>
      </div>
      <div class="col-xs-24 col-md-12">
        <div class="form-group">
          <label>Fallback audio</label>
          <select class="form-control" v-model="client.fallback_id">
            <option v-for="fallback in fallbacks" :key="fallback.id" :value="fallback.id">{{ fallback.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Marque</label>
          <select class="form-control" v-model="client.brand_id">
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
          </select>
        </div>
				<div class="form-group" v-if="client.id == null">          
          <input type="checkbox" style="float: left; margin-right: 20px" v-model="client.import_templates" value="true"/><b>Importer les modèles de template</b>
          <div clas="clearfix"></div><br />
          <p>En cochant cette case tous les templates de l'organisation DEEPIDOO SIEGE [Bureaux] taggés "Modèle de templates" seront copiés dans la nouvelle organisation</p>
        </div>
        <div class="form-group" v-if="client.id != null">
          <label>API Secret</label>
          <input type="text" class="form-control" v-model="client.api_secret" disabled="true"/>
        </div>
        <div class="form-group" v-if="client.id != null">
          <label>SSO Provider (Single Sign-On)</label>
          <select class="form-control" v-model="client.sso_provider">
            <option value="">Pas de SSO</option>
            <option value="okta">Okta</option>
            <option value="ldap">LDAP</option>
          </select>
        </div>
      </div>
      <div class="clearfix"><br /></div>

      <div class="col-xs-12">
        <a v-if="client.id != null" href="#" @click.prevent="destroy" class="btn btn-danger pull-left">Supprimer</a>
      </div>

      <div class="col-xs-12"> 
        <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
      </div>
    </div>

    <destroy-modal></destroy-modal>
  </div>
</template>

<script>
import DestroyModal from "./modals/destroy.vue";


export default {
  components: {
    'destroy-modal': DestroyModal,
  },

  data: function() {
    return this.$store.state.ClientStore;
  },

  methods: {
    initApi: function(){
      this.$store.dispatch("ClientStore/initApi", this.client.id).then(
        (response) => {
          window.location.reload();
        }
      );
    },
    destroy: function() {
      if(CurrentUser.email == 'arthur@deepidoo.com') {
        $('#modalDestroy').modal();
      } else {
        alert("Seul Arthur peut utiliser cette fonctionnalité");
      }
    }
  }
};
</script>
