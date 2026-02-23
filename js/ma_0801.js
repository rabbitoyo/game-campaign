$(function () {

  // loading
  $('.circle_frame').addClass('active');
  $('.card_rotate').addClass('active');
  setTimeout(function () {
    $('.loading').addClass('completed');
  }, 3000);

  // loading_progress
  var progress = $('.progress p');
  var duration = 3000;
  var startValue = 0;
  var endValue = 100;

  $({ animatedValue: startValue }).animate({ animatedValue: endValue }, {
    duration: duration,
    step: function() {
      progress.text(Math.floor(this.animatedValue) + '%');
    },
    complete: function() {
      progress.text(endValue + '%');
    }
  });

  // music
  const musicBg = document.getElementById('bg_music');
  const btnMusic = $('.btn_music');
  let isPlayMusic = false;
  let isMusicPaused = false;
  let isPausedDueToVisibilityChange;

  const startMusic = () => {
    musicBg.play();
    btnMusic.addClass('on');
    isPlayMusic = true;
    isMusicPaused = false;
  };
  const pauseMusic = () => {
    musicBg.pause();
    btnMusic.removeClass('on');
    isPlayMusic = false;
    isMusicPaused = true;
  };
  const toggleMusic = () => {
    isPlayMusic ? pauseMusic() : startMusic();
  };

  const onVisibilityChange = () => {
    const isHidden = document.hidden;
    if (isHidden) {
      isPausedDueToVisibilityChange = musicBg.paused;
      pauseMusic();
    } else {
      if (!isPausedDueToVisibilityChange) {
        startMusic();
      }
    }
  };

  document.addEventListener('visibilitychange', onVisibilityChange);
  btnMusic.on('click', toggleMusic);

  $('body').one('click', (e) => {
    if (!isPlayMusic) {
      startMusic();
    }
  });

  // windows
  $('.windows').removeAttr('target');

  // banner
  var banner = new Swiper('.banner', {
    effect: 'fade',
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
  });

  // dialog
  let currentText = '';
  let currentIndex = 0;
  let intervalId;

  const defaultText = '“ ' + ViewObj.dialog[0] + ' ”';

  function initializeShowDefaultText() {
    currentText = defaultText;
    clearInterval(intervalId);

    intervalId = setInterval(function() {
      currentIndex++;
      $('.dialog #text').text(currentText.substr(0, currentIndex));

      if (currentIndex === currentText.length) {
        clearInterval(intervalId);
        currentIndex = 0;

        setTimeout(function() {
          typeWriterEffect();
        }, 13000);
      }
    }, 100);
  }

  function typeWriterEffect() {
    clearInterval(intervalId); 

    const randomIndex = Math.floor(Math.random() * ViewObj.dialog.length);
    const randomWord = ViewObj.dialog[randomIndex];

    currentText = '“ ' + randomWord + ' ”';
    currentIndex = 0; 

    intervalId = setInterval(function() {
      currentIndex++;
      $('.dialog #text').text(currentText.substr(0, currentIndex));

      if (currentIndex === currentText.length) {
        clearInterval(intervalId);
        currentIndex = 0;

        setTimeout(typeWriterEffect, 13000);
      }
    }, 100);
  }

  // card
  eventjson().run(ViewObj2);

  // fullpage
  new fullpage('#fullpage', {
    //options here
    autoScrolling: true,
    scrollHorizontally: false,
    responsiveWidth: 1100.98,
    anchors: ['home', 'preregister', 'fanchant', 'invite', 'card', 'features'],
    lockAnchors: true,
    navigation: false,
    normalScrollElements: '.modal, .draw_card_video',
    verticalCentered: true,
    lazyLoad: true,
    scrollOverflow: true,
    afterLoad: function (origin, destination, direction) {
      // menu
      $('.menu .container').children().eq(destination.index).addClass('active').siblings().removeClass('active');
      $('.menu .container li a').click(function() {
        let newSlide = $(this).closest('li').data('menuanchor');
        fullpage_api.moveTo(newSlide);
      });

      // home
      $(destination.item).find('.slogan').addClass('on');
      $(destination.item).find('.arthur_total').addClass('on');
      $(destination.item).find('.store').addClass('on');
      $(destination.item).find('.btn_go_preregister').addClass('on');

      // video
      let HomeVideo = document.querySelector('.home video');
      if (destination.index === 0) {
        //HomeVideo.currentTime = 0;
        HomeVideo.play();
      } else {
        HomeVideo.pause();
      }
      // draw_card_video
      let CardVideo = document.querySelector('.draw_card_video video');
      if (destination.index === 4) {
        CardVideo.currentTime = 0;
      } else {
        CardVideo.pause();
      }
      $('.card_bk').click(function() {
        $('.draw_card_video').addClass('active');
        CardVideo.currentTime = 0;
        CardVideo.play();
        setTimeout(function () {
          $('.draw_card_video').removeClass('active');
          $('.draw_card, .card .role, .card .cards').removeClass('active');
          $('.select_card').addClass('active');
          $("#card_result").modal('show');
        }, 5500);
      });

      // dialog
      if (destination.index === 1) {
        setTimeout(initializeShowDefaultText, 1000);
        // initializeShowDefaultText();
      }

      // aside
      if (destination.index > 1) {
        $('aside').addClass('active');
        $('nav .top .btn_go_preregister').addClass('active');
      } else {
        $('aside').removeClass('active');
        $('nav .top .btn_go_preregister').removeClass('active');
      }

      // preregister / fanchant / invite / card / features
      $(destination.item).find('.role').addClass('on');
      $(destination.item).find('.title').addClass('on');
      $(destination.item).find('.dialog').addClass('on');
      $(destination.item).find('.step').addClass('on');
      $(destination.item).find('.bubble').addClass('on');
      $(destination.item).find('.copy_link').addClass('on');
      $(destination.item).find('.invite_partners').addClass('on');
      $(destination.item).find('.rewards').addClass('on');
      $(destination.item).find('.cards_back').addClass('on');
      $(destination.item).find('.time').addClass('on');
      $(destination.item).find('.btn_card').addClass('on');
      $(destination.item).find('.gallery').addClass('on');
      $(destination.item).find('.btn').addClass('on');

      // card
      if (destination.index === 4) {
        $("#card_task_list").modal('show');
        $('.card .role').removeClass('.active').addClass('active');
        $('.card .cards').removeClass('.active').addClass('active');
      } else {
        $("#card_task_list").modal('hide');
      }

    },
  });

  // remove watermark
  $('.fp-watermark').remove();

  // remove pathname
  var menuLinks = document.querySelectorAll('.menu .container li a');
  menuLinks.forEach(function(link) {
    link.removeAttribute('href');
  });

  // btn_go
  $('.btn_go_preregister').on('click', function () {
    fullpage_api.moveTo(2);
  });
  $('.btn_go_task').on('click', function () {
    fullpage_api.moveTo(4);
  });

  // menu_mob
  $('.menu_icon').click(function() {
    $('.menu_icon, body').toggleClass('active');
    $('.menu_wrap').toggleClass('open');
  });
  $('.menu .container li a').click(function() {
    $('.menu_icon, body').removeClass('active');
    $('.menu_wrap').removeClass('open');
  });
  $(window).on('resize', function() {
    if ($(window).width() > 1100) {
      $('.menu_icon, body').removeClass('active');
      $('.menu_wrap').removeClass('open');
    }
  });

  // store_rewards
  $('.store_rewards').click(function() {
    $("#store_rewards").modal('show');
  });

  // fanchant
  $('.fanchant .bubbles .bubble').click(function() {
    $("#fanchant_text").modal('show');
  });

  // card
  $('.btn_result').click(function() {
    $('.draw_card, .card .role, .card .cards').removeClass('active');
    $('.select_card').addClass('active');
  });
  $('.btn_return').click(function() {
    $('.draw_card, .card .role, .card .cards').addClass('active');
    $('.select_card').removeClass('active');
  });

  // card_lock
  $('.card_type.light').click(function() {
    $('.card_type.light').removeClass('lock');
    $(this).addClass('lock');
  });

  // features
  const features = new Swiper('.carousel', {
    effect: 'coverflow',
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    autoplay: true,
    allowTouchMove: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 62 + '%',
      depth: 220,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.btn_next',
      prevEl: '.btn_prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1100: {
        allowTouchMove: false,
      },
    },
  });

  // notice
  $('#btn_privacy, #btn_invite, #btn_card, #btn_notice').click(function() {

    $('#notice h4, #notice ol, .invite_rule').addClass('d-none');
    
    if ($(this).is('#btn_privacy')) {
        $('.privacy_list').removeClass('d-none').addClass('d-block');
    } else if ($(this).is('#btn_invite')) {
        $('.invite_rule').removeClass('d-none').addClass('d-block');
    } else if ($(this).is('#btn_card')) {
        $('.card_rule').removeClass('d-none').addClass('d-block');
    } else if ($(this).is('#btn_notice')) {
        $('.notice_list').removeClass('d-none').addClass('d-block');
    }
    
  });

  // modal
  function removeOneModalBackdrop() {
    var backdrops = $('.modal-backdrop');
    if (backdrops.length >= 2) {
        $(backdrops[1]).remove();
    }
  }
  removeOneModalBackdrop();

  // footer
  $('footer').load('https://ids.iwplay.com.tw/includ/footer/wa.html');

});
