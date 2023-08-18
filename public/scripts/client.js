/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet">
  <header class="tweet-header">
    <div class="tweet-header-left">
      <img src="${tweet.user.avatars}" alt="avatar">
      <p>${tweet.user.name}</p>
    </div>
    <p class="tweet-header-right">${tweet.user.handle}</p>
  </header>
  <p class="tweet-content">${escape(tweet.content.text)}</p>
  <footer class="tweet-footer">
    <p>${timeago.format(tweet.created_at)}</p>
    <div class="tweet-footer-right">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('.tweets-container').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .then(function(data) {
        renderTweets(data);
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  };

  const validateTweet = function(tweet) {
    if (tweet.length === 0) {
      $('.new-tweet-error').text('Tweet is empty!').hide().slideDown('slow');
      return false;
    }
    if (tweet.length > 140) {
      $('.new-tweet-error').text('Tweet is too long!').hide().slideDown('slow');
      return false;
    }
    return true;
  };

  $('#tweet-text').on('input', function() {
    $('.new-tweet-error').slideUp('slow');
  });

  $('.compose-button').on('click', function() {
    $('.new-tweet').slideToggle('slow');
    $('#tweet-text').focus();
  });

  $('.new-tweet').hide();
  // $('.back-to-top').hide();

  $('.back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    $('.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  });

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const $tweetData = $('#tweet-text').val();
    console.log($tweetData);

    if (!validateTweet($tweetData)) {
      return;
    }
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function() {
        loadTweets();
        console.log('Success!');
      })
      .catch(function(error) {
        console.log('Error:', (error));
      });
    $('#tweet-text').val('');
    $('#tweet-text').trigger('input');
  });

  loadTweets();

});