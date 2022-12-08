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
	centerPic();
});

$(window).on("resize", function (){
	centerPic();
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

//work with notifications
let notificationsCount = 0;
function notificationsUpdate(){
	if(notificationsCount <= 10){
		let notifications = $(".notifications").first();
		notificationsCount++;
		let notifidicationList = notifications.find("ul").first();
		notifidicationList.append("<li><span class=\"closer\">+</span>list item " + notificationsCount + "</li>");
		notifications.attr("data-before", notificationsCount);
	}
}

let notificationsUpdateTickDelay = 3000;
function notificationsUpdateTick(){
	notificationsUpdate();
	setTimeout(notificationsUpdateTick, notificationsUpdateTickDelay);
}

$(".notifications").first().click(function (event){
	if($(event.target).hasClass("closer")){
		$(event.target).parent().remove();
		notificationsCount--;
		$(this).attr("data-before", notificationsCount);
	}
	else{
		notificationsUpdateTickDelay = 10000;
		setTimeout(function(){notificationsUpdateTickDelay = 3000;}, 10000);
	}
});

$("#notificationsAdd").click(function (){
	let notifications = $(".notifications").first();
	notificationsCount++;
	let notifidicationList = notifications.find("ul").first();
	let content = prompt("Enter notification content", "");
	let addingItem = $("<li><span class=\"closer\">+</span>list item " + content + "</li>");
	notifidicationList.append(addingItem);
	notifications.attr("data-before", notificationsCount);
	setTimeout(function(){
		addingItem.remove();
		notificationsCount--;
		notifications.attr("data-before", notificationsCount);
	}, 1500);
});

//end of work with notifications


//work with basket

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

$(".product").on("selectstart", function (event){
	event.preventDefault();
});

//add possibility to add products to #basket via drag and drop
let draggedProduct = null;
$(".product").on("dragstart", function (event){
	draggedProduct = $(this);
	console.log(draggedProduct + "dragstart");
});
$(".product").on("dragend", function (event){
	draggedProduct = null;
	console.log(draggedProduct + "dragend");
});
$("#basket").on("dragover", function (event){
	event.preventDefault();
	$(this).css("outline", "2px solid red");
});
$("#basket").on("dragleave", function (event){
	$(this).css("outline", "");
});
$("#basket").on("drop", function (event){
	console.log(draggedProduct + "drop");
	$(this).css("outline", "");
	if(draggedProduct){
		addToBasket(draggedProduct.find("h3").text(), Number(draggedProduct.find(".price").text()));
		countBasketPrice();
	}
});

//end of work with basket



$("a[href^='http']").css("color", "orange"); //makes external links orange

function addListElement(){
	let content = prompt("Enter list item content", "");
	if(content){
		let listItem = $("<li></li>");
		listItem.text(content);
		$("#listSection > ul").first().append(listItem);
		listItem.on("selectstart", function (event){
			event.preventDefault();
		});
		addListElement();
	}
}

$("#listSection > .listAdder").first().click(addListElement);

function centerPic(){
	let wrapper = $("#jsCenteredPicWrapper");
	let pic = wrapper.find(".centeredPic").first();
	let picWidth = pic.width();
	let picHeight = pic.height();
	let wrapperWidth = wrapper.width();
	let wrapperHeight = wrapper.height();
	let picLeft = (wrapperWidth - picWidth) / 2;
	let picTop = (wrapperHeight - picHeight) / 2;
	pic.css("left", picLeft);
	pic.css("top", picTop);
}

$("#jsCenteredPicWrapper").find(".centeredPic").first().click(function(event){
	console.log(event.pageX, event.pageY);
});


$(".firstCards a").click(function (event){
	let confirmation = confirm("Are you sure you want to leave this page?");
	if(!confirmation){
		event.preventDefault();
	}
});


$(".gallery").click(function (event){
	//$(".small").first().find("img").first().attr("src", $(event.target).attr("src"));//this is for images
	$(".small").first().css("background-color", $(event.target).css("background-color")); //this is for when we just change color
});

$("#listSection").click(function (event){
	if($(event.target).is("li")){
		if(event.ctrlKey){
			$(event.target).toggleClass("selected");
		}
		else{
			$(event.target).addClass("selected");
			$(event.target).siblings().removeClass("selected");
		}
	}
});

//when #myRange is changed create two circles with 20px radius on the current position of the slider and animate them to fade away
$("#myRange").on("input", function (){
	let range = $(this);
	let rangeWidth = range.width();
	let rangeValue = range.val();
	let rangeValuePercent = rangeValue / range.attr("max");
	let circle = $("<div></div>");
	circle.addClass("circle");
	circle.css("left", rangeValuePercent * rangeWidth - 12);
	range.parent().append(circle);
	//animate circle to fade away and transform to 3 times it's size
	circle.animate({
		opacity: 0,
		width: "60px",
		height: "60px",
		marginLeft: "-20px",
		marginTop: "-20px"
	}, 400, function (){
		circle.remove();
	});
});