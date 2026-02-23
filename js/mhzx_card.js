// common
$(function () {

  // nav
  $('.side_open').click(function () {
    $('nav').toggleClass('hide');
  });

  // wow.js / container
  new WOW().init();

  // privacy
  $('#privacy').load('https://ids.iwplay.com.tw/common/privacy/index.html');

  // draw_card
  $('.draw').click(function(){
    $('.modal-backdrop').removeClass('show');
    $('.draw img').addClass("flipped");
  });
  $('#card_result .popup_close, #card_result').click(function(){
    $('.draw img').removeClass('flipped');
  });

  // footer
  $('footer').load('https://ids.iwplay.com.tw/includ/footer/15.html');

});
