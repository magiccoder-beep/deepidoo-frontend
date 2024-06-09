export const urls = {
  clients: {
    prefix: 'clients',

    new: 'new',
    initApi: 'init_api',

    frontend: {
      url: {
        index: '/clients',
        new: '/clients/new',
        edit: '/clients/:id',
      },
      name: {
        index: 'clients',
        new: 'new',
        edit: 'client',
      },
    },
  },
  contacts: {
    prefix: 'contacts',

    autoComplete: 'autocomplete',
    new: 'new',

    frontend: {
      url: {
        index: '/contacts',
        new: '/contacts/new',
        edit: '/contacts/:id',
      },
      name: {
        index: 'contacts',
        new: 'new',
        edit: 'contact',
      }
    }
  },

  users: {
    prefix: 'users',

    new: 'new',
    userOptions: 'user_options',

    frontend: {
      url: {
        index: '/users',
        new: '/users/new',
        edit: '/users/:id',
      },
      name: {
        index: 'users',
        new: 'new',
        edit: 'user',
      }
    }
  }
}