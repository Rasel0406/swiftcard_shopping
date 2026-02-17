// active nav link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", function () {

    navLinks.forEach(nav => nav.classList.remove("active-nav"));


  });
});


// fetch categories list
const categoriesList = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayCategoriessList(["All", ...data]);
    });
   allCategoriesList("All");

};
// remove active class from all category items
const removeActiveClass = () => {
  const categoryItems = document.querySelectorAll(".tab");
  categoryItems.forEach((item) => {
    item.classList.remove("active");
  });
};
// category active item
const catagoriesItem = (category) => {
  const catagoryItemContainer = document.getElementById(
    `active_list_${category}`,
  );

  removeActiveClass();
  catagoryItemContainer.classList.add("active");
};

// catogory items display
const displayCategoriessList = (categoriess) => {
  const categoriesContainer = document.getElementById("categories_list");
  categoriesContainer.innerHTML = "";
  categoriess.forEach((category, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <a id ="active_list_${category}" class="btn btn-xs tab rounded-full m-5 p-6 text-xl font-semibold ${index === 0 ? "active" : ""}">${category[0].toUpperCase() + category.slice(1)}</a>
    `;

    const anchor = div.querySelector("a");
    anchor.addEventListener("click", function () {
      catagoriesItem(category);
      allCategoriesList(category);
    });

    div.appendChild(anchor);
    categoriesContainer.appendChild(div);
  });
};
// All categories list 
const allCategoriesList = (category) => {
    console.log(category);
    let url;
    if (category === "All") {
        url = "https://fakestoreapi.com/products";
    } else {
        url = `https://fakestoreapi.com/products/category/${category}`;
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
          displayItems(data);
        });
};
const displayItems = (products) => {
    const itemsContainer = document.getElementById("product_cards");
    itemsContainer.innerHTML = "";
    products.forEach((product) => {
        const div = document.createElement("div");
        div.innerHTML =`
         <div class="card bg-base-100 w-96 shadow-sm">
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
    <h2 class="card-title py-2 font-bold text-xl truncate">
    ${product.title.length > 29 
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
        
        `
        
        itemsContainer.append(div);
    });
        
};

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
    <h2 class="card-title py-2 font-bold text-xl ">
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

categoriesList();

