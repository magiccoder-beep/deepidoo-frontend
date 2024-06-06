<template>
  <section class="filters">

    <div class="row-top">
      <a href="#" @click.prevent="toggleForm" class="droppable">
        <i class="tiny right">keyboard_arrow_right</i>
        <i class="tiny down">keyboard_arrow_down</i>
        {{ $t('filter') }}
        <span v-if="props.pagination.count > 0">({{ props.pagination.count }} {{ $t('results', props.pagination.count)
          }})</span>
      </a>
      <a :href="searchQuery()"><i class="tiny">docs_apps_script</i>{{ $t('xls_export') }}</a>
    </div>

    <form ref="filters" @submit.prevent="search" class="hidden" accept-charset="UTF-8">
      <div class="grid">
        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.id_eq" class="form-control" />
            <label>{{ $t('Ref') }}</label>
          </div>
        </div>

        <div class="s12 m6 l2">
          <div class="field label border">
            <input type="text" v-model="form.name_cont" class="form-control" />
            <label>{{ $t('name') }}</label>
          </div>
        </div>
      </div>

      <div class="row-actions">
        <button @click="reset" href="#" class="button transparent border">{{ $t('reset_filters') }}</button>
        <button class="btn">{{ $t('filter') }}</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import router from '../../routes';

const route = useRoute();
const props = defineProps(['pagination']);
const filters = ref(null);
const form = ref({
  id_eq: route.query["q[id_eq]"],
  name_cont: route.query["q[name_cont]"],
});

const toggleForm = (e) => {
  e.target.closest("a").classList.toggle('open');
  filters.value.classList.toggle('hidden');
};

const searchQuery = () => {
  return '/api/admin/clients.xlsx?' + new URLSearchParams(route.query);
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
    id_eq: '',
    name_cont: '',
  }
}


</script>
