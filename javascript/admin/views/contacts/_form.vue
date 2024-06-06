<template>
  <div class="row">
    <div class="col-xs-24">
      <div class="col-xs-24 col-md-12">
        <div class="form-group">
          <label>Prénom*</label>
          <span class="error">{{ errors.firstname }}</span>
          <input type="text" v-model="contact.firstname" class="form-control" />
        </div>
        <div class="form-group">
          <label>Nom</label>
          <span class="error">{{ errors.lastname }}</span>
          <input type="text" v-model="contact.lastname" class="form-control" />
        </div>
        <div class="form-group" style="height: 100px">
          <label>Rattaché à...</label>
          <span class="error">{{ errors.contactable_target }}</span>
          <div class="clearfix"></div>
          <div style="float: left;width: 20%">
            <select class="form-control" v-model="contact.contactable_type" @change="resetContactable">              
              <option value="Client">Client</option> 
              <option value="Site">Site</option> 
              <option value="">Autre</option>                          
            </select>
          </div>
          <div style="float: right; width:75%">
            <input type="text" class="hidden" v-model="contact.contactable_id" />
            <input type="text" class="form-control" v-model="contact.contactable_name" @keyup="autocompleteContactable" />
            <div class="autocomplete">
              <ul v-click-outside="clearContactables">      
                <li v-for="contactable in contactables" :key="contactable.id"><a href="#" @click.prevent="pickContactable(contactable)">{{ contactable.name }}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <a v-if="contact.id != null" href="#" @click="destroy" class="btn btn-danger">Supprimer</a>
      </div>
      <div class="col-xs-24 col-md-12">
        <div class="form-group">
          <label>Email</label>
          <span class="error">{{ errors.email_or_phone }}</span>
          <input type="text" v-model="contact.email" class="form-control" />
        </div>
        <div class="form-group">
          <label>Téléphone</label>
          <input type="text" class="form-control" ref="phone" @blur="setPhone" />
        </div>
        <div class="form-group">
          <label>Notes</label>
          <span class="error">{{ errors.notes }}</span>
          <textarea v-model="contact.notes" class="form-control" />
        </div>
        
        <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data: function() {
    return this.$store.state.ContactStore;
  },

  mounted: function() {
    this.$store.commit('ContactStore/initPhone', this.$refs['phone'])
  },

  methods: {
    setPhone: function() {
      this.$store.commit("ContactStore/setPhone");
    },
    autocompleteContactable: function() {
      this.$store.dispatch("ContactStore/autocomplete", {
        keywords: this.contact.contactable_name,
        what: 'contactables',
        scope: this.contact.contactable_type,
        client_id: this.client
      })
    },
    clearContactables: function(what) {
      this.$store.commit("ContactStore/setContactables", {results: []});
    },
    pickContactable: function(contactable) {
      this.$store.commit("ContactStore/setContactable", contactable); 
      this.$store.commit("ContactStore/setContactables", {results: []});
    },
    resetContactable: function() {
      this.$store.commit("ContactStore/setContactable", {id: null, name: ''}); 
    },
    destroy: function() {
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch('ContactStore/destroy').then(resolve => {
          this.$router.push('/contacts'); 
        }).catch(reject => {
          alert("An error has occured");
        });
      }
    }
  }
};
</script>
