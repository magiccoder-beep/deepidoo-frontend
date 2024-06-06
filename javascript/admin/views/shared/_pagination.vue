<template>
  <section class="responsive max pagination">    
    <nav v-if="store.pagination.pages > 1" class="no-space">
      <ul>
        <li>
          <router-link :to="{path: $route.path, query: setQuery(store.pagination.previous)}" v-if="store.pagination.previous">
            <span>&laquo;</span>
          </router-link>
        </li>
        <li v-for="page in store.pagination.pages" :class="[store.pagination.current == page ? 'active' : '']">
          <router-link :to="{path: $route.path, query: setQuery(page)}" v-if="page != store.pagination.current && (page == store.pagination.current - 2 || page == store.pagination.current - 1 || page == 1 || page == 2 || page == store.pagination.current + 1 || page == store.pagination.current + 2 || page == store.pagination.pages || page == store.pagination.pages - 1 )">{{ page }}</router-link>
          <span v-if="page == 3 && store.pagination.current >= 6 ">...</span>
          <span v-if="page == store.pagination.current">{{ page }}</span>
          <span v-if="page == store.pagination.pages - 3 && store.pagination.current <= store.pagination.pages - 4  ">...</span>
        </li>
        <li>
          <router-link :to="{path: $route.path, query: setQuery(store.pagination.next)}"  v-if="store.pagination.next">
            <span>&raquo;</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script setup>
const clickEvent = defineEmits(['clicked'])
const location = useRoute();
const props = defineProps(['store']);

watch(() => location.query, () => {
  clickEvent('clicked', true);
});

const setQuery = (page) => {
  const query = JSON.parse(JSON.stringify(location.query));
  query['page'] = page;
  return query;
}
</script>