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
          <router-link :to="'/devices/new'" class="add-link">+ {{ $t('device.new_device') }}</router-link>
        </div>
      </div>

      <div class="col-xs-24 mt-10">
        <ul class="nav nav-tabs droppable" >
          <li class="active"><router-link to="/devices">Devices</router-link></li>         
          <li><router-link to="/addons">Addons</router-link></li>
          <li><router-link to="/shapes">Modèles</router-link></li>
        </ul>
        <div class="row styled-form">
          <div class="col-xs-24 overflowable">
            <filters :pagination="pagination" :player_versions="player_versions"></filters>

            <table class="table table-striped table-thin">
              <thead>
                <tr>
                  <th style="width: 80px;">{{ $t('ref') }}</th>
                  <th style="width: 130px;">{{ $t('type') }}</th>
                  <th style="width: 100px;">{{ $t('status') }}</th>
                  <th style="width: 100px;">{{ $t('device.os') }}</th>
                  <th style="width: 200px;">{{ $t('device.serial') }}</th>
                  <th style="width: 200px;">{{ $t('device.model') }}</th>
                  <th>Localisation</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="device in devices" :key="device.id">
                  <td>
                    <router-link :to="'/devices/' + device.id + '/edit'">{{ device.id }}</router-link>
                  </td>
                  <td>{{ $t(device.shape.type) }}</td>
                  <td>
                    <span v-if="device.status == 'ready'">
                      <a @click.prevent="setShipped(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                    </span>
                    <span v-else-if="device.status == 'returned'">
                      <a @click.prevent="modalRepair(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                    </span>
                    <span v-else-if="device.status == 'to_repair'">
                      <a @click="modalRepair(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                    </span>
                    <span v-else>{{ $t(`device.${device.status}`) }}</span>
                  </td>
                  <td>{{ $t(device.os) }}</td>
                  <td>{{ device.serial }}</td>
                  <td>{{ device.shape.name }}</td>
                  <td>{{ device.location }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <pagination :pagination="pagination"></pagination>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>
import Pagination from "../shared/_pagination.vue";
import filters from "../devices/_filters.vue";

export default {
  components: {
    Pagination,
    filters
  },

  data: function() {
    return this.$store.state.DeviceStore;
  },

  mounted: function() {
    this.$store.dispatch("DeviceStore/index", this.$route.fullPath);
  },

  methods: {
    setShipped: function(device) {
      device.status = "shipped";
      this.$store.dispatch("DeviceStore/update", {
        id: device.id,
        status: "shipped"
      });
    },
    setRepair: function(device) {
      device.status = "to_repair";
      this.$store.dispatch("DeviceStore/update", {
        id: device.id,
        status: "to_repair"
      });
    },
    setStock: function(device) {
      device.status = "to_repair";
      this.$store.dispatch("DeviceStore/update", {
        id: device.id,
        status: "stock"
      });
    },
    modalRepair: function(device) {
      this.$store.commit("DeviceStore/one", { device: device });
      $("#modalRepair").modal();
    }
  }
};
</script>
