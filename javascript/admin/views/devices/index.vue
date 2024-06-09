<template>
  <main class="responsive max">
    <nav-top></nav-top>

    <div class="grid">
      <div class="s12">
        <ul class="breadcrumb pull-left">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>{{ $t('top_nav.devices') }}</li>
        </ul>
        <div class="pull-right">
          <router-link :to="`${DEVICE_CONSTS.ROUTES.NEW.URL}`" class="add-link">+ {{ $t('device.new_device') }}</router-link>
        </div>
      </div>
      <div class="s12">
        <div class="tabs min left-align" >
          <a class="active">
            <router-link :to="`/${DEVICE_CONSTS.ROUTES.INDEX}`">{{ DEVICE_CONSTS.MESSAGES.NAME }}</router-link>
          </a>
          <a>
            <router-link :to="`${ADDON_CONSTS.ROUTES.INDEX.URL}`">{{ ADDON_CONSTS.MESSAGES.NAME }}</router-link>
          </a>
          <a>
            <router-link :to="`${SHAPES_CONSTS.ROUTES.INDEX.URL}`">{{ SHAPES_CONSTS.MESSAGES.NAME }}</router-link>
          </a>
        </div>
      </div>
      
      <div class="s12">
        <!-- <DevicesFilters :pagination="store.pagination"></DevicesFilters> -->
        <table class="stripes table table-stripped">
          <thead>
            <tr>
              <th class="min" style="width: 80px;">{{ $t('ref') }}</th>
              <th class="min" style="width: 130px;">{{ $t('type') }}</th>
              <th class="min" style="width: 100px;">{{ $t('status') }}</th>
              <th class="min" style="width: 100px;">{{ $t('device.os') }}</th>
              <th class="min" style="width: 200px;">{{ $t('device.serial') }}</th>
              <th class="min" style="width: 200px;">{{ $t('device.model') }}</th>
              <th>Localisation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in store.devices" :key="device.id">
              <td>
                <router-link :to="`/${DEVICE_CONSTS.ROUTES.INDEX.URL}/` + device.id + `${DEVICE_CONSTS.ROUTES.EDIT.URL}`">
                  {{ device.id }}
                </router-link>
              </td>
              <td>{{ $t(device.shape.type) }}</td>
              <td>
                <span v-if="device.status == DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.READY">
                  <a @click.prevent="setShipped(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                </span>
                <span v-else-if="device.status == DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.RETURNED">
                  <a @click.prevent="modalRepair(device)" href="#">{{ $t(`device.${device.status}`) }}</a>
                </span>
                <span v-else-if="device.status == DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.TO_REPAIR">
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
        <!-- <SharedPagination v-if="store.pagination" :store="store" @clicked="load" /> -->
      </div>
    </div>

    <footer-custom></footer-custom>
  </main>
</template>

<script setup>
import { DeviceStore } from '../../stores/device';
import * as DEVICE_CONSTS from '../../../const/device';
import * as ADDON_CONSTS from '../../../const/addon';
import * as SHAPES_CONSTS from '../../../const/shape';

const store = DeviceStore();
const location = useRoute();

const setShipped = function () {
  store.device.status = DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.SHIPPED;
  store.update();
};

const setRepair = function () {
  store.device.status = DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.TO_REPAIR;
  store.update();
};

const setStock = function () {
  store.device.status = DEVICE_CONSTS.MESSAGES.DEVICE_STATUS.STOCK;
  store.update();
};

const modalRepair = function () {
  $("#modalRepair").modal();
};

const load = function () {
  store.index(location.fullPath);
};

onMounted(() => {
  load();
});

</script>
