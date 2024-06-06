<template>
  <div class="main_container orders">
    <nav-top></nav-top>

    <div class="batches" role="main">
      <div class="col-xs-24">
        <ul class="breadcrumb pull-left">
          <li><router-link to="/">Admin</router-link></li>
          <li><router-link to="/orders">{{ $t('batches.title') }}</router-link></li>
          <li>{{ order.full_name }}</li>
        </ul>
      </div>

      <div class="col-xs-24">
        <ul class="nav nav-tabs" style="margin-bottom: 0px;">
          <li class="active"><router-link to="/orders">Suivi</router-link></li>
          <li><router-link :to="'/orders/' + order.id + '/spots/0'">Produits</router-link></li>
          <li v-if="order.has_shipping"><router-link :to="'/orders/' + order.id + '/shipping'">Livraison</router-link></li>
        </ul>

        <div class="row" style="margin: 0;background-color: #fff;border: 1px solid #ddd;border-top: 0;padding-top: 20px">
          <div class="col-xs-24 col-md-12">
            <form v-on:submit.prevent="update('name')" accept-charset="UTF-8">
              <div class="form-group">
                <label>Nom* (public)</label><br />
                <div v-if="order.status == '7_done'" class="well">
                  {{ order.name }}
                </div>
                <div v-else>
                  <input type="text" v-model="order.name" class="form-control" style="float: left; width: 79%;height: 32px;line-height: 32px" required />
                  <input type="submit" class="btn btn-warning pull-right" style="width: 20%;" value="Enregistrer" />
                  <br /><br />
                </div>
              </div>
              <div class="clearfix"></div>
            </form>

            <form v-on:submit.prevent="update('expired_at')" accept-charset="UTF-8">
              <div class="form-group">
                <label>Date limite</label><br />
                <div v-if="order.status == '7_done'" class="well">
                  {{ order.expired_at }}
                </div>
                <div v-else>
                  <input type="date" v-model="order.expired_at" class="form-control" style="float: left; width: 79%;height: 32px;line-height: 32px" />
                  <input type="submit" class="btn btn-warning pull-right" style="width: 20%;" value="Enregistrer" />
                  <br /><br />
                </div>
              </div>
              <div class="clearfix"></div>
            </form>

            <div class="form-group">
              <label>Commentaire client (public)</label>
              <div class="well">
                <p>{{ order.client_comment }}</p>
              </div>
            </div>

            <form v-on:submit.prevent="update('comment')" accept-charset="UTF-8">
              <div class="form-group">
                <label>Commentaire (privé)</label>
                <div v-if="order.status == '7_done'" class="well">
                  <p>{{ order.comment }}</p>
                </div>
                <div v-else>
                  <textarea class="form-control" v-model="order.comment" style="min-height: 200px"/>
                  <br />
                  <input type="submit" class="btn btn-warning pull-right" style="width: 20%;" value="Enregistrer" />
                </div>
              </div>
              <div class="clearfix"></div>
            </form>

            <div class="form-group">
              <label>Organisation</label>
              <div class="well">
                <p>{{ order.organisation_name }}</p>
              </div>
            </div>

            <div class="form-group">
              <label>Site</label>
              <div class="well">
                <p>{{ order.site.name }} {{ order.site.client_reference }}
                <br />
                {{ order.site.address }}
                <br />{{ order.site.zipcode }} {{ order.site.city }}
                <br />{{ order.site.country }}</p>
              </div>
            </div>
            <a v-if="order.cancelable" href="#" class="btn btn-danger" @click.prevent="cancel">Annuler la commande</a>
            <a v-if="closable()" @click.prevent="force" href="#" class="btn btn-danger" style="float: right;">Cloturer la commande</a>
            <br /><br />
          </div>

          <div class="col-xs-24 col-md-12" style="padding-top: 14px">
            <table class="table table-thin table-striped">
              <thead>
                <tr>
                  <th style="width: 150px">Date</th>
                  <th>Action</th>
                  <th>Intervenant</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(event, index) in order.events" :key="index">
                  <td>{{ event.created_at }}</td>
                  <td>
                    <div v-if="event.name == 'manufacturing'">
                      <a v-if="order.manufacturer_id == 1" href="/fr/manufacturer" target="_blank">{{ event.name }}</a>
                      <span v-else>{{ event.name }} (Edox)</span>
                    </div>
                    <div v-else>
                      <span>{{ event.name }}</span>
                    </div>
                  </td>
                  <td>{{ event.author }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-xs-24 col-md-12" style="padding-top: 20px">
            <label>Commande suivie par:</label>
            <ul>
              <li v-for="assignee in order.assignees" :key="assignee.id">{{ assignee.name }} <a href="#" @click.prevent="unsubscribe(assignee.id)" style="color: red; font-weight: bolder; text-decoration: none">×</a></li>
            </ul>

            <form v-on:submit.prevent="update('subscribe')" accept-charset="UTF-8" class="form row">
              <div class="col-xs-24" style="height: 50px;padding-top: 10px;padding-bottom: 20px">
                <a href="#" @click.prevent="toggleUsers">+ Ajouter un abonné</a>
              </div>
              <div class="hidden" ref="users">
                <div class="col-xs-18"> 
                  <select class="form-control" v-model="order.assignee_id" required>
                    <option value=""></option>
                    <option v-for="assignee in order.assignables" :key="assignee.id" :value="assignee.id">{{ assignee.name }}</option>
                  </select>
                </div>
                <div class="col-xs-6"> 
                  <input type="submit" class="btn btn-warning" value="Ajouter" style="height: 40px; line-height: 28px;width: 100%"/>
                </div>
              </div>
            </form>

            <div class="clearfix"><br /></div>
            <label>Contacts:</label>
            <ul>
              <li v-for="contact in order.contacts" :key="contact.id">
                {{ contact.email }}
                <p v-if="contact.notif_1 === 'true'">* Commande validée</p>
                <p v-if="contact.notif_2 === 'true'">* Suivi du colis</p>
                <p v-if="contact.notif_3 === 'true'">* Réception du colis</p>
                <p v-if="contact.notif_4 === 'true'">* Tous les devices UP</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return this.$store.state.OrderStore;
  },

  created: function() {
    this.$store.dispatch('OrderStore/show', this.$route.params.id);
  },

  methods: {
    closable: function() {
      const finalizable_status = ['3_manufacturing', '4_ready_for_shipping', '5_shipping', '6_commissioning']
      if(finalizable_status.includes(this.order.status)) {
        return true;
      } else {
        return false;
      }
    },
    force: function() {
      if(confirm("Forcer la cloture de la commande ?!")) {
        this.$store.dispatch('OrderStore/update', 'force_close').then(response => {
          window.location.reload();
        })
      }
    },
    next: function() {
      this.$store.dispatch('OrderStore/create', this.$route.params.id);
    },
    update: function(what) {
      this.$store.dispatch('OrderStore/update', what); 
    },
    toggleUsers: function() {
      $(this.$refs.users).toggleClass('hidden');
    },
    unsubscribe: function(id) {
      if(confirm("Sur ?!") === true) {
        this.$store.commit('OrderStore/setAssignationId', id);
        this.$store.dispatch('OrderStore/update', 'unsubscribe'); 
      }
    },
    cancel: function() {
      if(confirm("Sur ?!") === true) {
        this.$store.dispatch('OrderStore/destroy').then(() => {
          window.location.reload();
        })
      }
    }
  }
}
</script>
