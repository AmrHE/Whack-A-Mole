const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ahh Nah thats the same hole');
        return randomHole(holes)
    }
    lastHole = hole;

    return hole;
}

function molePopUp() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) molePopUp();
    }, time);
}


function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    molePopUp();
    setTimeout(() => timeUp = true, 10000);
}

function knock(e) {
    if (!e.isTrusted) return; //prevent Cheating clicks
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', knock));