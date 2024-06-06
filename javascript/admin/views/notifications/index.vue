<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          <li>Notifications</li>
        </ul>
        <div class='pull-right'>
          <router-link :to="'/notifications/new'" class='add-link'>+ Nouvelle Notification</router-link>
        </div>
      </div>

      <div class="col-xs-24 overflowable">
        <table class='table table-striped table-thin'>
          <thead>
            <tr>
              <th style="width: 80px">{{ $t('ref') }}</th>
              <th style="width: 80px">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notification in notifications" :key="notification.id">
              <td><router-link :to="'/notifications/' + notification.id + '/edit'">{{ notification.id }}</router-link></td>
              <td>{{ notification.created_at }}</td>
              <td>
                <b>Sujet:</b> {{ notification.name | truncate(60)}}
                <br />
                <b>URL Video:</b> {{ notification.url }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

export default {

  data: function() {
    return this.$store.state.NotificationStore;
  },

  mounted: function() {
    this.$store.dispatch('NotificationStore/index');
  },

  methods: {
  }

}
</script>
