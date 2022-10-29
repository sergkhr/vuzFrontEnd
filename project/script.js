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

