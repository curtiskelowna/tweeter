$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    console.log(this);
    const $counter = $(this).parent().find('.counter');
    const charCount = $(this).val().length;
    const remainingChars = 140 - charCount;
    console.log(remainingChars);
    $counter.text(remainingChars);
    if (remainingChars < 0) {
      $counter.addClass('red');
      $counter.removeClass('no-error');
    } else {
      $counter.removeClass('red');
      $counter.addClass('no-error');
    }
  });
});