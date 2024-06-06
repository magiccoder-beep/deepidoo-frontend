<template>
  <div class="col-xs-24 mt-10">

    <div class="form-group">
      <label>Sujet*</label>
      <span class="error">{{errors.name}}</span>
      <i18n-string :translations="notification.name_translations" @changed="setTranslations" /> 
    </div>

    <div class="form-group">
      <label>URL de la video*</label>
      <span class="error">{{errors.url}}</span>
      <input v-model="notification.url" type="text" class="form-control">
    </div>

    <a href="#" @click="destroy" class="btn btn-danger pull-left">{{ $t('delete') }}</a>
    <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
  </div>
</template>

<script>
import I18nString from '../shared/_i18n_string.vue'

export default {

  components: {
    'i18n-string': I18nString
  },

  data: function() {
    return this.$store.state.NotificationStore;
  },

  methods: {
    setTranslations: function(translation) {
      this.$store.commit('NotificationStore/setTranslation', translation)
    },
    destroy: function() {
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch('NotificationStore/destroy', this.$route.params.id).then(resolve => {
          this.$router.push('/notifications');
        }).catch(reject => {
          alert("An error has occured");
        });
      }
    }
  }
}
</script>
