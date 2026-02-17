// active nav link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", function () {

    navLinks.forEach(nav => nav.classList.remove("active-nav"));


  });
});


// Trending part
const trendingSection = ()=>{
    const url ="https://fakestoreapi.com/products";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayTrendingProducts(data);
    })
};
const displayTrendingProducts = (products)=>{
    const trendingContainer = document.getElementById('trending');
    // trendingContainer.innerHTML = '';
    const filteredProducts = products.filter(product => product.rating.rate >= 4.0).slice(0, 3);
    filteredProducts.forEach((product) => {
        const div = document.createElement('div');
        div.innerHTML =`
                   <div class="card bg-base-100 w-96 shadow-sm h-full flex flex-col hover:shadow-2xl transition-shadow duration-1000">
  <figure class="bg-gray-100 rounded-lg p-6 flex justify-center" >
     <img
      src="${product.image}"
      alt="Shoes" class="h-64 object-contain pb-4" />
  </figure>
  <!-- rating -->
  <div class="flex justify-between items-center mt-4">
      <div class="pl-3">
         <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
        ${product.category}
    </span>
      </div>

    <div class="flex items-center text-yellow-500 text-sm pr-4 ">
      <i class="fa-solid fa-star"></i> <span class="ml-1 text-gray-600">${product.rating.rate}</span>
    </div>

  </div>

  <div class="card-body">
    <h2 class="card-title py-2 font-bold text-xl truncate">
   ${product.title.length > 35 
      ? product.title.slice(0, 32) + "..........." 
      : product.title}
    </h2>
   <p class="font-bold text-lg py-1">
    $${product.price}
  </p>
    <div class="card-actions justify-between">
      <button onclick ="openProductDetails(${product.id})" class="btn flex-1 border rounded-lg py-2  font-bold text-xl text-gray-700 hover:bg-gray-100"><i class="fa-regular fa-eye"></i>
            Details
            </button>
     <button class="btn btn-active bg-[#4e38f5] font-bold text-xl text-white rounded-lg px-10"><i class="fa-solid fa-cart-shopping"></i>
             Add
            </button>
    </div>
  </div>

</div>
        
        `;
        trendingContainer.append(div);


    });
   

}
// product Details
const openProductDetails = (productId) => {
  const url =`https://fakestoreapi.com/products/${productId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {
    displayProductDetails(data);
  })
}
// display products details
const displayProductDetails = (product) => {
 const productDetails = document.getElementById('product_details');
 productDetails.innerHTML = `
        <div class="card bg-base-100 w-full shadow-sm">
  <figure class="bg-gray-100 rounded-lg p-6 flex justify-center" >
     <img
      src="${product.image}"
      alt="Shoes" class="h-64 object-contain pb-4" />
  </figure>
  <div class="flex justify-between items-center mt-4">
      <div class="pl-3">
         <span class="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
      ${product.category}
    </span>
      </div>
    <div class="flex items-center text-yellow-500 text-sm pr-4 ">
      <i class="fa-solid fa-star"></i> <span class="ml-1 text-gray-600">${product.rating.rate} (${product.rating.count})</span>
    </div>
  </div>
  <div class="card-body">
    <h2 class="card-title py-2 font-bold text-xl">
    ${product.title}
    </h2>
    <p class="py-2 font-semibold text-base">${product.description}</p>
   <p class="font-bold text-lg py-1">
    $${product.price}
  </p>
    <div class="card-actions justify-between">
      <button class="btn flex-1 border rounded-lg py-2  font-bold text-xl text-gray-700 hover:bg-gray-100"><i class="fa-brands fa-amazon-pay"></i>
            Buy Now
            </button>
     <button class="btn btn-active bg-[#4e38f5] font-bold text-xl text-white rounded-lg px-10"><i class="fa-solid fa-cart-shopping"></i>
             Add
            </button>
    </div>
  </div>
</div>
 
 
 `;
 document.getElementById("my_modal_2").showModal();
}

trendingSection();