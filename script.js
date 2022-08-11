'use strict';

/// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRelease = document.querySelector('.btn--release');
const swtichScreen = document.querySelector('.hold-btn');
const swtichScreenRolled1 = document.querySelector('.rolled-one');

let scores, currentScore, activePlayer, playing;

/// Starting conditions

const init = function () {
  document.querySelector('.cat').classList.remove('release-cat');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  btnRelease.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  console.log(`poop :D`);
};

/// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

/// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player, else add to current score
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch
      btnHold.classList.add('hidden');
      setTimeout(() => {
        btnHold.classList.remove('hidden');
      }, 2000);
      swtichScreenRolled1.classList.remove('hidden');
      setTimeout(() => {
        swtichScreenRolled1.classList.add('hidden');
      }, 2000);
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score, display switch player screen
    swtichScreen.classList.remove('hidden');
    setTimeout(() => {
      swtichScreen.classList.add('hidden');
    }, 1000);

    btnHold.classList.add('hidden');
    setTimeout(() => {
      btnHold.classList.remove('hidden');
    }, 1000);

    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    // 2. Check score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // If score >= 100 then win game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      swtichScreen.classList.add('hidden');
      btnHold.classList.add('hidden');
      setTimeout(() => {
        btnHold.classList.add('hidden');
      }, 1000);
      btnRoll.classList.add('hidden');
      setTimeout(() => {
        btnRoll.classList.add('hidden');
      }, 2000);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      setTimeout(() => {
        btnRelease.classList.remove('hidden');
      }, 3000);
    } else {
      switchPlayer();
    }
    //else switch to player 2
  }
});

btnNew.addEventListener('click', init);

btnRelease.addEventListener('click', function () {
  document.querySelector('.cat').classList.add('release-cat');
});
