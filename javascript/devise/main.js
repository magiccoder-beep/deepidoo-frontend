export default function Devise() {
  return {
    prompt2faConfirmation: function(data) {
      $("[data-is='dfa-form']").removeClass('hidden');
      $("[data-is='password-form']").addClass('hidden');
      $('.new-session .btn').removeClass('loading');
    },
    afterSignInRedirect: function(data) {
      console.log('inside fn')
      window.location.href = data.redirect;
    },
    showErrors: function() {
      $('.error').removeClass('hidden');
    },
    reloadSignIn: function(data) {
      window.location.reload();
    },
    redirectTo: function(locale){
      if (locale && locale != 'en' && window.location.pathname != '/'+ locale + '/user/sign_in'){
        window.location.href = '/'+ locale + '/user/sign_in'
      }
    }
  }
}

$(document).ready(function() {
  $("[data-do='setLocale'").change(function() {
    window.location.href = $(this).val();
  })

  $('#newSession').submit(function(e) {
    e.preventDefault();
    $('.error').addClass('hidden');

    $.ajax({
      url: $(e.target).attr('action'),
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      type: 'post',
      data: {
        user: {
          email: $('#user_email')[0].value,
          password: $('#user_password')[0].value,
          code: $('#user_code')[0].value 
        }
      },
      success: function(data) {
        //window.Devise[data.do](data);
        // TMP: remove once Admin complete and work on front end starts
        window.location.href = '/fr/admin'
      },
      error: function(data) {
        window.Devise.showErrors();
      }
    })
  })
})
