<template>
  <div class="row">
    <div class="col-xs-24">
      <div class="col-xs-12">
        <div class="form-group">
          <label>Réference interne*</label>
          <span class="error">{{errors.name}}</span>
          <input type="text" v-model="content.name" class="form-control" />
        </div>
        <div class="form-group">
          <label>Nom* (public)</label>
          <i18n-string :translations="content.name_translations" @changed="setNameTranslations" /> 
        </div>
        <div class="form-group">
          <label>Description (public)</label>
          <i18n-string :translations="content.description_translations" @changed="setDescriptionTranslations" /> 
        </div>
        <div class="form-group">
          <label>Notes de tête (public)</label>
          <i18n-string :translations="content.description_top_translations" @changed="setDescriptionTopTranslations" /> 
        </div>
        <div class="form-group">
          <label>Notes de coeur (public)</label>
          <i18n-string :translations="content.description_heart_translations" @changed="setDescriptionHeartTranslations" /> 
        </div>
        <div class="form-group">
          <label>Notes de fond (public)</label>
          <i18n-string :translations="content.description_bottom_translations" @changed="setDescriptionBottomTranslations" /> 
        </div>
        <br />
        <div class="clearfix"></div>
        <a v-if="content.id != null" href="#" @click.prevent="destroy" style="text-decoration: none;"><i style="color: red; font-size: 18px;padding-right: 5px;">×</i>Supprimer</a>
        <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
      </div>

      <div class="col-xs-12" style="height: 400px;">
        <div class="form-group">
          <b style="margin-bottom: 5px; display: block;">Image (500x500)</b>
          <label for="thumbnailLoader" :title="$t('click_to_edit')" class="uploadable-preview">
            <img class="img-responsive" id="thumbnail" :src="content.cover_art"  />
          </label>
          <input type="file" class="hidden" id="thumbnailLoader" @change="previewThumbnail($event)" accept=".png,.jpg,.jpeg">
        </div>
        <a v-if="content.id != null" class="btn btn-danger" href="#"  @click.prevent="printQrcode()">Imprimer le QRCode</a>
      </div>
    </div>

  </div>
</template>

<script>
import I18nString from '../shared/_i18n_string.vue'

export default {
  components: {
    'i18n-string': I18nString
  },

  data: function() {
    return this.$store.state.FragranceStore;
  },

  methods: {
    setNameTranslations: function(translations) {
      this.$store.commit('FragranceStore/setNameTranslations', translations)
    },
    setDescriptionTranslations: function(translations) {
      this.$store.commit('FragranceStore/setDescriptionTranslations', translations)
    },
    setDescriptionTopTranslations: function(translations) {
      this.$store.commit('FragranceStore/setDescriptionTopTranslations', translations)
    },
    setDescriptionHeartTranslations: function(translations) {
      this.$store.commit('FragranceStore/setDescriptionHeartTranslations', translations)
    },
    setDescriptionBottomTranslations: function(translations) {
      this.$store.commit('FragranceStore/setDescriptionBottomTranslations', translations)
    },
    destroy: function(){
      if(confirm("Êtes vous sur ?!")) {
        this.$store.dispatch('FragranceStore/destroy').then(()=> {
          this.$router.push(`/fragrances`)
        })
      }
    },
    previewThumbnail: function(e) {
      const file = e.target.files[0];
      document.getElementById('thumbnail').src = window.URL.createObjectURL(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      const that = this;
      reader.onload = function() {
        that.$store.commit('FragranceStore/setThumbnail', reader.result); 
      }
    },
    printQrcode: function() {
      window.open(location.protocol + '//' + location.host + '/fr/print/fragrances/' + this.content.id, "Impression","menubar=no, status=no, scrollbars=no, menubar=no, width=786, height=1116");
    }
  }
};
</script>
