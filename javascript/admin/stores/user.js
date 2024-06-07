import { defineStore } from 'pinia'
import { urls, messages } from '../../const/const';

const usersConst = urls.users;
const usersConstPrefix = usersConst.prefix;

export const UserStore = defineStore('user', {
  state: () => {
    return {
      progress: '',
      errors: {},
      pagination: {},
      user: {},
      users: [],
      option_name: '',
      options: {
        "orders": "Commandes",
        "analytics": "Statistiques",
        "sso_admin": "SSO Admin",
        "bundles": "Upload bundles",
        "monitoring": "Accès monitoring",
        "editorial": "Manager Editorial",
        "old_front": "Ancien front-end",
        "new_front": "Nouveau front-end"
      }
    }
  },

  actions: {
    async index(path) {
      return this.Api.get(path).then(response => {
        this.users = response.data.users;
        this.pagination = response.data.pagination;
      })
    },
    async show(id) {
      return this.Api.get(`${usersConstPrefix}/${id}`).then(response => {
        this.user = response.data.user;
      })
    },
    // Not needed in this page, but left as an exemple
    async new() {
      this.errors = {};
      return this.Api.get(`${usersConstPrefix}/${usersConst.new}`).then(response => {
        this.user = response.data.user;
      })
    },
    // Not needed in this page, but left as an exemple
    async create() {
      this.errors = {};
      this.progress = messages.loading;
      return new Promise((resolve, reject) => {
        this.Api.post(`${usersConstPrefix}`, this.user).then(response => {
          this.errors = {};
          resolve(response.data.user);
        }).catch(error => {
          this.errors = error.response.data.errors;
          reject(false);
        }).finally(() => {
          this.progress = '';
        })
      })
    },
    async update(id) {
      this.errors = {};
      this.progress = messages.loading;
      return this.Api.put(`${usersConstPrefix}/${id}`, this.user).then(response => {
        this.progress = messages.success;
        this.errors = {};
      }).catch(error => {
        this.progress = messages.failure;
        this.errors = error.response.data.errors;
      })
    },
    async addOption(id) {
      return this.Api.post(`/${usersConst.userOptions}`, { name: this.option_name, user_id: id })
    },
    // No need in this page, but left as an exemple
    async destroy() {
      return this.Api.destroy(`${usersConstPrefix}/${this.user.id}`).then(response => {
        this.errors = {};
      }).catch(error => {
        this.errors = error.response.data.errors;
      })
    }
  }
})