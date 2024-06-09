<template>

  <div class="grid responsive max">
    <div class="s12 l6">
      <div class="field label border">
        <SharedErrors attr="name" :messages="store.errors" />
        <input type="text" v-if="store.client" v-model="store.client.name" />
        <label>
          {{ $t('name') }}
        </label>
        <input type="text" v-if="!store.client" />
      </div>
      <div class="field label border">
        <select v-if="store.client.id == null" v-model="store.client.organisation_id">
          <option v-for="organisation in store.organisations" :key="organisation.id" :value="organisation.id">
            {{ organisation.name }}
          </option>
        </select>
        <input v-else type="text" v-model="store.client.parent_organisation_name" disabled="true" />
        <label>
          {{ interfaceStrings.parentOrganization }}
        </label>
      </div>
      <div class="field label border position-re" v-if="store.client.id != null">
        <input type="text" v-model="store.client.api_uid" disabled="true" />
        <label>
          {{ interfaceStrings.apiUid }}
        </label>
        <a @click="initApi" class="generate_api_key">
          <u> {{ interfaceStrings.generate }} </u>
        </a>
      </div>
    </div>
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="store.client.fallback_id">
          <option v-for="fallback in store.fallbacks" :key="fallback.id" :value="fallback.id">{{ fallback.name }}
          </option>
        </select>
        <label>
          {{ interfaceStrings.fallbackAudio }}
        </label>
      </div>
      <div class="field label border">
        <select v-model="store.client.brand_id">
          <option v-for="brand in store.brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>
        <label>
          {{ interfaceStrings.marque }}
        </label>
      </div>
      <div class="field border" v-if="store.client.id == null">
        <label class="checkbox">
          <input type="checkbox" v-model="store.client.import_templates" value="true" />
          <span> 
            <b>{{ interfaceStrings.importTemplateDesigns }}</b>
          </span>
        </label>
        <span class="helper">
          {{ interfaceStrings.importTeDeDescription }}
        </span>
      </div>
      <div class="field label border" v-if="store.client.id != null">
        <input type="text" v-model="store.client.api_secret" disabled="true" />
        <label>
          {{ interfaceStrings.apiSecret }}
        </label>
      </div>

      <div class="field label border" v-if="store.client.id != null">
        <select v-model="store.client.sso_provider">
          <option value="">
            {{ interfaceStrings.noSso }}
          </option>
          <option value="okta">
            {{ interfaceStrings.okta }}
          </option>
          <option value="ldap">
            {{ interfaceStrings.ldap }}
          </option>
        </select>
        <label>
          {{ interfaceStrings.ssoProvider }}
        </label>
      </div>
    </div>
  </div>

</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import { ClientStore } from "../../stores/client";
import { messages } from "../../../const/const";

const interfaceStrings = messages.interfaceStrings;
const store = ClientStore();

const initApi = function () {
  store.initApi(store.client.id).then(resolve => {
    alert(messages.clients.initApi.success);
    window.location.reload();
  }).catch(reject => {
    alert(messages.errorOccured);
  });
};

</script>
