import helpers from "../../helpers";

const PlaylistStore = {
  namespaced: true,
  state: {
    tracks_pagination: {},
    tracks_mode: {edited_by: '', edited_at: '', name: ''},
    organisations: [],
    organisation: {},
    target_name: '',
    timepoint: {},
    contents: [],
    errors: {},
    progress: "",
    playlists: [],
    playlist: { name: "", tags: [] },
    pagination: {},
    organisations_name: [],
  },
  mutations: {
    many(state, data) {
      state.playlists = data.playlists;
      state.pagination = data.pagination;

      return state;
    },
    one(state, data) {
      state.playlist = data.playlist;

      return state;
    },
    history(state, data) {
      state.playlist = data.playlist;
      state.pagination = data.pagination;

      return state;
    },
    tracks(state, data) {
      state.contents = data.contents;
      state.tracks_pagination = data.pagination;
      state.tracks_mode = data.mode;
      state.playlist = data.playlist;
    },
    organisations(state, data) {
      state.organisations = data.organisations;
    },
    setTarget(state, organisation) {
      state.organisation = organisation;
      state.target_name = organisation.name;
    },
    setTimepoint(state, form) {
      state.timepoint = form.timepoint;
      state.mode = form.mode;
      if (form.page == 1) {
        state.contents = [];
      }
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
    setOrganisations(state, data){
      state.organisations_name = data.organisations_name;
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
    show(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    },
    history(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("history", data);
        },
      });
    },
    update(context, id) {
      context.commit("loading");
      $.ajax({
        url: `/playlists/${id}`,
        type: "put",
        data: {
          playlist: context.state.playlist,
        },
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
    destroy(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/playlists/${id}`,
          type: "delete",
          success: function() {
            resolve(true);
          },
          error: function() {
            reject(false);
          },
        });
      });
    },
    duplicate(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/playlists/${id}/duplicate`,
          type: "put",
          data: {
            organisation_id: context.state.organisation.id
          },
          success: function(data) {
            resolve(data.playlist);
          },
          error: function(data) {
            reject(false);
          },
        });
      })
    },
    snapshot(context, full_path) {
      $.ajax({
        url: full_path,
        type: "get",
        success: function(data) {
          context.commit("tracks", data);
        },
      });
    },
    showOrganisation(context, value){
      $.ajax({
        url: '/playlists/show_organisation',
        type: "get",
        data: {
          id: value
        },
        success: function(data) {
          context.commit("setOrganisations", data);
        },
      });
    },
    autocomplete(context, value) {
      if(value.length > 2) {
        $.ajax({
          url: '/autocomplete',
          type: "post",
          data: {
            what: 'client_orgs',
            q: value
          },
          success: function(data) {
            context.commit("organisations", data);
          },
        });
      }
    }
  },
};

export default PlaylistStore;
