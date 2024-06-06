import helpers from "../../helpers";
const FollowerStore = {
  namespaced: true,
  state: {
    follower: {},
    followers: []
  },
  mutations: {
    one(state, data) {
      state.follower = data.follower;
      return state;
    },
    many(state, data) {
      state.followers = data.followers;
      return state;
    }
  },
  actions: {
    index(context, order_id) {
      $.ajax({
        url: `/followers`,
        type: "get",
        data: {
          order_id: order_id
        },
        success: function (data) {
          context.commit("many", data);
        }
      });
    },
    create(context, form) {
      if(context.state.order){
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `/tags`,
            type: "post",
            data: {
              context: 'order',
              name: form.name,
              color: form.color
            },
            success: function (data) {
              resolve(true);
            },
            error: function (data) {
              reject(false);
            },
          });
        })
      }
      else{
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `/tags`,
            type: "post",
            data: {
              context: 'device',
              name: form.name,
              color: form.color
            },
            success: function (data) {
              resolve(true);
            },
            error: function (data) {
              reject(false)
            },
          });
        })
      }
    },
    update(context, tag) {
      $.ajax({
        url: `/tags/${tag.id}`,
        type: "put",
        data: tag,
        success: function (data) {
          context.commit("many", data);
        }
      });
    },
    toggle(context, id) {
      if(context.state.order){
        return new Promise((resolve) => {
          $.ajax({
            url: `/tags/toggle`,
            type: "post",
            data: {
              tag_id: id,
              taggable_id: context.state.order.id,
              taggable_type: 'Order'
            },
            success: function (data) {
              resolve(data);
            }
          });
        })
      }
      else{
        return new Promise((resolve) => {
          $.ajax({
            url: `/tags/toggle`,
            type: "post",
            data: {
              tag_id: id,
              taggable_id: context.state.spot.device_id,
              taggable_type: 'Device'
            },
            success: function (data) {
              resolve(data);
            }
          });
        })
        
      }
    },
    destroy(context, id) {
      return new Promise((resolve) => {
        $.ajax({
          url: `/tags/${id}`,
          type: "delete",
          success: function (data) {
            resolve(true);
          }
        });
      })
    },
  },
};

export default FollowerStore;