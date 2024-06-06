import helpers from '../../helpers';

const ClientStore = {
  namespaced: true,
  state: {
    progress: '',
    confirm_name: '',
    clients: [],
    client: {},
    errors: {},
    fallbacks: [],
    organisations: [],
    brands: [],
    pagination: {}
  },
  mutations: {
    loading(state) {
      state.progress = 'loading disabled';

      return state;
    },
    loaded(state, klass) {
      state.progress = `loaded ${klass}`;
      setTimeout(function () {
        state.progress = ''
      }, 1000)

      return state;
    },
    one(state, data) {
      state.errors = {};
      state.confirm_name = '';
      state.client = data.client;
      state.fallbacks = data.fallbacks;
      state.organisations = data.organisations;
      state.brands = data.brands;
      
      return state;
    },
    many(state, data) {
      state.clients = data.clients;
      state.pagination = data.pagination;
      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    }
  },
  actions: {
    initApi(context, id){
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/clients/${id}/init_api`,
          type: 'post',
          data: {id: context.id},
          success: function (data) {
            // context.commit('many', data);
            resolve(true);
          }
        });
      });
    },
    index(context, full_path) {
      $.ajax({
        url: full_path,
        type: 'get',
        success: function (data) {
          context.commit('many', data);
        }
      });
    },
    new(context) {
      $.ajax({
        url: `/clients/new`,
        type: 'get',
        success: function (data) {
          context.commit('one', data);
        }
      });
    },
    create(context, form) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/clients`,
          type: 'post',
          data: {
            client: form
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
    edit(context, id) {
      $.ajax({
        url: `/clients/${id}`,
        type: 'get',
        success: function (data) {
          context.commit('one', data);
        }
      });
    },
    update(context, form) {
      context.commit('loading');
      $.ajax({
        url: `/clients/${form.id}`,
        type: 'put',
        data: {
          client: form
        },
        success: function (data) {
          context.commit('one', data);
          context.commit('loaded', 'success');
        },
        error: function (data) {
          context.commit('errors', data);
          context.commit('loaded', 'failed');
        }
      })
    },
    destroy(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/clients/${context.state.client.id}`,
          type: 'delete',
          data: {
            confirmation: context.state.confirm_name
          },
          success: function (data) {
            resolve(true);
          },
          error: function (data) {
            reject(false);
          }
        })
      })
    },
  }
};

export default ClientStore;
