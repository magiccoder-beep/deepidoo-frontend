<template>
  <div class="grid responsive">
    <div class="s12 l6">
      <div class="field label border">
        <input type="text" v-model="store.contact.firstname" />
        <label>{{ interfaceStrings.firstName }}*</label>
        <SharedErrors attr="firstname" :messages="store.errors" />
      </div>
      <div class="field label border">
        <input type="text" v-model="store.contact.lastname" />
        <label>{{ $t('name') }}</label>
        <SharedErrors attr="lastname" :messages="store.errors" />
      </div>
      <div class="grid field">
        
        <div class="s4">
          <div class="field label border">
            <select v-model="store.contact.contactable_type" @change="resetContactable">
              <option value="Client">{{ interfaceStrings.client }}</option>
              <option value="Site">{{ interfaceStrings.site }}</option>
              <option value="">Autre</option>
            </select>
            <label>{{ interfaceStrings.attachedTo }}</label>
            <SharedErrors attr="contactable_type" :messages="store.errors" />
          </div>
        </div>
        <div class="s8">
          <div class="field border">
            <input type="text" v-model="store.contact.contactable_name" @keyup="autoCompleteContactable" />
            <ul class="breadcrumb" v-click-outside="clearContactables">
              <li v-for="contactable in store.contactables" :key="store.contactable.id"><a href="#"
                  @click.prevent="pickContactable(contactable)">{{ contactable.name }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="field border hidden">
          <input type="text" class="hidden" v-model="store.contact.contactable_id" />
        </div>
    </div>

    <div class="s12 l6">
      <div class="field label border">
        <input type="text" v-model="store.contact.email" />
        <label>{{ $t('Email') }}</label>
        <SharedErrors attr="email" :messages="store.errors" />
      </div>
      <div class="field position-re">
        <span class="phone_number">Phone Number</span>
        <input type="text" class="form-control" v-model="store.contact.phone" ref="phoneElement" @blur="setPhone" />
      </div>
      <div class="field textarea label border">
        <textarea v-model="store.contact.notes"></textarea>
        <label>{{ $t('notes') }}</label>
        <SharedErrors attr="notes" :messages="store.errors" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SharedErrors from '@/javascript/admin/views/shared/_errors.vue';
import { ContactStore } from '../../stores/contact';
import { messages } from '../../../const/const';

const store = ContactStore();
const interfaceStrings = messages.interfaceStrings;

const setPhone = function () {
  store.setPhone();
};
const autoCompleteContactable = function () {
  store.autoComplete({ keywords: store.contact.contactable_name, what: "contactables", scope: store.contact.contactable_type, client_id: store.contactable_id });
};
const clearContactables = function () {
  store.setContactables({ results: [] });
};
const pickContactable = function (contactables) {
  store.setContactables(contactables);
};
const resetContactable = function () {
  store.setContactables({ id: null, name: '' });
};

const initPhone = function (element) {
  store.initPhone(element);
};

const phoneElement = ref(null);

onMounted(() => {
  initPhone(phoneElement.value);
})

</script>
