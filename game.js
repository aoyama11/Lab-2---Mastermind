const colors = ['R', 'G', 'B', 'Y'];
let secretCode = generateSecretCode();
let attempts = 0;

function generateSecretCode() {
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += colors[Math.floor(Math.random() * colors.length)];
    }
    return code;
}

function checkGuess() {
    const guess = document.getElementById('guessInput').value.toUpperCase();
    if (guess.length !== 4 || !/^[RGBY]+$/.test(guess)) {
        alert('Please enter a 4-character code using R, G, B, and Y.');
        return;
    }

    let feedback = '';
    let exactMatches = 0;
    let colorMatches = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secretCode[i]) {
            exactMatches++;
        } else if (secretCode.includes(guess[i])) {
            colorMatches++;
        }
    }

    if (exactMatches === 4) {
        feedback = 'You guessed the secret code! Congratulations!';
    } else {
        feedback = `Exact matches: ${exactMatches}, Color matches: ${colorMatches}`;
        attempts++;
    }

    if (attempts >= 10) {
        feedback += '<br>You ran out of attempts. The secret code was: ' + secretCode;
    }

    document.getElementById('feedback').innerHTML = feedback;
}
