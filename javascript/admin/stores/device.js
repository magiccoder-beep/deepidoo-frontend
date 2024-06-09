import { defineStore } from 'pinia';
import * as GLOBAL_CONSTS from '../../const/global';
import * as DEVICE_CONSTS from '../../const/device';

export const DeviceStore = defineStore('device', {
  state: () => {
    return {
      progress: '',
      devices: [],
      device: {},
      errors: {},
      pagination: {},
      newDevices: [],
      events: [],
      scanner: {},
      scanEvents: 0,
      camera_intervals: [],
      local_stream: null,
      player_versions: [],
      selected_device_id: null,
    }
  },

  actions: {
    pushNewOneData(response) {
      this.device = response.data.device;
      this.events = response.data.events;
      this.newDevices = response.data.newDevices;
    },
    async index(fullPath) {
      this.errors = {};
      return this.Api.get(fullPath).then(response => {
        this.devices = response.data.devices;
        this.player_versions = response.data.player_versions;
        this.pagination = response.data.pagination;
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },
    async new() {
      this.errors = {};
      return this.Api.get(`/${DEVICE_CONSTS.URLS.PREFIX}/${DEVICE_CONSTS.URLS.NEW}`).then(response => {
        this.pushNewOneData(response);
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },
    async scannerStop() {
      this.local_stream.getTracks()[0].stop();
      this.camera_intervals.map((interval) => {
        clearInterval(interval);
      });
    },
    async create() {
      this.errors = {};
      return this.Api.post(`/${DEVICE_CONSTS.URLS.PREFIX}`, { device: this.device }).then(response => {
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
        this.newDevices.push(this.device);
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },
    async edit() {
      this.errors = {};
      return this.Api.get(`/${DEVICE_CONSTS.URLS.PREFIX}/${this.device.id}/${DEVICE_CONSTS.URLS.EDIT}`).then(response => {
        this.pushNewOneData(response);
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },
    async updateStatus() {
      this.errors = {};
      return this.Api.put(`/${DEVICE_CONSTS.URLS.PREFIX}/${this.device.id}`, { device: this.device.device_id, do: this.device.do }).then(response => {
        this.pushNewOneData(response)
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      });
    },
    async update() {
      this.errors = {};
      return this.Api.put(`/${DEVICE_CONSTS.URLS.PREFIX}/${this.device.id}`, { device: this.device }).then(response => {
        this.pushNewOneData(response);
        this.progress = GLOBAL_CONSTS.MESSAGES.SUCCESS;
      }).catch(error => {
        this.errors = error.response.data.errors;
        this.progress = GLOBAL_CONSTS.MESSAGES.ERROR;
      })
    },
  },
});