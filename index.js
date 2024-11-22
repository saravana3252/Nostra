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
    pInfo:"Puma Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:499,
    stock:"old"
},
{
    id:2,
    img:"./images/shirt.png",
    name:"Allen Solly Shirt",
    pInfo:"Mens Collared Button Up Regular Fit Shirt For Casual Wear ",
    price:1099,
    stock:"new"
},
{
    id:3,
    img:"./images/tshirt1.png",
    name:"CSK JERSEY",
    pInfo:"Sports Cricket Team Official New CSK Dhoni 7 Jersey IPL 2024/2025",
    price:999,
    stock:"new"
   
},
{
    id:4,
    img:"./images/tshirt.png",
    name:"Puma T-Shirt",
    pInfo:"Puma Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:599,
    stock:"new"
},
{
    id:5,
    img:"./images/roundNeck2.png",
    name:"Souled Store Round Neck",
    pInfo:"The Souled Store Official Spider-Man: Miles Logo Men T-Shirts",
    price:699,
    stock:"The Souled Store Official Spider-Man: Miles Logo Men T-Shirts"
},
{
    id:6,
    img:"./images/pant.png",
    name:"Levis Pant",
    pInfo:"Mens Styled Slim Tapered Fit Mid Rise Jeans For casual Wear",
    price:1499,
    stock:"old"
},
{
    id:7,
    img:"./images/roundNeck1.png",
    name:"Adidas Round Neck",
    pInfo:"Adidas Men's Regular Fit T-Shirt with Graphic Print Logo",
    price:1999,
    stock:"new"
},
{
    id:8,
    img:"./images/shirt1.png",
    name:"Jack & Jones T-Shirt",
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
  currData +=`  <div class=" bg-gray-200 border flex flex-col items-center p-4 gap-2"; >
     <img src="${data.img}" class="h-64" style="width: 95%;">
     <h1 class="font-bold text-center">${data.name}</h1>
     <p>rs ${data.price}</p>
     <button class="bg-blue-950 text-white p-3" onclick="AddToCart(${index})">Add To Cart</button>
    </div>`
    } else if(who==="cart"){
        currData +=`  <div class=" bg-gray-100 border border-black flex flex-col items-center p-2 gap-2"; >
        <img src="${data.img}" class="h-64" style="width: 95%;">
        <h1 class="font-bold">${data.name}</h1>
        <p>rs ${data.price}</p>
        <button class="bg-blue-950 text-white p-3" onclick="RemoveFromCart(${index})">Remove From Cart</button>
       </div>`
    }
})
document.getElementById(who).innerHTML=currData;

}


window.onload = function () {
    ProductDisplay(productData)

}

function AddToCart(index){
    cart.push(productData[index]);
    alert("product added to cart")
    ProductDisplay(cart,"cart")
    console.log(cart)
}

function RemoveFromCart(index){
    cart.splice(index,1)
    ProductDisplay(cart,"cart")
    console.log(cart)
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
            const filteredData = productData.filter((data) => {
                return data.name === checkboxValue; 
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
    filterDiv.style.left=0;
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

    if(window.scrollY >500){
        navbar.classList.add("scrollY")
        atag.classList.add("scrollatagY")
        span.style.color="white"
        navbar.style.color="white"
        toggle.style.color="white"
    }
    else{
          navbar.style.color="black"
       toggle.style.color="black"
        span.style.color="#3B82F6"
        atag.classList.remove("scrollatagY")
        navbar.classList.remove("scrollY")
    }
})