<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>{{ $t('top_nav.devices') }}</li>
        </ul>
        <div class="pull-right">
          <router-link :to="'/shapes/new'" class="add-link">+ Nouveau modèle</router-link>
        </div>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" >
          <li><router-link to="/devices">Devices</router-link></li>         
          <li><router-link to="/addons">Addons</router-link></li>
          <li class="active"><router-link to="/shapes">Modèles</router-link></li>
        </ul>
        <div class="row styled-form">
          <div class="col-xs-24 overflowable">
            <table class='table table-striped table-thin'>
              <thead>
                <tr>
                  <th style='width: 80px;'>{{ $t('ref') }}</th>
                  <th style='width: 130px;'>{{ $t('type') }}</th>
                  <th style='width: 130px;'>{{ $t('shape.brand') }}</th>
                  <th style='width: 130px;'>Réference</th>
                  <th>{{ $t('shape.name') }}</th>
                  <th style='width: 130px;'>Atifs/Inactifs</th>
                  <th style='width: 100px;text-align: right'>Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shape in shapes" :key="shape.id">
                  <td><router-link :to="'/shapes/' + shape.id +'/edit'">{{ shape.id }}</router-link></td>
                  <td>{{ $t(shape.type) }}</td>
                  <td>{{ shape.brand }}</td>
                  <td>{{ shape.reference }}</td>
                  <td>{{ shape.name }}</td>
                  <td style="text-align: center">
                    <router-link :to="'/devices?q[shape_id_eq]=' + shape.id + '&q[status_eq]=4'">{{ shape.active_devices }}</router-link>
                    /
                    <router-link :to="'/devices?q[shape_id_eq]=' + shape.id + '&q[status_not_eq]=4'">{{ shape.inactive_devices }}</router-link>
                  </td>
                  <td style="text-align: right">{{ shape.price }}€</td>
                </tr>
               </tbody>
             </table>
          </div>
          
          <pagination :pagination='pagination'></pagination>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

import Pagination from '../shared/_pagination.vue'
import Filters from './_filters.vue'

export default {

  components: {
    Pagination,
    Filters
  },

  data: function() {
    return this.$store.state.ShapeStore;
  },

  mounted: function() {
      this.$store.dispatch('ShapeStore/index', this.$route.fullPath);
  }

}
</script>
