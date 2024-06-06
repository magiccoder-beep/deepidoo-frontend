<template>
  <div class="modal fade" id="modalTags" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" @click.prevent="reloadTags">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{ content.name }}</h4>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form tags-list-form">
            <div class="form-group col-xs-8">
              <span style="float: left">Electro.</span>
              <span style="float: right">Acoust.</span>
              <input type="range" min="0" max="2" value="1" class="form-control" v-model="track.param_1" @change="updateTrack" />
            </div>
            <div class="form-group col-xs-8">
              <span style="text-align: center;display: inline-block;width: 100%;">Décennie: {{ track.released_on }}</span>
              <input type="range" min="1920" max="2020" step="10" value="1980" class="form-control" v-model="track.released_on" @change="updateTrack"/>
            </div>
            <div class="form-group col-xs-8">
              <span style="float: left">Instru.</span>
              <span style="float: right">Vocal</span>
              <input type="range" min="0" max="2" class="form-control" v-model="track.param_2" @change="updateTrack"/>
            </div>
            <div class="form-group col-xs-24">
              <a v-for="tag in tags" href="#" @click.prevent="update($event, tag.id)" :key="tag.id" :class="'tagged ' + tag.klass" :style="'background-color: ' + tag.color" >{{ tag.name }}</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.ContentStore;
  },

  methods: {
    update: function(e, tag_id) {
      $(e.target).toggleClass("faded");
      this.$store.dispatch("ContentStore/updateTags", tag_id);
    },
    reloadTags: function() {
      this.$store.dispatch("ContentStore/index", this.$route.fullPath);
      $("#modalTags").modal("hide");
    },
    updateTrack: function() {
      this.$store.dispatch("ContentStore/update", this.content.id);
    }
  }
};
</script>

