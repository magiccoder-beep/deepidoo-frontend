import helpers from '../../helpers';

const DeviceStore = {
  namespaced: true,
  state: {
    progress: '',
    devices: [],
    device: {},
    errors: {},
    pagination: {},
    newDevices: [],
    events: [],
    scanner: {},
    scanEvents: 0,
    camera_intervals: [],
    local_stream: null,
    player_versions: [],
    selected_device_id: null
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
      state.newDevices = [];
      state.device = data.device;
      state.events = data.device.events;
      return state;
    },
    pushNewDevice(state, data) {
      state.errors = {};
      state.newDevices.push(data.device)
      return state;
    },
    serialScanned(state, serial) {
      state.errors = {};
      state.scanEvents += 1;
      state.device.serial = serial
      return state;
    },
    many(state, data) {
      state.devices = data.devices;
      state.player_versions = data.player_versions;
      state.pagination = data.pagination;
      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    setCameraInterval(state, int) {
      state.camera_intervals.push(int);
    },
    setStream(state, stream) {
      state.local_stream = stream;
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
    new(context, id) {
      $.ajax({
        url: `/devices/new`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    scannerStop(context) {
      context.state.local_stream.getTracks()[0].stop();
      context.state.camera_intervals.map((int) => {
        clearInterval(int);
      })
    },
    create(context, form) {
      $.ajax({
        url: `/devices`,
        type: 'post',
        data: {
          device: form
        },
        success: function(data) {
          context.commit('pushNewDevice', data);
          context.commit('loaded', 'success');
        },
        error: function(data) {
          context.commit('errors', data);
          context.commit('loaded', 'failed');
        }
      })
    },
    edit(context, id) {
      $.ajax({
        url: `/devices/${id}/edit`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    updateStatus(context, form){
      context.commit('loading');
      $.ajax({
        url: `/devices/${form.device_id.id}`,
        type: 'put',
        data: {
          device: form.device_id,
          do: form.do
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
    update(context, form) {
      return new Promise((resolve, reject) => {
        context.commit('loading');
        $.ajax({
          url: `/devices/${form.id}`,
          type: 'put',
          data: {
            device: form
          },
          success: function(data) {
            context.commit('one', data);
            context.commit('loaded', 'success');
            resolve(true);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
            reject(false);
          }
        })
      })
    }
  }
};

export default DeviceStore;
