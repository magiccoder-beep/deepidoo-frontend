export const messages = {
  success: 'success',
  error: 'error',
  loading: 'loading',
  failure: 'failure',

  delete: "Supprimer",

  interfaceStrings: {

    // ---------------------client-----------------------------
    errorOccured: "An error has occured",
    parentOrganization: "Organisation parente",
    apiUid: "API UID",
    generate: "Générer",
    noSso: "Pas de SSO",
    okta: "Okta",
    ldap: "LDAP",
    ssoProvider: "SSO Provider (Single Sign-On)",
    fallbackAudio: "Fallback audio",
    marque: "Marque",
    importTemplateDesigns: "Importer les modèles de template",
    importTeDeDescription: "En cochant cette case tous les templates de l'organisation DEEPIDOO SIEGE [Bureaux] taggés 'Modèle detemplates' seront copiés dans la nouvelle organisation",
    apiSecret: "API Secret",

    generateReport: "Générer un rapport",

    // ---------------------contact-----------------------------

    firstName: 'Prénom',
    client: 'Client',
    site: 'Site',
    attachedTo: 'Rattaché à...',
    newContact: '+ Nouveau contact',
    contact: 'Contact',

    // ---------------------user-----------------------------
    user: 'User',
    admin: 'Admin',
    type: 'Type',
    language: 'Langue',
    email: 'Email',
    noResell: 'Non reseller',
    reSeller: 'Revendeur pour la marque',
    assembleFor: 'Assembleur pour',
    nonAssembler: 'Non assembleur',
    uploadVideoHd: 'Upload Videos HD',
    currentAPIToken: 'Token API courant',
    organization: 'Organisation',
    options: 'Options',
    addOption: 'Ajouter une option',

  },

  interfaceValues: {
    okta: "okta",
    ldap: "ldap",
    empty: "",
  },

  styleStrings: {
    fieldLabelBorder: 'field label border',
  },

  clients: {
    initApi: {
      success: 'API UID généré',
    },
    update: {
      success: "Client mis à jour",
    },
    destroy: {
      confirm: "Êtes vous sur ?!",
    }
  },

  contacts: {
    update: {
      success: "Contact mis à jour",
    },
    destroy: {
      confirm: "Êtes vous sur ?!",
      success: "Contact supprimé",
    }
  }
};
