<template>
  <div class="main_container orders">
    <nav-top></nav-top>

    <div class="batches" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link :to="'/'">Admin</router-link></li>
          <li>{{ $t('batches.title') }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <ul class="nav nav-tabs order-tabs" style="margin-bottom: 0px;">
          <li :class="{'active': current_tab == 'list'}"><a href="#" @click.prevent="setTab('list')">Liste</a></li>
          <li :class="{'active': current_tab == 'charts'}"><a href="#" @click.prevent="setTab('charts')">Statistiques</a></li>
        </ul>

        <div class="row" style="margin: 0;background-color: #fff;border: 1px solid #ddd;border-top: 0;padding: 10px">
          <div class="col-xs-24" style="margin: 30px auto 20px 0;">
            <filters :pagination="pagination"></filters>
          </div>

          <div :class="{'hidden': orders.length == 0}">
            <table :class="{'hidden': current_tab == 'charts'}" class="table table-thin orders-table" style="width: 100%">
              <thead>
                <tr>
                  <th style="width: 100px">Référence</th>
                  <th style="width: 140px">Dernière modif.<a href="#" @click="orderBy($event, 'updated_at|asc')" class="order-column" :class="arrowKlass('updated_at')"></a></th>
                  <th>Nom</th>               
                </tr>
              </thead>
              <tbody>
                <template v-for="order in orders" > 
                  <tr :key="order.id">           
                    <td rowspan="2"><router-link :to="'orders/' + order.id"><b>{{ order.id }}</b></router-link></td>
                    <td>
                      {{ order.updated_at }}<br />
                      <b v-if="order.expired_at != null" style="color: red" title="Date limite d'expédition">{{ order.expired_at }}</b>
                    </td>
                    <td>
                      <div class="name">
                        <b>[{{order.client_name}}] {{ order.name }}</b>
                        <a href="#" v-if="order.tags.length == 0" @click.prevent="showTags({order: order})">+ Ajouter un tag</a>
                        <a href="#" v-else @click.prevent="showTags({order: order})" v-for="tag in order.tags" :key="tag.id" class="tagged" :style="'background-color: ' + tag.color">{{ tag.name }}</a>
                      </div>
                      <span v-for="spot in order.spots" :key="spot.uid">
                        <a v-if="spot.device_id == '----'" href="#" class="player-pack"><i :class="spot.icon"></i>{{ spot.device_id }}<span :class="'player-status ' + spot.status"></span></a>
                        <a v-else :href="'/fleet/spots/' + spot.id" class="player-pack" target="_blank"><i :class="spot.icon"></i>{{ spot.device_id }}<span :class="'player-status ' + spot.status"></span></a>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a v-if="order.next_step != 'none'" href="#" @click.prevent="next(order)" class="btn btn-primary" style="width: 100%">{{ $t(order.next_step) }}</a>
                    </td>
                    <td style="padding-left: 0; padding-right: 0;">
                      <div class="status-steps">
                        <span :class="order.steps.request">Demande</span>
                        <span :class="order.steps.manufacturing">Préparation</span>
                        <span :class="order.steps.shipping" v-if="order.status == 'shipped'"><a  href="https://deepidoo.aftership.com/12345678997656394930" target="_blank">Expédiée</a></span>
                        <span :class="order.steps.shipping" v-else>Expédition</span>
                        <span :class="order.steps.done">Mise en service</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>

            <div :class="{'hidden': current_tab == 'list'}" class="row" style="padding-top: 30px">
              <div class="col-xs-24 col-md-14">
                <div id="chart"></div>
              </div>
              <div class="col-xs-24 col-md-8 col-md-offset-2" style="padding-top: 20px">
                <table class="table table-thin table-striped orange-header table-charts">
                  <tbody>
                    <tr v-for="(item, i) in chart_series" :key="i">
                      <td><span :style="'color: #fff;background-color:' + chart_colors[i]">{{ chart_totals[i] }}</span></td>
                      <td>{{ $t(chart_labels[i]) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <pagination :pagination="pagination"></pagination>
        <modal-tags ref="modalTags" @changed="reload"></modal-tags>
        <modal-next ref="modalNext" @changed="reload"></modal-next>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from './_filters.vue';
import Pagination from '../shared/_pagination.vue'
import ModalOrderTags from "./modals/tags.vue"
import ModalNext from "./modals/next.vue"

export default {
  components: {
    'filters': Filters,
    'pagination': Pagination,
    'modal-tags': ModalOrderTags,
    'modal-next': ModalNext
  },

  data: function() {
    return this.$store.state.OrderStore;
  },

  created: function() {
    this.$store.commit('OrderStore/setTab', 'list');
    this.$store.dispatch('OrderStore/index', this.$route.fullPath).then(response => {
      var options = {
        series: this.metrics.series,
        colors: this.chart_colors,
        chart: {
          type: 'pie',
        },
        labels: this.metrics.labels,
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        tooltip: {
          enabled: true,
    	    pointFormat: '{series.name}: {point.percentage}%',
          percentageDecimals: 1,
        },
        legend: {
          position: 'top'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            }
          }
        },
        theme: {
          monochrome: {
            enabled: false,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
      };

      this.$store.commit('OrderStore/setupChart', {element: '#chart', options: options});
      this.chart.render();
    })    
  },

  methods: {
    reload: function() {
      this.$store.dispatch('OrderStore/index', this.$route.fullPath).then(response => {
        response.orders.map((updated_order) => {
          if(updated_order.id == this.order.id) {
            this.$refs.modalTags.load({order: updated_order}); 
          }
        })
      })
    },
    setTab: function(tab) {
      this.$store.commit('OrderStore/setTab', tab); 
    },
    showTags: function(order) {
      this.$store.commit('OrderStore/one', order); 
      this.$refs.modalTags.show(order);
    },
    next: function(order) {
      this.$refs.modalNext.next(order);
    },
    arrowKlass: function(column) {
      if(typeof this.$route.query.order != 'undefined') {
        const order = this.$route.query.order.split('|');
        if(order[0] == column) {
          if(order[1] == 'asc') {
            return "icon-up-open";
          } else {
            return "icon-down-open";
          }
        } else {
          return "icon-down-open";
        }
      } else {
        return "icon-down-open";
      }      
    }
  },

  beforeDestroy: function() {
    this.$store.commit('OrderStore/resetChart'); 
  },

  watch: {
    'orders': {
      deep: true,
      handler: function() {
        if(this.chart.show != false) {
          this.chart.updateSeries(this.metrics.series);
        }
        
      }
    }
  }
}
</script>