import helpers from "../../helpers";

const AddonStore = {
  namespaced: true,
  state: {
    progress: "",
    addons: [],
    addon: {},
    pagination: {},
    errors: {},
  },
  mutations: {
    one(state, data) {
      state.addon = data.addon;
      return state;
    },
    many(state, data) {
      state.addons = data.addons;
      state.pagination = data.pagination;

      return state;
    },
    loading(state) {
      state.progress = "loading disabled";

      return state;
    },
    loaded(state, klass) {
      state.progress = `loaded ${klass}`;
      setTimeout(function() {
        state.progress = "";
      }, 1000);
      if(klass === 'success') {
        state.errors = {}
      }

      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    setPrice(state) {
      state.addon = {
        name: state.addon.name,
        ref: state.addon.ref,
        price: state.addon.price * 100
      }
    }
  },
  actions: {
    index(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("many", data);
        },
      });
    },
    create(context, form) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/addons`,
          type: 'post',
          data: {
            addon: form
          },
          success: function(data) {
            context.commit('loaded', 'success');
            resolve(data);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
          }
        })
      })
    },
    edit(context, id) {
      $.ajax({
        url: `/addons/${id}/edit`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    update(context, id) {
      return new Promise((resolve, reject) => {
        context.commit('loading');
        $.ajax({
          url: `/addons/${id}`,
          type: 'put',
          data: {
            addon: context.state.addon
          },
          success: function(data) {
            context.commit('one', data);
            context.commit('loaded', 'success');
            resolve(true);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
            reject(false);
          }
        })
      })
    },
    destroy(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/addons/${id}`,
          type: "delete",
          success: function() {
            resolve(true);
          },
          error: function() {
            reject(false);
          },
        });
      })
    }
  }
};

export default AddonStore;
