<template>
  <div class="col-xs-24 filters">
    <ul class="box-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active"><a href='#' @click='toggleFilters' class='toggle'><span class="glyph-icon si-glyph-text-search"></span>{{ $t('filter') }}</a></li>
    </ul>
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-6">
        <label>Entre le...</label>
        <input type="date" v-model="form.created_at_gteq" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>... et le</label>
        <input type="date" v-model="form.created_at_lteq" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>Nom utilisateur</label>
        <input type="text" v-model="form.user_cont" class="form-control">
      </div>
      <div class="form-group col-md-6">
        <label>Langue utilisée</label>
        <input type="text" v-model="form.locale_eq" class="form-control">
      </div>
      <div class='form-group col-md-6'>
        <label>Method</label>
        <select class="form-control" v-model="form.verb_eq">
          <option value="">ANY</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div class='form-group col-md-18'>
        <label>Action</label>
        <input type="text" v-model="form.action_cont" class="form-control">
      </div>

      <div class="col-xs-24">
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: {
        created_at_gteq: '',
        created_at_lteq: '',
        user_cont: '',
        locale_eq: '',
        action_cont: '',
        verb_eq: ''
      }
    }
  },

  methods: {
    toggleFilters: function() {
      window.$('.filters .well').toggleClass('hidden');
    },
    filter: function() {
      let query = {}
      for(let el in this.form) {
        query["q["+el+"]"] = this.form[el];
      };
      this.$router.push({query: query})
      window.$('.filters .well').toggleClass('hidden')
    }
  },

  watch: {
    '$route.query': function() {
      this.$store.dispatch('MetricUserStore/index', this.$route.fullPath);
    }
  }

}
</script>
