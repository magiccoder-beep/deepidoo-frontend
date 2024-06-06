<template>

  <div class="grid responsive">
    <div class="s6 l6">
      <div class="field label border">
        <SharedErrors attr="name" :messages="store.errors" />
        <input type="text" v-if="store.client" v-model="store.client.name" />
        <label>Nom*</label>
        <input type="text" v-if="!store.client" />
      </div>
      <div class="field label border">
        <select v-if="store.client.id == null" v-model="store.client.organisation_id">
          <option v-for="organisation in store.organisations" :key="organisation.id" :value="organisation.id">{{
            organisation.name }}</option>
        </select>
        <input v-else type="text" v-model="store.client.parent_organisation_name" disabled="true" />
        <label>Organisation parente</label>
      </div>
      <div class="field label border" v-if="store.client.id != null">
        <input type="text" v-model="store.client.api_uid" disabled="true" />
        <label>API UID</label>
        <a @click="initApi">Générer</a>
      </div>
      <div class="field label border" v-if="store.client.id != null">
        <select v-model="store.client.sso_provider">
          <option value="">Pas de SSO</option>
          <option value="okta">Okta</option>
          <option value="ldap">LDAP</option>
        </select>
        <label>SSO Provider (Single Sign-On)</label>
      </div>
    </div>
    <div class="s6 l6">
      <div class="field label border">
        <select v-model="store.client.fallback_id">
          <option v-for="fallback in store.fallbacks" :key="fallback.id" :value="fallback.id">{{ fallback.name }}
          </option>
        </select>
        <label>Fallback audio</label>
      </div>
      <div class="field label border">
        <select v-model="store.client.brand_id">
          <option v-for="brand in store.brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>
        <label>Marque</label>
      </div>
      <div class="field label border" v-if="store.client.id == null">
        <input type="checkbox" v-model="store.client.import_templates" value="true" />
        <label><b>Importer les modèles de template</b></label>
        <span>En cochant cette case tous les templates de l'organisation DEEPIDOO SIEGE [Bureaux] taggés "Modèle de
          templates" seront copiés dans la nouvelle organisation</span>
      </div>
      <div class="field label border" v-if="store.client.id != null">
        <input type="text" v-model="store.client.api_secret" disabled="true" />
        <label>API Secret</label>
      </div>
    </div>
  </div>

</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import router from "../../routes";
import { ClientStore } from "../../stores/client";

const store = ClientStore();

const initApi = function () {
  store.initApi(store.client.id).then(resolve => {
    alert("API UID généré");
    router.push("/clients/" + store.client.id);
  }).catch(reject => {
    alert("An error has occured");
  });
};

</script>
