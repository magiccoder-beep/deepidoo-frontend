<template>
  <div class="modal fade" id="modalDestroy" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ $t('delete') }}</h4>
        </div>
        <div class="modal-body">
          <form class="form" v-on:submit.prevent="confirmDestroy" accept-charset="UTF-8">
            <div class="form-group">
              <p>Veuillez saisir la référence de cet équipement afin de confirmer sa suppression définitive</p>
              <span class="error" style="position: relative; top: 0">{{ errors.spot }}</span>
              <input id="input-spot" class="form-control" type="text" placeholder="Veuillez saisir le spot id" v-model="input_spot_id"/>
              <br />
            </div>

            <a href="#" class="btn btn-default pull-left" @click.prevent="cancel">{{ $t('cancel') }}</a>
            <submit-btn v-if="input_spot_id == this.spot.id" :klass="'btn btn-danger pull-right'" :value="$t('delete')"></submit-btn>
          </form>

          <div class="clearfix"><br /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.SpotStore;
  },

  methods: {
    confirmDestroy: function() {
      if(parseInt($('#input-spot').val()) == this.spot.id){
        this.$store.dispatch('SpotStore/destroy', this.$route.params.id).then((data) => {
          this.cancel();
          this.$router.push('/spots');
        })
      }
      else{
        window.location.reload();
      }
    },
    cancel: function() {
      $('#modalDestroy').modal('hide');
    },
  }
}
</script>
