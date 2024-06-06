import { defineStore } from 'pinia';

export const ClientStore = defineStore('client', {
  state: () => {
    return {
      progress: '',
      confirm_name: '',
      errors: {},
      pagination: {},
      client: {},
      clients: [],
      fallbacks: [],
      organisations: [],
      brands: [],
    }
  },

  actions: {
    async initApi(id) {
      const contextId = this.client.id;
      return new Promise((resolve, reject) => {
        this.Api.post(`/clients/${id}/init_api`, { id: contextId }).then(response => {
          this.progress = 'success';
          resolve(response);
        }).catch(error => {
          this.progress = 'error';
          reject(false);
        });
      });
    },

    async index(fullPath) {
      return this.Api.get(fullPath).then(response => {
        this.clients = response.data.clients;
        this.pagination = response.data.pagination;
      });
    },

    async new() {
      return this.Api.get(`/clients/new`).then(response => {
        console.log("client new response", response.data);
        this.client = response.data.client;
        this.fallbacks = response.data.fallbacks;
        this.brands = response.data.brands;
        this.organisations = response.data.organisations;
        console.log("New", response.data);
      });
    },

    async create() {
      return new Promise((resolve, reject) => {
        this.Api.post(`/clients`, { client: this.client }).then(response => {
          this.progress = 'success';
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = 'error';
          reject(false);
        });
      });
    },

    async edit(id) {
      return this.Api.get(`/clients/${id}`).then(response => {
        this.client = response.data.client;
        this.fallbacks = response.data.fallbacks;
        this.brands = response.data.brands;
        this.organisations = response.data.organisations;
      });
    },

    async update() {
      this.errors = {};
      this.progress = 'loading';

      return new Promise((resolve, reject) => {
        this.Api.put(`/clients/${this.client.id}`, { client: this.client }).then(response => {
          this.progress = 'success';
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = 'error';
          reject(false);
        });
      });
    },

    async destroy(confirm_name) {
      return new Promise((resolve, reject) => {
        this.Api.destroy(`/clients/${this.client.id}`, { confirmation: confirm_name }).then(response => {
          this.errors = {};
          this.progress = 'success';
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = 'error';
          reject(false);
        });
      });
    },
  }
});