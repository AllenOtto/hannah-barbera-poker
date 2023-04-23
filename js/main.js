let deckId = ""

document.querySelector('button').addEventListener('click', getDeckId)

function getDeckId() {
	fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
	    .then(res => res.json())
		.then(jsonData => {
			deckId = jsonData.deck_id;
			getDeck();
		})
		.catch(err => {
			console.log("Error: " + err);
		});
}

function getDeck() {
	fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
	    .then(res => res.json())
		.then(jsonData => {
			document.querySelector('#img-1').src = jsonData.cards[0].image
			document.querySelector('#img-2').src = jsonData.cards[1].image
			resultsForPlayerOne = convert(jsonData.cards[0].value)
			resultsForPlayerTwo = convert(jsonData.cards[1].value)
			if(jsonData) {
				setTimeout(winOrLose(resultsForPlayerOne, resultsForPlayerTwo), 5000);
			}
		})
		.catch(err => {
			console.log(err);
		});
}

function winOrLose(playerOne, playerTwo) {
	if(playerOne > playerTwo) {
		document.querySelector('h2').innerText = `Player One Wins!!`
	} else if (playerOne < playerTwo){
		document.querySelector('h2').innerText = `Player Two Wins!!`
	} else {
		document.querySelector('h2').innerText = `THIS IS WAAAAARRR!!`
		document.querySelector('h1').innerText = `THIS IS WAAAAARRR!!`
		war();
	}
}

function convert(value) {
	switch(value) {
		case "ACE":
			return 14;
		case "KING":
			return 13;
		case "QUEEN":
			return 12;
		case "JACK":
			return 11;
		default:
			return Number(value);
	}
}

function war() {
    let playerOneFightHand = populateHand()
    let playerTwoFightHand = populateHand()

    // console.log(playerOneFightHand);
    // console.log(playerTwoFightHand);
}

function populateHand() {
	
	fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
			    .then(res => res.json())
			    .then(jsonData => {
			    	for(let i = 0; i < jsonData.cards.length; i++) {
						const warCardImg = document.createElement("img")
						const breakTag = document.createElement("br")
						warCardImg.src = jsonData.cards[i].image
						
						console.log(warCardImg)
			    		console.log(i)
			    	}
			    })
			    .catch(err => {
			    	console.log("Error: " + err);
			    });

}









































