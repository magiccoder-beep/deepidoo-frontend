<template>
  <div class="main_container orders">
    <nav-top></nav-top>

    <div class="batches" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">Admin</router-link></li>
          <li><router-link to="/orders">{{ $t('batches.title') }}</router-link></li>
          <li>{{ order.name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <ul class="nav nav-tabs" style="margin-bottom: 0px;">
          <li><router-link :to="'/orders/' + order.id">Suivi</router-link></li>
          <li><router-link :to="'/orders/' + order.id + '/spots/0'">Produits</router-link></li>
          <li class="active"><router-link :to="'/orders/' + order.id + '/shipping'">Livraison</router-link></li>
        </ul>

        <div class="row" style="margin: 0;background-color: #fff;border: 1px solid #ddd;border-top: 0;padding-top: 20px">
          <div class="col-xs-24 col-md-12">
            <div class="form-group">
              <label>Adresse de livraison</label>
              <div class="well">
                <p>{{ order.shipping.site }}
                  <br />
                {{ order.shipping.address }}
                <br />
                {{order.shipping.address_2}}
                <br />{{ order.shipping.zipcode }} {{ order.shipping.city }}
                <br />{{ order.shipping.country }}</p>
              </div>
            </div>
            <div class="form-group">
              <label>Contact de livraison</label>
              <div class="well">
                Nom: {{ order.shipping.contact_name || "Non renseigné"}}
                <br />
                Tel: {{ order.shipping.contact_tel || "Non renseigné"}}
                <br />
                Mail: {{order.shipping.contact_mail || "Non renseigné"}}
                <br />
                Date d'expedition: {{order.shipping.expedition_date || "Non renseigné"}}
              </div>
            </div>
            <div class="form-group" v-if="order.carrier_name != null">
              <label>Transporteur</label>
              <div class="well">
                <a :href="order.carrier_url" target="_blank">{{ order.carrier_name }}</a>
              </div>
            </div>
            <a href="#" class="btn btn-default" style="float: left; margin: 0 20px 20px 0;" @click.prevent="printDelivery()">Bordereau de livraison</a>
            <a href="#" class="btn btn-default" style="float: left;" @click.prevent="printOrder()">Bon de commande</a>
          </div>

          <div v-if="order.tracking_url != null" class="col-xs-24 col-md-12" style="padding-top: 14px">
            <label>Suivi</label>
            <iframe :src="order.tracking_url" border="no" frameBorder="0"  style="width: 100%;min-height: 1000px;border: 1px solid #ddd" /> 
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

  created: function() {
    this.$store.dispatch('OrderStore/show', this.$route.params.id);
  },

  methods: {
    next: function() {
      this.$store.dispatch('OrderStore/create', this.$route.params.id);
    },
    printDelivery: function() {
      window.open(location.protocol + '//' + location.host + '/fr/print/deliveries/' + this.order.id, "Bordereau de livraison" + this.order.id,"menubar=no, status=no, scrollbars=no, menubar=no, width=786, height=1116");
    },
    printOrder: function() {
      window.open(location.protocol + '//' + location.host + '/fr/print/orders/' + this.order.id, "Bon de commande " + this.order.id,"menubar=no, status=no, scrollbars=no, menubar=no, width=786, height=1116");
    }
  }
}
</script>
