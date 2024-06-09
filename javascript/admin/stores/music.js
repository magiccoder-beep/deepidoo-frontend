import { defineStore } from 'pinia';
import * as GLOBAL_CONSTS from '../../const/global';
import * as MUSIC_CONSTS from '../../const/music';

export const MusicStore = defineStore('music', {
  state: () => {
    return {
      contents: [],
      errors: {},
      progress: "",
      pagination: {},
      is_checked: false,
    }
  },

  actions: {
    async index(fullPath) {
      this.errors = {};
      this.progress = GLOBAL_CONSTS.MESSAGES.LOADING;
      return this.Api.get(fullPath).then(response => {
        this.contents = response.data.contents;
        this.pagination = response.data.pagination;
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },

    async update(id) {
      this.errors = {};
      this.progress = GLOBAL_CONSTS.MESSAGES.LOADING;
      return this.Api.put(`/${MUSIC_CONSTS.URLS.PREFIX}/${id}`).then(response => {
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },

    async updateAll(is_checked) {
      this.errors = {};
      this.progress = GLOBAL_CONSTS.MESSAGES.LOADING;
      let formData = {
        checked: is_checked,
        ids: [],
      };
      for (let index = 0; index < this.contents.length; index++) {
        formData.ids.push(this.contents[index].id);
      }
      return this.Api.put(`/${MUSIC_CONSTS.URLS.PREFIX}/${MUSIC_CONSTS.URLS.ALL}`, formData).then(response => {
        for (let index = 0; index < this.contents.length; index++) {
          this.contents[index].validated = is_checked;
        }
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    }
  },
});