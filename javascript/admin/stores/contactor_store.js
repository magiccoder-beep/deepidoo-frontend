import helpers from "../../helpers";

const ContactorStore = {
  namespaced: true,
  state: {
    progress: '',
    errors: {},
    phone: null,
    contact: {
      id: null,
      firstname: '',
      lastname: '',
      email: '',
      phone_country: 'fr',
      phone: null,
      contactable_type: 'Client',
      contactable_id: null,
      contactable_name: '',
      notes: ''
    },
    contacts: [],
    keywords: '',
    results: [],
    contactables: [],
    prefix: I18n.prefix
  },
  mutations: {
    one(state, data) {
      state.contact = data.contact;
      return state;
    },
    many(state, data) {
      state.contacts = data.contacts;
      return state;
    },
    loading(state) {
      state.progress = "loading disabled";

      return state;
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
    setContact(state, data) {
      state.contact = data;
      state.phone.setCountry('fr');
      state.phone.setNumber(data.phone);
      return state;
    },
    setContactables(state, data) {
      state.contactables = data.results;
      return state;
    },
    setContacts(state, data) {
      state.results = data.results;
      return state;
    },
    addContact(state, data) {
      state.keywords = '';
      state.contacts.push(data);
    },
    removeContact(state, contact) {
      state.contacts = state.contacts.filter(e => e.id != contact.id)
    },
    setContactable(state, data) {
      state.contact.contactable_id = data.id;
      state.contact.contactable_name = data.name;

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
    }
  },
  actions: {
    load(context, params) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/contactor`,
          type: "get",
          data: {
            k: params.klass,
            id: params.id
          },
          success: function (data) {
            context.commit("many", data);
            resolve(data)
          }
        });
      })
    },
    upsert(context) {
      context.commit('loading');
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/contactor`,
          type: "post",
          data: {
            contact: context.state.contact
          },
          success: function (data) {
            context.commit("loaded", "success");
            resolve(data);
          },
          error: function (data) {
            context.commit("errors", data);
            context.commit("loaded", "failed");
            reject(false);
          },
        });
      })
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
              if(args.what == 'contacts') {
                context.commit("setContacts", data);
              } else {
                context.commit("setContactables", data);
              }              
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
    }
  }
};

export default ContactorStore;