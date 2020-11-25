// Challenge 1: Your age in Days
function ageInDays() {
    var birthYear = prompt("Enter your birth year?");
    var ageInDays = (2020-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDays+' days old.');
    h1.setAttribute('id', ageInDays);
    h1.appendChild(textAnswer);
    document.getElementById("flex-box-result").appendChild(h1);
}


function reset() {
    document.getElementById('flex-box-result').innerHTML="";
}


// CHallenge 2: Generate Cat
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// Challenge 3: RockPaperScissors
function rockpaperscissors(yourchoice) {
    var humanChoice, botChoice;
    humanChoice = yourchoice.id
    botChoice = randRPS()
    message = decideWinner(humanChoice,botChoice);
    rpsFrontEnd(yourchoice, botChoice, message);

}

function decideWinner(human,bot) {
    if (human=="rock"){
        if(bot=="rock"){
            return {'message':"You Tied!", 'color':'orange'};
        }
        else if(bot =="paper") {
            return {'message':"You Lost!", 'color':'red'};
        }
        else if(bot == "scissors"){
            return {'message':"You Won!",'color':'green'};
        }
    }

    if (human=="paper"){
        if(bot=="rock"){
            return {'message':"You Won!",'color':'green'};
        }
        else if(bot =="paper") {
            return {'message':"You Tied!", 'color':'orange'};
        }
        else if(bot == "scissors"){
            return {'message':"You Lost!", 'color':'red'};
        }
    }

    if (human=="scissors"){
        if(bot=="rock"){
            return {'message':"You Lost!", 'color':'red'};
        }
        else if(bot =="paper") {
            return {'message':"You Won!",'color':'green'};
        }
        else if(bot == "scissors"){
            return {'message':"You Tied!", 'color':'orange'};
        }
    }
}


function randRPS(){
    return  ['rock','paper','scissors'][Math.floor(Math.random()*3)];
}

function rpsFrontEnd(yourchoice, botChoice, message) {
    var imagedatabse = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src,
    }
    console.log(imagedatabse[yourchoice.id])

    document.getElementById("flex-rpc").innerHTML="";

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src='"+ imagedatabse[yourchoice.id] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    document.getElementById("flex-rpc").appendChild(humanDiv);

    messageDiv.innerHTML = "<h1 style = 'color:"+ message.color +"; font-size : 60px; padding : 30px'>" + message.message + "</h1>"
    document.getElementById("flex-rpc").appendChild(messageDiv);

    botDiv.innerHTML = "<img src='"+ imagedatabse[botChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";
    document.getElementById("flex-rpc").appendChild(botDiv);
}

// Challenge 4 : Change the Color


var allButtons = document.getElementsByTagName("button");


let copyButtons = [];
for(let i=0;i<allButtons.length;i++){
    copyButtons.push(allButtons[i].classList[1]);
}

function buttonColorChange(message){
    if(message.value == 'red'){
        buttonRed();
    }
    else if(message.value =='green'){
        buttonGreen();
    } else if(message.value == 'reset'){
        buttonReset();
    } else if(message.value == 'random'){
        buttonRandom();
    }

    function buttonRed(){
        for(let i=0;i<allButtons.length;i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add('btn-danger');
        }
         
    }

    function buttonGreen(){
        for(let i=0;i<allButtons.length;i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add('btn-success');
        }    
    }

    function buttonReset(){

        for (let i=0;i<allButtons.length;i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add(copyButtons[i]);
        }
    }

    function buttonRandom(){

        for (let i=0;i<allButtons.length;i++){
            allButtons[i].classList.remove(allButtons[i].classList[1]);
            allButtons[i].classList.add(randomChoice());
        }
    }

    function randomChoice(){
        return ['btn-primary','btn-danger','btn-success','btn-warning'][Math.floor(Math.random()*4)];;

    }
}

//Challenge 5: BlackJack
let blackjackGame={
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box','score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box','score':0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':1},
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitsound = new Audio('blackjack_assets/sounds/swish.m4a');
const awwsound = new Audio('blackjack_assets/sounds/aww.mp3');
const cashsound = new Audio('blackjack_assets/sounds/cash.mp3');



document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card,YOU);
    showScore(YOU);
}


function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex]
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `blackjack_assets/images/${card}.png`;
        cardImage.height=100;
        cardImage.width=80;
        cardImage.style='margin : 10px';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }

}

function blackjackDeal(){
    showResult(computeWinner());
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0;i<yourImages.length;i++){
        yourImages[i].remove();
    }

    for(let i=0;i<dealerImages.length;i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color= 'white';
    document.querySelector('#dealer-blackjack-result').style.color= 'white';
}

function updateScore(card, activeplayer){
    activeplayer['score']+= blackjackGame['cardsMap'][card];
}

function showScore(activeplayer){
    if(activeplayer['score'] >21){
        document.querySelector(activeplayer['scoreSpan']).textContent='BUST!';
        document.querySelector(activeplayer['scoreSpan']).style.color='red';
    }else{
        document.querySelector(activeplayer['scoreSpan']).textContent = activeplayer['score'];
    }
    
}


function dealerLogic(){
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    
    
}

function computeWinner(){
    let winner;
    if (YOU['score']<=21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
            console.log("YOU WON!");
            winner = 'YOU';

        }else if(YOU['score'] < DEALER['score']){
            console.log("You Lost!");
            winner = 'DEALER';

        }else if(YOU['score'] == DEALER['score']){
            console.log("You Drew!");
            winner = 'na';
        }

    }else if(YOU['score'] > 21 && DEALER['score']<=21){
        console.log("You Lost!");
        winner = 'DEALER';

    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        console.log("You Drew!");
        winner = 'na';
    }
    return winner;
}


function showResult(winner){

    if (winner == 'YOU'){
        message = 'YOU Won!';
        messageColor = 'green';
        cashsound.play();

    }else if (winner == 'DEALER'){
        message = "You Lost!";
        messageColor = 'red';
        awwsound.play();
    
    }else{
        message = "You Drew!";
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

