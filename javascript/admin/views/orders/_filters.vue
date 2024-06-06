<template>
  <div>
    <div style="margin: -10px auto auto -8px">
      <a href="#" class="toggle" @click.prevent="toggleFilters">+ {{ $t('filter') }} <span v-if="pagination.count">({{ pagination.count }} {{ $tc('results', pagination.count) }})</span></a>
    </div>
    <div class="orders-filters hidden">
      <div class="row">
        <div class="col-xs-24 filter-steps">
          <a @click.prevent="toggleAll" href="#" class="tagged">Tous / Aucun</a>
          <a @click.prevent="toggleStatus('1_new')" href="#" class="tagged" :class="{'selected': statuses.includes('1_new')}">Demandes</a>
          <a @click.prevent="toggleStatus('2_confirmed')" href="#" class="tagged" :class="{'selected': statuses.includes('2_confirmed')}">Demandes validées</a>
          <a @click.prevent="toggleStatus('3_manufacturing')" href="#" class="tagged" :class="{'selected': statuses.includes('3_manufacturing')}">Préparation</a>
          <a @click.prevent="toggleStatus('4_ready_for_shipping')" href="#" class="tagged" :class="{'selected': statuses.includes('4_ready_for_shipping')}">Prêt pour envoi</a>
          <a @click.prevent="toggleStatus('5_shipping')" href="#" class="tagged" :class="{'selected': statuses.includes('5_shipping')}">En livraison</a>
          <a @click.prevent="toggleStatus('6_commissioning')" href="#" class="tagged" :class="{'selected': statuses.includes('6_commissioning')}">Mise en service</a>
          <a @click.prevent="toggleStatus('7_done')" href="#" class="tagged" :class="{'selected': statuses.includes('7_done')}">Terminées</a>
        </div>
      </div>
      <div class="row" style="padding-top: 20px">
        <form v-on:submit.prevent="filter" accept-charset="UTF-8" class="form">
          <div class="form-group col-xs-6">
            <label class="mt-label">Référence commande</label>
            <input v-model="form.id_eq" type="text" class="form-control" />
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Nom commande</label>
            <input v-model="form.name_cont" type="text" class="form-control" />            
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Device</label>
            <input v-model="form.spots_device_id_eq" type="text" class="form-control" />
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Manufacturer</label>
            <select v-model="form.manufacturer_id_eq" class="form-control awaiting">
              <option value="">Tous</option>
              <option value="1">Deepidoo</option>
              <option value="2">Edox</option>
              <option value="3">LGIT</option>
            </select>
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Client</label>
            <input v-model="form.organisation_client_name_cont" type="text" class="form-control" />
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Organisation</label>
            <input v-model="form.organisation_name_cont" type="text" class="form-control" />
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Site</label>
            <input  v-model="form.site_name_cache_cont" type="text" class="form-control" />
          </div>
          <div class="form-group col-xs-6">
            <label class="mt-label">Produits</label>
            <select v-model="form.products_name_cache_cont" class="form-control awaiting">
              <option value="">Tous produits</option>
              <option value="audio">PLAY Sound</option>
              <option value="video">PLAY Video</option>
              <option value="soc">PLAY SoC</option>
              <option value="scent">PLAY Scent</option>
              <option value="misc">Accessoires</option>
            </select>            
          </div>

          <div class="form-group col-xs-24" style="padding-top: 6px">
            <input type="hidden" v-model="form.taggings_tag_id_in"> 
            <tag-selector context="order" :selection="[]" @selected="tagSelected" placeholder="Tags"></tag-selector>    
          </div>

          <div class="form-group col-xs-8">
            <input type="submit" class="btn btn-primary" value="Filtrer">
            <a href="/fr/admin/orders" class="btn btn-default">Reset filters</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import tagSelector from '../shared/_tag_selector.vue';
import OrgSelector from '../../../front/components/shared/_sorter.vue';

export default {
  components: {
    'org-selector': OrgSelector,
    'tag-selector': tagSelector
  },

  data: function() {
    return this.$store.state.OrderStore;
  },

  created: function() {
    this.$store.commit('OrderStore/loadStatuses', this.$route.query['q[status_in][]']);
  },

  methods: {
    toggleFilters: function() {
      $('.orders-filters').toggleClass('hidden');
    },
    toggleStatus: function(status) {
      this.$store.commit('OrderStore/toggleStatus', status);
      this.filter();
    },
    toggleAll: function(status) {
      this.$store.commit('OrderStore/toggleAll');
      this.filter();
    },
    tagSelected: function(tags) {
      let ids = tags.selection.map((tag) => {
        return tag.id;
      });
      this.form.taggings_tag_id_in = ids;
    },
    filter: function() {
      let query = {};
      for(let el in this.form) {
        if(el === 'per') {
          query["per"] = this.form[el];
        } else {
          query["q["+el+"]"] = this.form[el];
        }
      };
      if(this.statuses.length > 0) {
        query["q[status_in][]"] = this.statuses;
      } else {
        query["q[status_in][]"] = ['all'];
      }      

      this.$router.push({query: query})
    }
  }
};
</script>
