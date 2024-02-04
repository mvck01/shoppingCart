
let basket= JSON.parse(localStorage.getItem('data'))||[]
let cartBody= document.getElementById('cartBody')
let shoppingCart=document.getElementById('shopping-cart')


let calculateCart=()=>{
    let cartAmount=document.getElementById('cartAmount')
    if(basket.length===0);

    let total= basket.map((ind)=>ind.count).reduce((ar,cv)=>ar+cv,0)
    cartAmount.textContent=total
 }
 calculateCart()


let showShops=()=>{
    if(basket.length !==0){
        return(shoppingCart.innerHTML=basket.map((ind)=>{
            let search=shopItemsdata.find((x)=>x.id === ind.id)||[]
            return`
            <div class="cartCards">
            <div class="imgSection">
                <img src="${search.img}" alt="shirt01" class="imgSettings">
            </div>
            <div class="detailsSection">
                <span class="itemDetails">
                    <p class="itemName">${search.name}</p>
                    <p class="priceList"><span>$</span>${search.price}</p>
                    <i class="bi bi-x-lg" id="deleteBtn" onclick="deleteCard(${ind.id})"></i>
                </span>
                <span class="amountDetails">
                    <i onclick="increment(${ind.id})" class="bi bi-plus addQuantity"></i> 
                         <div class="quantity" id="${ind.id}"> ${ind.count}</div> 
                        <i onclick="decrement(${ind.id})" class="bi bi-dash subQuantity"></i>
                </span>
                <span class="totalPrice">
                    <p id="totalPriceCounter"><span id="tp">$</span>${ind.count *search.price}</p>
                </span>
            </div>
           </div>
            `
        }))
    }else{
        
        cartBody.innerHTML=` 
        <div class="emptyShop" id="emptyShop">
            <h2> Cart Is Empty</h2>
            <a href="index.html"><button id="homeBtn">Back to Home</button></a>
        </div>
        `
    }
}

showShops()


let increment=(id)=>{
    let uniqueId=id.id
    let search=basket.find((x)=>x.id===uniqueId)

    if(search===undefined){
        basket.push({
            id:uniqueId,
            count:1
        })
    }else{
        search.count+=1
    }
    update(id)
    showShops()
    localStorage.setItem('data',JSON.stringify(basket))
}


let decrement=(id)=>{
    let uniqueId=id.id
    let search=basket.find((x)=>x.id==uniqueId) 

    if(search ===undefined)return;
    if (search.count <=0)return;
    else{
        search.count -=1
    }
    // console.log(basket)
    update(id)
    showShops()
    localStorage.setItem('data', JSON.stringify(basket))
    
}

let update=(id)=>{
    let uniqueId=id.id
    let search= basket.find((x)=>x.id===uniqueId)

    let searchCount=search.count

    let quantity=document.getElementById(uniqueId)
    quantity.textContent=searchCount

    totalAmount()
}

let deleteCard=(id)=>{
    let uniqueId=id.id
    // let search=basket.find((x)=>x.id===uniqueId)

    basket= basket.filter((x)=>x.id!==uniqueId)

   if(basket.length===0){
    shoppingCart.innerHTML=``
   }
    // update(id)
    showShops()
    calculateCart()
    totalAmount()
    localStorage.setItem('data', JSON.stringify(basket))
}

let clearCart=()=>{
    basket=[]
    calculateCart()

    
    showShops()
    shoppingCart.innerHTML=`    `
    localStorage.setItem('data', JSON.stringify(basket))
}

let totalAmount=()=>{
    if(basket.length !==0){
        let amount=basket.map((x)=>{
            let search=shopItemsdata.find((y)=>y.id===x.id)||[]
            return x.count*search.price
        })
        let total=amount.reduce((ar,cv)=>ar+cv,0)
        
        cartBody.innerHTML=`
        <h2 id="totalBill">Total Bill: $ <span id="totalBillAmount">${total}</span></h2>
       <div id="totalCheckoutOrClear">
           <button id="checkoutBtn">Checkout</button>
           <button onclick="clearCart()" id="clearCartBtn">Clear Cart</button>
       </div>
        `
    }else return;
    
}

totalAmount()

