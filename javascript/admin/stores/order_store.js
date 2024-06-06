import helpers from '../../helpers';

const OrderStore = {
  namespaced: true,
  state: {
    ready: false,
    errors: {},
    progress: "",
    current_tab: 'list',
    orders: [],
    available_devices: [],
    available_shapes: [],
    selected_device: '',
    current_shape_id: null,
    spot_index: 0,
    order: {steps: {}, site: {}, shipping: {}, dimensions: {}, assignees: []},
    statuses: ['1_new', '2_confirmed', '3_manufacturing', '4_ready_for_shipping', '5_shipping', '6_commissioning', '7_done'],
    statuses_toggle: true,
    pagination: {},
    chart: {show: false},
    metrics: {labels: [], series: []},
    chart_series: [],
    chart_labels: [],
    chart_totals: [],
    current_spot: {tags: []},
    chart_colors: ['#556573', '#EB984E', '#F5B041', '#DC7633', '#A569BD', '#5DADE2','#58D68B'],
    form: {
      id_eq: '',
      name_cont: '',
      spots_id_eq: '',
      organisation_client_name_cont: '',
      organisation_name_cont: '',
      manufacturer_id_eq: '',
      site_name_cache: '',
      products_name_cache_cont: '',
      status_in: [],
      taggings_tag_id_in: [],
      per: "25"
    }
  },
  mutations: {
    reset(state, data) {
      state.order = {};
      state.ready = false;

      return state;
    },
    one(state, data) {
      state.order = data.order;
      state.available_devices = [];
      state.current_spot = data.order.spots[state.spot_index];
      state.available_shapes = data.shapes;
      state.current_shape_id = data.order.spots[state.spot_index].shape_id;

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
    many(state, data) {
      state.pagination = data.pagination;
      state.orders = data.orders;
      state.chart_series = data.metrics.series;
      state.chart_labels = data.metrics.labels;
      state.chart_totals = data.metrics.totals;
      state.metrics = data.metrics;
      state.ready = true;

      return state;
    },
    setTab(state, value) {
      state.current_tab = value;
    },
    toggleStatus(state, status) {
      if(state.statuses.includes(status)) {
        var index = state.statuses.indexOf(status);
        if (index !== -1) {
          state.statuses.splice(index, 1);
        }
      } else {
        state.statuses.push(status);
      }
    },
    toggleAll(state) {
      if(state.statuses_toggle === true) {
        state.statuses = [];
        state.statuses_toggle = false;
      } else {
        state.statuses = ['1_new', '2_confirmed', '3_manufacturing', '4_ready_for_shipping', '5_shipping', '6_commissioning', '7_done'];
        state.statuses_toggle = true;
      }
    },
    setupChart(state, data) {
      state.chart = new ApexCharts(document.querySelector(data.element), data.options)
    },
    resetChart(state) {
      state.chart = {show: false};
      return state;
    },
    setCurrentSpot(state, spot) {
      state.current_spot = spot;
      state.current_shape_id = spot.shape_id;
    },
    setOrder(state, order) {
      state.order = order;
    },
    setShippingMode(state, mode) {
      state.order.shipping_mode = mode;
    },
    setAssignationId(state, value) {
      state.order.assignation_id = value;
    },
    setAvailableDevices(state, data) {
      state.available_devices = data.devices;
    },
    setSpotIndex(state, value) {
      state.spot_index = value;
    },
    loadStatuses(state, statuses) {
      if(typeof statuses != 'undefined') {
        state.statuses = statuses;
      }
    }
  },
  actions: {
    index(context, full_path) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: full_path,
          type: 'get',
          success: function(data) {
            context.commit('many', data);
            resolve(data);
          }
        })
      })
    },
    show(context, id) {
      return new Promise((resolve) => {
        $.ajax({
          url: `/orders/${id}`,
          type: 'get',
          success: function(data) {
            context.commit('one', data);
            resolve(data);
          }
        })
      })
    },
    create(context, id) {
      context.commit("loading");
      $.ajax({
        url: `/orders`,
        type: 'post',
        data: {
          id: id,
          manufacturer_id: context.state.order.manufacturer_id
        },
        success: function(data) {
          context.commit("loaded", "success");
          context.commit('one', data);
        },
        error: function(data) {
          context.commit("errors", data);
          context.commit("loaded", "failed");
        }
      })
    },
    updateSpot(context, id) {
      $.ajax({
        url: `/spots/${context.state.current_spot.id}/addons`,
        type: 'put',
        data: {
          addon_id: id
        },
        success: function(data) {
          console.log('success');
        },
        error: function(data) {
          alert('an error has occured')
        }
      })
    },
    update(context, what) {
      if(context.state.progress != '') {
        return false;
      }
      context.commit("loading");
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/orders/${context.state.order.id}`,
          type: 'put',
          data: {
            what: what,
            order: context.state.order
          },
          success: function(data) {
            context.commit('one', data);
            context.commit("loaded", "success");
            resolve(data);
          },
          error: function(data) {
            context.commit("errors", data);
            context.commit("loaded", "failed");
            reject(false);
          }
        })
      })
    },
    destroy(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/orders/${context.state.order.id}`,
          type: 'delete',
          success: function(data) {
            resolve(true);
          },
          error: function(data) {
            reject(false);
          }
        })
      })
    },
    updateShape(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/devices/${context.state.current_spot.device_id}`,
          type: 'put',
          data: {
            device: {
              shape_id: context.state.current_shape_id
            }
          },
          success: function(data) {
            resolve(true);
          },
          error: function(data) {
            reject(false);
          }
        })
      })
    },
    setActive: function(context){
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/devices/${context.state.current_spot.device_id}/set_active`,
          type: 'post',
          success: function(data) {
            resolve(true);
          },
          error: function(data) {
            reject(false);
          }
        })
      })
    }
  }
};

export default OrderStore;
