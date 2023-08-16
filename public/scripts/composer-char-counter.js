$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    console.log(this);
    const $counter = $(this).parent().find('.counter');
    const charCount = $(this).val().length;
    const remainingChars = 140 - charCount;
    $counter.text(remainingChars);
    if (remainingChars < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  });
});