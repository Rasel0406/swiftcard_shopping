"use strict";

// active nav link
var navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (nav) {
      return nav.classList.remove("active-nav");
    });
  });
}); // Trending part

var trendingSection = function trendingSection() {
  var url = "https://fakestoreapi.com/products";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    displayTrendingProducts(data);
  });
};

var displayTrendingProducts = function displayTrendingProducts(products) {
  var trendingContainer = document.getElementById('trending'); // trendingContainer.innerHTML = '';

  var filteredProducts = products.filter(function (product) {
    return product.rating.rate >= 4.0;
  }).slice(0, 3);
  filteredProducts.forEach(function (product) {
    var div = document.createElement('div');
    div.innerHTML = "\n                   <div class=\"card bg-base-100 w-96 shadow-sm h-full flex flex-col hover:shadow-2xl transition-shadow duration-1000\">\n  <figure class=\"bg-gray-100 rounded-lg p-6 flex justify-center\" >\n     <img\n      src=\"".concat(product.image, "\"\n      alt=\"Shoes\" class=\"h-64 object-contain pb-4\" />\n  </figure>\n  <!-- rating -->\n  <div class=\"flex justify-between items-center mt-4\">\n      <div class=\"pl-3\">\n         <span class=\"bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full\">\n        ").concat(product.category, "\n    </span>\n      </div>\n\n    <div class=\"flex items-center text-yellow-500 text-sm pr-4 \">\n      <i class=\"fa-solid fa-star\"></i> <span class=\"ml-1 text-gray-600\">").concat(product.rating.rate, "</span>\n    </div>\n\n  </div>\n\n  <div class=\"card-body\">\n    <h2 class=\"card-title py-2 font-bold text-xl truncate\">\n   ").concat(product.title.length > 35 ? product.title.slice(0, 32) + "..........." : product.title, "\n    </h2>\n   <p class=\"font-bold text-lg py-1\">\n    $").concat(product.price, "\n  </p>\n    <div class=\"card-actions justify-between\">\n      <button onclick =\"openProductDetails(").concat(product.id, ")\" class=\"btn flex-1 border rounded-lg py-2  font-bold text-xl text-gray-700 hover:bg-gray-100\"><i class=\"fa-regular fa-eye\"></i>\n            Details\n            </button>\n     <button class=\"btn btn-active bg-[#4e38f5] font-bold text-xl text-white rounded-lg px-10\"><i class=\"fa-solid fa-cart-shopping\"></i>\n             Add\n            </button>\n    </div>\n  </div>\n\n</div>\n        \n        ");
    trendingContainer.append(div);
  });
}; // product Details


var openProductDetails = function openProductDetails(productId) {
  var url = "https://fakestoreapi.com/products/".concat(productId);
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (data) {
    displayProductDetails(data);
  });
}; // display products details


var displayProductDetails = function displayProductDetails(product) {
  var productDetails = document.getElementById('product_details');
  productDetails.innerHTML = "\n        <div class=\"card bg-base-100 w-full shadow-sm\">\n  <figure class=\"bg-gray-100 rounded-lg p-6 flex justify-center\" >\n     <img\n      src=\"".concat(product.image, "\"\n      alt=\"Shoes\" class=\"h-64 object-contain pb-4\" />\n  </figure>\n  <div class=\"flex justify-between items-center mt-4\">\n      <div class=\"pl-3\">\n         <span class=\"bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full\">\n      ").concat(product.category, "\n    </span>\n      </div>\n    <div class=\"flex items-center text-yellow-500 text-sm pr-4 \">\n      <i class=\"fa-solid fa-star\"></i> <span class=\"ml-1 text-gray-600\">").concat(product.rating.rate, " (").concat(product.rating.count, ")</span>\n    </div>\n  </div>\n  <div class=\"card-body\">\n    <h2 class=\"card-title py-2 font-bold text-xl\">\n    ").concat(product.title, "\n    </h2>\n    <p class=\"py-2 font-semibold text-base\">").concat(product.description, "</p>\n   <p class=\"font-bold text-lg py-1\">\n    $").concat(product.price, "\n  </p>\n    <div class=\"card-actions justify-between\">\n      <button class=\"btn flex-1 border rounded-lg py-2  font-bold text-xl text-gray-700 hover:bg-gray-100\"><i class=\"fa-brands fa-amazon-pay\"></i>\n            Buy Now\n            </button>\n     <button class=\"btn btn-active bg-[#4e38f5] font-bold text-xl text-white rounded-lg px-10\"><i class=\"fa-solid fa-cart-shopping\"></i>\n             Add\n            </button>\n    </div>\n  </div>\n</div>\n \n \n ");
  document.getElementById("my_modal_2").showModal();
};

trendingSection();