// common
$(function () {

  // music
  const musicBg = document.getElementById("bg_music");
  const btnMusic = $(".btn_music");
  let isPlayMusic = false;
  let isMusicPaused = false;
  let isLityOpen = false;
  let isMusicInLity = false;
  let isPausedDueToVisibilityChange;

  const startMusic = () => {
    musicBg.play();
    btnMusic.addClass("on");
    isPlayMusic = true;
    isMusicPaused = false;
    isMusicInLity = false;
  };
  const pauseMusic = () => {
    musicBg.pause();
    btnMusic.removeClass("on");
    isPlayMusic = false;
    isMusicPaused = true;
    isMusicInLity = false;
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

  const onLityOpen = () => {
    isLityOpen = true;
    if (isPlayMusic) {
      pauseMusic();
      isMusicInLity = true;
    }
  };
  const onLityClose = () => {
    isLityOpen = false;
    if (isMusicInLity) {
      startMusic();
      isMusicInLity = false;
    } else if (isPausedDueToVisibilityChange) {
      pauseMusic();
      isPausedDueToVisibilityChange = false;
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  $(document).on("lity:open", onLityOpen);
  $(document).on("lity:close", onLityClose);
  btnMusic.on("click", toggleMusic);

  $("body").one("click", (e) => {
    if (!isPlayMusic) {
      startMusic();
    }
  });

  // parallax.js
  function createParallax(id) {
    var element = document.getElementById(id);
    return new Parallax(element);
  }

  var scenes = ["scene", "sceneA01", "sceneB01", "sceneA02", "sceneB02"];
  for (var i = 0; i < scenes.length; i++) {
    createParallax(scenes[i]);
  }

  // wow.js
  new WOW().init();

  // information
  var information = new Swiper(".info", {
    slidesPerView: 1,
    allowTouchMove: true,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        allowTouchMove: false,
        spaceBetween: 50,
      },
      1200: {
        slidesPerView: 3,
        allowTouchMove: false,
        spaceBetween: 30,
      },
      576: {
        slidesPerView: 3,
        allowTouchMove: false,
        spaceBetween: 10,
      },
    },
  });

  // role
  /*$(".role_list li, .role_type li").removeClass("active");
  $(".role, #c1 .character, #c2 .character").removeClass("active");
  $(".role_list li:nth-child(1), #t1 li:nth-child(1), #t2 li:nth-child(1)").addClass("active");
  $(".role").eq(0).addClass("active");
  $("#c1 .character").eq(0).addClass("active");
  $("#c2 .character").eq(0).addClass("active");*/

  // role_list
  function bindClickEvent(selector, targetSelector) {
    $(selector).click(function () {
      var list = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(targetSelector).eq(list).addClass("active").siblings().removeClass("active");
    });
  }

  bindClickEvent(".role_list li", ".role");
  bindClickEvent("#t1 li", "#c1 .character");
  bindClickEvent("#t2 li", "#c2 .character");

  // footer
  $('footer').load('https://ids.iwplay.com.tw/includ/footer/12b_hotta.html');

});