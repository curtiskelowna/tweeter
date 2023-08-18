$(document).ready(function() {

  $(document).scroll(function() {
    console.log($(this).scrollTop());
    const scrollNumber = $(this).scrollTop();
    if (scrollNumber > 300) {
      $('.back-to-top').fadeIn();
    } else {
      $('.back-to-top').fadeOut();
    }
  });

  $('.back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  });

  $('#tweet-text').on('input', function() {
    $('.new-tweet-error').slideUp('slow');
  });

  $('.compose-button').on('click', function() {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });

  $('.new-tweet').hide();

});