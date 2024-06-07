<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="store.user.kind" class='form-control'>
          <option value="User::Basic">{{ interfaceStrings.user }}</option>
          <option value="User::Admin">{{ interfaceStrings.admin }}</option>
        </select>
        <label for="">{{ interfaceStrings.type }}</label>
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
          <option v-for="locale in store.user.available_locales" :key="locale.name" :value="locale.name">{{ locale.name
            }}</option>
        </select>
        <label>{{ interfaceStrings.language }}</label>
      </div>
      <div class="field label border">
        <input type="text" v-model="store.user.email" disabled>
        <label>{{ interfaceStrings.email }}</label>
      </div>
    </div>
    <div class="s12 l6">
      <div class="field label border">
        <select v-model="store.user.brand_id">
          <option value="">{{ interfaceStrings.noResell }}</option>
          <option v-for="brand in store.user.available_brands" :key="brand.id" :value="brand.id">{{ brand.name }}
          </option>
        </select>
        <label for="">{{ interfaceStrings.reSeller }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field label border">
        <select v-model="store.user.manufacturer_id">
          <option value="">{{ interfaceStrings.nonAssembler }}</option>
          <option v-for="manufacturer in store.user.available_manufacturers" :key="manufacturer.id"
            :value="manufacturer.id">{{ manufacturer.name }}</option>
        </select>
        <label for="disk_space">{{ interfaceStrings.assembleFor }}</label>
        <i>arrow_drop_down</i>
      </div>
      <div class="field middle-align">
        <label class="switch">
          <input type="checkbox" v-model="store.user.hq_videos" />
          <span></span>
        </label>
        <span>{{ interfaceStrings.uploadVideoHd }}</span>
      </div>
      <div class="field label border">
        <input type="text" class="form-control" v-model="store.user.api_token" disabled="true" />
        <label for="disk_space">Token API courant</label>
      </div>
      <div class="field label border">
        <input type="text" v-model="store.user.organisation_name" disabled>
        <label>{{ interfaceStrings.organization }}</label>
      </div>
      <article class="transparent no-border">
        <b>{{ interfaceStrings.option }}</b>
        <ul class="list">
          <li v-for="option in store.user.options" :key="option.id">{{ option.name }}<a href="#" class="cross"
              style="float: right; margin-right: 10px;" @click.prevent="destroyOption(option)"></a></li>
        </ul>
      </article>
      <div class="field">
        <a href="#" class="button small-round border" data-ui="#modal-options">{{ interfaceStrings.addOption }}</a>
      </div>
    </div>
    <ModalsOptions></ModalsOptions>
  </div>
</template>

<script setup>
import SharedErrors from "@/javascript/admin/views/shared/_errors.vue";
import ModalsOptions from "./modals/options.vue"
import { UserStore } from "../../stores/user.js";
import { messages } from "../../../const/const.js";

const interfaceStrings = messages.interfaceStrings;
const store = UserStore();

</script>
