<template>
  <div class="modal fade" id="modalReplace" tabindex="-1" role="dialog" ref="modalSav">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Nouveau Device #{{ spot.device_id }}</h4>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="replace" accept-charset="UTF-8" class="form">
            <ul class="devices-list list list-unstyled">
              <label>{{ $t('device.sav_device') }}
                <span class="error hidden">Choix dans la liste requis</span>
              </label>
              <select v-model="selected_device_id" class="form-control">
                <option v-for="device in devices" :value="device.id" :key="device.id">{{ device.display_name }}</option>
              </select>
            </ul>
            <br />
            <input type="submit" :class="'btn btn-warning btn-block '+ progress " :value="$t('save')" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      spot: {},
      devices: [],
      errors: {},
      progress: '',
      selected_device_id: null
    }
  },

  methods: {
    load: function(spot) {
      this.spot = spot;
      const that = this;
      $.ajax({
        url: `/spots/${spot.id}/allocatables`,
        type: "get",
        success: function(data) {
          that.devices = data.devices;
        },
      });
      $("#modalReplace").modal();
    },
    replace: function() {
      const that = this;
      $.ajax({
        url: `/spots/${that.spot.id}/allocate`,
        type: "post",
        data: {
          do: 'replace',
          device_id: that.selected_device_id
        },
        success: function(data) {
          window.location.reload();
        },
        error: function() {
          $('.error').removeClass('hidden');
        }
      });
    }
  }
};
</script>
