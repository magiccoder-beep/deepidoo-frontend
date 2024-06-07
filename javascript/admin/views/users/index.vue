<template>
  <main class="responsive max">
    
    <div class="grid">
      <div class="s12">
        <UsersFilters :pagination="store.pagination" />
        <table class="stripes table table-striped">
          <thead>
            <tr>
              <th>{{ $t('ref') }}</th>
              <th>{{ $t('created') }}</th>
              <th>{{ $t('users.role') }}</th>
              <th>{{ $t('name') }}</th>
              <th>{{ $t('organisation') }}</th>
              <th>{{ $t('users.brand') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in store.users">
              <td><router-link :to="{ name: 'user', params: { id: user.id } }" class="link">{{ user.id }}</router-link>
              </td>
              <td>{{ user.created_at }}</td>
              <td>{{ user.role }}</td>
              <td><router-link :to="{ name: 'user', params: { id: user.id } }" class="link">{{ user.name
                  }}</router-link>
              </td>
              <td>{{ user.organisation }}</td>
              <td>{{ user.brand }}</td>
            </tr>
          </tbody>
        </table>

        <SharedPagination v-if="store.pagination" :store="store" @clicked="load" />
      </div>
    </div>
  </main>
</template>

<script setup>
import UsersFilters from './_filters.vue';
import SharedPagination from '../shared/_pagination.vue';
import { UserStore } from "../../stores/user.js";

const store = UserStore();
const location = useRoute();

const load = function () {
  store.index(location.fullPath);
}

onMounted(() => {
  load();
})
</script>
