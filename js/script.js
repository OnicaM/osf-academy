window.onload = function() {
  //===============rewrite index content with ajax==========

  // var requestPage = new XMLHttpRequest();

  // requestPage.onreadystatechange = function() {
  //   if (requestPage.readyState === 4) {
  //     document.getElementById("main").innerHTML = requestPage.responseText;
  //   }
  // };

  // var link = document.querySelectorAll("nav ul > li > a");

  // link.forEach((item, index) => {
  //   item.addEventListener("click", function(e) {
  //     e.preventDefault();
  //     var url = this.href;
  //     var urlSplit = url.split("#");
  //     console.log(urlSplit);
  //     requestPage.open("GET", "pages/" + urlSplit[1] + ".html");
  //     requestPage.send();
  //   });
  // });
  //========================================================
  function get(url) {
    return new Promise(function(resolve, reject) {
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", url, true);
      xhttp.onload = function() {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.response));
        } else {
          reject(xhttp.statusText);
        }
      };
      xhttp.onerror = function() {
        reject(xhttp.statusText);
      };
      xhttp.send();
    });
  }

  var promise = get("../json/popularItems.json");

  promise.then(items => {
    showData(items.products);
  });

  var promiseFeatured = get("../json/featuredProducts.json");

  promiseFeatured.then(items => displayFeaturedProducts(items.products));

  var services = get("../json/popularItems.json");
  services.then(items => {
    displayServicesProduct(items.products);
  });
};

function displayData(data) {
  var container = document.querySelector(".products--popular .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");

    div.innerHTML = `<div class="item_wrap">
      <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
      <div class="item_caption">
      <p>${item.name}</p>
      <p class="price">$ ${item.price}</p>
      </div>
      </div>`;

    if (container) {
      container.appendChild(div);
    }
  });

  $(".products--popular .row").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 768,
        settings: "unslick"
      }
    ]
  });
}

function displayFeaturedProducts(data) {
  var featuredContainer = document.querySelector(".products--featured .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("item");

    div.innerHTML = `<div class="item_wrap">
        <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
        <div class="item_caption">
        <span class="item-title">${item.name}</span>
        <span class="description">${item.description}</span>
        </div>
        </div>`;

    if (featuredContainer) {
      featuredContainer.appendChild(div);
    }
  });

  $(".products--featured .row ").slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true,
    appendArrows: ".slider-nav",
    nextArrow: '<button class="fas fa-angle-right arrow-right"></button>',
    prevArrow: '<button class="fas fa-angle-left arrow-left"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

function showData(dataToDisplay) {
  var loadMore = document.querySelector(".more .button--more"),
    loadLess = document.querySelector(".more .button--less"),
    showLess = dataToDisplay.slice(0, 8),
    hiddenData = dataToDisplay.length - showLess.length,
    showMore = dataToDisplay.splice(9, hiddenData);
  var fullProducts = showLess.concat(showMore);

  displayData(showLess);
  console.log("show less: ", showLess);
  console.log("show more ", showMore);
  if (loadMore) {
    loadMore.addEventListener("click", function(e) {
      // e.preventDefault();
      this.classList.add("hidden");
      loadMore.classList.remove("hidden");

      displayData(showLess);
    });
  }
}

function displayServicesProduct(data) {
  var servicesContainer = document.querySelector(".filter-results .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");

    div.innerHTML = `<div class="item_wrap">
        <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
        <div class="item_caption">
        <span class="item-title">${item.name}</span>
        <span class="price">$ ${item.price}</span>
        </div>
        </div>`;

    if (servicesContainer) {
      servicesContainer.appendChild(div);
    }
  });
}

function toggleNav($trigger, $selector) {
  $trigger.on("click", function() {
    $selector.toggleClass("js--open");
  });
}

$(".banner-slider").slick({
  dots: true,
  infinite: true,
  speed: 500,
  // fade: true,
  cssEase: "linear",
  arrows: false
});

function getCurrentYear() {
  document.querySelector(
    ".copyright .year"
  ).innerHTML = new Date().getFullYear();
}

function showHide() {
  var items = document.querySelectorAll(".products--popular .item");
}

function toggleMobileNav() {
  $(".nav-mobile").hide();
  $(".toggle-nav").on("click", function() {
    $(this).toggleClass("open");
    $(".nav-mobile").slideToggle();
  });
}

function close_accordion_section() {
  $(".footer-info h4").removeClass("active");
  $(".footer-info_description")
    .slideUp(300)
    .removeClass("open");
}

function accordion() {
  $(".footer-info h4").removeClass("active");
  $(".footer-info_description")
    .hide(300)
    .removeClass("open");
  $(".footer-info h4").click(function(e) {
    // Grab current anchor value
    var currentAttrValue = $(this).attr("href");

    if ($(e.target).is(".active")) {
      close_accordion_section();
    } else {
      close_accordion_section();

      // Add active class to section title
      $(this).addClass("active");
      // Open up the hidden content panel
      $(this)
        .next(".footer-info_description")
        .slideDown(300)
        .addClass("open");
    }

    e.preventDefault();
  });
}

function openNavPages() {
  $(".nav-mobile .has-children > i").on("click", function() {
    $(this)
      .parent()
      .toggleClass("open");
  });
}

function productCarousel() {
  var scrollToElement = function(element) {
      var $innerListItem = $(element),
        $parentDiv = $(element).parent();

      $parentDiv.scrollTop(
        $parentDiv.scrollTop() +
          $innerListItem.position().top -
          $parentDiv.height() / 2 +
          $innerListItem.height() / 2
      );
    },
    setNavHeight = function() {
      setTimeout(function() {
        $(".carousel-nav-list").height(
          $(".product-carousel")
            .find("img")
            .height() -
            $(".carousel-btn").height() * 2 -
            20
        );
      }, 250);
    };

  $(".product-carousel").slick({
    arrows: false,
    fade: true,
    speed: 500,
    autoplay: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false
        }
      }
    ]
  });

  window.onresize = function() {
    setNavHeight();
  };

  $(document).ready(function() {
    setNavHeight();
  });

  $(".carousel").on("beforeChange", function(
    event,
    slick,
    currentSlide,
    nextSlide
  ) {
    $(".carousel-nav-item").removeClass("active");
    $('.carousel-nav-item[data-slide="' + nextSlide + '"]').addClass("active");
    scrollToElement($('.carousel-nav-item[data-slide="' + nextSlide + '"]')[0]);
  });

  $(document).on("click", ".carousel-nav-item", function(e) {
    var $this = $(this),
      slideNumber = parseInt($this.attr("data-slide"));

    $(".product-carousel").slick("slickGoTo", slideNumber);
  });
}

function init() {
  getCurrentYear();
  toggleMobileNav();
  //showHide();
  $("#tabs").tabs();
  productCarousel();
  openNavPages();
  const mq = window.matchMedia("(max-width: 768px)");

  if (mq.matches) {
    accordion();
  }
}

init();
