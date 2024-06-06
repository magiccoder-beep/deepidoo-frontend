const NavTopStore = {
  namespaced: true,
  state: {
    currentLocale: window.I18n.currentLocale,
    availableLocales: window.I18n.availableLocales,
    currentUser: window.CurrentUser,
    I18n: window.I18n,
    counters: {
      orders: 0,
      tickets: 0,
    },
    myTickets: 0
  },
  mutations: {
    setCounters(state, data) {
      state.counters = data
      return state;
    },
    updateCounters(state, notification) {
      for(const [key, value] of Object.entries(notification)) {
        if(typeof state.counters[key] != 'undefined') {
          state.counters[key] = value;
        }
      }
    },
    setTicketCount(state, count){
      state.myTickets = count;
      return state;
    }
  },
  actions: {
    getCounters(context){
      $.ajax({
        url: `/notifications_count`,
        type: 'get',
        success: function(data) {
          context.commit('setCounters', data);
        }
      })
    }
  },
};

export default NavTopStore;
