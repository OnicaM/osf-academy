window.onload = function() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      document.getElementById("main").innerHTML = request.responseText;
    }
  };

  console.log(request);

  var link = document.querySelectorAll("nav ul > li > a");

  link.forEach((item, index) => {
    console.log(item);

    item.addEventListener("click", function(e) {
      e.preventDefault();
      var url = this.href;
      var urlSplit = url.split("#");
      console.log(urlSplit);
      request.open("GET", "pages/" + urlSplit[1] + ".html");
      request.send();
    });
  });
};
