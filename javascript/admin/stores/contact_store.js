import helpers from '../../helpers';

const ContactStore = {
  namespaced: true,
  state: {
    progress: '',
    contactables: [],
    errors: {},
    pagination: {},
    contacts: [],
    contact: {},
    phone: null,
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
      state.contact = data.contact;
      state.phone.setCountry('fr');
      state.phone.setNumber(data.contact.phone);
       
      return state;
    },
    many(state, data) {
      state.contacts = data.contacts;
      state.pagination = data.pagination;
      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    },
    initPhone(state, element) {
      state.phone = window.intlTelInput(element, {
        preferredCountries: ["fr", "us", "ca", "de"],
        separateDialCode: true,
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      });
    },
    setPhone(state, data) {
      state.contact.phone_country = state.phone.getSelectedCountryData()['iso2'];
      state.contact.phone = state.phone.getNumber();
    },
    setContactables(state, data) {
      state.contactables = data.results;
      return state;
    },
    setContactable(state, data) {
      state.contact.contactable_id = data.id;
      state.contact.contactable_name = data.name;

      return state;
    },
  },
  actions: {
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
        url: `/contacts/new`,
        type: 'get',
        success: function (data) {
          context.commit('one', data);
        }
      });
    },
    autocomplete(context, args) {
      if(window.Global.timer != null) {
        clearTimeout(window.Global.timer);
      } 

      if(args.keywords.length > 1) {
        window.Global.timer = window.setTimeout(function() {
          window.Global.timer = null;

          $.ajax({
            url: `/autocomplete`,
            type: "post",
            data: {
              q: args.keywords,
              what: args.what,
              scope: args.scope,
              client_id: args.client_id
            },
            success: function(data) {
              context.commit("setContactables", data);
            }
          });
        }, 200); 
      } else {
        if(args.what == 'contacts') {
          context.commit("setContacts", {results: []});
        } else {
          context.commit("setContactables", {results: []});
        } 
      }
    },
    create(context, form) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/contacts`,
          type: 'post',
          data: {
            contact: form
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
        url: `/contacts/${id}`,
        type: 'get',
        success: function (data) {
          context.commit('one', data);
        }
      });
    },
    update(context, form) {
      context.commit('loading');
      $.ajax({
        url: `/contacts/${form.id}`,
        type: 'put',
        data: {
          contact: form
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
          url: `/contacts/${context.state.contact.id}`,
          type: 'delete',
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

export default ContactStore;
