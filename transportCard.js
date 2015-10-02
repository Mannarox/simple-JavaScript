//javaScript

//this big block for incoming data
//transport cards
var card0 = new Object();
card0.typeOftransport = "bus";
card0.startRoute = "Habarovsk Airport";
card0.endRout = "Vanino bus station";
card0.nomberOfTransport = "317";

var card1 = new Object();
card1.typeOftransport = "train";
card1.startRoute = "Pushkino";
card1.endRout = "Moscow";
card1.seatPlace = "34B";
card1.nomberOfTransport = "78A";

var card2 = new Object();
card2.typeOftransport = "flight";
card2.startRoute = "Moscow";
card2.endRout = "Habarovsk Airport";
card2.seatPlace = "3A";
card2.nomberOfTransport = "SK455";
card2.baggage = "Baggage drop at ticket counter 344."
card2.gate = "45B";

var card3 = new Object();
card3.typeOftransport = "bus";
card3.startRoute = "Krasnoarmeysk";
card3.endRout = "Pushkino";
card3.nomberOfTransport = "21";

//to create array of transport cards
var arrayOfTransportCards = new Array();
for(var i = 0; i < 4; i ++){
	arrayOfTransportCards.push( window['card'+i] );
}
//the starting point of the route and final destination of route
var theStart = "Krasnoarmeysk";
//var theEnd = "Vanino bus station";

window.onload = function() {
	startScriptAPI(theStart, arrayOfTransportCards);
}


//===========================================
//============Script API=====================
//===========================================
//This function accept start of route and array with transport cards.
//Every card, this Object who has keys information about this card. 
//Function handle start and finish of route every transport card to find sequence of route and to sort boarding cards.
//Every transport card must has .startRoute , .endRout, .typeOftransport and .nomberOfTransport, other items optionalty.

function startScriptAPI(theStart, arrayOfTransportCards){ //function of handler of transport cards

	var routeSequence = new Array(); //Array will be hold sorted transport cards

	function sortingCards(){ //sorting cards function
		var destination = theStart; //the destination of this transport

		for(var i = 0; i < arrayOfTransportCards.length; i ++){
			for(var b = 0; b < arrayOfTransportCards.length; b ++){ //находим последовательности начального пункта и конечного
				if(arrayOfTransportCards[b].startRoute == destination){
					destination = arrayOfTransportCards[b].endRout;
					routeSequence.push( arrayOfTransportCards[b] );
					break;
				}
			}
		}
	}

	function toCreateTextInformation(){ //to create information about transports for user
		var allText = "";

		function creatingGate(card){ //check if card has number of Gate
			if(routeSequence[card].gate == undefined){
				return "";
			} else {
				return " Gate " + routeSequence[card].gate + ".";
			}
		}
		function creatingSeat(card){ //check if card has number of seat
			if(routeSequence[card].seatPlace == undefined || ""){
				return "No seat assignment. ";
			} else {
				return "Seat " + routeSequence[card].seatPlace + ". ";
			}
		}
		function creatingBaggage(card){ //check if card has baggage information
			if(routeSequence[card].baggage == undefined){
				return "";
			} else {
				return routeSequence[card].baggage;
			}
		}

		for(var i = 0; i < routeSequence.length; i ++){ //creating text rows
			var text = i + 1 + ") " + "From " + routeSequence[i].startRoute + ", take " + routeSequence[i].typeOftransport + " " +
			routeSequence[i].nomberOfTransport + " to " + routeSequence[i].endRout + "." + creatingGate(i) + " " + creatingSeat(i) + 
			creatingBaggage(i) + "\n";

			allText += text; //merger text rows
		}
		console.log(allText);
	}

	sortingCards(); // to start sorting cards
	toCreateTextInformation(); // to start create information

	//console.log(routeSequence);


};