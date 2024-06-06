import { defineStore } from 'pinia';

export const ContactStore = defineStore('contact', {
  state: () => {
    return {
      progress: '',
      errors: {},
      pagination: {},
      contact: {},
      contacttables: [],
      contacts: [],
      phone: null,
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
      return this.Api.get(`/contacts/new`).then(response => {
        this.contact = response.data.contact;
      })
    },

    async initContact() {
      this.contact = {};
    },

    async autoComplete(args) {
      if (window.Global.timer != null) {
        clearTimeout(window.Global.timer);
      }

      if (args.keywords.length > 1) {
        window.Global.timer = window.setTimeout(() => {
          window.Global.timer = null;
          return this.Api.post(`/autocomplete`, {
            q: args.keywords,
            what: args.what,
            scope: args.scope,
            client_id: args.client_id
          }).then(response => {
            this.contacttables = response.data;
          })
        }, 200);
      } else {
        if (args.what == 'contacts') {
          this.contacts = [];
        } else {
          this.contacttables = [];
        }
      }
    },

    async create() {
      this.errors = {};
      this.progress = 'loading';
      return new Promise((resolve, reject) => {
        return this.Api.post(`/contacts`, this.contact).then(response => {
          this.progress = 'success';
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = 'error';
          reject(false);
        }).finally(() => {
          this.progress = '';
        })
      });
    },

    async edit(id) {
      return this.Api.get(`/contacts/${id}`).then(response => {
        this.contact = response.data.contact;
      })
    },

    async update() {
      this.errors = {};
      this.progress = 'loading';

      return new Promise((resolve, reject) => {
        return this.Api.put(`/contacts/${this.contact.id}`, this.contact).then(response => {
          this.progress = 'success';
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = 'error';
          reject(false);
        }).finally(() => {
          this.progress = '';
        })
      });
    },

    async destroy() {
      return this.Api.destroy(`/contacts/${this.contact.id}`).then(response => {
        this.errors = {};
        this.progress = 'success';
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = 'error';
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
