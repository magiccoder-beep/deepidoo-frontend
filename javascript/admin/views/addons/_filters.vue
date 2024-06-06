<template>
  <div class="col-xs-24 filters">
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count)}}</span>
    <ul class="spot-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>
          {{ $t('filter') }}
        </a>
      </li>
      <li>
        <a :href="'/fr/api/admin/devices/addons.xlsx?q' + this.$route.fullPath.split('?q')[1]">
          <span class="glyph-icon si-glyph-bullet-list-2"></span>Export Excel
        </a>
      </li>
    </ul>
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-4">
        <label>{{ $t('id') }}</label>
        <input type="text" v-model="form.id_eq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('ref') }}</label>
        <input type="text" v-model="form.ref_in" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('name') }}</label>
        <input type="text" v-model="form.name_in" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('price') }}</label>
        <input type="text" v-model="form.price_eq" class="form-control" />
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
        id_eq: "",
        ref_in: "",
        status_eq: "",
        name_in: "",
        price_eq: ""
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
        if(el === 'per') {
          query["per"] = this.form[el];
        } else if(el === 'os_in') {
          const segments = this.form[el].split(',');
          for(let id in segments) {
            query["q[os_in][]"] = segments; 
          }
        } else {
          query["q["+el+"]"] = this.form[el];
        }
      }
      this.$router.push({ query: query });
      window.$(".filters .well").toggleClass("hidden");
    }
  }
};
</script>
