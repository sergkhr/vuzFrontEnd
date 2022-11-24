let cardsHoverAnimationTime = 300;


$(".secondCards").first().find(".card").hover(function (){
	$(this).siblings(".card").css({"z-index": "0"});
}, function (){
	setTimeout(() => {
		$(this).siblings(".card").css({"z-index": ""});
	}, cardsHoverAnimationTime);
});

$(".thirdCards").first().find(".card").hover(function (){
	$(this).siblings(".card").addClass("cardHover");
}, function (){
	$(this).siblings(".card").removeClass("cardHover");
});

$(window).on("load", function (){
	captchaUpdate(0);
	notificationsUpdateTick();
});

let captchaStressLevel = 0;
$("#captcha > button").first().click(() => {captchaSubmition(captchaStressLevel);});
$("#captchaSubmition").click(function (){
	alert("You have clicked the button");
});

function captchaUpdate(stressLevel){
	let captchaText = $("#captcha > p").first();
	let captchaInput = $("#captcha > input").first();
	$("#captchaSubmition").removeClass("active");
	if(stressLevel === 0){
		captchaText.text(randomString());
		captchaInput.val("");
		return;
	}
	if(stressLevel === 1){
		let firstNumber = Math.floor(Math.random() * 100);
		let secondNumber = Math.floor(Math.random() * 100);
		captchaText.text("what is " + firstNumber + " + " + secondNumber + "?");
		captchaInput.val("");
		return;
	}
}

function captchaSubmition(stressLevel){
	let captchaText = $("#captcha > p").first();
	let captchaInput = $("#captcha > input").first();
	if(captchaInput.val() == ""){
		alert("You have not entered anything");
		return;
	}
	if(stressLevel === 0){
		if(captchaInput.val() === captchaText.text()){
			$("#captchaSubmition").addClass("active");
		}else{
			captchaStressLevel = 1;
			captchaUpdate(captchaStressLevel);
		}
		return;
	}
	if(stressLevel === 1){
		let firstNumber = parseInt(captchaText.text().split(" ")[2]);
		let secondNumber = parseInt(captchaText.text().split(" ")[4]);
		if(captchaInput.val() === (firstNumber + secondNumber).toString()){
			$("#captchaSubmition").addClass("active");
		}else{
			alert("your Int score is 6");
			captchaStressLevel = 0;
			captchaUpdate(captchaStressLevel);
		}
		return;
	}
}

function randomString(){
	let string = "";
	let stringLength = Math.floor(Math.random() * 4 + 8);
	let stringCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	for(let i = 0; i < stringLength; i++){
		string += stringCharacters.charAt(Math.floor(Math.random() * stringCharacters.length));
	}
	return string;
}


function Accumulator(startingValue){
	this.value = startingValue;
	this.read = function (){
		this.value += +prompt("How much to add?", 0);
	};
}
let accumulator = new Accumulator(1);
$("#accumulator > p").text(accumulator.value);
$("#accumulator > button").click(function (){
	accumulator.read();
	$("#accumulator > p").text(accumulator.value);
});

function truncate(str, maxlength){
	return (str.length > maxlength) ? str.slice(0, maxlength - 3) + "..." : str;
}

$(".secondCards").first().find(".card").each(function (){
	let cardText = $(this).find("p").first();
	cardText.text(truncate(cardText.text(), 15));
});


let basketArray = [];

function BasketItem(name, price){
	this.name = name;
	this.price = price;
	this.quantity = 1;
}

function addToBasket(name, price){
	let item = basketArray.find(item => item.name === name);
	if(item){
		item.quantity++;
	}else{
		basketArray.push(new BasketItem(name, price));
	}
}

function countBasketPrice(){
	let totalPrice = 0;
	basketArray.forEach(item => totalPrice += item.price * item.quantity);
	$("#basket > p").text(totalPrice);
}

$(".product > .addProduct").click(function (){
	//console.log("click")
	let product = $(this).parent();
	addToBasket(product.find("h3").text(), Number(product.find(".price").text()));
	countBasketPrice();
});

$(".product > .removeProduct").click(function (){
	let product = $(this).parent();
	let item = basketArray.find(item => item.name === product.find("h3").text());
	if(item){
		item.quantity--;
		if(item.quantity === 0){
			basketArray.splice(basketArray.indexOf(item), 1);
		}
	}
	countBasketPrice();
});

$("#deleteBasket").click(function (){
	basketArray = [];
	countBasketPrice();
});

function filterArray(arr, a, b){
	return arr.filter(item => (a <= item.price && item.price <= b));
}


let notificationsCount = 0;
function notificationsUpdate(){
	if(notificationsCount <= 10){
		let notifications = $(".notifications").first();
		notificationsCount++;
		let notifidicationList = notifications.find("ul").first();
		notifidicationList.append("<li><span>" + notificationsCount + "</span>list item " + notificationsCount + "</li>");
		notifications.attr("data-before", notificationsCount);
	}
}

let notificationsUpdateTickDelay = 3000;
function notificationsUpdateTick(){
	notificationsUpdate();
	setTimeout(notificationsUpdateTick, notificationsUpdateTickDelay);
}

$(".notifications").first().click(function (){
	notificationsUpdateTickDelay = 10000;
	setTimeout(function(){notificationsUpdateTickDelay = 3000;}, 10000);
});

function productListSort(direction){
	let productList = $(".productList").first();
	let productListItems = productList.find(".product");
	let productListItemsArray = [];
	productListItems.each(function (){
		productListItemsArray.push($(this));
	});
	if(direction === "up"){
		productListItemsArray.sort(function (a, b){
			return Number(a.find(".price").text()) - Number(b.find(".price").text());
		});
	}
	if(direction === "down"){
		productListItemsArray.sort(function (a, b){
			return Number(b.find(".price").text()) - Number(a.find(".price").text());
		});
	}
	productListItemsArray.forEach(function (item){
		productList.append(item);
	});
}

$(".products > .sortDirection").first().find("button.up").click(function (){
	productListSort("up");
});
$(".products > .sortDirection").first().find("button.down").click(function (){
	productListSort("down");
});
