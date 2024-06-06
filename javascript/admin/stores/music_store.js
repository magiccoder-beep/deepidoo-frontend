import helpers from "../../helpers";

const MusicStore = {
  namespaced: true,
  state: {
    contents: [],
    errors: {},
    progress: "",
    pagination: {},
  },
  mutations: {
    many(state, data) {
      state.contents = data.contents;
      state.pagination = data.pagination;

      return state;
    },
    one(state, data) {
      state.playlist = data.playlist;

      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
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
      if (klass == "success") {
        state.errors = {};
      }
      return state;
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
    update(context, id) {
      context.commit("loading");
      $.ajax({
        url: `/music/${id}`,
        type: "put",
        success: function(data) {
          context.commit("one", data);
          context.commit("loaded", "success");
        },
        error: function(data) {
          context.commit("errors", data);
          context.commit("loaded", "failed");
        },
      });
    },
    updateAll(context, is_checked) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/music/all`,
          type: "put",
          data: {
            checked: is_checked,
            ids: context.state.contents.map((content) => content.id)
          },
          success: function(data) {
            resolve(true);
          },
          error: function(data) {
            reject(false);
          },
        });
      })
    }
  }
};

export default MusicStore;
