const XlsxStore = {
  namespaced: true,
  actions: {
    create(context, form) {
      return new Promise((resolve, reject) => {
        $.ajax({
          url: `/xlsx`,
          type: "post",
          data: form,
          success: function (data) {
            resolve(true);
          },
        });
      })
    }
  },
};

export default XlsxStore;
