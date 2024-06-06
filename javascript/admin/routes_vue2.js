import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import SpotShow from "./components/spots/show.vue";
import SpotHistory from "./components/spots/history.vue";
import SpotIndex from "./components/spots/index.vue";
import ShapeIndex from "./components/shapes/index.vue";
import ShapeNew from "./components/shapes/new.vue";
import ShapeEdit from "./components/shapes/edit.vue";
import DeviceIndex from "./components/devices/index.vue";
import DeviceNew from "./components/devices/new.vue";
import DeviceEdit from "./components/devices/edit.vue";
import AddonIndex from "./components/addons/index.vue";
import AddonNew from "./components/addons/new.vue";
import AddonEdit from "./components/addons/edit.vue";
import OrderStats from "./components/orders/stats.vue";
import OrderIndex from "./components/orders/index.vue";
import OrderShow from "./components/orders/show.vue";
import OrderShipping from "./components/orders/shipping.vue";
import OrderSpots from "./components/orders/spots.vue";
import ContentIndex from "./components/contents/index.vue";
import ContentEdit from "./components/contents/edit.vue";
import PlaylistIndex from "./components/playlists/index.vue";
import PlaylistEdit from "./components/playlists/edit.vue";
import PlaylistHistory from "./components/playlists/history.vue";
import PlaylistTimepoint from "./components/playlists/timepoint.vue";
import NotificationIndex from "./components/notifications/index.vue";
import NotificationNew from "./components/notifications/new.vue";
import NotificationEdit from "./components/notifications/edit.vue";
import ClientIndex from "./components/clients/index.vue";
import ClientShow from "./components/clients/edit.vue";
import ClientNew from "./components/clients/new.vue";
import UserIndex from "./components/users/index.vue";
import UserShow from "./components/users/show.vue";
import TicketIndex from "./components/tickets/index.vue";
import TicketNew from "./components/tickets/new.vue";
import TicketShow from "./components/tickets/show.vue";
import MusicIndex from "./components/music/index.vue";
import MetricsUsersIndex from "./components/metrics/users/index.vue";
import MetricsPlayersIndex from "./components/metrics/players/index.vue";
import MetricsPlayersShow from "./components/metrics/players/show.vue";
import MetricsSyncShow from "./components/metrics/syncs/index.vue";
import FragranceIndex from "./components/fragrances/index.vue";
import FragranceNew from "./components/fragrances/new.vue";
import FragranceEdit from "./components/fragrances/edit.vue";
import ContactIndex from "./components/contacts/index.vue";
import ContactNew from "./components/contacts/new.vue";
import ContactEdit from "./components/contacts/edit.vue";

const router = new VueRouter({
  mode: "history",
  base: `${I18n.prefix}admin`,
  routes: [
    { path: "/tickets/new", component: TicketNew },
    { path: "/tickets/:id", component: TicketShow },
    { path: "/spots/:id", component: SpotShow },
    { path: "/spots/:id/history", component: SpotHistory },
    { path: "/spots", component: SpotIndex },
    { path: "/shapes/", component: ShapeIndex },
    { path: "/shapes/new", component: ShapeNew },
    { path: "/shapes/:id/edit", component: ShapeEdit },
    { path: "/devices", component: DeviceIndex },
    { path: "/devices/new", component: DeviceNew },
    { path: "/devices/:id/edit", component: DeviceEdit },
    { path: "/addons", component: AddonIndex },
    { path: "/addons/new", component: AddonNew },
    { path: "/addons/:id/edit", component: AddonEdit },
    { path: "/orders/stats", component: OrderStats },
    { path: "/orders/:id", component: OrderShow },
    { path: "/orders/:id/spots", component: OrderSpots },
    { path: "/orders/:id/spots/:index", component: OrderSpots },
    { path: "/orders/:id/shipping", component: OrderShipping },    
    { path: "/orders", component: OrderIndex },
    { path: "/contents", component: ContentIndex },
    { path: "/contents/:id/edit", component: ContentEdit },
    { path: "/playlists", component: PlaylistIndex },
    { path: "/playlists/:id", component: PlaylistEdit },
    { path: "/playlists/:id/history", component: PlaylistHistory },
    { path: "/playlists/:id/history/:snapshot_id/:mode", component: PlaylistTimepoint },    
    { path: "/notifications", component: NotificationIndex },
    { path: "/notifications/new", component: NotificationNew },
    { path: "/notifications/:id/edit", component: NotificationEdit },
    { path: "/clients/", component: ClientIndex },
    { path: "/clients/new", component: ClientNew },
    { path: "/clients/:id", component: ClientShow },
    { path: "/users", component: UserIndex },
    { path: "/users/:id", component: UserShow },
    { path: "/metrics/users", component: MetricsUsersIndex },
    { path: "/metrics/syncs", component: MetricsSyncShow },    
    { path: "/metrics/players", component: MetricsPlayersIndex },
    { path: "/metrics/players/:id", component: MetricsPlayersShow },
    { path: "/metrics", component: MetricsPlayersIndex },
    { path: "/music", component: MusicIndex },
    { path: "/fragrances", component: FragranceIndex },
    { path: "/fragrances/new", component: FragranceNew },
    { path: "/fragrances/:id", component: FragranceEdit },
    { path: "/contacts", component: ContactIndex },
    { path: "/contacts/new", component: ContactNew },
    { path: "/contacts/:id", component: ContactEdit },
    { path: "/", component: TicketIndex },
  ],
});

export default router;
