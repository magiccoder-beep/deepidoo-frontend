import helpers from "../../helpers";

const DashboardStore = {
  namespaced: true,
  state: {
    dashboard: {
      tickets: [],
      cards: []
    },
    pagination: {}
  },
  mutations: {
    display(state, data) {
      state.tickets = data.tickets;
      return state;
    }
  },
  actions: {
    index(context, full_path) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: full_path,
          type: 'get',
          success: function (data) {
            context.commit('display', data)
            resolve(data.dashboard)
          }
        })
      })
    },
  }
};

export default DashboardStore;
