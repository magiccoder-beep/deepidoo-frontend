import { defineStore } from 'pinia'

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
      return this.Api.get(`/users/${id}`).then(response => {    
        this.user = response.data.user;        
      })  
    },
    // Not needed in this page, but left as an exemple
    async new() {
      this.errors = {};
      return this.Api.get(`/users/new`).then(response => {    
        this.user = response.data.user;        
      })  
    },
    // Not needed in this page, but left as an exemple
    async create() {
      this.errors = {};
      this.progress = 'loading';
      return new Promise((resolve, reject) => {
        this.Api.post(`/users`, this.user).then(response => {        
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
      this.progress = 'loading';
      return this.Api.put(`/users/${id}`, this.user).then(response => {  
        this.progress = 'success';      
        this.errors = {};
      }).catch(error => {
        this.progress = 'failure';
        this.errors = error.response.data.errors;
      })
    },
    async addOption(id) {
      return this.Api.post(`/user_options`, {name: this.option_name, user_id: id})
    },
    // No need in this page, but left as an exemple
    async destroy() {      
      return this.Api.destroy(`/users/${this.user.id}`).then(response => {  
        this.errors = {};      
      }).catch(error => {
        this.errors = error.response.data.errors;
      }) 
    }
  }
})