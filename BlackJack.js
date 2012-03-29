// Card Constructor
function Card(s, n) {
    var suit = s;
    var number = n;
    
    this.getNumber = function() {
        return number;
    };
    
    this.getSuit = function() {
        return suit;
    };
    
    this.getValue = function() {
        if (number > 1 && number < 11)
            return number;
        else if (number == 1)
            return 11;
        else
            return 10;
    };
}

function deal() {
    s = Math.floor(Math.random() * 4) + 1;
    n = Math.floor(Math.random() * 13) + 1;
    card = new Card(s, n);
    return card;
}

// Hand Constructor
function Hand() {
    var cards = [];
    cards.push(deal());
    cards.push(deal());
    
    this.getHand = function() {
        return cards;
    };
    
    this.score = function() {
        var sc = 0;
        var aces = 0;
        
        for(var i = 0; i < cards.length; ++i) {
            val = cards[i].getValue();
            sc += val;
            if (val === 11)
                aces++;
        }
        
        while(sc > 21 && aces > 0) {
            sc -= 10;
            aces--;
        }
  
        return sc;
    };
    
    this.printHand = function() {
        str = '';
        for(var i = 0; i < cards.length; i++) {
            var s = cards[i].getSuit();
            var n = cards[i].getNumber();
            var sStr = '';
            var nStr = '';
            
            switch(s) {
                case '1': sStr = 'hearts'; break;
                case '2': sStr = 'diamonds'; break;
                case '3': sStr = 'spades'; break;
                case '4': sStr = 'clubs'; break;
            }
            
            if (n > 1 && n < 11)
                nStr = n;
            else if (n === 1)
                nStr = 'Ace';
            else if (n === 11)
                nStr = 'Jack';
            else if (n === 12)
                nStr = 'Queen';
            else
                nStr = 'King';
            
            str += nStr + ' of suit ' + sStr + ', ';
        }
            
        return str.substring(0, str.length - 2);
    };
    
    this.hitMe = function() {
        newCard = deal();
        cards.push(newCard);
    };
}

function playAsDealer() {
    var dealerHand = new Hand();
    var dealerScore = dealerHand.score();
    while(dealerScore < 17) {
        dealerHand.hitMe();
        dealerScore = dealerHand.score();
    }
    
    return dealerHand;
}

function playAsUser() {
    var playerHand = new Hand();
    var decision = true;
    while(decision === true) {
        decision = confirm('Hand is ' + playerHand.printHand() + '. Hit?');
        playerHand.hitMe();
    }
    
    return playerHand;
    
}

function declareWinner(userHand, dealerHand) {
    var userScore = userHand.score();
    var dealerScore = dealerHand.score();
    if(userScore <= 21 && dealerScore <= 21) {
        if (userScore < dealerScore)
            return 'You lose!';
        else if (userScore > dealerScore)
            return 'You win!';
        else
            return 'You tied!';
    } else {
        if (userScore > 21) {
            if (dealerScore > 21)
                return 'You tied!';
            else
                return 'You lose!';
        }
        else if (dealerScore > 21)
            return 'You win!';
            
    }
}

function playGame() {
    userHand = playAsUser();
    dealerHand = playAsDealer();
    result = declareWinner(userHand, dealerHand);
    console.log(result);
    console.log('User: ' + userHand.printHand());
    console.log('Dealer: ' + dealerHand.printHand());
}

playGame();