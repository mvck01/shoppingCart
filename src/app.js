let cartAmount=document.getElementById('cartAmount')
let shoppingCart=document.getElementById('shop')

let basket=JSON.parse(localStorage.getItem('data'))||[]

let generateShops=()=>{
    return(
        shoppingCart.innerHTML=shopItemsdata.map((ind)=>{
            let search=basket.find((x)=>x.id===ind.id)||[]
            return `
            <div class="productCard" id="product-id-${ind.id}">
            <div class="imgSection">
                <img src="${ind.img}" alt="greyShirt" class="imgSizing">
            </div>
            <div class="productDetails">
                <h2>${ind.name}</h2>
                <p>${ind.desc}</p>
                <div class="priceDetails">
                    <span class="priceList">$${ind.price}</span>
                    <div class="quantityBtn">
                        <i onclick="increment(${ind.id})"class="bi bi-plus addQuantity"></i> 
                        <div id="${ind.id}" class="quantity">${search.count===undefined?0 :search.count}
                        </div>
                        <i onclick="decrement(${ind.id})" class="bi bi-dash subQuantity"></i>
                    </div>
                    
                </div>
            </div>
        </div>
            `
        }).join("")
    )
}

generateShops()

let increment=(id)=>{
let uniqueId= id.id
let search= basket.find((x)=>x.id===uniqueId)

if (search===undefined){
    basket.push({
        id:uniqueId,
        count:1
    })
    update(id)
    
}else{
    search.count+=1
}
// console.log(basket)
localStorage.setItem('data', JSON.stringify(basket))
update(id)


}

let decrement=(id)=>{

    let uniqueId=id.id
    let search=basket.find((x)=>x.id===uniqueId)

    if(search===undefined)return;

    if (search.count <=0)return;
    else{
        search.count -=1
    }
    // console.log(basket)
    localStorage.setItem('data', JSON.stringify(basket))
    update(id)
    

}

let update=(id)=>{
    let uniqueId=id.id
    let search=basket.find((x)=>x.id===uniqueId)
    let quantity=document.getElementById(uniqueId)
    let currentCount=search.count

    quantity.textContent=currentCount
    calculateCart()
}

let calculateCart=()=>{
   let total= basket.map((ind)=>ind.count).reduce((ar,cv)=>ar+cv,0)
   cartAmount.textContent=total
}
calculateCart()