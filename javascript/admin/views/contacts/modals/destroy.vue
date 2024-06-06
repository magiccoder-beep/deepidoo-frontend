<template>
  <div class="modal fade" id="modalDestroy" tabindex="-1" role="dialog" ref="modalRepair">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">ATTENTION</h4>
          <h4 class="modal-title hidden">Suppression en cours...</h4>
        </div>
        <div class="modal-body">
          <div id="confirmation" class="hidden">
            <video src="https://cdn-deepidoo.oss-eu-central-1.aliyuncs.com/delete.mp4" loop mute style="width: 100%"/>
          </div>

          <form v-on:submit.prevent="destroy" id="destroyPrompt" accept-charset="UTF-8" class="form">
            <div class="form-group">
              <h4>Vous êtes sur le point de supprimer un client. <b>Toutes</b> Les données de ce client seront supprimées de façon irreversible :</h4>
              <ul>
                <li>Organisations</li>
                <li>Playlists</li>
                <li>Plannings, calendriers</li>
                <li>Médias</li>
                <li>Sites</li>
                <li>Utilisateurs</li>
                <li>Etc, etc...</li>
              </ul>
              <br />
              <label>Taper le nom du client pour confirmer</label>
              <input type="text" class="form-control" v-model="confirm_name" placeholder="Nom du client">
              <br/>
              <input type="submit" class="btn btn-danger btn-block" value="Supprimer définitivement"/>
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
    return this.$store.state.ClientStore;
  },

  mounted: function() {
    $('#modalDestroy').on('hidden.bs.modal', () => {
      $('#confirmation video')[0].pause();
    });
  },

  methods: {
    destroy: function() {
      if (this.client.name === this.confirm_name) {
        $('#confirmation').removeClass('hidden');
        $('#confirmation video')[0].play();
        $('#destroyPrompt').addClass('hidden');
        $('.modal-title').toggleClass('hidden');
        this.$store.dispatch('ClientStore/destroy').then(() => {
          $('#modalDestroy').modal('hide');
          this.$router.push('/clients');
        }).catch(() => {
          $('#confirmation').addClass('hidden');
          $('#confirmation video')[0].pause();
          $('#destroyPrompt').removeClass('hidden');
          $('.modal-title').toggleClass('hidden');
          $('#modalDestroy').modal('hide');

          alert("Hu ho... quelque chose qui ne devrait jamais arriver est arrivé");
        })
      } else {
        alert("Le nom ne correspond pas !")
      }
    }
  }
}
</script>
