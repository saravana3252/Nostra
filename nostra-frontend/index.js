function toggleMenu(){
    let mobilediv=document.getElementById("mobile-div");
    mobilediv.style.right=0;
}

function closeMenu(){
    let mobilediv=document.getElementById("mobile-div");
    mobilediv.style.right="-600px";
}

function closeAd(){
    let AdDiv=document.getElementById("ad");
    AdDiv.style.display="none";
}


let productData=[

{
    id:1,
    img:"./images/roundNeck.png",
    name:"Puma Round Neck",
    category:"Round Neck",
    pInfo:"Puma Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:499,
    stock:"old"
},
{
    id:2,
    img:"./images/shirt.png",
    name:"Allen Solly Shirt",
    category:"Shirt",
    pInfo:"Mens Collared Button Up Regular Fit Shirt For Casual Wear ",
    price:1099,
    stock:"new"
},
{
    id:3,
    img:"./images/tshirt1.png",
    name:"CSK JERSEY",
    category:"T-Shirt",
    pInfo:"Sports Cricket Team Official New CSK Dhoni 7 Jersey IPL 2024/2025",
    price:999,
    stock:"new"
   
},
{
    id:4,
    img:"./images/tshirt.png",
    name:"Puma T-Shirt",
    category:"T-Shirt",
    pInfo:"Puma Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:599,
    stock:"new"
},
{
    id:5,
    img:"./images/roundNeck2.png",
    name:"Souled Store Round Neck",
    category:"Round Neck",
    pInfo:"The Souled Store Official Spider-Man: Miles Logo Men T-Shirts",
    price:699,
    stock:"The Souled Store Official Spider-Man: Miles Logo Men T-Shirts"
},
{
    id:6,
    img:"./images/pant.png",
    name:"Levis Pant",
    category:"Pant",
    pInfo:"Mens Styled Slim Tapered Fit Mid Rise Jeans For casual Wear",
    price:1499,
    stock:"old"
},
{
    id:7,
    img:"./images/roundNeck1.png",
    name:"Adidas Round Neck",
    category:"Round Neck",
    pInfo:"Adidas Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:1999,
    stock:"new"
},
{
    id:8,
    img:"./images/shirt1.png",
    name:"Jack & Jones T-Shirt",
    category:"T-Shirt",
    pInfo:"Jack & Jones Men's Abstract Print Regular Fit Resort Collar Casual Shirt",
    price:1699,
    stock:"old"
}


]




cart=[]



function ProductDisplay(DynamicData,who="productsContId"){

    
    let currData=" ";
DynamicData.forEach((data,index)=>{
    if(who==="productsContId"){
  currData +=`  <div class=" bg-white  flex flex-col items-center p-1 gap-2"; >
     <img src="${data.img}" class="h-56 md:h-64 bg-gray-100 w-[95%] lg:w-[90%]">
     <h1 class="font-bold text-center">${data.name}</h1>
     <p>rs ${data.price}</p>
     <button class="bg-blue-950 text-white p-3" onclick="AddToCart(${data.id})">Add To Cart</button>
    </div>`
    } else if(who==="cart"){
        currData +=`  <div class=" bg-white flex flex-col items-center p-1 gap-2 "; >
        <img src="${data.img}" class="h-56 md:h-64 bg-gray-100 w-[95%] lg:w-[90%]">
        <h1 class="font-bold">${data.name}</h1>
        <p>rs ${data.price}</p>
        <button class="bg-blue-950 text-white p-3" onclick="RemoveFromCart(${data.id})">Remove From Cart</button>
       </div>`
    }
})
document.getElementById(who).innerHTML=currData;

}


document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    try {
        ProductDisplay(productData);
        console.log("ProductDisplay executed successfully.");
    } catch (error) {
        console.error("Error in ProductDisplay:", error);
    }

    try {
        const userJSON = localStorage.getItem("nostra");
        if (userJSON !== null) {
            const user = JSON.parse(userJSON);
            console.log("User from localStorage:", user);

            const loginElement = document.getElementById("login");
            const loginElement1 = document.getElementById("login1");

            if (loginElement) loginElement.innerHTML = "Logout";
            if (loginElement1) loginElement1.innerHTML = "Logout";

            Notiflix.Notify.success(`Welcome, ${user.name}`);
        }
    } catch (error) {
        console.error("Error handling user data:", error);
    }
});


function AddToCart(productId){
    let cartLeng = document.getElementById("cartLeng");
    const product = productData.find((item) => item.id === productId); 
    cart.push(product); 
    ProductDisplay(cart, "cart");
    alert("product added to cart")
    cartLeng.innerHTML = `<p class="m-2 font-semibold w-4 text-center">${cart.length}</p>`;
    console.log(cart);
}

function RemoveFromCart(productId){
    cart = cart.filter((cartItem) => cartItem.id !== productId);
    console.log(cart);
    ProductDisplay(cart, "cart");
    let cartLeng = document.getElementById("cartLeng");
    cartLeng.innerHTML = `<p class="m-2">${cart.length}</p>`;
    console.log(cart);
}


function searchData(){
    let inpValue=document.getElementById("inpId").value;
    let searchData=productData.filter((data)=>{
        return data.name.toUpperCase().indexOf(inpValue.toUpperCase()) != -1;
    })
    ProductDisplay(searchData)
}

function checkBox(){
    let checkbox=document.querySelectorAll(".inpCheck");
    let checkBoxData=[];

    
    checkbox.forEach((checkbox) => {
        if (checkbox.checked) {
            const checkboxValue = checkbox.value; 
            const filteredData = productData.filter((data) => data.category === checkboxValue);
            checkBoxData = checkBoxData.concat(filteredData); 
        }
    });

if (checkBoxData.length > 0) {
    ProductDisplay(checkBoxData);
} else {
    ProductDisplay(productData);
}
}


function checkBox1(){
    let checkbox=document.querySelectorAll(".inpCheck");
    let checkBoxData=[];

    
    checkbox.forEach((checkbox) => {
        if (checkbox.checked) {
            const checkboxValue = checkbox.value; 
            const filteredData = productData.filter((data) => {
                return data.price < checkboxValue; 
            });
            checkBoxData = checkBoxData.concat(filteredData); 
        }
    });

if (checkBoxData.length > 0) {
    ProductDisplay(checkBoxData);
} else {
    ProductDisplay(productData);
}
}

function checkBox1(){
    let checkbox=document.querySelectorAll(".inpCheck");
    let filteredData = productData;
    let isChecked = false;
    
    checkbox.forEach((checkbox) => {
        if (checkbox.checked) {
            isChecked = true;
            const checkboxValue = checkbox.value; 
            filteredData = productData.filter((data) => {
                return data.price < checkboxValue; 
            });
        
        }
        
    });
    if (isChecked) {
        ProductDisplay(filteredData); 
    } else {
        ProductDisplay(productData); 
    }


}

function sort(){
    let sortValue=document.getElementById("sortId").value;
    let sortedData=[...productData]
    
    if(sortValue === "LowToHigh"){
        sortedData.sort((a,b)=>{
           return a.price - b.price
        })
    }
    else if(sortValue === "HighToLow"){
        sortedData.sort((a,b)=>{
           return b.price - a.price
        })
    }
    else if(sortValue === "nameAsc"){
        sortedData.sort((a,b)=>{
           return a.name.localeCompare(b.name)
        })
    }
    else if(sortValue === "nameDesc"){
        sortedData.sort((a,b)=>{
           return b.name.localeCompare(a.name)
        })
    }
    ProductDisplay(sortedData)
}


function stock(){
    let checkBox=document.querySelectorAll(".inpSort")
    let isChecked = false;
    let sortedData = productData;
   
    checkBox.forEach((checkBox)=>{
     if(checkBox.checked){
        isChecked=true
        const checkboxValue=checkBox.value;
         sortedData = productData.filter((data)=>{
            return data.stock === checkboxValue
          })
     }
    })
    
    if(isChecked){
        ProductDisplay(sortedData)
    }
    else{
        ProductDisplay(productData)
    }
} 


function filter(){
    let filterDiv=document.getElementById("filtersId");
    if (filterDiv.style.left === "0px") {
        filterDiv.style.left = "-100%";
    } else {
        filterDiv.style.left = "0px";
    }
}

function filterClose(){
    let filterDiv=document.getElementById("filtersId");
    
    filterDiv.style.left="-100%";
}




document.addEventListener('DOMContentLoaded', function () {
    let currIndex = 0;
    let imgContainer = document.getElementById("imgContainer");
    let img = document.querySelectorAll(".myimgClass");
    let totalimgs = img.length;

   
    function leftArr() {
        if (currIndex === 0) {
            currIndex = totalimgs - 1;
        } else {
            currIndex--;
        }
        updatemargin();
    }

    
    function rightArr() {
        if (currIndex === totalimgs - 1) {
            currIndex = 0;
        } else {
            currIndex++;
        }
        updatemargin();
    }

    
    function updatemargin() {
        if (imgContainer) {
            const newMargin = -currIndex * 100;
            imgContainer.style.marginLeft = `${newMargin}vw`;
        } else {
            console.error("imgContainer is not found!");
        }
    }

   
    const leftButton = document.getElementById("leftButton");
    const rightButton = document.getElementById("rightButton");

    if (leftButton && rightButton) {
        leftButton.onclick = leftArr;
        rightButton.onclick = rightArr;
    } else {
        console.error("Button elements are missing.");
    }
});


document.addEventListener("scroll",()=>{
    let navbar =document.getElementsByClassName("navbar")[0];
    let span=document.getElementsByClassName("myspan")[0];
    let toggle=document.getElementsByClassName("mytoggle")[0];
    let atag=document.getElementsByClassName("myatagparent")[0];
    let login=document.getElementsByClassName("myLogin")[0];

    if(window.scrollY >500){
        navbar.classList.add("scrollY")
        atag.classList.add("scrollatagY")
        login.classList.add("scrollLoginY")
        span.style.color="white"
        navbar.style.color="white"
        toggle.style.color="white"
    }
    else{
          navbar.style.color="black"
       toggle.style.color="black"
        span.style.color="#3B82F6"
        login.classList.remove("scrollLoginY")
        atag.classList.remove("scrollatagY")
        navbar.classList.remove("scrollY")
    }
})



function Like(img){
    let currentSrc = img.src.split('/').pop();
    if(currentSrc === "blackheart.png"){
        img.src="./images/redheart.png"
    }
    else{
        img.src="./images/blackheart.png"
    }
}

function showPass(event){
   event.preventDefault();
   let password=document.getElementById("password")
   password.type="text"
}

function hidePass(event){
    event.preventDefault();
    let password=document.getElementById("password")
    password.type="password"
 }

 function handleSubmitRegister(event){
   event.preventDefault()

  let name=document.getElementById("name").value;
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value
  let registerbtn=document.getElementById("registerbtn")

  let userData={
    name:name,
    email:email,
    password:password
  }

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right", // You can change to "toast-bottom-left", etc.
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };


if(registerbtn){
    registerbtn.innerHTML="loading...";
    registerbtn.disabled=true;
}

 fetch("https://nostra-xvvz.onrender.com/register",{
    method:"POST",
    body:JSON.stringify(userData),
    headers:{
        "Content-Type":"application/json"
    }
 }).then((response)=>response.json()).then(()=>{
    toastr.success('user registered!')

    document.getElementById("name").value="";
  document.getElementById("email").value="";
  document.getElementById("password").value="";
 }).catch((err)=>{
    alert(err)
 }).finally(()=>{
    if(registerbtn){
        registerbtn.innerHTML="REGISTER";
        registerbtn.disabled=false;
    }
 })
 }

 function handleSubmitLogin(event){
    event.preventDefault()

  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value
  let login =document.getElementsByClassName("mylogin")[0];
  let loginbtn=document.getElementById("loginbtn")

  let userData={
    email:email,
    password:password
  }

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right", 
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };


if(loginbtn){
    loginbtn.innerHTML="loading...";
    loginbtn.disabled=true;
}

 fetch("https://nostra-xvvz.onrender.com/login",{
    method:"POST",
    body:JSON.stringify(userData),
    headers:{
        "Content-Type":"application/json"
    }
 }).then((response)=>
 {
    if(response.status === 404){
       
        throw new Error("Email not found");
    }
    else if(response.status === 403){
       
        throw new Error("wrong password"); 
    }
    else if(response.status === 200){
     return response.json()
    }
 }
).then((data)=>{
    if(data !== undefined){
        localStorage.setItem("nostra",JSON.stringify(data))
        console.log(data)
        console.log("Data stored in localStorage:", localStorage.getItem("nostra"));
        if(localStorage.getItem("nostra") !== null){
            let user = JSON.parse(localStorage.getItem("nostra"))
            console.log("User retrieved from localStorage:", user);  
            toastr.success(`welcome ${user.name}`);
            console.log(user)
            
        }
    }
    window.location.href="/index.html"
    
 }).catch((err)=>{
    alert(err)
 }).finally(()=>{
    if(loginbtn){
        loginbtn.innerHTML="LOGIN";
        loginbtn.disabled=false;
    }
 })
 }



 function HandleLogin() {
    const userJSON = localStorage.getItem("nostra");

    const loginElement = document.getElementById("login");
    const loginElement1 = document.getElementById("login1");

    if (userJSON !== null) {
       
        localStorage.removeItem("nostra");
        toastr.success("You have logged out successfully!");
        if (loginElement) loginElement.innerHTML = "Login";
        if (loginElement1) loginElement1.innerHTML = "Login";
    } else {
       
        window.location.href = "/login.html";
    }
}
