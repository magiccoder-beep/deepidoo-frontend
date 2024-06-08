<template>
  <section class="filters">
    <div class="row-top">
      <a href="#" @click.prevent="toggleFilters" class="droppable">
        <i class="tiny right">keyboard_arrow_right</i>
        <i class="tiny down">keyboard_arrow_down</i>
        {{ $t('filter') }} 
        <span v-if="props.pagination.count > 0">({{ props.pagination.count }} {{ $t('results', props.pagination.count) }})</span>
      </a>
      <a :href="searchQuery()"><i class="tiny">docs_apps_script</i>{{ $t('xls_export') }}</a>
    </div>

    <form ref="filters" @submit.prevent="search" class="hidden" script-charset="UTF-8">
      <div class="grid">
        <div class="s12 l3">
          <div class="field label border">
            <input type="date" v-model="form.created_at_gteq" />
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.CREATED_BETWEEN }}</label>
          </div>
        </div>
        <div class="s12 l3">
          <div class="field label border">
            <input type="date" v-model="form.created_at_lteq" />
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.AND }}</label>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <select v-model="form.tagged_with">
              <option value="">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.INDIFFERENT }}</option>
              <option value="none">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.NONE }}</option>
              <option value="any">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.ANY }}</option>
            </select>
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.TAGGED }}</label>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <select v-model="form.played_values">
              <option value="">
                {{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.INDIFFERENT }}
              </option>
              <option value="never">
                {{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.NEVER }}
              </option>
              <option value="at_least_one">
                {{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.AT_LEAST_ONCE }}
              </option>
              <option value="at_least_ten">
                {{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.AT_LEAST_TEN }}
              </option>
              <option value="more_than_hundred">
                {{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.MORE_THAN_HUNDRED }}
              </option>
            </select>
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.PLAYED_COUNT }}</label>
          </div>
        </div>
        <div class="s12 l2">
          <div class="field label border">
            <select v-model="form.validated_eq">
              <option value="">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.INDIFFERENT }}</option>
              <option value="true">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.YES }}</option>
              <option value="false">{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.NO }}</option>
            </select>
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.IS_VALID }}</label>
          </div>
        </div>
        <div class="s12 l6">
          <div class="field label border">
            <input type="text" v-model="form.artist_name_cont" />
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.ARTIST }}</label>
          </div>
        </div>
        <div class="s12 l6">
          <div class="field label border">
            <input type="text" v-model="form.name_cont" />
            <label>{{ MUSIC_CONSTS.MESSAGES.INTERFACE_LABEL.TITLE }}</label>
          </div>
        </div>
        <div class="s12 l12">
          <div class="row-actions">
            <button @click="reset" href="#" class="button transparent border">{{ $t('reset_filters') }}</button>
            <button class="btn">{{ $t('filter') }}</button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import router from '../../routes';
import * as MUSIC_CONSTS from '../../../const/music';

const route = useRoute();
const props = defineProps(['pagination']);
const filters = ref(null);
const form = ref({
  name_cont: "",
  artists_name_cont: "",
  validated_eq: "",
  played_values: "",
  tagged_with: "",
  created_at_lteq: "",
  created_by_id_eq: ""
});

const toggleFilters = () => {
  document.querySelector('.filters form').classList.toggle('hidden');
};

const searchQuery = () => {
  return '/api/admin/musics.xlsx?' + new URLSearchParams(route.query);
}

const search = () => {
  const query = Object.fromEntries(
    Object.entries(form.value).map(entry => [`q[${entry[0]}]`, entry[1]])
  );
  router.push({ path: route.path, query: query });
};

const reset = () => {
  form.value = {
    ...form.value,
    name_cont: "",
    artists_name_cont: "",
    validated_eq: "",
    played_values: "",
    tagged_with: "",
    created_at_lteq: "",
    created_by_id_eq: ""
  };
  router.push({ path: route.path, query: '' });
};

</script>
