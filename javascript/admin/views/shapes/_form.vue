<template>
  <div class='col-xs-24 col-md-10'>
    <div class="form-group">
      <label>Réference</label>
      <input type="text" v-model="shape.reference" class="form-control">
    </div>

    <div class="form-group">
      <label>{{ $t('shape.name') }}*</label>
      <span class='error'>{{errors.name}}</span></label>
      <input type="text" v-model="shape.name" class="form-control">
    </div>

    <div class="form-group">
      <label for="">{{ $t('shape.type') }}</label>
      <span class='error'>{{errors.type}}</span></label>
      <select v-model="shape.type" class='form-control'>
        <option value="Shapes::Debian">Debian</option>
        <option value="Shapes::Raspberry">Raspberry</option>
        <option value="Shapes::Diffuser">Diffuseur</option>
      </select>
    </div>

    <div class="form-group">
      <label>{{ $t('shape.brand') }}*</label>
      <span class='error'>{{errors.brand}}</span></label>
      <input type="text" v-model="shape.brand" class="form-control">
    </div>

    <div class="form-group">
      <label>Prix</label>
      <span class='error'>{{errors.name}}</span></label>
      <input type="number" step="0.01" v-model="shape.price" class="form-control">
    </div>

    <a v-if="shape.id != null" href="#" @click.prevent="destroy" style="text-decoration: none;"><i style="color: red; font-size: 18px;padding-right: 5px;">×</i>Supprimer</a>
    <input type="submit" :class="'btn btn-warning pull-right ' + progress" value="Enregistrer" />
  </div>
</template>

<script>
export default {

  data: function() {
    return this.$store.state.ShapeStore;
  },

  methods: {
    destroy: function(){
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch('ShapeStore/destroy', this.shape.id).then(()=> {
          this.$router.push(`/shapes`)
        })
      }
    }
  }
}
</script>
