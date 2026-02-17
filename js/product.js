const categoriesList = ()=>{
    const url ="https://fakestoreapi.com/products/categories";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayCategoriessList(["All",...data]);

    })
};
// remove active class from all category items
const removeActiveClass = ()=>{
    const categoryItems = document.querySelectorAll('.tab');
    categoryItems.forEach(item => {
        item.classList.remove('active');
    });
};
const catagoriesItem = (category)=>{
 const catagoryItemContainer = document.getElementById(`active_list_${category}`);
 console.log(catagoryItemContainer);
 removeActiveClass();
 catagoryItemContainer.classList.add('active');
};
const displayCategoriessList = (categoriess)=>{
const categoriesContainer = document.getElementById('categories_list');
categoriesContainer.innerHTML = '';
categoriess.forEach((category, index) => {
    const div = document.createElement('div');
    div.innerHTML =`
    <a id ="active_list_${category}" class="btn btn-xs tab rounded-full m-5 p-6 text-xl font-semibold ${index === 0 ? 'active' : ''}">${category[0].toUpperCase() + category.slice(1)}</a>
    `;
    
  const anchor = div.querySelector('a');
  anchor.addEventListener("click", function(){
            catagoriesItem(category);
        });

        div.appendChild(anchor);
    categoriesContainer.appendChild(div);
});
};
categoriesList();