let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button').
	addEventListener('click', () => {
	playGame('rock');
});

document.querySelector('.js-paper-button').
	addEventListener('click', () => {
	playGame('paper');
});

document.querySelector('.js-scissors-button').
	addEventListener('click', () => {
	playGame('scissors');
});

document.body.addEventListener ('keydown', (event) => {
	if (event.key === 'a')
		playGame('rock');
	if (event.key === 's')
		playGame('paper');
	if (event.key === 'd')
		playGame('scissors');
});

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
	if (!isAutoPlaying) {
		intervalId = setInterval(() => {
			const playerMove = pickComputerMove();
			playGame(playerMove);
		}, 1000)
		isAutoPlaying = true;
	} else {
		clearInterval(intervalId);
		isAutoPlaying = false;
	}

	if(isAutoPlaying === true) 
		document.querySelector('.auto-play-button').innerHTML = 'Stop'
	else 
		document.querySelector('.auto-play-button').innerHTML = 'Auto Play'

}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result;

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') result = 'You lose.';
    if (computerMove === 'paper') result = 'You win.';
    if (computerMove === 'scissors') result = 'Tie.';

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') result = 'You win.';
    if (computerMove === 'paper') result = 'Tie.';
    if (computerMove === 'scissors') result = 'You lose.';
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') result = 'Tie.';
    if (computerMove === 'paper') result = 'You lose.';
    if (computerMove === 'scissors') result = 'You win.';
  }

  if (result === 'You win.') score.wins += 1;
  if (result === 'You lose.') score.losses += 1;
  if (result === 'Tie.') score.ties += 1;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}<br> Losses: ${score.losses}<br> Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove;

  if (randomNumber >= 0 && randomNumber < 1 / 3) computerMove = 'rock';
  if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) computerMove = 'paper';
  if (randomNumber >= 2 / 3 && randomNumber < 1) computerMove = 'scissors';

  return computerMove;
}
