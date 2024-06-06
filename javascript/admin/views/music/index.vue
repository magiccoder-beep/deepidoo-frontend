<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link></li>
          <li>Catalogue musical</li>
        </ul>
      </div>
      
      <div class="col-xs-24">
        <div class="row">
          <filters :pagination="pagination"></filters>

          <div class="col-xs-24 overflowable">
            <table class="table table-striped table-thin table-hover">
              <thead>
                <tr>
                  <th style="width: 40px">ID</th>
                  <th style="width: 120px;">Créé le</th>
                  <th style="width: 200px;">Artiste</th>
                  <th>Titre</th>
                  <th style="width: 130px;text-align: right">Joué</th>
                  <th style="width: 90px;text-align: right">
                    Validé
                    <input type="checkbox" style="margin: 4px auto auto 5px; float: right;" @change="toggleAll"/>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in contents" :key="content.id">
                  <td><a :href="'/fr/music/?q%5Bid_eq%5D=' + content.id">{{ content.id }}</a></td>
                  <td>{{ content.created_at }}</td>
                  <td>{{ content.artist }}</td>
                  <td>
                    {{ content.name }}
                    <br />
                    <a href="#" v-for="tag in content.tags" :key="tag.id" class="tagged" :style="'background-color: ' + tag.color">{{ tag.label }}</a>
                  </td>
                  <td style="text-align: right">{{ content.played_count }}</td>
                  <td style="text-align: right"><input type="checkbox" :checked="content.validated" value="false" @change="toggleValidated(content.id)" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <pagination :pagination="pagination"></pagination>
    </div>
    <footer-custom></footer-custom>
  </div>
</template>

<script>
import pagination from "../shared/_pagination.vue";
import filters from "./_filters.vue";

export default {
  components: {
    pagination: pagination,
    filters: filters
  },

  data: function() {
    return this.$store.state.MusicStore;
  },

  mounted: function() {
    this.$store.dispatch("MusicStore/index", this.$route.fullPath);
  },

  methods: {
    toggleValidated: function(id) {
      this.$store.dispatch("MusicStore/update", id)
    },
    toggleAll: function(e) {
      this.$store.dispatch("MusicStore/updateAll", e.target.checked).then(() => {
        this.$store.dispatch("MusicStore/index", this.$route.fullPath);
      })
    }
  }
};
</script>
