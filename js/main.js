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

async function getDeck() {
    try {
	    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
	    const jsonData = await res.json();
	
        document.querySelector('#img-1').src = jsonData.cards[0].image
	    document.querySelector('#img-2').src = jsonData.cards[1].image
	    resultsForPlayerOne = convert(jsonData.cards[0].value)
	    resultsForPlayerTwo = convert(jsonData.cards[1].value)
	    if(jsonData) {
		    winOrLose(resultsForPlayerOne, resultsForPlayerTwo);
	    }
    } catch(err) {
        console.error(err);
    }
}

function winOrLose(playerOne, playerTwo) {
	if(playerOne > playerTwo) {
		document.querySelector('h2').innerText = `Player One Wins!!`
	} else if (playerOne < playerTwo){
		document.querySelector('h2').innerText = `Player Two Wins!!`
	} else {
		document.querySelector('h2').innerText = `THIS IS WAAAAARRR!!`
		document.querySelector('h1').innerText = `HEAD TO HEAD!!`
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

async function war() {
    let playerOneFightHand = await populateHand()
    let playerTwoFightHand = await populateHand()

    playerOneFightHand.forEach(img => {
        document.querySelector(".room-A").append(img)
    });

    playerTwoFightHand.forEach(img => {
        document.querySelector(".room-B").append(img)
    });
}

async function populateHand() {
    try {
        let imgArr = []

	    const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
        const jsonData = await res.json();
        for(let i = 0; i < jsonData.cards.length; i++) {
            const warCardImg = document.createElement("img")
            // const breakTag = document.createElement("br")
            warCardImg.src = jsonData.cards[i].image

            imgArr.push(warCardImg)
        }

        return imgArr;

	    // fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
	    // 		    .then(res => res.json())
	    // 		    .then(jsonData => {
	    // 		    	for(let i = 0; i < jsonData.cards.length; i++) {
	    // 					const warCardImg = document.createElement("img")
	    // 					const breakTag = document.createElement("br")
	    // 					warCardImg.src = jsonData.cards[i]
						
	    // 					console.log(warCardImg)
	    // 		    		console.log(i)
	    // 		    	}
	    // 		    })
	    // 		    .catch(err => {
	    // 		    	console.log("Error: " + err);
	    // 		    });
    } catch (err) {
        console.error(err);
    }

}









































