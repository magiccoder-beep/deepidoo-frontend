<template>
  <div class="modal fade" id="modalSav" tabindex="-1" role="dialog" ref="modalSav">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{ $t('device.new_sav') }}</h4>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="repair" accept-charset="UTF-8" class="form">
            <label>{{ $t('device.current_spot') }}</label>
            <p>#{{spot.id}}</p>
            <ul class="devices-list list list-unstyled">
              <label>{{ $t('device.sav_device') }}
                <span class="error">{{errors.device}}</span>
              </label>
              <select v-model="selected_device_id" class="form-control">
                <option v-for="device in devices" :value="device.id" :key="device.id">{{ device.display_name }}</option>
              </select>
            </ul>
            <br />
            <label>Addresse de livraison</label>

            <br />

            <div class="form-group">
              <label class="mt-label visible">Site*</label>
              <input type="text" class="form-control" v-model="shipping.site" />
            </div>
            <div class="form-group">
              <label class="mt-label visible">Addresse*</label>
              <input type="text" class="form-control" v-model="shipping.address"/>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Addresse 2</label>
              <input type="text" class="form-control" v-model="shipping.address_2" />
            </div>
            <div class="form-group">
              <label class="mt-label visible"> Code postal* </label>
              <input type="number" class="form-control" v-model="shipping.zipcode"/>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Ville*</label>
              <input type="text" class="form-control" v-model="shipping.city"/>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Pays* ({{country_full}})</label>
              <select  class="form-control" v-model="shipping.country">
                <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Nom contact</label>
              <input type="text" class="form-control" v-model="shipping.contact_name"/>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Mail</label>
              <input type="text" class="form-control" v-model="shipping.contact_mail"/>
            </div>
            <div class="form-group">
              <label class="mt-label visible">Phone</label>
              <input type="text" class="form-control" v-model="shipping.contact_tel"/>
            </div>

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
      selected_device_id: null,
      country_full: '',
      shipping:{
        country: "",
        city: "",
        zipcode: "",
        address: "",
        address_2: "",
        site: "",
        contact_name: "",
        contact_tel: "",
        contact_mail: ""
      },
      countries: [
        { code: "AT", name: "Autriche" },
        { code: "BE", name: "Belgique" },
        { code: "BG", name: "Bulgarie" },
        { code: "CY", name: "Chypre" },
        { code: "CZ", name: "République tchèque" },
        { code: "DE", name: "Allemagne" },
        { code: "DK", name: "Danemark" },
        { code: "EE", name: "Estonie" },
        { code: "ES", name: "Espagne" },
        { code: "FI", name: "Finlande" },
        { code: "FR", name: "France" },
        { code: "GR", name: "Grèce" },
        { code: "HR", name: "Croatie" },
        { code: "HU", name: "Hongrie" },
        { code: "IE", name: "Irlande" },
        { code: "IT", name: "Italie" },
        { code: "LT", name: "Lituanie" },
        { code: "LU", name: "Luxembourg" },
        { code: "LV", name: "Lettonie" },
        { code: "MT", name: "Malte" },
        { code: "NL", name: "Pays-Bas" },
        { code: "PL", name: "Pologne" },
        { code: "PT", name: "Portugal" },
        { code: "RO", name: "Roumanie" },
        { code: "SE", name: "Suède" },
        { code: "SI", name: "Slovénie" },
        { code: "SK", name: "Slovaquie" },
        { code: "GB", name: "Royaume Uni" }
      ]
    }
  },

  mounted: function() {
    $(this.$refs.modalSav).on("shown.bs.modal", this.showSavModal);
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
          that.shipping = data.shipping;
          that.country_full = data.country_full;
        },
      });
      $("#modalSav").modal();
    },
    repair: function() {
      const that = this;
      that.progress = "loading disabled";
      var data =  {
        do: 'repair',
        device_id: this.selected_device_id,
        shipping: this.shipping,
      }

      if(data.shipping.country && data.shipping.city && data.shipping.address && data.shipping.zipcode && data.shipping.site){
       $.ajax({
          url: `/spots/${that.spot.id}/allocate`,
          type: "post",
          data: data,
          success: function(data) {
            window.location.reload();
          },
          error: function() {
            that.progress = "";
            $('.error').removeClass('hidden');
          }
        });
      }
      else{
        alert('Livraison invalide');
        that.progress = "";
      }
    }
  }
};
</script>
