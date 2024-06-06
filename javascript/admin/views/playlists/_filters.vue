<template>
  <div class="col-xs-24 filters">
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count)}}</span>
    <ul class="box-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>Filtrer
        </a>
      </li>
    </ul>
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-xs-12">
        <label>Nom</label>
        <input type="text" v-model="form.name_cont" class="form-control" />
      </div>
      <div class="form-group col-md-12">
        <label>Client</label>
        <input type="text" v-model="form.organisation_client_name_cont" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>Créée entre le...</label>
        <input type="date" v-model="form.created_at_gteq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>... et le</label>
        <input type="date" v-model="form.created_at_lteq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>Modifiee entre le...</label>
        <input type="date" v-model="form.updated_at_gteq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>... et le</label>
        <input type="date" v-model="form.updated_at_lteq" class="form-control" />
      </div>
      <div class="form-group col-md-8">
        <label>Type</label>
        <select v-model="form.is_rescue_eq" class="form-control">
          <option value>Indifférent</option>
          <option value="true">Locale</option>
          <option value="false">Streaming</option>
        </select>
      </div>

      <div class="form-group col-md-24">
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["pagination", "creators"],

  data: function() {
    return {
      form: {
        name_cont: "",
        organisation_client_name_cont: "",
        artists_name_cont: "",
        created_at_gteq: "",
        created_at_lteq: "",
        created_by_id_eq: ""
      }
    };
  },

  methods: {
    toggleFilters: function() {
      window.$(".filters .well").toggleClass("hidden");
    },
    filter: function() {
      let query = {};
      for (let el in this.form) {
        query["q[" + el + "]"] = this.form[el];
      }
      this.$router.push({ query: query });
      window.$(".filters .well").toggleClass("hidden");
    }
  }
};
</script>
