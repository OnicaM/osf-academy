window.onload = function() {
  var requestPage = new XMLHttpRequest();

  requestPage.onreadystatechange = function() {
    if (requestPage.readyState === 4) {
      document.getElementById("main").innerHTML = requestPage.responseText;
    }
  };

  var link = document.querySelectorAll("nav ul > li > a");

  link.forEach((item, index) => {
    //console.log(item);

    item.addEventListener("click", function(e) {
      e.preventDefault();
      var url = this.href;
      var urlSplit = url.split("#");
      console.log(urlSplit);
      requestPage.open("GET", "pages/" + urlSplit[1] + ".html");
      requestPage.send();
    });
  });

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

  promise.then(items => displayData(items.products));

  var promiseFeatured = get("..json/featuredProducts.json");

  promiseFeatured.then(items => displayFeaturedProducts(items));
};

function displayData(data) {
  var container = document.querySelector(".products--popular .row");
  var featuredContainer = document.querySelector(".products--featured .row");
  data.forEach(item => {
    var div = document.createElement("div");
    var divF = document.createElement("div");
    div.classList.add("col-sm-12", "col-md-6", "col-lg-3", "item");
    divF.classList.add("item");
    div.innerHTML = `<div class="item_wrap">
        <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
        <div class="item_caption">
        <p>${item.name}</p>
        <p class="price">$ ${item.price}</p>
        </div>
        </div>`;
    divF.innerHTML = `<div class="item_wrap">
        <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
        <div class="item_caption">
        <p>${item.name}</p>
        <p class="price">$ ${item.price}</p>
        </div>
        </div>`;
    if (container) {
      container.appendChild(div);
    }
    if (featuredContainer) {
      featuredContainer.appendChild(divF);
    }
  });
  $(".products--featured .row").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: true
  });
}

function displayFeaturedProducts(data) {
  var featuredContainer = document.querySelector(".products--featured .row");
  data.forEach(item => {
    var div = document.createElement("div");

    div.classList.add("item");

    divF.innerHTML = `<div class="item_wrap">
          <img src="/images/popularItems/${item.image}.png" alt="${item.name}">
          <div class="item_caption">
          <p>${item.name}</p>
          <p class="price">$ ${item.price}</p>
          </div>
          </div>`;

    if (featuredContainer) {
      featuredContainer.appendChild(div);
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

function init() {
  getCurrentYear();
  //showHide();
}

init();
