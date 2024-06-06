<template>
  <div class="modal fade" id="modalOrderTags" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content !max-w-[800px]">
        <div class="modal-header">
          <button type="button" class="close" @click.prevent="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Tags commandes</h4>
        </div>
        <div class="modal-body">
          <table class="table table-stripped">
            <thead>
              <tr>
                <th>Nom</th>
                <th style="width: 100px">&nbsp;</th>
                <th style="width: 20px">&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tags" :key="tag.id" style="height: 45px">
                <td>
                  <div class="tag-item">
                    <span @click="toggle($event, tag.id)" class="tagged" :class="{'fadded': !order.tag_ids.includes(tag.id)}" :style="'background-color: ' + tag.color">{{ tag.name }}</span>
                  </div>
                  <div class="tag-item hidden">
                    <input type="text" class="tag-values" :value="tag.name" />
                    <input type="color" class="tag-values" :value="tag.color" />
                  </div>
                </td>
                <td>
                  <div class="tag-item">
                    <a href="#" @click.prevent="edit">Modifier</a>
                  </div>
                  <div class="tag-item hidden">
                    <a href="#" @click.prevent="update($event, tag)">Enregistrer</a>
                  </div>
                </td>
                <td>
                  <a href="#" @click.prevent="destroy(tag.id)" style="text-decoration: none; color: red">×</a>
                </td>
              </tr>
            </tbody>
          </table>

          <a href="#" @click="toggleForm">+ Ajouter un Tag</a>
          <form class="form hidden" style="margin-top: 20px" @submit.prevent="create">
            <input type="text" class="form-control" style="float: left; width: 60%" placeholder="Nouveau tag" />
            <input type="color" class="color" value="#dddddd" style="margin-left: 10px;float: left; width: 20%;height: 40px;" />
            <input type="submit" class="btn btn-warning" style="float: right; width: 15%;height: 40px;" value="Créer" />
            <div class="clearfix"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return this.$store.state.TagStore;
  },

  methods: {
    show: function(data) {
      this.load(data);
      $('#modalOrderTags').modal();
    },
    close: function() {
      $('#modalOrderTags').modal('hide');
    },
    load: function(data) {
      this.$store.commit("TagStore/one", data);
      this.$store.dispatch("TagStore/index");
    },
    toggleForm: function(e) {
      $(e.target).parent().find('.form').toggleClass('hidden');
    },
    create: function(e) {
      this.$store.dispatch("TagStore/create", {
        name: $(e.target).find('.form-control').val(),
        color: $(e.target).find('.color').val()
      }).then(response => {
        this.$store.dispatch("TagStore/index", this.order.id);
        $(e.target).find('.form-control').val('');
      }).catch(response => {
        alert('Donnez un nom à votre Tag !');
      });
    },
    edit: function(e) {
      $(e.target).parent().parent().parent().find('.tag-item').toggleClass('hidden');
    },
    update: function(e, tag) {
      const row = $(e.target).parent().parent().parent();
      const updated_tag = {
        id: tag.id,
        name: $(row.find('.tag-values')[0]).val(),
        color: $(row.find('.tag-values')[1]).val()
      }
      this.$store.dispatch("TagStore/update", updated_tag).then(response => {
        this.$emit('changed');
      })
    },
    destroy: function(id) {
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch("TagStore/destroy", id).then(response => {
          this.$emit('changed');
        })
      }
    },
    toggle: function(e, tag_id) {
      this.$store.dispatch("TagStore/toggle", tag_id).then(response => {
        this.$emit('changed');
      })
    }
  }
};
</script>

