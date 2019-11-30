window.onload = function() {
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

  var promise = get("json/popularItems.json");

  promise.then(items => {
    showData(items.products);
  });

  var promiseFeatured = get("json/featuredProducts.json");

  promiseFeatured.then(items => displayFeaturedProducts(items.products));

  var services = get("json/popularItems.json");
  services.then(items => {
    displayServicesProduct(items.products);
  });

  var popularItems = get("../json/featuredProducts.json");
  popularItems.then(items => displayLastFourItems(items.products));
};

var cart = [];
var favorites = [];
var myCart = localStorage.getItem("myCart");
var displayMyCart = JSON.parse(myCart);

var myFavorites = localStorage.getItem("myCart");
var displayMyFavorites = JSON.parse(myFavorites);

if (displayMyCart && displayMyCart.length >= 0) {
  displayMyCart.forEach(item => {
    $(".chart-icon_count").text(item.quantity);
  });
} else {
  $(".chart-icon_count").text("0");
}

if (displayMyFavorites && displayMyFavorites.length >= 0) {
  displayMyFavorites.forEach(item => {
    $(".favorites-icon_count").text(item.quantity);
  });
} else {
  $(".chart-icon_count").text("0");
}

function displayProductsInCart() {
  var container = document.querySelector(".cart-products-container");
  var div = document.createElement("div");
  if (displayMyCart) {
    displayMyCart.forEach(item => {
      div.classList.add("item");
      div.innerHTML = `<div class="item_wrap">
    <div class="item_name">
     ${item.quantity}x   ${item.name}
    <p class="price">$ ${item.price}</p>
    </div>
    </div>`;
    });
    if (container) {
      container.appendChild(div);
    }
  }
}

function displayProductsInFavorites() {
  var containerF = document.querySelector(".favourites-products-container");
  var div = document.createElement("div");
  if (displayMyFavorites) {
    displayMyFavorites.forEach(item => {
      div.classList.add("item");
      div.innerHTML = `<div class="item_wrap">
    <div class="item_name">
     ${item.quantity}x   ${item.name}
    <p class="price">$ ${item.price}</p>
    </div>
    </div>`;
    });
    if (containerF) {
      containerF.appendChild(div);
    }
  }
}

function displayData(data) {
  var container = document.querySelector(".products--popular .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");

    div.innerHTML = `<div class="item_wrap ${item.class}">
    <a href="pages/product.html"><img src="/images/popularItems/${item.image}.png" alt="${item.name}"></a>
    <div class="item_caption">
    <p><a href="pages/product.html">${item.name}</a></p>
    <p class="price">$ ${item.price}</p>
    <div class="buttons-action">
      <div class="button-price"><span>$ ${item.price}</span> <button class="add-to-cart" data-id="${item.id}">Buy now</button></div>
      <div class="buttons-overlay">
        <button class="add-to-cart fas fa-plus" data-id="${item.id}"></button><button class="add-to-favorites fas fa-heart"  data-id="${item.id}"></button>
      </div>
      <div class="overlay-background">
        <span class="overlay-text">My dragons are misbehaving again. Unbelieveable!</span>
        <span class="overlay-ic">5H AGO</span>
      </div>
    </div>
    </div>
    
    </div>`;

    if (container) {
      container.appendChild(div);
    }

    var selectItem = $(".products--popular .row");

    var button = selectItem.find("button[data-id='" + item.id + "']");

    button.on("click", function(e) {
      var buttonTarget = $(e.target);
      if (buttonTarget.hasClass("add-to-cart")) {
        var buttonId = buttonTarget.data("id");
        addToCart(buttonId, data);

        if (cart.length >= 0) {
          cart.forEach(function(item, index) {
            $(".chart-icon_count").text(cart.length);
          });
        } else {
          $(".chart-icon_count").text("0");
        }
      } else if (buttonTarget.hasClass("add-to-favorites")) {
        var buttonId = buttonTarget.data("id");
        addToFavorites(buttonId, data);

        if (favorites.length >= 0) {
          favorites.forEach(function(item, index) {
            $(".favorites-icon_count").text(favorites.length);
          });
        } else {
          $(".favorites-icon_count").text("0");
        }
      }
    });
  });

  //Add to cart function
  function addToCart(elemId, data) {
    var obj = data.find(function(obj) {
      return obj.id == elemId;
    });

    cart.push({
      id: obj.id,
      name: obj.name,
      quantity: 1,
      price: obj.price
    });

    localStorage.setItem("myCart", JSON.stringify(cart));
  }

  function addToFavorites(elemId, data) {
    var obj = data.find(function(obj) {
      return obj.id == elemId;
    });
    favorites.push({
      id: obj.id,
      name: obj.name,
      quantity: 1,
      price: obj.price
    });
    localStorage.setItem("myFavorites", JSON.stringify(favorites));
  }

  function mobileOnlySlider() {
    $(".products--popular .row").slick({
      autoplay: false,
      speed: 1000,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false
    });
  }
  if (window.innerWidth < 768) {
    mobileOnlySlider();
  }

  $(window).resize(function(e) {
    if (window.innerWidth < 768) {
      if (!$(".products--popular .row").hasClass("slick-initialized")) {
        mobileOnlySlider();
      }
    } else {
      if ($(".products--popular .row").hasClass("slick-initialized")) {
        $(".products--popular .row").slick("unslick");
      }
    }
  });
}

function displayFeaturedProducts(data) {
  var featuredContainer = document.querySelector(".products--featured .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("item");

    div.innerHTML = `<div class="item_wrap">
  <a href="../pages/product.html"><img src="images/${item.image}.png" alt="${item.name}"></a>
      <div class="item_caption">
      <span class="item-title"><a href="../pages/product.html">${item.name}</a></span>
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

function displayLastFourItems(data) {
  var sliceData = data.slice(0, 4);
  var popular = document.querySelector(".popular-items .row");

  sliceData.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");

    div.innerHTML = `<div class="item_wrap">
  <a href="../pages/product.html"><img src="images/${item.image}.png" alt="${item.name}"></a>
      <div class="item_caption">
      <span class="item-title"><a href="../pages/product.html">${item.name}</a></span>
      <span class="price">$ ${item.price}</span>
      </div>
      </div>`;

    if (popular) {
      popular.appendChild(div);
    }
  });
  pupularItemsSlider();
}

function showData(dataToDisplay) {
  displayData(dataToDisplay);
}

function displayServicesProduct(data) {
  var servicesContainer = document.querySelector(".filter-results .row");

  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");

    div.innerHTML = `<div class="item_wrap">
  <a href="../pages/product.html"><img src="/images/popularItems/${item.image}.png" alt="${item.name}"></a>
      <div class="item_caption">
      <span class="item-title"><a href="../pages/product.html">${item.name}</a></span>
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
  cssEase: "linear",
  arrows: false
});

function mobileOnlySlider() {
  $(".popular-items .row").slick({
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false
  });
}

function pupularItemsSlider() {
  if (window.innerWidth < 769) {
    mobileOnlySlider();
  }

  $(window).resize(function(e) {
    if (window.innerWidth < 769) {
      if (!$(".popular-items .row").hasClass("slick-initialized")) {
        mobileOnlySlider();
      }
    } else {
      if ($(".popular-items .row").hasClass("slick-initialized")) {
        $(".popular-items .row").slick("unslick");
      }
    }
  });
}

function getCurrentYear() {
  document.querySelector(
    ".copyright .year"
  ).innerHTML = new Date().getFullYear();
}

function showHide() {
  var items = document.querySelectorAll(".products--popular .item");
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
    var currentAttrValue = $(this).attr("href");

    if ($(e.target).is(".active")) {
      close_accordion_section();
    } else {
      close_accordion_section();

      $(this).addClass("active");
      $(this)
        .next(".footer-info_description")
        .slideDown(300)
        .addClass("open");
    }

    e.preventDefault();
  });
}

function toggleMobileNav() {
  $(".nav-mobile").hide();
  $(".toggle-nav").on("click", function() {
    $(this).toggleClass("open");
    $(".nav-mobile").slideToggle();
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

//product page
function increaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById("number").value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? (value = 1) : "";
  value--;
  document.getElementById("number").value = value;
}

function cookies() {
  setTimeout(function() {
    if ($.cookie("cookie-popup") == null) {
      $("#myModal").modal("show");
      $("#accept").on("click", function() {
        $.cookie("cookie-popup", "2");
        $("#myModal").modal("hide");
      });
    } else {
      $("#myModal").modal("hide");
    }
  }, 10000);
}

function toggleDropdownsHeader() {
  $(".header-dropdowns > div").on("click", function() {
    $(this).toggleClass("open");
    $(this)
      .siblings()
      .removeClass("open");
  });
}

function showMore() {
  $(".show-less-services").hide();
  $(".show-more-services").click(function() {
    $(".filter-results .item:hidden")
      .slice(0, 8)
      .show();

    $(this).hide();
    $(".show-less-services").show();
  });

  var size_li = $(".filter-results .item").size();
  var x = 8;
  $(".filter-results .item")
    .slice(0, 7)
    .show();

  $(".show-less-services").click(function() {
    var showLess = size_li - 8;
    x = showLess < 0 ? 8 : size_li - showLess;
    $(".filter-results .item")
      .not(":lt(" + x + ")")
      .hide();
    $(this).hide();
    $(".show-more-services").show();
  });
}

function showMorePopular() {
  $(".button--less").hide();
  $(".button--more").click(function() {
    $(".products--popular .item:hidden")
      .slice(0, 8)
      .show();

    $(this).hide();
    $(".button--less").show();
  });

  var size_li = $(".products--popular .item").size();
  var x = 8;
  $(".products--popular .item")
    .slice(0, 7)
    .show();

  $(".button--less").click(function() {
    var showLess = size_li - 8;
    x = showLess < 0 ? 8 : size_li - showLess;
    $(".products--popular .item")
      .not(":lt(" + x + ")")
      .hide();
    $(this).hide();
    $(".button--more").show();
  });
}

function showMoreText() {
  var showChar = 100;
  var ellipsestext = "...";
  var moretext = "Read more";
  var lesstext = "Read less";

  $(".product-info_text").each(function() {
    var content = $(this).html();

    if (content.length > showChar) {
      var c = content.substr(0, showChar);
      var h = content.substr(showChar, content.length - showChar);

      var html =
        c +
        '<span class="moreellipses">' +
        ellipsestext +
        '&nbsp;</span><span class="morecontent"><span>' +
        h +
        '</span>&nbsp;&nbsp;<a href="" class="morelink">' +
        moretext +
        "</a></span>";

      $(this).html(html);
    }
  });

  $(".morelink").click(function() {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
    }
    $(this)
      .parent()
      .prev()
      .toggle();
    $(this)
      .prev()
      .toggle();
    return false;
  });
}

function scrollTopDom() {
  $(".scroll-top span").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      "slow"
    );
    return false;
  });
}

function init() {
  getCurrentYear();
  toggleMobileNav();

  productCarousel();
  openNavPages();
  const mq = window.matchMedia("(max-width: 768px)");

  $(window)
    .on("resize", function() {
      if (mq.matches) {
        accordion();
      }
    })
    .resize();
  displayProductsInCart();
  displayProductsInFavorites();
  cookies();
  toggleDropdownsHeader();
  showMore();
  showMorePopular();
  showMoreText();
  scrollTopDom();
}

$(document).ready(function() {
  init();
});
