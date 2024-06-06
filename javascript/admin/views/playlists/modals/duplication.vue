<template>
  <div class="modal fade" id="modalDuplication" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Dupliquer vers...</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" @keyup="autocomplete" class="form-control" placeholder="Premieres lettres du client..." v-model="target_name" />
            <ul class="unstyled" ref="orgs">
              <li v-for="organisation in organisations" :key="organisation.id">
                <a href="#" @click.prevent="setTarget(organisation)">{{ organisation.name }}</a>
              </li>
            </ul>
            <br />
            <b>ATTENTION: soyez certains que tous les titres de cette playlists soient bien accessibles au sein de l'organisation cible !!!</b>
          </div>

          <div class="form-group">
            <a href="#" class="btn btn-primary btn-wide" @click.prevent="duplicate">Dupliquer</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.PlaylistStore;
  },

  methods: {
    duplicate: function() {
      this.$store
        .dispatch("PlaylistStore/duplicate", this.$route.params.id)
        .then(playlist => {
          $("#modalDuplication").modal("hide");
          setTimeout(function() {
            window.location.href = `/admin/playlists/${playlist.id}`;
          }, 1000);
        })
        .catch(reject => {
          $("#modalDuplication").modal("hide");
          alert("Une erreur est survenue :-/");
        });
    },
    autocomplete: function(e) {
      this.$store.dispatch("PlaylistStore/autocomplete", e.target.value);
    },
    setTarget: function(organisation) {
      $(this.$refs.orgs).addClass('hidden');
      this.$store.commit("PlaylistStore/setTarget", organisation);
    }
  }
};
</script>

