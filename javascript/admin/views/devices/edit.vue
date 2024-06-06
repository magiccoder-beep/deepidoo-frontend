<template>
  <div class="main_container">
    <nav-top></nav-top>

    <div class="right_col" role="main">
      <div class="col-xs-24">
        <ul class='breadcrumb pull-left'>
          <li><router-link :to="'/'"><i class="icon-home icon-black"></i></router-link>
          <li><router-link :to="'/devices'">{{ $t('top_nav.devices') }}</router-link>
          <li>{{ device.id }}</li>
        </ul>
      </div>


      <div v-if="device.status == 'shipped'" class="ro">
        <div class="col-xs-24 form styled-form" style="padding: 100px">
          <h3>Ce Device est en cours de livraison... aucune modification possible à ce stade</h3>
        </div>
      </div>

      <div v-else>
        <div class="col-xs-24 col-md-8">
          <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form" style="padding: 10px">
            <div class="form-group">
              <label>{{ $t('status') }}*</label>
              <select v-model="device.status" class='form-control'>
                <option v-for="status in device.available_status" :value="status.name" :key="status.name">{{ $t(`device.${status.name}`) }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>{{ $t('device.serial') }}*</label>
              <span class='error'>{{errors.serial}}</span>
              <input v-model="device.serial" type="text" class="form-control">
            </div>

            <div class="form-group">
              <label>{{ $t('device.os') }}*</label>
              <span class='error'>{{errors.os}}</span>
              <select v-model="device.os" class='form-control'>
                <option v-for="os in device.oses" :value="os.name" :key="os.name">{{ $t(os.name) }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>{{ $t('device.manufacturer') }}*</label>
              <span class='error'>{{errors.manufacturer}}</span>
              <select v-model="device.manufacturer_id" class='form-control'>
                <option v-for="manufacturer in device.manufacturers" :value="manufacturer.id" :key="manufacturer.id">{{ manufacturer.name }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>{{ $t('batches.batch') }}</label>
              <select v-model="device.batch_id" class='form-control'>
                <option v-for="batch in device.batches" :value="batch.id" :key="batch.id">{{ batch.name }}</option>
              </select>
            </div>

            <div class="form-group">
              <label>{{ $t('device.model') }}*</label>
              <span class='error'>{{errors.shape}}</span>
              <select v-model="device.shape_id" class='form-control'>
                <option v-for="shape in device.shapes" :value="shape.id" :key="shape.id">{{ shape.name }}</option>
              </select>
            </div>

            <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
            <div class="clearfix"></div>
          </form>
        </div>

        <div class='col-xs-24 col-md-16'>
          <h3 style="padding-top: 0;margin-top: 0;">Historique</h3>
          <table class="table table-striped table-thin">
            <thead>
              <tr>
                <th style="width: 100px">Spot ID</th>
                <th style="width: 110px">Statut</th>
                <th style="width: 150px">Date</th>
                <th>Localisation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.uid">
                <td style="width: 100px; vertical-align: top; padding: 5px;"><router-link :to="'/spots/' + event.spot_id">{{ event.spot_id }}</router-link></td>
                <td style="width: 100px; vertical-align: top; padding: 5px;">{{ event.status }}</td>
                <td style="width: 100px; vertical-align: top; padding: 5px;">{{ event.date }}</td>
                <td style="padding: 5px;">{{ event.location }}</td>
              </tr> 
            </tbody>
          </table>
          <br />
          <h3 style="padding-top: 0;margin-top: 0;">Commentaires</h3>
          <form v-on:submit.prevent="update" accept-charset="UTF-8" class="form styled-form" style="padding: 10px">
            <textarea class="form-control" style="min-height: 200px" v-model="device.comment" />

            <br />
            <input type="submit" :class="'btn btn-warning pull-right ' + progress" :value="$t('save')" />
            <div class="clearfix"></div>
          </form>
        </div>
      </div>
    </div>

    <footer-custom></footer-custom>
  </div>
</template>

<script>

export default {

  data: function() {
    return this.$store.state.DeviceStore;
  },

  mounted: function() {
    this.$store.dispatch('DeviceStore/edit', this.$route.params.id)
  },

  methods: {
    update: function(e) {
      this.$store.dispatch('DeviceStore/update', this.device).then(()=> {
        window.location.reload();
      })
    }
  }
}
</script>
