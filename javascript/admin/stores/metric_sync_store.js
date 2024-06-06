import helpers from "../../helpers";

const MetricPlayerStore = {
  namespaced: true,
  state: {
    progress: "",
    sync: {spots: []},
    syncs: [],
    errors: {},
  },
  mutations: {
    one(state, data) {
      state.sync = data.sync;

      return state;
    },
    many(state, data) {
      state.syncs = data.syncs;

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
  },
  actions: {
    index(context, full_path) {
      return new Promise((resolve) => {
        $.ajax({
          url: full_path,
          type: "get",
          success: function(data) {
            context.commit("many", data);
            resolve(true);
          },
        });
      })
    },
    show(context, offset) {
      $.ajax({
        url: `/metrics/syncs/${offset}`,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    }
  }
};

export default MetricPlayerStore;
