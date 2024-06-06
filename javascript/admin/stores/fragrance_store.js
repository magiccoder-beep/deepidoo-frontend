import helpers from "../../helpers";

const FragranceStore = {
  namespaced: true,
  state: {
    progress: "",
    content: {
      name_translations: {},
      description_translations: {},
      description_top_translations: {},
      description_heart_translations: {},
      description_bottom_translations: {}
    },
    contents: [],    
    pagination: {}, 
    errors: {},
    change_password: false,
  },
  mutations: {
    reset(state, data) {
      state.content = {};
      state.errors = {};
      state.ready = false;
      
      return state;
    },
    one(state, data) {
      state.content = data.content;

      return state;
    },
    many(state, data) {
      state.contents = data.contents;
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
    setThumbnail(state, thumbnail) {
      state.content.cover_art = thumbnail;
    },
    setNameTranslations(state, translations) {
      state.content.name_translations = translations;
    },
    setDescriptionTranslations(state, translations) {
      state.content.description_translations = translations;
    },
    setDescriptionTopTranslations(state, translations) {
      state.content.description_top_translations = translations;
    },
    setDescriptionHeartTranslations(state, translations) {
      state.content.description_heart_translations = translations;
    },
    setDescriptionBottomTranslations(state, translations) {
      state.content.description_bottom_translations = translations;
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
    show(context, id) {
      $.ajax({
        url: `/fragrances/${id}`,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    },
    new(context) {
      $.ajax({
        url: `/fragrances/new`,
        type: "get",
        success: function(data) {
          context.commit("one", data);
        },
      });
    },
    create(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/fragrances`,
          type: 'post',
          data: {
            content: context.state.content
          },
          success: function (data) {
            context.commit('loaded', 'success');
            resolve(data);
          },
          error: function (data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
          }
        })
      })
    },
    update(context, id) {
      context.commit("loading");
      $.ajax({
        url: `/fragrances/${id}`,
        type: "put",
        data: {
          content: context.state.content
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
    destroy(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/fragrances/${context.state.content.id}`,
          type: "delete",
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

export default FragranceStore;
