import { defineStore } from 'pinia';
import { messages, urls } from '../../const/const';

const clientsConst = urls.clients;
const clientsConstPrefix = clientsConst.prefix;

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
        this.Api.post(`/${clientsConstPrefix}/${id}/${clientsConst.initApi}`, { id: contextId }).then(response => {
          this.progress = messages.success;
          resolve(response);
        }).catch(error => {
          this.progress = messages.error;
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
      return this.Api.get(`/${clientsConstPrefix}/${clientsConst.new}`).then(response => {
        this.client = response.data.client;
        this.fallbacks = response.data.fallbacks;
        this.brands = response.data.brands;
        this.organisations = response.data.organisations;
      });
    },

    async create() {
      return new Promise((resolve, reject) => {
        this.Api.post(`/${clientsConstPrefix}`, { client: this.client }).then(response => {
          this.progress = messages.success;
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = messages.error;
          reject(false);
        });
      });
    },

    async edit(id) {
      return this.Api.get(`/${clientsConstPrefix}/${id}`).then(response => {
        this.client = response.data.client;
        this.fallbacks = response.data.fallbacks;
        this.brands = response.data.brands;
        this.organisations = response.data.organisations;
      });
    },

    async update() {
      this.errors = {};
      this.progress = messages.loading;

      return new Promise((resolve, reject) => {
        this.Api.put(`/${clientsConstPrefix}/${this.client.id}`, { client: this.client }).then(response => {
          this.progress = messages.success;
          this.errors = {};
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = messages.error;
          reject(false);
        });
      });
    },

    async destroy(confirm_name) {
      return new Promise((resolve, reject) => {
        this.Api.destroy(`/${clientsConstPrefix}/${this.client.id}`, { confirmation: confirm_name }).then(response => {
          this.errors = {};
          this.progress = messages.success;
          resolve(response);
        }).catch(error => {
          this.errors = error.response.data.errors;
          this.progress = messages.error;
          reject(false);
        });
      });
    },
  }
});