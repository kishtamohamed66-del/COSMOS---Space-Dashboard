let currentIndex = 0;
var headerData= document.getElementById("headerData")
var products=[
  {
    id:1,
    imgUrl:"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800&auto=format&fit=crop",
    span1:"(356 reviews)",
    span2:"10 min",
    span3:"15 min",
    span4:"2 people",
    span5:"Easy",
    span6:"Seafood",
    h1:"Shrimp Scampi",
    p1:"Garlicky shrimp in white wine butter sauce",
    p2:"400g large shrimp, peeled",
    p3:"300g linguine pasta",
    p4:" 6 cloves garlic, minced",
    p5:" 1/2 cup white wine",
    p6:" 4 tablespoons butter",
    p7:" tablespoons olive oil",
    p8:" Fresh parsley, chopped",
    p9:" Red pepper flakes",
  },
  {
    id:2,
    imgUrl:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
    span1:"(412 reviews)",
    span2:"15 min",
    span3:"240 min",
    span4:"4 people",
    span5:"ُEsay",
    span6:"American",
    h1:"BBQ Pulled Pork",
    p1:"Slow-cooked tender pork in smoky barbecue sauce",
    p2:"1kg pork shoulder",
    p3:"1 cup BBQ sauce",
    p4:"1/2 cup apple cider vinegar",
    p5:"2 tablespoons brown sugar",
    p6:"1 tablespoon paprika",
    p7:"Burger buns",
    p8:"Coleslaw for serving",
    p9:"500g ground beef (80/20)",
  },
  {
    id:3,
    imgUrl:"https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=800&auto=format&fit=crop",
    span1:"(267 reviews)",
    span2:"15 min",
    span3:"60 min",
    span4:"4 people",
    span5:"Intermediate",
    span6:"Mediterranean",
    h1:"French Onion Soup",
    p1:"Rich beef broth with caramelized onions and melted cheese",
    p2:"4 large onions, thinly sliced",
    p3:"4 tablespoons butter",
    p4:"1 liter beef broth",
    p5:"1/2 cup white wine",
    p6:"2 bay leaves",
    p7:"Baguette slices",
    p8:"200g Gruyère cheese, grated",
    p9:"500g ground beef (80/20)",
  },
  {
    id:4,
    imgUrl:"https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=800&auto=format&fit=crop",
    span1:"(445 reviews)",
    span2:"20 min",
    span3:"15 min",
    span4:"2 people",
    span5:"Intermediate",
    span6:"Asian",
    h1:"Chicken Tikka Masala",
    p1:"Vibrant and aromatic curry with vegetables and coconut milk",
    p2:"4 burger buns",
    p3:"4 slices cheddar cheese",
    p4:" Lettuce leave",
    p5:"Tomato slicesk",
    p6:"Red onion, sliced",
    p7:"Pickles",
    p8:"Burger sauce or condiments",
    p9:"500g ground beef (80/20)",
  },
];
function tryAgain(){
    var product= products[currentIndex];
headerData.innerHTML=` <div class="container shadow-lg rounded-4 recipe">
        <div class="row">
              <div class="col-lg-5 ">
                <div class=" position-relative w-100 h-100" style="height:700px ;">
                    <img src="${product.imgUrl}" class="w-100 object-fit-cover" height="100%" width="100%"  alt="">
                    <div class="position-absolute d-flex bg-white rounded-pill img-top justify-content-center align-items-center p-2 gap-2 ">
                        <i class="fa-solid fa-star"></i> 
                        <span>${product.span1}</span>
                    </div>
                    <div class="position-absolute d-flex bg-white rounded-3 img-bottom justify-content-between text-center w-75 mx-auto  p-2 gap-1">
                      <div class=" d-flex flex-column text-center align-items-center">
                          <i class="fa-solid fs-4 fa-clock" style="color: rgb(255, 105, 0);"></i>
                        <small>Prep Time</small>
                        <span class="fw-bold">${product.span2}</span>
                      </div>
                      <div class=" d-flex flex-column text-center align-items-center">
                          <i class="fa-solid fs-4 fa-fire-burner" style="color: rgb(251, 44, 54);"></i>
                        <small>Cook Time</small>
                        <span class="fw-bold">${product.span3}</span>
                      </div>
                      <div class=" d-flex flex-column text-center align-items-center">
                         <i class="fa-solid fs-4 fa-users" style="color: rgb(43, 127, 255);"></i>
                        <small>Servings</small>
                        <span class="fw-bold">${product.span4}</span>
                      </div>
                    </div>
                </div>
            </div>
          
            <div class="col-lg-7 bg-white header-right overflow-auto">
                <div class="  p-3 d-flex flex-column gap-3">
                    <div class=" d-flex flex-row gap-3">
                    <span class="sp1 rounded-pill">${product.span5}</span>
                    <span class="sp2 rounded-pill">${product.span6}</span>
                    </div>
                   <div class="d-flex justify-content-between">
                    <div class="">
                        <h1>${product.h1}</h1>
                    <p>${product.p1}</p>
                    </div>
                    <div class="icon1 flex-row d-flex gap-3">
                        <span><i class="fa-solid fa-bookmark d-flex justify-content-center"></i></span>
                        <span><i class="fa-solid fa-share-nodes d-flex justify-content-center"></i></span>
                        
                    </div>
                   </div>
                   </div>
    <div class="border-bottom border-1"> 
  <ul class="nav nav-underline justify-content-around " id="myTab" role="tablist">
      <li class="nav-item  " role="presentation">
        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><span><i class="fa-solid fa-list-check"></i></span> Ingredients </button>
      </li>
      <li class="nav-item  " role="presentation">
        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><span><i class="fa-solid fa-book-open"></i></span> Instructions</button>
      </li>
      <li class="nav-item mt-2" role="presentation">
        <button class="nav-link m-auto" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"><span><i class="fa-solid fa-chart-pie"></i></span> Nutrition </button>
      </li>
      <li class="nav-item " role="presentation">
        <button class="nav-link" id="nav-Chef-tab" data-bs-toggle="tab" data-bs-target="#nav-Chef" type="button" role="tab" aria-controls="nav-Chef" aria-selected="false"><span><i class="fa-solid fa-lightbulb"></i></span> Chef's Tips </button>
      </li>
    
</ul>
<div class="tab-content " id="myTabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home" tabindex="0">
    <div class=" p-5 Ingredients mt-5">
      <p><span>1</span> ${product.p2}</p>
      <p><span>2</span>  ${product.p3}</p>
      <p><span>3</span>  ${product.p4}</p>
      <p><span>4</span> ${product.p5}s</p>
      <p><span>5</span>  ${product.p6}</p>
      <p><span>6</span>  ${product.p7}</p>
      <p><span>7</span> ${product.p8}</p>
      <p><span>8</span>  ${product.p9}</p>
    </div>
  </div>
  <div class="tab-pane fade  " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile" tabindex="1">
   <div class="p-5 d-flex flex-column gap-3">
     <div class="d-flex gap-2">
      <span >1</span>
      <p>Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente.</p>
    </div>
    <div class="d-flex gap-2">
      <span>2</span>
      <p>While pasta cooks, heat a large skillet over medium heat. Add diced pancetta and cook until crispy, about 5-7 minutes.</p>
    </div>
    <div class="d-flex gap-2">
      <span>3</span>
      <p>In a bowl, whisk together eggs, grated Pecorino Romano, and Parmesan cheese. Add plenty of freshly ground black pepper.</p>
    </div>
    <div class="d-flex gap-2">
      <span>4</span>
      <p>Reserve 1 cup of pasta cooking water before draining. Drain pasta and immediately add to the skillet with pancetta.</p>
    </div>
    <div class="d-flex gap-2">
      <span>5</span>
      <p>Remove skillet from heat. Quickly pour in egg mixture while tossing pasta vigorously. Add reserved pasta water as needed to create a creamy sauce.</p>
    </div>
    <div class="d-flex gap-2">
      <span>6</span>
      <p>Remove skillet from heat. Quickly pour in egg mixture while tossing pasta vigorously. Add reserved pasta water as needed to create a creamy sauce.</p>
    </div>
   </div>
  </div>
  <div class="tab-pane fade " id="nav-contact" role="tabpanel" aria-labelledby="nav-contact" tabindex="2">
    <div class="container ">
      <div class="row p-4 g-3 my-auto">
        <div class="col-lg-6">
          <div class=" d-flex justify-content-between flex-row p-3">
            <div class="d-flex gap-2">
             <span> <i class="fa-solid fa-fire d-flex justify-content-center flex-row"></i></span>
              <span class="my-auto">Calories</span>
            </div>
            <p class="fw-bold text-black">450 kcal</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between p-3">
           <div class="d-flex gap-2">
           <span><i class="fa-solid fa-dumbbell d-flex justify-content-center flex-row"></i></span>
            <span class="my-auto">Protein</span>
           </div>
            <p class="fw-bold text-black">38g</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between p-3">
            <div class="d-flex gap-2">
              <span><i class="fa-solid fa-wheat-awn d-flex justify-content-center flex-row"></i></span>
              <span class="my-auto">Carbohydrates</span>
            </div>
            <p class="fw-bold text-black">24g</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between p-3">
            <div class="d-flex gap-2">
              <span><i class="fa-solid fa-droplet d-flex justify-content-center flex-row"></i></span>
               <span class="my-auto">Fat</span>
            </div>
            <p class="fw-bold text-black">22g</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between p-3">
            <div class="d-flex gap-2">
              <span><i class="fa-solid fa-seedling d-flex justify-content-center flex-row"></i></span>
              <span class="my-auto">Fiber</span>
            </div>
            <p class="fw-bold text-black">4g</p>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="d-flex justify-content-between p-3">
            <div class="d-flex gap-2">
              <span><i class="fa-solid fa-cube d-flex justify-content-center flex-row"></i></span>
              <span class="my-auto">Sodium</span>
            </div>
            <p class="fw-bold text-black">760mg</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="tab-pane fade" id="nav-Chef" role="tabpanel" aria-labelledby="nav-Chef" tabindex="3">
     <div class="p-5 d-flex flex-column gap-3">
      <div class="Chef d-flex">
      <span><i class="fa-solid fa-circle-check" style="color: rgb(225, 113, 0);"></i></span>
      <p>Add vegetables in order of cooking time needed</p>
     </div>
     <div class="Chef d-flex py-auto">
      <span><i class="fa-solid fa-circle-check" style="color: rgb(225, 113, 0);"></i></span>
      <p>Adjust curry powder amount to taste</p>
     </div>
     <div class="Chef d-flex">
      <span><i class="fa-solid fa-circle-check" style="color: rgb(225, 113, 0);"></i></span>
      <p>Use full-fat coconut milk for creamier curry</p>
     </div>
     <div class="Chef d-flex">
      <span><i class="fa-solid fa-circle-check" style="color: rgb(225, 113, 0);"></i></span>
      <p>Add protein like tofu or paneer if desired</p>
     </div>
     </div>
     </div>
</div>
</div>
            </div>
        </div>
    </div> ` ;
  }
  document.getElementById("nextBtn").addEventListener("click", function () {
  currentIndex++;

  if (currentIndex >= products.length) {
      currentIndex = 0;
  }
tryAgain();
});

tryAgain()