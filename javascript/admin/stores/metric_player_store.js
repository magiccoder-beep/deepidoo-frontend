import helpers from "../../helpers";

const MetricPlayerStore = {
  namespaced: true,
  state: {
    progress: "",
    interaction: {},
    interactions: [],
    pagination: {},
    errors: {},
  },
  mutations: {
    one(state, data) {
      state.interaction = data.interaction;

      return state;
    },
    many(state, data) {
      state.interactions = data.interactions;
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
    show(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    }
  }
};

export default MetricPlayerStore;
