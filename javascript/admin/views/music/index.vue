<template>
  <main class="responsive max">
    <div class="grid">
      <div class="s12">
        <ul class="breadcrumb lex justify-start">
          <li>
            <router-link :to="'/'">{{ $t('top_nav.admin_title') }}</router-link>
          </li>
          <li>
            <router-link :to="`${MUSIC_CONSTS.ROUTES.INDEX.URL}`">{{ MUSIC_CONSTS.ROUTES.INDEX.NAME }}</router-link>
          </li>
        </ul>
      </div>
      <div class="s12">
        <MusicFilters :pagination="store.pagination" />
        <table class="stripes table table-stripped">
          <thead>
            <tr>
              <th class="min" style="width: 100px;">{{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.ID }}</th>
              <th class="min" style="width: 120px;">{{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.CREATED_AT }}</th>
              <th class="min" style="width: 220px;">{{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.ARTIST }}</th>
              <th>{{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.TITLE }}</th>
              <th class="min" style="width: 130px;">{{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.PLAYED_COUNT }}</th>
              <th class="min">
                {{ MUSIC_CONSTS.MESSAGES.TABLE_HEADER.IS_VALID }}
                <input type="checkbox" v-model="store.is_checked" @change="toggleAll"/>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="content in store.contents">
              <td><a :href="'/fr/music/?q%5Bid_eq%5D=' + content.id">{{ content.id }}</a></td>
              <td>{{ content.created_at }}</td>
              <td>{{ content.artist }}</td>
              <td>
                {{ content.name }} <br />
                <a href="#" v-for="tag in content.tags" :key="tag.id" class="tagged" :style="'background-color: ' + tag.color">{{ tag.label }}</a>
              </td>
              <td>{{ content.played_count }}</td>
              <td><input type="checkbox" :checked="content.validated" value="false" @change="toggleValidated(content.id)" /></td>   
            </tr>
          </tbody>
        </table>
        <SharedPagination v-if="store.pagination" :store="store" @clicked="load" />
      </div>
    </div>
  </main>
</template>

<script setup>

import MusicFilters from './_filters.vue';
import SharedPagination from '../shared/_pagination.vue';
import { MusicStore } from '../../stores/music';
import * as MUSIC_CONSTS from '../../../const/music';

const store = MusicStore();
const location = useRoute();

const toggleValidated = function(id) {
  store.update(id);
};

const toggleAll = function() {
  store.updateAll(store.is_checked);
};

const load = function() {
  store.index(location.fullPath);
};

onMounted(() => {
  load();
});

</script>
