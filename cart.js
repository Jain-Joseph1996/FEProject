let carts = document.querySelectorAll('.add-cart');
let products=[
{
	id:101,
	name:'Grey TShirt',
	tag:'avengerstshirt',
	price:15,
	inCart:0
},
{
	id:102,
	name:'Black TShirt',
	tag:'avengers2',
	price:10,
	inCart:0
},
{
	id:103,
	name:'Red TShirt',
	tag:'friends',
	price:25,
	inCart:0
},
{
	id:104,
	name:'Green TShirt',
	tag:'friends2',
	price:17,
	inCart:0
},
{
	id:105,
	name:'Blue TShirt',
	tag:'netflix',
	price:25,
	inCart:0
},
{
	id:106,
	name:'Pink TShirt',
	tag:'netflix2',
	price:17,
	inCart:0
}
];
for (let i=0; i < carts.length;i++){
	carts[i].addEventListener('click',() => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}
function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers){
		document.querySelector('.nav-item span').textContent = productNumbers;
	}
}

function cartNumbers(product){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers){
		localStorage.setItem('cartNumbers',productNumbers + 1);
		document.querySelector('.nav-item span').textContent =productNumbers + 1;
	}else{
		localStorage.setItem('cartNumbers',1);
		document.querySelector('.nav-item span').textContent = 1;
	}
	setItems(product);
	
}
function setItems(product) {
	let cartItems= localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems)
	if(cartItems != null){
		if(cartItems[product.id] == undefined){
			cartItems ={
				...cartItems,
				[product.id]:product
			}
			
		}
		cartItems[product.id].inCart += 1;
	} else{
		product.inCart = 1;
		cartItems={
			[product.id]:product
		
		}
	} 

	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);

	} else {
		localStorage.setItem("totalCost", product.price);
	}
	
}
function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');
if (cartItems && productContainer) {
	productContainer.innerHTML = '';
	Object.values(cartItems).map(item => {
		let item_cost=item.inCart * item.price;
			productContainer.innerHTML +=
				'<div class="product"><ion-icon onclick="remove_item('+item.id+','+item.inCart+','+item_cost+')" name="close-circle-outline"></ion-icon><img src="./assets/img/home/'+item.tag+'.jpeg"><span>'+item.name+'</span></div><div class="price">$'+item.price+'</div><div class="quantity"><span>'+item.inCart+'</span></div><div class="total">$'+item_cost+'</div>';
					
		});
		productContainer.innerHTML +='<div class="basketTotalContainer"><h4 class="basketTotalTitle">Total cost</h4><h4 class="basketTotal">$'+cartCost+'</h4>'
	}
}


function clearCart(){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers){
		localStorage.clear();
		window.location.href='cartdetails.html';
	}else{
		alert("Cart is empty.");
	}
}
//------------------------------order page js-------------------
function proceedpayment(){
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers != null){
		let cartItems = localStorage.getItem("productsInCart");
		cartItems = JSON.parse(cartItems);
		localStorage.setItem("orderedItems", JSON.stringify(cartItems));
		if(productNumbers>=1){
			window.location.href='payment.html';
		}else{
			alert("Purchase cannot be made as the cart is empty.");
		}
		
		displayOrderedItems();
		
	}
	else{
		alert("Purchase cannot be made as the cart is empty.");
	}
}

		//-------------
		function displayOrderedItems(){
			let OrderdItems = localStorage.getItem("orderedItems");
			OrderdItems = JSON.parse(OrderdItems);
			let orderContainer = document.querySelector(".products-order");
			if (OrderdItems) {	
			document.getElementsByClassName('empty')[0].style.visibility = 'hidden';
				Object.values(OrderdItems).map(items => {
					let items_cost=items.inCart * items.price;
					orderContainer.innerHTML +=
							'<div class="product-order"><img src="./assets/img/home/'+items.tag+'.jpeg"><span>'+items.name+'</span></div><div class="price">$'+items.price+'</div><div class="quantity"><span>'+items.inCart+'</span></div><div class="total">$'+items_cost+'</div>';
				
					});
				}		
				
		}
		//------------
		


//--------------------order page js--------------------
function remove_item(itemId,itemQuantity,itemCost){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	delete cartItems[itemId];
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	productNumbers=productNumbers - itemQuantity;
	
	localStorage.setItem("cartNumbers", JSON.stringify(productNumbers));
	
	let cartCost = localStorage.getItem('totalCost');
	cartCost = parseInt(cartCost);
	cartCost=cartCost-itemCost;
	localStorage.setItem("totalCost", JSON.stringify(cartCost));

	displayCart();
	

}



displayCart();
displayOrderedItems();
onLoadCartNumbers();

