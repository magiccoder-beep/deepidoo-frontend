import { defineStore } from 'pinia';
import { messages, urls } from '../../const/const';

const contactsConst = urls.contacts;
const contactsConstPrefix = contactsConst.prefix;

export const ContactStore = defineStore('contact', {
  state: () => {
    return {
      progress: '',
      errors: {},
      pagination: {},
      contact: {},
      contacttables: [],
      contacts: [],
      phone: {},
      client: '',
    }
  },

  actions: {
    async index(path) {
      return this.Api.get(path).then(response => {
        this.contacts = response.data.contacts;
        this.pagination = response.data.pagination;
      })
    },

    async new() {
      return this.Api.get(`/${contactsConstPrefix}/${contactsConst.new}`).then(response => {
        this.contact = response.data.contact;
      })
    },

    async initContact() {
      this.contact = {};
    },

    async initPhone(element) {
      console.log(element);
      this.phone = window.intlTelInput(element, {
        preferredCountries: ["fr", "us", "ca", "de"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      });
    },

    async autoComplete(args) {
      if (window.Global.timer != null) {
        clearTimeout(window.Global.timer);
      }
      if (args.keywords.length > 1) {
        window.Global.timer = window.setTimeout(() => {
          window.Global.timer = null;
          return this.Api.post(`/${contactsConst.autoComplete}`, {
            q: args.keywords,
            what: args.what,
            scope: args.scope,
            client_id: args.client_id
          }).then(response => {
            this.contacttables = response.data;
          })
        }, 200);
      } else {
        if (args.what == contactsConst.prefix) {
          this.contacts = [];
        } else {
          this.contacttables = [];
        }
      }
    },

    async create() {
      this.errors = {};
      this.progress = messages.loading;
      return new Promise((resolve, reject) => {
        return this.Api.post(`/${contactsConstPrefix}`, this.contact).then(response => {
          this.progress = messages.success;
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = messages.error;
          reject(false);
        }).finally(() => {
          this.progress = '';
        })
      });
    },

    async edit(id) {
      return this.Api.get(`/${contactsConstPrefix}/${id}`).then(response => {
        this.contact = response.data.contact;
        this.contacttables = response.data.contacttables;
      })
    },

    async update() {
      this.errors = {};
      this.progress = messages.loading;

      return new Promise((resolve, reject) => {
        return this.Api.put(`/${contactsConstPrefix}/${this.contact.id}`, this.contact).then(response => {
          this.progress = messages.success;
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = messages.error;
          reject(false);
        }).finally(() => {
          this.progress = '';
        })
      });
    },

    async destroy() {
      return this.Api.destroy(`/${contactsConstPrefix}/${this.contact.id}`).then(response => {
        this.errors = {};
        this.progress = messages.success;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = messages.error;
      })
    },

    async setContactables(data) {
      this.contacttables = data.results;
      return this;
    },

    async setContactables(data) {
      this.contact.contatable_id = data.id;
      this.contact.contatable_name = data.name;
      return this;
    },

    async setPhone() {
      this.contact.phone_country = this.phone.getSelectedCountryData()['iso2'];
      this.contact.phone = this.phone.getNumber();
    },

  }
});
