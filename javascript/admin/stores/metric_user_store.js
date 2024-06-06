import helpers from "../../helpers";

const MetricUserStore = {
  namespaced: true,
  state: {
    progress: "",
    interactions: [],
    page: 1,
    errors: {},
  },
  mutations: {
    one(state, data) {
      state.user = data.user;

      return state;
    },
    many(state, data) {
      state.interactions = data.interactions;
      state.page = data.page;

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
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("many", data);
        },
      });
    }
  }
};

export default MetricUserStore;
