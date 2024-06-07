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
            <input type="text" v-model="form.firstname_cont">
            <label>{{ $t('users.first_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.lastname_cont">
            <label>{{ $t('users.last_name') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.entity_cont">
            <label>{{ $t('Entity') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.email_cont">
            <label>{{ $t('users.email') }}</label>
          </div>
        </div>

        <div class="s12 m6 l2">
          <div class="field label border">
            <input class="form-control" type="text" v-model="form.phone_cont">
            <label>{{ $t('users.phone') }}</label>
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
  firstname_cont: route.query["q[firstname_cont]"],
  lastname_cont: route.query["q[lastname_cont]"],
  entity_cont: route.query["q[entity_cont]"],
  email_cont: route.query["q[email_cont]"],
  phone_cont: route.query["q[phone_cont]"],
});

const toggleForm = (e) => {
  e.target.closest("a").classList.toggle('open');
  filters.value.classList.toggle('hidden');
};

const searchQuery = () => {
  return '/api/admin/contacts.xlsx?' + new URLSearchParams(route.query);
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
    firstname_cont: '',
    lastname_cont: '',
    entity_cont: '',
    email_cont: '',
    phone_cont: '',
  }
}

</script>
