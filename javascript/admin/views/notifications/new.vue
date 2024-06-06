<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          <li><router-link :to="'/notifications'">Notifications</router-link>
          <li>Nouvelle notification</li>
        </ul>
      </div>

      <div class='col-xs-24'>
        <form v-on:submit.prevent="create" accept-charset="UTF-8" class="form styled-form row">
          <notification-form></notification-form>
        </form>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import NotificationForm from './_form.vue'

export default {

  components: {
    'notification-form': NotificationForm
  },

  data: function() {
    return this.$store.state.NotificationStore;
  },

  mounted: function() {
    this.$store.commit('NotificationStore/reset')
  },

  methods: {
    create: function(e) {
      this.$store.dispatch('NotificationStore/create').then((notification) => {
        this.$router.push('/notifications/' + notification.id)
      })
    }
  }
}
</script>
