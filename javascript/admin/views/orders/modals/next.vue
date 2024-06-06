<template>
  <div class="modal fade" id="modalNext" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" @click.prevent="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{ order.name }}</h4>
        </div>
        <div class="modal-body">
          <div :class="{'hidden': order.next_step != 'validate'}">
            <form v-on:submit.prevent="validate" accept-charset="UTF-8" class="form row">
              <div class="col-xs-24">
                <p>La validation de la commande va générer la création des Spot + Devices + Site associés</p>
                <br />
                <input type="submit" class="btn btn-warning" style="width: 100%" value="Valider la commande" />
              </div>
            </form>
          </div>

          <div :class="{'hidden': order.next_step != 'manufacturing'}">
            <form v-on:submit.prevent="manufacturing" accept-charset="UTF-8" class="form row">
              <div class="col-xs-24">
                <label>Préparateur</label>
                <select class="form-control" v-model="order.manufacturer_id" required="true">
                  <option value="1">Deepidoo</option>
                  <option value="2">Edox</option>
                  <option value="3">LGIT</option>
                </select>
                <br />
                <b>Une fois la commande envoyée en préparation vous ne pourrez plus modifier le type de matériel et ses Addons</b><br /><br /> Plus aucun retour en arrière possible après cette étape.<br /><br />
                <input type="submit" class="btn btn-warning" style="width: 100%" value="Envoyer en préparation" />
              </div>
            </form>
          </div>

          <div :class="{'hidden': order.next_step != 'ship'}">
            <form v-on:submit.prevent="ship('auto')" accept-charset="UTF-8" class="form row">
              <span class="error" style="padding-left: 10px">{{ errors.label_generation }}</span>
              <span class="error" style="padding-left: 10px">{{ errors.aftership }}</span>
              <div class="cleafix" style="height: 10px"></div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label>Long. (cm)</label>
                  <input type="text" class="form-control" v-model="order.dimensions.width">
                </div>
              </div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label>Larg. (cm)</label>
                  <input type="text" class="form-control" v-model="order.dimensions.depth">
                </div>
              </div>
              <div class="col-xs-5">
                <div class="form-group">
                  <label>Haut. (cm)</label>
                  <input type="text" class="form-control" v-model="order.dimensions.height">
                </div>
              </div>
              <div class="col-xs-8 col-xs-offset-1">
                <div class="form-group">
                  <label>Poids total</label>
                  <input type="text" class="form-control" v-model="order.dimensions.weight">
                </div>
              </div>
              <br />
              <div class="col-xs-24" style="height: 80px">
                <label>Transporteur</label>
                <select class="form-control" v-model="order.carrier_id" required>
                  <option value="1">TNT (National)</option>
                  <option value="2">FEDEX</option>
                  <option value="3">Chronopost</option>
                </select>
              </div>
              <div class="col-xs-24">
                <br />
                <input type="submit" :class="'btn btn-warning ' + progress" style="width: 100%" value="Générer le bon de commande" />
              </div>
            </form>

            <form v-on:submit.prevent="ship('manual')" accept-charset="UTF-8" class="form row">
              <div class="col-xs-24" style="height: 50px;padding-top: 20px;padding-bottom: 20px">
                <a href="#" @click.prevent="skipShipping" style="float: right; color: red">Pas d'expédition</a>
                <a href="#" @click.prevent="toggleShippingMode">+ L'expédition est gérée manuellement</a>
              </div>
              <div class="manual-label hidden">
                <div class="col-xs-24" style="height: 80px">
                  <label>Transporteur</label>
                  <select class="form-control" v-model="order.carrier_id" required>
                    <option value="1">TNT (National)</option>
                    <option value="2">FEDEX</option>
                    <option value="3">Chronopost</option>
                  </select>
                </div>

                <div class="col-xs-18">
                  <label>Tracking code</label>
                  <input type="text" class="form-control" placeholder="Tracking code" v-model="order.tracking_code" required>
                </div>
                <div class="col-xs-6">
                  <label>&nbsp;</label><br />
                  <input type="submit" class="btn btn-warning" value="Enregistrer" style="height: 40px; line-height: 28px;width: 100%"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return this.$store.state.OrderStore;
  },

  methods: {
    close: function() {
      $('#modalNext').modal('hide');
    },
    next: function(order) {
      this.$store.commit('OrderStore/setOrder', order);
      $('#modalNext').modal();
    },
    validate: function() {
      this.$store.dispatch('OrderStore/update', 'validate').then(response => {
        this.$store.dispatch('OrderStore/index', this.$route.fullPath)
        if(response.order.next_step == 'none') {
          $('#modalNext').modal('hide');
        }
      })
    },
    manufacturing: function() {
      this.$store.dispatch('OrderStore/update', 'manufacturing').then(response => {
        this.$store.dispatch('OrderStore/index', this.$route.fullPath);
        if(response.order.next_step == 'none') {
          $('#modalNext').modal('hide');
        }
      })
    },
    skipShipping: function() {
      this.$store.dispatch('OrderStore/update', 'skip_shipping').then(response => {
        this.$store.dispatch('OrderStore/index', this.$route.fullPath);
        if(response.order.next_step == 'none') {
          $('#modalNext').modal('hide');
        }
      })
    },
    toggleShippingMode: function() {
      $('.manual-label').toggleClass('hidden');
    },
    ship: function(mode) {
      this.$store.commit('OrderStore/setShippingMode', mode);
      this.$store.dispatch('OrderStore/update', 'ship').then(response => {
        this.$store.dispatch('OrderStore/index', this.$route.fullPath)
        setTimeout(function() {
          if(response.order.label_url != null) {
            win = window.open(response.order.label_url, '_blank');
            win.focus();
          }
        }, 500);
        if(response.order.next_step == 'none') {
          $('#modalNext').modal('hide');
        }
      })
    }
  }
};
</script>

