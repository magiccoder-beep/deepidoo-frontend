<template>
  <div class="col-xs-24 filters">
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count)}}</span>
    <ul class="box-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>
          {{ $t('filter') }}
        </a>
      </li>
      <li>
        <a :href="'/fr/api/admin/contacts.xlsx?q' + this.$route.fullPath.split('?q')[1]">
          <span class="glyph-icon si-glyph-bullet-list-2"></span>Export Excel
        </a>
      </li>
    </ul>
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-24">
        <label>Prénom</label>
        <input type="text" v-model="form.firstname_cont" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>Nom</label>
        <input type="text" v-model="form.lastname_cont" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>Entité</label>
        <input type="text" v-model="form.entity_cont" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>Email</label>
        <input type="text" v-model="form.email_cont" class="form-control" />
      </div>
      <div class="form-group col-md-6">
        <label>Téléphone</label>
        <input type="text" v-model="form.phone_cont" class="form-control" />
      </div>
      <div class="form-group col-md-24">
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["pagination"],
  data: function() {
    return {
      form: {
        firstname_cont: "",
        lastname_cont: "",
        entity_cont: "",
        email_cont: "",
        phone_cont: "" 
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
