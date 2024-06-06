<template>  
  <section class="filters">
    <div class="row-top">
      <a href="#" @click.prevent="toggleForm" class="droppable">
        <i class="tiny right">keyboard_arrow_right</i>
        <i class="tiny down">keyboard_arrow_down</i>
        {{ $t('filter') }} 
        <span v-if="props.pagination.count > 0">({{ props.pagination.count }} {{ $t('results', props.pagination.count) }})</span>
      </a>
      <a :href="searchQuery()"><i class="tiny">docs_apps_script</i>{{ $t('xls_export') }}</a>
    </div>

    <form ref="filters" @submit.prevent="search" class="hidden" accept-charset="UTF-8"> 
      <div class="grid"> 
        <div class="s12 m6 l2">
          <div class="field label border">
            <select v-model="form.role_eq">
              <option value="">{{ $t('all') }}</option>
              <option value="user">{{ $t('users.filterable_roles.user') }}</option>
              <option value="admin">{{ $t('users.filterable_roles.admin') }}</option>
            </select>
            <label>{{ $t('users.role') }}</label>
          </div> 
        </div>
        <div class="s12 m6 l2">
          <div class="field label border"> 
            <input  type="text" v-model="form.firstname_cont">
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
            <input class="form-control" type="text" v-model="form.email_cont">
            <label>{{ $t('users.email') }}</label>
          </div>
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">        
            <input class="form-control" type="text" v-model="form.company_name_cont">
            <label>{{ $t('users.client') }}</label>
          </div> 
        </div>
        <div class="s12 m6 l2">
          <div class="field label border">        
            <input class="form-control" type="text" v-model="form.company_name_cont">
            <label>{{ $t('users.brand') }}</label>
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
const route = useRoute();
const router = useRouter();
const props = defineProps(['pagination']);
const filters = ref(null);
const form = ref({
  firstname_cont: route.query["q[first_name_cont]"],
  lastname_cont: route.query["q[last_name_cont]"],
  email_cont: route.query["q[email_cont]"],
  role_eq: route.query["q[role_eq]"],
  company_name_cont: route.query["q[company_name_cont]"],
});

const toggleForm = (e) => {
  e.target.closest('a').classList.toggle('open');
  filters.value.classList.toggle('hidden');  
}
const searchQuery = () => {
  return '/api/admin/users.xlsx?' + new URLSearchParams(route.query);
}
const search = () => {
  const query = Object.fromEntries(
    Object.entries(form.value).map(entry => [`q[${entry[0]}]`, entry[1]])
  );
  router.push({path: route.path, query: query});
}
const reset = () => {
  form.value = {...form.value, libel_cont: '', first_name_cont: '', last_name_cont: '', role_eq: '', email_cont: '', company_id_eq: ''};
  router.push({path: route.path, query: ''})
}
</script>