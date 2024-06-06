import helpers from '../../helpers';

const TicketStore = {
  namespaced: true,
  state: {
    ready: false,
    progress: '',
    tickets: [],
    ticket: {},
    errors: {},
    interactions: [],
    tag: {},
    available_tags: [],
    priority_tags: [],
    available_users: [],
    assigned_contacts: [],
    available_followers: [],
    followers: [],
    internal_notes_display: false,
    mail: "",
    pagination: {},
    current_follower: {},
    mailWaiter: true
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
    reset(state) {
      state.mail = "";
      state.errors = {};
      state.ticket = {};
      state.available_tags=[];
      state.available_followers=[];
      state.priority_tags=[]; 
      state.internal_notes_display=false;
      state.followers = [];
      state.current_follower = {};
      state.mailWaiter = true;
      return state;
    },
    setTag(state, tag) {
      state.tag = tag;
    },
    setTicketable(state, data){
      state.ticket.device_id = data.device_id;
      state.ticket.site_id = data.site_id;
      state.ticket.client_id = data.client_id;
      if(!!data.kind){
        state.ticket.kind = data.kind;
      }
      return state;
    },
    tags(state, data) {
      var priority_tags_name = ["INSTALLATION", "SUPPORT", "UTILISATION PLATEFORME", "AUTRE DEMANDE"];
      data.available_tags.forEach(element => {
        if(priority_tags_name.includes(element.name)){
          state.priority_tags.push(element);
        }
        else{
          state.available_tags.push(element);
        }
      });
      return state;
    },
    add(state, contact){
      const found = state.assigned_contacts.find(c => c.id === contact.id) 
      if(found){
        state.assigned_contacts = state.assigned_contacts.filter(e => e.id != contact.id)
      } 
      else{
        state.assigned_contacts.push(contact);
      }
      return state;
    },
    one(state, data) {
      this.commit("TicketStore/reset"); 
      state.errors = {};
      state.ticket = data.ticket;
      state.interactions = data.interactions;
      state.available_users = data.available_users;
      state.available_followers = data.available_followers;
      state.followers = data.followers;
      state.assigned_contacts = data.assigned_contacts;
      //Open it when it's not blank
      state.internal_notes_display = !!data.ticket.internal_notes; 
      state.ready = true;
      this.commit("TicketStore/tags", data);

      return state;
    },
    addFollower(state, follower){
      state.followers.push(follower);
      return state;
    },
    many(state, data) {
      state.available_tags = data.available_tags;
      state.available_users = data.available_users;
      state.tickets = data.tickets;
      state.pagination = data.pagination;
      return state;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);

      return state.errors;
    },
    displayIN(state){
      state.internal_notes_display = true;
      return state;
    },
    setContacts(state, contacts) {
      state.ticket.contacts = contacts.map(contact => contact.id);
    },
    toggleTag(state, tag_id) {
      if(state.ticket.tags.includes(tag_id)) {
        state.ticket.tags = state.ticket.tags.filter((id) => {
          if(id != tag_id) {
            return id;
          }
        })
      } else {
        state.ticket.tags.push(tag_id);
      }
    },
    toggleMailWaiter(state){
      state.mailWaiter = !state.mailWaiter;
      
      return state;
    },
    searchResults(state, data) {
      state.search = data.answers;
    },
    setReady(state, value) {
      state.ready = value;
    },
    removeFollower(state, user_id){
      state.followers = state.followers.filter((follower) =>{
        return follower.id != user_id
      })
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
        url: `/tickets/new`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    create(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tickets`,
          type: 'post',
          data: {
            ticket: context.state.ticket
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
    show(context, id) {
      $.ajax({
        url: `/tickets/${id}`,
        type: 'get',
        success: function(data) {
          context.commit('one', data);
        }
      });
    },
    update(context) {
      context.commit('loading');
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tickets/${context.state.ticket.id}`,
          type: 'put',
          data: {
            ticket: context.state.ticket
          },
          success: function(data) {
            context.commit('loaded', 'success');
            window.location.reload();
            resolve(true);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
            reject(false);
          }
        })
      })
    },
    changeStatus(context, args){
      $.ajax({
        url: `/tickets/${args.id}/change_status`,
        type: 'post',
        data: {
          status: args.status
        },
        success: function(data) {
          console.log("Success");
        }
      }); 
    },
    tags(context) {
      $.ajax({
        url: `/tags?context=ticket`,
        type: 'get',
        success: function(data) {
          context.commit('tags', data);
        }
      });
    },
    createTag(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tags`,
          type: 'post',
          data: {
            name: context.state.tag.name,
            color: context.state.tag.color,
            context: 'ticket'
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
    updateTag(context) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tags/${context.state.tag.id}`,
          type: 'put',
          data: {
            name: context.state.tag.name,
            color: context.state.tag.color,
            context: 'ticket'
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
    destroyTag(context, id) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tags/${id}`,
          type: 'delete',
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
    sendMail(context){
      if(!!context.state.mail){
        context.commit('toggleMailWaiter');
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `/tickets/${context.state.ticket.id}/send_mail`,
            type: 'post',
            data: {
              mail: context.state.mail
            },
            success: function(data) {
              context.commit('toggleMailWaiter');
              resolve(data);
            },
            error: function(data) {
              context.commit('errors', data);
              context.commit('loaded', 'failed');
            }
          })
        }) 
      }
    },
    addFollower(context){
      var follower_id = context.state.current_follower;
      var res = context.state.followers.find(({id}) => id == follower_id);
      if(!!context.state.current_follower && !res){
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `/tickets/${context.state.ticket.id}/add_follower`,
            type: 'post',
            data: {
            user_id: context.state.current_follower
          },
          success: function(data) {
            context.commit('addFollower', data.follower);
            resolve(data);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
            reject(data);
          }
          })
        }); 
      }
    },
    removeFollower(context, user_id){
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/tickets/${context.state.ticket.id}/remove_follower`,
          type: 'post',
          data: {
            user_id: user_id
          },
          success: function(data) {
            context.commit('removeFollower', user_id);
            resolve(data);
          },
          error: function(data) {
            context.commit('errors', data);
            context.commit('loaded', 'failed');
          }
        })
      }); 
    }
  },
};

export default TicketStore;
