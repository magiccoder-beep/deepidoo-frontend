<template>
  <div class="modal fade" id="modalOrganisation" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Organisations</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <ul class="unstyled" ref="orgs">
              <li v-for="name in organisations_name" :key="name.id">
                {{name}}
              </li>
            </ul>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.PlaylistStore;
  },
};
</script>

