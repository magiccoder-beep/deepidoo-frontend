import helpers from "../../helpers";

const ContentStore = {
  namespaced: true,
  state: {
    content: {},
    contents: [],
    errors: {},
    progress: "",
    content: { name: "" },
    track: { released_on: 1960, param_1: 1, param_2: 1 },
    tags: [],
    organisations: [{ name: "", id: null, tags: [], klass: "" }],
    creators: [],
    artist_id: null,
    pagination: {},
  },
  mutations: {
    many(state, data) {
      state.creators = data.creators;
      state.contents = data.contents;
      state.pagination = data.pagination;

      return state;
    },
    one(state, data) {
      state.content = data.content;
      state.track = data.content.track;
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
      if (klass === "success") {
        state.errors = {};
      }

      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    displayTags(state, data) {
      state.content = data.content;
      state.tags = data.tags;
      state.track = data.content.track;

      return state;
    },
    resetTags(state, content_id) {
      state.selected_ids = [];
      state.content_id = content_id;
      state.root_tags = [];
      state.organisations = [{ name: "", id: null, tags: [], klass: "" }];

      return state;
    },
    setArtist(state, artist_id) {
      state.artist_id = artist_id;
    },
    setContent(state, content) {
      state.content = content;
      state.track = data.content.track;
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
    show(context, id) {
      $.ajax({
        url: `/contents/${id}`,
        type: "get",
        success: function(data) {
          context.commit("displayTags", data);
        },
      });
    },
    edit(context, id) {
      $.ajax({
        url: `/contents/${id}/edit`,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    },
    update(context, id) {
      context.commit("loading");
      $.ajax({
        url: `/contents/${id}`,
        type: "put",
        data: {
          content: context.state.content,
          track: context.state.track,
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
    updateTags(context, tag_id) {
      $.ajax({
        url: `/tags/${tag_id}`,
        type: "put",
        data: {
          type: "Content",
          taggable_id: context.state.content.id,
        },
      });
    },
  },
};

export default ContentStore;
