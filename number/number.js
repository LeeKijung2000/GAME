let computerNumber = generateNumber();
let attempts = 0;

function generateNumber() {
    const digits = [];
    while (digits.length < 3) {
        const randomDigit = Math.floor(Math.random() * 10);
        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }
    return digits.join("");
}

function playGame() {
    const input1 = document.getElementById("input1").value;
    const input2 = document.getElementById("input2").value;
    const input3 = document.getElementById("input3").value;

    // 사용자 입력 검사
    if ([input1, input2, input3].some(num => num === "" || isNaN(num))) {
        alert("각 자리의 숫자를 입력해 주세요.");
        return;
    }

    const userInput = input1 + input2 + input3;
    attempts++;
    const result = checkGuess(userInput);
    document.getElementById("result").innerText = result;
    document.getElementById("attempts").innerText = `시도 횟수: ${attempts}`;

    if (result === "3스트라이크! 정답입니다!") {
        alert(`축하합니다! ${attempts}번 만에 맞추셨습니다!`);
        resetGame();
    }
}

function checkGuess(userInput) {
    let strikes = 0;
    let balls = 0;
    for (let i = 0; i < 3; i++) {
        if (userInput[i] === computerNumber[i]) {
            strikes++;
        } else if (computerNumber.includes(userInput[i])) {
            balls++;
        }
    }
    if (strikes === 3) return "3스트라이크! 정답입니다!";
    return `${strikes}스트라이크 ${balls}볼`;
}

function resetGame() {
    computerNumber = generateNumber();
    attempts = 0;
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("attempts").innerText = "";
}
