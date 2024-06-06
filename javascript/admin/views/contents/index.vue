<template>
  <div class="main_container">
    <nav-top></nav-top>
    <div class="col contents" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>Catalogue</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <div class="row">
          <filters :pagination="pagination" :creators="creators"></filters>

          <div class="col-xs-24 overflowable">
            <table class="table table-striped table-thin">
              <thead>
                <tr>
                  <th style="width: 40px"></th>
                  <th style="width: 200px;">Titre / artiste</th>
                  <th style="width: 200px;">Propriétés</th>
                  <th>Tags</th>
                  <th style="width: 90px;">Ajouté le</th>
                  <th style="width: 130px;">Par</th>
                  <th style="width: 50px;">Joué</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="content in contents" :key="content.id">
                  <td class="playable">
                    <img width="50" height="50" :src="content.thumbnail" @click.prevent="play(content)" :name="content.name"/>
                  </td>
                  <td>
                    <b>{{ content.artist }}</b>
                    <br />
                    <router-link :to="'/contents/' + content.id + '/edit'">{{ content.name }}</router-link>
                  </td>
                  <td>
                    {{ content.track.released_on}}
                    <br />
                    <span v-if="content.track.param_1 == 0">
                      Electronique
                      <br />
                    </span>
                    <span v-if="content.track.param_1 == 2">
                      Acoustique
                      <br />
                    </span>
                    <span v-if="content.track.param_2 == 0">
                      Instrumental
                      <br />
                    </span>
                    <span v-if="content.track.param_2 == 2">
                      Vocal
                      <br />
                    </span>
                  </td>
                  <td>
                    <span v-for="tag in content.tags" :key="tag.id" class="tagged" :name="content.full_name" :style="'background-color: ' + tag.color">{{ tag.name }}</span>
                  </td>
                  <td>{{ content.created_at }}</td>
                  <td>{{ content.created_by }}</td>
                  <td>{{ content.played_count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <pagination :pagination="pagination" :creators="creators"></pagination>
      <modal-tags></modal-tags>
    </div>
    <footer-custom></footer-custom>
    <player ref="player"></player>
  </div>
</template>

<script>
import pagination from "../shared/_pagination.vue";
import modalTags from "./modals/tags.vue";
import filters from "./_filters.vue";
import player from "../shared/_player.vue";

export default {
  components: {
    pagination: pagination,
    "modal-tags": modalTags,
    filters: filters,
    player: player
  },

  data: function() {
    return this.$store.state.ContentStore;
  },

  mounted: function() {
    this.$store.dispatch("ContentStore/index", this.$route.fullPath);
  },

  methods: {
    play: function(content) {
      this.$refs.player.play(content);
    },
    showTagsModal: function(content_id) {
      $("#modalTags").modal();
      this.$store.dispatch("ContentStore/show", content_id);
    }
  }
};
</script>
