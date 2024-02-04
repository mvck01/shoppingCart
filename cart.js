
let cartData=document.getElementById('cartAmount')
let getBasket=JSON.parse(localStorage.getItem('data'))  
let totalCartCards=document.getElementById('totalCartCards')




let calculateCart=()=>{
let totalCart=getBasket.map((x)=>x.item).reduce((ar,cv)=>ar +cv,0)
cartData.textContent=totalCart
}

calculateCart()

let generateCart=()=>{
    return (totalCartCards.innerHTML=shopItemsdata.map((ind)=>{
        let search= getBasket.find((x)=>x.id===ind.id) || []

        return `
        <div class="cartCards">
        <div class="imgSection">
            <img src="${ind.img}" alt="shirt01" class="imgSettings">
        </div>
        <div class="detailsSection">
            <span class="itemDetails">
                <p class="itemName">${ind.name}</p>
                <p class="priceList"><span>$</span>${ind.price}</p>
                <i class="bi bi-x-lg" id="deleteBtn" onclick=""></i>
            </span>
            <span class="amountDetails">
                <i onclick="" class="bi bi-plus addQuantity"></i> 
                     <div class="quantity"> ${search.item}</div> 
                    <i onclick="" class="bi bi-dash subQuantity"></i>
            </span>
            <span class="totalPrice">
                <p id="totalPriceCounter"><span id="tp">$</span>90</p>
            </span>
        </div>
       </div>
        `
        
        
    }).join(""))

}

generateCart()






