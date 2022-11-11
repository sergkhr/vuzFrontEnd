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
	//empty check using isEmpty
	if(isEmpty(captchaInput.val())){
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

