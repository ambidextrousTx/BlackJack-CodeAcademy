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
            sc += cards[i].getValue();
            if (cards[i].getValue() === 11)
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
        for(var i = 0; i < cards.length; i++)
            str += cards[i].getValue() + ' of suit ' + cards[i].getSuit() + ', ';
            
        return str.substring(0, str.length - 2);
    };
    
    this.hitMe = function() {
        newCard = deal();
        cards.push(newCard);
    };
}

leHand = new Hand();
leHand.hitMe();
console.log(leHand.printHand());
console.log(leHand.score());