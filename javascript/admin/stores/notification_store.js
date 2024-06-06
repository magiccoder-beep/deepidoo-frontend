import helpers from '../../helpers'

const NotificationStore = {
  namespaced: true,
  state: {
    notifications: [],
    notification: {name_translations: {}},
    progress: '',
    errors: {}
  },
  mutations: {
    many(state, data) {
      state.notifications = data.notifications;
      return state;
    },
    one(state, data) {
      state.notification = data.notification;
      return state;
    },
    reset(state, data) {
      state.notification = {
        name_translations: {
          en: '',
          es: '',
          fr: '',
          zh: '',
          de: '',
          it: ''
        }
      }

      return state;
    },
    loading(state) {
      state.progress = 'loading disabled';
      return state;
    },
    loaded(state, klass) {
      state.progress = `loaded ${klass}`;
      setTimeout(function(){
        state.progress = ''
      }, 1000)
      if(klass === 'success') {
        state.errors = {}; 
      }      

      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    setTranslation(state, translation) {
      state.notification.name_translations = translation;
    }
  },
  actions: {
    index(context) {
      $.ajax({
        url: `/notifications`,
        type: 'get',
        success: function(data) {
          context.commit('many', data)
        }
      })
    },
    edit(context, id) {
      $.ajax({
        url: `/notifications/${id}`,
        type: 'get',
        success: function(data) {
          context.commit('one', data)
        }
      })
    },
    update(context, id) {
      context.commit('loading');
      $.ajax({
        url: `/notifications/${id}`,
        type: 'put',
        data: context.state.notification,
        success: function() {
          context.commit('loaded', 'success');
        },
        error: function(data) {
          context.commit('errors', data);
          context.commit('loaded', 'failed');
        }
      })
    },
    create(context) {
      context.commit('loading');
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/notifications`,
          type: 'post',
          data: context.state.notification,
          success: function(data) {
            context.commit('loaded', 'success');
            resolve(data.notification);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
          }
        })
      })
    },
    destroy(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/notifications/${id}`,
          type: 'delete',
          success: function(data) {
            resolve(data.notification);
          },
          error: function(data) {
            reject(false);
          }
        })
      })
    }
  }
};

export default NotificationStore;
