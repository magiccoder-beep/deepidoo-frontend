import helpers from '../../helpers';

const ShapeStore = {
  namespaced: true,
  state: {
    progress: '',
    shapes: [],
    shape: {},
    errors: {},
    pagination: {}
  },
  mutations: {
    loading(state) {
      state.progress = 'loading disabled';

      return state;
    },
    loaded(state, klass) {
      state.progress = `loaded ${klass}`;
      setTimeout(function(){
        state.progress = ''
      }, 1000)

      return state;
    },
    one(state, data) {
      state.errors = {};
      state.shape = data.shape;
      return state;
    },
    many(state, data) {
      state.shapes = data.shapes;
      state.pagination = data.pagination;
      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    setPrice(state) {
      state.shape = {
        name: state.shape.name,
        brand: state.shape.brand,
        reference: state.shape.reference,
        type: state.shape.type,
        price: state.shape.price * 100
      }
    }
  },
  actions: {
    index(context, full_path) {
      $.ajax({
        url: full_path,
        type: 'get',
        success: function(data) {
          context.commit('many', data);
        }
      });
    },
    new(context) {
      $.ajax({
        url: `/shapes/new`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    create(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/shapes`,
          type: 'post',
          data: {
            shape: context.state.shape
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
        url: `/shapes/${id}/edit`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    update(context, id) {
      context.commit('loading');
      $.ajax({
        url: `/shapes/${id}`,
        type: 'put',
        data: {
          shape: context.state.shape
        },
        success: function(data) {
          context.commit('one', data);
          context.commit('loaded', 'success');
        },
        error: function(data) {
          context.commit('errors', data);
          context.commit('loaded', 'failed');
        }
      })
    },
    destroy(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/shapes/${id}`,
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

export default ShapeStore;
