<template>
  <header class="responsive max primary reverse-text">
    <nav>
      <h5 class="max"><router-link :to="{ name: 'home' }">Admin</router-link></h5>

      <button class="transparent circle"><i>confirmation_number</i></button>
      <router-link :to="{ name: 'users' }" class="transparent circle"><i>person</i></router-link>
      <button class="transparent circle"><i>shopping_cart</i></button>
      <button class="transparent circle" data-ui="#dialog-right"><i>menu</i></button>
    </nav>
  </header>

  <dialog ref="mainMenu" class="main-menu right" id="dialog-right">
    <button class="transparent circle" data-ui="#dialog-right"><i>menu</i></button>
    <ul>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Dashboard tickets</router-link></li>
      <li><router-link :to="{ name: 'musics' }" data-ui="#dialog-right">Catalogue</router-link></li>
      <li><router-link :to="{ name: 'clients' }" data-ui="#dialog-right">Clients</router-link></li>
      <li><router-link :to="{ name: 'contacts' }" data-ui="#dialog-right">Contacts</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Commandes</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Devices</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Monitoring</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Notifications</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Playlists</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Spots</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Statistiques</router-link></li>
      <li><router-link :to="{ name: 'users' }" data-ui="#dialog-right">Utilisateurs</router-link></li>
      <li><router-link :to="{ name: 'home' }" data-ui="#dialog-right">Editorial</router-link></li>
    </ul>
  </dialog>
</template>
