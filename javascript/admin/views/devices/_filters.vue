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
        <a @click.prevent="exportXls" href="#">
          <span class="glyph-icon si-glyph-bullet-list-2"></span>Export Excel
        </a>
      </li>
    </ul>
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-4">
        <label>{{ $t('ref') }}</label>
        <input type="text" v-model="form.id_eq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('type') }}</label>
        <select v-model="form.os_in" class="form-control">
          <option value>{{ $t('all') }}</option>
          <option value="0,1,2,3">{{ $t('Shape::Deepibox') }}</option>
          <option value="4,5,6">{{ $t('Shape::SamsungScreen') }}</option>
          <option value="7,8,9">{{ $t('Shape::WebosScreen') }}</option>
        </select>
      </div>
      <div class="form-group col-md-4">
        <label>{{ $t('status') }}</label>
        <select v-model="form.status_eq" class="form-control">
          <option value>{{ $t('all') }}</option>
          <option value="0">{{ $t('device.stock') }}</option>
          <option value="1">{{ $t('device.assigned') }}</option>
          <option value="2">{{ $t('device.ready') }}</option>
          <option value="3">{{ $t('device.shipped') }}</option>
          <option value="4">{{ $t('device.active') }}</option>
          <option value="5">{{ $t('device.to_repair') }}</option>
          <option value="6">{{ $t('device.returned') }}</option>
          <option value="7">{{ $t('device.out_of_order') }}</option>
        </select>
      </div>
      <!-- <div class="form-group col-md-4">
        <label>{{ $t('device.os') }}</label>
        <select v-model="form.os_cont" class="form-control">
          <option value>{{ $t('all') }}</option>
          <option value="0">{{ $t('device.ubuntu') }}</option>
          <option value="1">{{ $t('device.debian_7') }}</option>
          <option value="2">{{ $t('device.debian_8') }}</option>
          <option value="3">{{ $t('device.debian_9') }}</option>
        </select>
      </div> -->
      <div class="form-group col-md-4">
        <label>{{ $t('device.serial') }}</label>
        <input type="text" v-model="form.serial_cont" class="form-control" />
      </div>
      <div class="form-group col-md-24">
        <input type="submit" class="btn btn-primary" :value="$t('filter')" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["pagination", "player_versions"],

  data: function() {
    return {
      form: {
        shape_type_cont: "",
        os_in: "",
        status_eq: "",
        id_eq: "",
        serial_cont: "",
        player_version_id_eq: ""
      }
    };
  },

  methods: {
    exportXls: function() {
      this.$store.dispatch("XlsxStore/create", {klass: 'Device', query: this.$route.query}).then(response => {
        alert("Demande transmise, l'export sera envoyé sur votre boite Email\n(cela peut prendre longtemps !)");
      })
    },
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
