// common
$(function () {

  // Initialize Swiper Letters
  const swiper = new Swiper(".letters", {
    slidesPerGroup: 2,
    slidesPerView: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
    },
    breakpoints: {
      991.98: {
        slidesPerGroup: 3,
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: "row",
        },
      }
    },
  });

  // Initialize Fullpage.js
  new fullpage("#fullpage", {
    autoScrolling: true,
    lockAnchors: true,
    navigation: false,
    normalScrollElements: ".modal",
    verticalCentered: true,
    lazyLoad: true,
    scrollOverflow: true,
    afterLoad: function (origin, destination, direction) {
      // message_board
      if (destination.index === 1) {
        $(destination.item).find('.container').addClass('fadeIn');
      }
    },
  });

  // Remove Fullpage.js watermark
  $(".fp-watermark").remove();

  // Toggle member info
  $(".member_name").click((e) => {
    e.stopPropagation();
    $(".member_info").toggleClass("open");
  });
  $(document).click((e) => {
    if (!$(e.target).closest(".langs").length) {
      $(".member_info").removeClass("open");
    }
  });

  // Bind click event to switch letter types
  function bindClickEvent(selector, targetSelector) {
    $(selector).click(function () {
      const index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(targetSelector).eq(index).addClass("active").siblings().removeClass("active");
    });
  }
  bindClickEvent(".letter_list li", ".letter_type .letter");

  // Check and toggle aside menu
  function checkAsideSize() {
    const isSmallScreen = $(window).width() <= 1400;
    $("aside").toggleClass("close", isSmallScreen);
    toggleLogoByAside();
    updateAsideButtons();
  }

  function updateAsideButtons() {
    const isAsideClosed = $("aside").hasClass("close");
    $(".btn_open").toggleClass("d-none", !isAsideClosed);
    $(".btn_close").toggleClass("d-none", isAsideClosed);
  }

  checkAsideSize();
  $(window).resize(checkAsideSize);

  // Toggle aside menu and button states
  $("aside .arrow").click(() => {
    $("aside").toggleClass("close");
    toggleLogoByAside();
    updateAsideButtons();
  });

  // Toggle logo color based on aside state
  function toggleLogoByAside() {
    const isAsideClosed = $("aside").hasClass("close");
    $(".white").toggleClass("d-none", !isAsideClosed);
    $(".black").toggleClass("d-none", isAsideClosed);
  }

  // Move to fullpage section on submit
  $(".btn_submit").click(() => fullpage_api.moveTo(2));

  // Heart animation reset
  $(".heart").click(function () {
    $(this).removeClass("active")[0].offsetWidth;
    $(this).addClass("active");
  });

  // Toggle rewards section
  $(".btn_get").click(() => $(".get_rewards").removeClass("d-none").siblings().addClass("d-none"));
  $(".btn_prevpage").click(() => $(".get_rewards").addClass("d-none").siblings().removeClass("d-none"));

  // Handle privacy modal close
  $(".form-check").click(function () {
    const targetModal = $(this).closest(".modal").attr("id");
    $("#privacy .popup_close").attr("data-bs-target", `#${targetModal}`);
  });
  $("#privacy .popup_close").click(function () {
    const targetModal = $(this).attr("data-bs-target");
    if (targetModal) $(targetModal).modal("show");
  });

  // Load footer
  $("footer").load("https://ids.iwplay.com.tw/includ/footer/zxsj.html");

  // Remove excess modal backdrops
  function removeExtraModalBackdrop() {
    $(".modal-backdrop").slice(1).remove();
  }
  removeExtraModalBackdrop();

});