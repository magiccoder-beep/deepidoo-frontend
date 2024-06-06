<template>
  <div class="col-xs-24 filters">
    <router-link to="/fragrances/new"  style="position: absolute; top: -30px; right: 10px;">+ Nouvelle senteur</router-link>
    
    <span class="results-count">{{ pagination.count }} {{ $tc('results', pagination.count)}}</span>
    <ul class="box-filters droppable" @click="$event.target.classList.toggle('dropped')">
      <li class="active">
        <a href="#" @click="toggleFilters" class="toggle">
          <span class="glyph-icon si-glyph-text-search"></span>Filtrer
        </a>
      </li>
    </ul>
    
    <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form col-xs-24 well hidden">
      <div class="form-group col-md-4">
        <label>Titre</label>
        <input type="text" v-model="form.name_cont" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>Artiste</label>
        <input type="text" v-model="form.media_relations_artist_name_cont" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>Tag</label>
        <input
          type="text"
          v-model="form.content_media_tags_media_tag_label_cont"
          class="form-control"
        />
      </div>
      <div class="form-group col-md-4">
        <label>Ajouté entre le...</label>
        <input type="date" v-model="form.created_at_gteq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>... et le</label>
        <input type="date" v-model="form.created_at_lteq" class="form-control" />
      </div>
      <div class="form-group col-md-4">
        <label>Par</label>
        <select v-model="form.created_by_id_eq" class="form-control">
          <option value>Indifférent</option>
          <option :value="creator.id" v-for="creator in creators" :key="creator.id">{{ creator.name }}</option>
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
