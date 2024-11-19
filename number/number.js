const board = document.querySelector('.game-board');

// 카드 데이터 생성
const cardValues = Array.from({ length: 8 }, (_, i) => i + 1).flatMap(x => [x, x]);
let shuffledValues = [];

// 게임 초기화
function initGame() {
    shuffledValues = cardValues.sort(() => Math.random() - 0.5);
    board.innerHTML = '';
    shuffledValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.textContent = value; // 미리 값 표시 (디버깅용)
        setTimeout(() => (card.textContent = '?'), 1000); // 1초 후 숨김
        card.addEventListener('click', handleCardClick);
        board.appendChild(card);
    });
}

// 카드 클릭 처리
let firstCard = null;
let lockBoard = false;

function handleCardClick(event) {
    const clickedCard = event.target;

    if (lockBoard || clickedCard === firstCard || clickedCard.classList.contains('flipped')) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.value;

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    const secondCard = clickedCard;
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard = null; // 짝 맞음
        checkWinCondition();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '?';
            secondCard.textContent = '?';
            firstCard = null;
            lockBoard = false;
        }, 1000);
    }
}

// 게임 승리 조건 확인
function checkWinCondition() {
    if (document.querySelectorAll('.card:not(.flipped)').length === 0) {
        setTimeout(() => {
            alert('다 맞췄습니다! 게임이 초기화됩니다.');
            initGame(); // 게임 초기화
        }, 300);
    }
}

// 게임 시작
initGame();
