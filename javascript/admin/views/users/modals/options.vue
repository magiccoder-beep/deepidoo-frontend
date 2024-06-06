<template>
  <div class="dialog-code">
    <div class="overlay"></div>
    <dialog class="modal" id="modal-options">
      <h5>Options</h5>
      <div>Select an option</div>
      <form @submit.prevent="create">
        <div class="field">
          <select v-model="store.option_name">
            <option value=""></option>
            <option v-for="key, value in store.options" :value="key" :key="key">{{ value }}</option>
          </select>
          <i>arrow_drop_down</i>
        </div>
        <nav>
          <a class="button transparent link" data-ui="#modal-options">{{ $t('cancel') }}</a>
          <button class="button primary" data-ui="#modal-options">{{ $t('save') }}</button>
        </nav>
      </form>
    </dialog>
  </div>
</template>

<script setup>
import { UserStore } from "../../../stores/user.js";
const store = UserStore();

const location = useRoute();

const create = function() {
  store.addOption(location.params.id).then(() => {
    window.location.reload();
  }).catch(()=> {
    alert('error');
  })
}
</script>