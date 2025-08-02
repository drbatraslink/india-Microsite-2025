$(document).ready(function () {
  /*** 1. Initialize Owl Carousels ***/
  function initializeCarousel(selector, options) {
    $(selector).owlCarousel(options);
  }

  const carouselConfigs = {
    screenshot_slider: {
      loop: true,
      responsiveClass: true,
      nav: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 6000,
      smartSpeed: 400,
      navText: [
        "<img src='images/previmage.webp' alt='001 prev' width='50' height='50' />",
        "<img src='images/nextimage.webp' alt='001 next' width='50' height='50' />"
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        768: { items: 2 },
        1024: { items: 2 },
        1200: { items: 3 }
      }
    },
    ourdoctor_slider: {
      loop: true,
      responsiveClass: true,
      nav: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 7000,
      smartSpeed: 400,
      autoHeight: true,
      navText: [
        "<img src='images/previmage.webp' alt='001 prev' width='50' height='50' />",
        "<img src='images/nextimage.webp' alt='001 next' width='50' height='50' />"
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        768: { items: 1 },
        1024: { items: 1 },
        1200: { items: 1 }
      }
    },
    awards_slider: {
      // loop: true,
      responsiveClass: true,
      nav: true,
      margin: 2,
      autoplay: true,
      autoplayTimeout: 2000,
      smartSpeed: 400,
      navText: [
        "<img src='images/previmage.webp' alt='001 prev' width='50' height='50' />",
        "<img src='images/nextimage.webp' alt='001 next' width='50' height='50' />"
      ],
      responsive: {
        0: { items: 1, loop: true }, // Loop enabled on mobile
        600: { items: 1, loop: true }, // Loop enabled on small tablets
        768: { items: 3, loop: true }, // Loop disabled on larger screens
        1024: { items: 4, loop: false },
        1200: { items: 4, loop: false }
      }
    }
  };

  initializeCarousel(".screenshot_slider", carouselConfigs.screenshot_slider);
  initializeCarousel(".ourdoctor_slider", carouselConfigs.ourdoctor_slider);
  initializeCarousel(".awards_slider", carouselConfigs.awards_slider);
   
  $(".owl-nav .owl-prev").attr("role", "button"), $(".owl-nav .owl-next").attr("role", "button") 

  /*** 2. Form Focus Styling ***/
  $('input,textarea').val("");
  $('.form-group input, .form-group textarea, .form-group select').on('focusout', function () {
    $(this).toggleClass('has-value', $(this).val() !== "");
  });

  /*** 3. Tab Functionality ***/
  function setupTabs() {
    $(".tabb_content").hide().first().show();
    $("ul.nptabbs li").on("click", function () {
      const target = $(this).attr("rel");
      $(".tabb_content").hide();
      $("#" + target).fadeIn();
      $("ul.nptabbs li").removeClass("active");
      $(this).addClass("active");
      $(".tabb_drawer_heading").removeClass("d_active");
      $(".tabb_drawer_heading[rel='" + target + "']").addClass("d_active");
    });

    $(".tabb_drawer_heading").on("click", function () {
      const target = $(this).attr("rel");
      $(".tabb_content").hide();
      $("#" + target).fadeIn();
      $(".tabb_drawer_heading").removeClass("d_active");
      $(this).addClass("d_active");
      $("ul.nptabbs li").removeClass("active");
      $("ul.nptabbs li[rel='" + target + "']").addClass("active");
    });

    $("ul.nptabbs li").last().addClass("tabb_last");
  }

  function tabControl() {
    const tabs = $(".tabbed-content .tabs");
    if (tabs.is(":visible")) {
      tabs.find("a").on("click", function (e) {
        e.preventDefault();
        const target = $(this).attr("href");
        tabs.find("a").removeClass("active");
        $(".tabbed-content .item").removeClass("active");
        $(this).addClass("active");
        $(target).addClass("active");
      });
    } else {
      $(".tabbed-content .item").on("click", function () {
        const target = $(this).attr("id");
        const parent = $(this).parents(".tabbed-content");
        parent.find(".tabs a").removeClass("active");
        parent.find(".item").removeClass("active");
        $(this).addClass("active");
        parent.find(`.tabs a[href="#${target}"]`).addClass("active");
      });
    }
  }

  setupTabs();
  tabControl();

  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(tabControl, 250);
  });

  /*** 4. Scroll-based Visibility for Open Button ***/
  $(window).on("scroll resize", function () {
    let scrollTop = $(this).scrollTop();
    let footerTop = $('#footer').offset().top;
    let windowBottom = scrollTop + $(window).height();

    // 1. Show/hide button based on scroll position
    $("#open-button").toggle(scrollTop !== 0);

    // 2. Adjust bottom spacing if overlapping footer
    if (windowBottom >= footerTop) {
      $('#open-button').css('bottom', '50px');
    } else {
      $('#open-button').css('bottom', '20px');
    }
  });

  /*** 5. Open & Close Form Logic ***/
  window.openForm = function () {
    $("#myForm").show();
    $("#myForm .myForm-top-form").append($(".form-top-new"));
    $(".contactFormHolder .contactForm").hide();
  };

  window.closeForm = function () {
    $(".contactFormHolder .contactForm").show().append($(".form-top-new"));
    $("#myForm").hide();
  };
});
