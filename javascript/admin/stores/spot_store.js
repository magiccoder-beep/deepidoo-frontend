import helpers from "../../helpers";

const SpotStore = {
  namespaced: true,
  state: {
    ipInfo: false,
    progress: "",
    spots: [],
    spot: {
      order: {},
      site: {},
      device: {},
      behavior: "signage"
    },
    errors: {},
    pagination: {},
    logs: "",
    storage_kind: false,
    storage_value_percent: 0,
    storage_value_go: 0,
    screenshot: "",
    history: [],
    available_versions: [],
    current_user: {id: 0},
    cache_btn: true,
    input_spot_id: ""
  },
  mutations: {
    loading(state) {
      state.progress = "loading disabled";

      return state;
    },
    loaded(state, klass) {
      state.progress = `loaded ${klass}`;
      setTimeout(function () {
        state.progress = "";
      }, 1000);
      return state;
    },
    one(state, data) {
      if(data.pagination) {
        state.pagination = data.pagination;
      }
      state.spot = data.spot;
      if(data.spot.max_storage_size){
        state.storage_kind = "go";
        state.storage_value_go = data.spot.max_storage_size;
      }
      if(data.spot.max_storage_percent){
        state.storage_kind = "percent";
        state.storage_value_percent = data.spot.max_storage_percent; 
      }
      state.current_user = window.CurrentUser;
      return state;
    },
    history(state, data) {
      state.spot = data.spot;
      state.history = data.history;
      
      return state;
    },
    addNetworkData(state, data) {
      state.spot = Object.assign({}, state.spot, { network_json: data });
      return state;
    },
    setNtp(state, value) {
      state.spot.ntp_server = value;
    },
    removeNetworkData(state) {
      let new_obj = {};
      Object.keys(state.spot).forEach((key) => {
        if (key != "network_json") {
          new_obj[key] = state.spot[key];
        }
      });

      state.spot = new_obj;
      return state;
    },
    addStorage(state){
      if(state.storage_kind=="go"){
        state.spot = Object.assign({}, state.spot, { max_storage_size: state.storage_value_go });
        state.spot.max_storage_percent = undefined;
      }
      else if(state.storage_kind=="percent"){
        state.spot = Object.assign({}, state.spot, { max_storage_percent: state.storage_value_percent });
        state.spot.max_storage_size = undefined;
      }
      else{
        state.spot.max_storage_percent = undefined;
        state.spot.max_storage_size = undefined; 
      }
      return state;
    },
    setHideButton(state){
      state.cache_btn = false;
      return state;
    },
    addGeometryData(state) {
      state.spot = Object.assign({}, state.spot, { geometry_json: {} });
      return state;
    },
    removeGeometryData(state) {
      let new_obj = {};
      Object.keys(state.spot).forEach((key) => {
        if (key != "geometry_json") {
          new_obj[key] = state.spot[key];
        }
      });

      state.spot = new_obj;
      return state;
    },
    setStatus(state, status) {
      state.spot.status = status;
      return state;
    },
    many(state, data) {
      state.spots = data.spots;
      state.pagination = data.pagination;
      state.available_versions = data.available_versions;

      return state;
    },
    resetLogs(state) {
      state.logs = "";
    },
    showLogs(state, log) {
      state.logs = `${log}\n${state.logs}`;
    },
    showScreenshot(state, screenshot) {
      state.screenshot = "data:image/jpg;base64, " + screenshot;
    },
    setSiteId(state, value) {
      state.spot.site_id = value;
    },
    setDeviceId(state) {
      state.spot.devices.map(device => {
        if(device.id == state.spot.device_id) {
          state.spot.device.serial = device.serial
          state.spot.device.shape_name = device.shape_name
        }
      })
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
  },
  actions: {
    index(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function (data) {
          context.commit("many", data);
        },
      });
    },
    destroy(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/spots/${id}`,
          type: 'delete',
          data: {
            device_id: context.state.spot.device.id
          },
          success: function(data) {
            resolve(true);
          },
          error: function(data) {
            context.commit('errors', data);
            reject(data);
          }
        })
      })
    },
    new(context, id) {
      $.ajax({
        url: `/spots/new`,
        type: "get",
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    create(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/spots`,
          type: "post",
          data: {
            spot: context.state.spot
          },
          success: function (data) {
            context.commit("one", data);
            context.commit("loaded", "success");
            resolve(data);
          },
          error: function (data) {
            context.commit("errors", data);
            context.commit("loaded", "failed");
            reject(data);
          },
        });
      })
    },
    show(context, id) {
      $.ajax({
        url: `/spots/${id}`,
        type: "get",
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    history(context, id) {
      $.ajax({
        url: `/spots/${id}/history`,
        type: "get",
        success: function (data) {
          context.commit("history", data);
        },
      });
    },
    edit(context, id) {
      $.ajax({
        url: `/spots/${id}/edit`,
        type: "get",
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    update(context, form) {
      context.commit("loading");
      $.ajax({
        url: `/spots/${form.id}`,
        type: "put",
        data: {
          spot: form,
        },
        success: function (data) {
          context.commit("one", data);
          context.commit("loaded", "success");
        },
        error: function (data) {
          context.commit("errors", data);
          context.commit("loaded", "failed");
        },
      });
    },
    delete(context, form) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/spots/${form.id}`,
          type: "delete",
          data: {
            spot: form,
          },
          success: function (data) {
            resolve(true);
          },
          error: function (data) {
            reject(false);
          },
        });
      });
    },
    syncs(context, spot_id) {
      $.ajax({
        url: `/spots/${spot_id}/syncs`,
        type: "get",
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    logs(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    stopSync(context, spot_id) {
      $.ajax({
        url: `/spots/${spot_id}/syncs`,
        type: "delete",
        success: function (data) {
          context.commit("one", data);
        },
        error: function (data) {
          context.commit("errors", data);
        },
      });
    },
    playerDo(context, args) {
      $.ajax({
        url: `/spots/${args.spot.id}/player`,
        type: "post",
        data: {
          args: args,
        },
        success: function(data) {
          return false;
        },
      });
    },
    manage(context, params) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/spots/batch/manage`,
          type: "post",
          data: params,
          success: function (data) {
            resolve(true)
          },
          error: function() {
            reject(false)
          }
        });
      })
    },
    updateStatus(context, spot) {
      if (context.state.spot.id == spot.id) {
        context.commit("setStatus", spot.status);
      }
    },
    fetchHistory(context, params) {
      $.ajax({
        url: `/spots/${params.spot_id}/history`,
        type: "post",
        data: {
          page: params.page,
          remote: params.remote,
        },
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    forceSync(context, id) {
      $.ajax({
        url: `/spots/${id}/sync`,
        type: "post",
        success: function (data) {
          alert("Catalogue en cours de génération...");
        },
      });
    },
    showHistory(context, params) {
      if (context.state.spot.id != params.spot_id) {
        return true;
      }
      $.ajax({
        url: `/spots/${params.spot_id}/history`,
        type: "post",
        data: {
          page: params.page,
        },
        success: function (data) {
          context.commit("one", data);
        },
      });
    },
    addNetworkData(context, value) {
      if (value) {
        context.commit("addNetworkData", {});
      } else {
        context.commit("removeNetworkData");
      }
    },
    addGeometryData(context, value) {
      if (value) {
        context.commit("addGeometryData");
      } else {
        context.commit("removeGeometryData");
      }
    },
    generateCache(context, spot_id) {
      $.ajax({
        url: `/spots/${spot_id}/cache`,
        type: "post",
        success: function (data) {
          context.commit("setHideButton")
        },
      }); 
    },
    setPairingCode(context, spot_id){
      $.ajax({
        url: `/spots/${spot_id}/set_pairing_code`,
        type: "post",
        success: function (data) {
          window.location.reload();
        },
      }); 
    }
  },
};

export default SpotStore;
