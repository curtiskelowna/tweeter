/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const $tweetData = $(this).serialize();
    console.log($tweetData);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $tweetData
    })
      .then(function() {
        console.log('Success!');
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  });

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

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').append($tweet);
    }
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
  <p class="tweet-content">${(tweet.content.text)}</p>
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

  loadTweets();

});