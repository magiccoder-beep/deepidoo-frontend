<template>
  <div class="grid responsive">
    <div class="s6 l6">
      <div class="field label border">
        <input type="text" v-model="store.contact.firstname" />
        <label>Prénom*</label>
        <SharedErrors attr="firstname" :messages="store.errors" />
      </div>
      <div class="field label border">
        <select v-model="store.contact.contactable_type" @change="resetContactable">
          <option value="Client">Client</option>
          <option value="Site">Site</option>
          <option value="">Autre</option>
        </select>
        <label>Rattaché à...</label>
        <SharedErrors attr="contactable_type" :messages="store.errors" />
      </div>
      <div class="field border">
        <input type="text" class="hidden" v-model="store.contact.contactable_id" />
      </div>

      <div class="field border">
        <input type="text" v-model="store.contact.contactable_name" @keyup="autoCompleteContactable" />
        <ul class="breadcrumb" v-click-outside="clearContactables">
          <li v-for="contactable in store.contactables" :key="store.contactable.id"><a href="#"
              @click.prevent="pickContactable(contactable)">{{ contactable.name }}</a></li>
        </ul>
      </div>

    </div>

    <div class="s6 l6">
      <div class="field label border">
        <input type="text" v-model="store.contact.lastname" />
        <label>Nom</label>
        <SharedErrors attr="lastname" :messages="store.errors" />
      </div>
      <div class="field label border">
        <input type="text" v-model="store.contact.email" />
        <label>Email</label>
        <SharedErrors attr="email" :messages="store.errors" />
      </div>
      <div class="field label border">
        <input type="text" v-model="store.contact.phone" ref="phone" @blur="setPhone" />
        <label>Téléphone</label>
        <SharedErrors attr="phone" :messages="store.errors" />
      </div>
      <div class="field label border">
        <textarea v-model="store.contact.notes"></textarea>
        <label>Notes</label>
        <SharedErrors attr="notes" :messages="store.errors" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SharedErrors from '@/javascript/admin/views/shared/_errors.vue';
import { ContactStore } from '../../stores/contact';

const store = ContactStore();

const setPhone = function () {
  store.setPhone();
};

const autoCompleteContactable = function () {
  store.autoComplete({ keywords: args.contact.contactable_name, what: "store.contactables", scope: args.contact.contactable_type, client_id: args.client });
};

const clearContactables = function () {
  store.setContactable({ results: [] });
};
const pickContactable = function (contactables) {
  store.setContactable(contactables);
};
const resetContactable = function () {
  store.setContactable({ id: null, name: '' });
};

</script>
